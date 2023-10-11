import {
	aggregate,
	createDirectus,
	readItem,
	createItem,
	readItems,
	readSingleton,
	updateItem,
	updateItems,
	readFile,
	readFiles,
	uploadFiles,
	readFolder,
	readFolders,
	rest,
	realtime,
	staticToken,
} from '@directus/sdk';
import Stripe from 'stripe';

import { dollarsToCents, centsToDollars } from '~/utils/currency';
import type { Schema, OsInvoice } from '~/types';

const config = useRuntimeConfig();

const stripe = new Stripe(config.stripeSecretKey, {
	apiVersion: '2023-08-16',
});

const directusUrl = config.public.directusUrl as string;
const directus = createDirectus<Schema>(directusUrl).with(rest()).with(staticToken(config.directusToken));

const relevantEvents = [
	'checkout.session.async_payment_failed',
	'checkout.session.async_payment_succeeded',
	'checkout.session.completed',
];

export default defineEventHandler(async (event) => {
	// Get the Stripe headers and verify the webhook
	const sig = await getHeader(event, 'stripe-signature');
	const { stripeWebhookSecret } = useRuntimeConfig();

	const webhookSecret = stripeWebhookSecret;

	let stripeEvent;

	try {
		if (!sig || !webhookSecret) return;
		const rawBody = await readRawBody(event);
		stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
		console.log('Stripe webhook received:', stripeEvent.type);
	} catch (error) {
		createError(error);
	}

	// Handle the event
	if (relevantEvents.includes(stripeEvent.type)) {
		try {
			switch (stripeEvent.type) {
				case 'checkout.session.completed':
					const checkoutSession = stripeEvent.data.object;

					// Get the payment intent from the checkout session
					const paymentIntent = await stripe.paymentIntents.retrieve(checkoutSession.payment_intent);

					// Create a new payment in Directus
					const { contact_id, organization_id, invoice_id } = checkoutSession.metadata;

					const payment = await directus.request(
						createItem('os_payments', {
							organization: organization_id,
							contact: contact_id,
							invoice: invoice_id,
							// Use the charge date from the payment intent but convert to ISO string format
							payment_date: new Date(paymentIntent.charges.data[0].created * 1000).toISOString(),
							stripe_payment_id: checkoutSession.payment_intent,
							amount: centsToDollars(checkoutSession.amount_total),
							metadata: { checkoutSession, paymentIntent },
							receipt_url: paymentIntent.charges.data[0].receipt_url,
						}),
					);

					console.log('checkoutSession', checkoutSession);
					console.log('paymentIntent', paymentIntent);
					console.log('charges', paymentIntent.charges.data);

					break;

				case 'checkout.session.async_payment_failed':
					// const checkoutSession = stripeEvent.data.object;
					// console.log('checkoutSession', checkoutSession);

					break;

				case 'checkout.session.async_payment_succeeded':
					// const checkoutSession = stripeEvent.data.object;
					// console.log('checkoutSession', checkoutSession);

					break;

				default:
					throw new Error('Unhandled relevant event!');
			}
		} catch (error) {
			console.log(error);
			createError(error.message);
		}
	} else {
		console.log('Unhandled event!');
	}
	return {
		received: true,
	};
});
