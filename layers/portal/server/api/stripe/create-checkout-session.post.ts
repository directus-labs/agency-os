import { createDirectus, readItem, updateItem, rest, staticToken } from '@directus/sdk';
import Stripe from 'stripe';

import { dollarsToCents } from '~/utils/currency';
import type { Schema } from '~/types';

const config = useRuntimeConfig();

const stripe = new Stripe(config.stripeSecretKey, {
	apiVersion: '2023-08-16',
});

const directusUrl = config.public.directusUrl as string;
const directus = createDirectus<Schema>(directusUrl).with(rest()).with(staticToken(config.directusToken));

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const headers = getRequestHeaders(event);

	try {
		// Get the invoice from the request
		const { invoiceId } = body;

		const invoice = await directus.request(
			readItem('os_invoices', invoiceId, {
				fields: [
					'*',
					{
						organization: ['id', 'stripe_customer_id', 'email', 'name', 'phone', 'email'],
						contact: ['id', 'first_name', 'last_name', 'email'],
						line_items: [
							'id',
							'line_item_number',
							'item_name',
							'quantity',
							'unit_price',
							'description',
							'line_amount',
							'tax_amount',
							{ item: ['id', 'name', 'description'] },
							{ tax_rate: ['id', 'name', 'rate'] },
						],

						payments: ['*'],
					},
				],
			}),
		);

		// Check if the invoice, organization, and contact exist
		if (!invoice.organization || !invoice.contact) {
			throw new Error('Missing organization or contact');
		}

		// Check if the invoice is already paid
		if (invoice.status === 'paid' || invoice.status === 'void' || invoice.amount_due === 0) {
			throw new Error('Invoice is already paid');
		}

		// Create or update the Stripe customer
		let stripeCustomerId;

		if (!invoice.organization.stripe_customer_id) {
			const customer = await stripe.customers.create({
				email: invoice.organization.email,
				name: invoice.organization.name,
				phone: invoice.organization.phone,
				metadata: {
					contact_id: invoice.contact.id,
					organization_id: invoice.organization.id,
				},
			});

			stripeCustomerId = customer.id;

			await directus.request(
				updateItem('organizations', invoice.organization.id, {
					stripe_customer_id: stripeCustomerId,
				}),
			);
		} else {
			stripeCustomerId = invoice.organization.stripe_customer_id;
		}

		// Create the Checkout session
		const session = await stripe.checkout.sessions.create({
			customer: stripeCustomerId,
			line_items: [
				{
					quantity: 1,
					price_data: {
						currency: 'usd',
						product_data: {
							name: `Payment for INV# ${invoice.invoice_number}`,
							description: `Reference: ${invoice.reference}`,
						},
						unit_amount: dollarsToCents(invoice.amount_due),
					},
				},
			],
			mode: 'payment',
			success_url: `${headers.referer}?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${headers.referer}?session_id=cancelled`,
			metadata: {
				invoice_id: invoice.id,
				contact_id: invoice.contact.id,
				organization_id: invoice.organization.id,
			},
		});

		// Return the checkout session to the client
		return session;
	} catch (error: any) {
		throw createError({
			statusCode: 500,
			statusMessage: error.message ?? 'An unexpected error occurred',
		});
	}
});
