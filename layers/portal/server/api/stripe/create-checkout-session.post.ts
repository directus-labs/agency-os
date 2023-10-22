import Stripe from 'stripe';
import type { Organization, Contact } from '~/types';
import { dollarsToCents } from '~/utils/currency';

const config = useRuntimeConfig();

const stripe = new Stripe(config.stripeSecretKey, {
	apiVersion: '2023-08-16',
});

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const headers = getRequestHeaders(event);

	try {
		// Get the invoice from the request
		const { invoiceId } = body;

		const invoice = await directusServer.request(
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

		if (!invoice) {
			throw new Error('Invoice not found');
		}

		const organization: Organization | null = invoice?.organization as Organization | null;
		const contact: Contact | null = invoice?.contact as Contact | null;

		// Check if the invoice, organization, and contact exist
		if (!organization || !contact) {
			throw new Error('Missing organization or contact');
		}

		// Check if the invoice is already paid
		if (invoice.status === 'paid' || invoice.status === 'void' || invoice.amount_due === 0) {
			throw new Error('Invoice is already paid');
		}

		// Create or update the Stripe customer
		let stripeCustomerId;

		if (organization?.stripe_customer_id) {
			stripeCustomerId = organization.stripe_customer_id;
		} else {
			const customer = await stripe.customers.create({
				// @ts-ignore Not sure why this is throwing an no overload error
				email: organization.email,
				name: organization.name,
				phone: organization.phone,
				metadata: {
					contact_id: contact.id,
					organization_id: organization.id,
				},
			});

			stripeCustomerId = customer.id;

			if (!stripeCustomerId || !organization.id) {
				throw new Error('Stripe customer could not be created');
			}

			await directusServer.request(
				updateItem('organizations', organization?.id, {
					stripe_customer_id: stripeCustomerId,
				}),
			);
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
						unit_amount: dollarsToCents(invoice.amount_due ?? 0),
					},
				},
			],
			mode: 'payment',
			success_url: `${headers.referer}?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${headers.referer}?session_id=cancelled`,
			metadata: {
				invoice_id: invoice.id ?? null,
				contact_id: contact.id ?? null,
				organization_id: organization.id ?? null,
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
