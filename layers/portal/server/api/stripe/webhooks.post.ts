import Stripe from 'stripe';
import { centsToDollars } from '~/utils/currency';

const config = useRuntimeConfig();

const stripe = new Stripe(config.stripeSecretKey, {
	apiVersion: '2023-08-16',
});

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
		if (!rawBody) return;
		stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
		// console.log('Stripe webhook received:', stripeEvent.type);
	} catch (error) {
		createError({
			statusCode: 500,
			statusMessage: (error as Error).message,
		});
	}

	// Handle the event
	if (stripeEvent && relevantEvents.includes(stripeEvent.type)) {
		try {
			switch (stripeEvent.type) {
				case 'checkout.session.completed': {
					const checkoutSession = stripeEvent.data.object as Stripe.Checkout.Session;

					// Get the payment intent from the checkout session
					const paymentIntentResponse = await stripe.paymentIntents.retrieve(checkoutSession.payment_intent as string, {
						expand: ['charges'],
					});

					// Create a new payment in Directus
					const metadata = checkoutSession.metadata;
					const contact_id = metadata?.contact_id;
					const organization_id = metadata?.organization_id;
					const invoice_id = metadata?.invoice_id;

					const payment = await directusServer.request(
						createItem('os_payments', {
							organization: organization_id,
							contact: contact_id,
							invoice: invoice_id,
							// Use the charge date from the payment intent but convert to ISO string format
							// @ts-ignore
							payment_date: new Date(paymentIntentResponse?.charges?.data[0]?.created ?? 0 * 1000).toISOString(),
							stripe_payment_id: checkoutSession?.payment_intent as string,
							amount: centsToDollars(checkoutSession.amount_total ?? 0),
							metadata: { checkoutSession, paymentIntent: paymentIntentResponse },
							// @ts-ignore
							receipt_url: paymentIntentResponse.charges?.data[0]?.receipt_url ?? null,
						}),
					);

					// console.log('checkoutSession', checkoutSession);
					// console.log('paymentIntent', paymentIntent);
					// console.log('charges', paymentIntent.charges.data);

					break;
				}

				case 'checkout.session.async_payment_failed': {
					// const checkoutSession = stripeEvent.data.object;
					// console.log('checkoutSession', checkoutSession);

					break;
				}

				case 'checkout.session.async_payment_succeeded': {
					// const checkoutSession = stripeEvent.data.object;
					// console.log('checkoutSession', checkoutSession);

					break;
				}

				default:
					throw new Error('Unhandled relevant event!');
			}
		} catch (err: any) {
			throw createError({
				statusCode: 500,
				statusMessage: err.message,
			});
		}
	} else {
		// console.log('Unhandled event!');
	}

	return {
		received: true,
	};
});
