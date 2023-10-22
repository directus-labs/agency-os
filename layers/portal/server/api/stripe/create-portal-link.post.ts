import Stripe from 'stripe';

const config = useRuntimeConfig();

const stripe = new Stripe(config.stripeSecretKey, {
	apiVersion: '2023-08-16',
});

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const headers = getRequestHeaders(event);

	try {
		const { url } = await stripe.billingPortal.sessions.create({
			customer: body.customerId,
			return_url: headers.referer,
		});

		return {
			url,
		};
	} catch (error: any) {
		throw createError({
			statusCode: 500,
			statusMessage: error.message ?? 'An unexpected error occurred',
		});
	}
});
