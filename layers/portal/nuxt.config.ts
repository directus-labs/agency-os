export default defineNuxtConfig({
	components: [
		// Disable prefixing base components with `Base`
		{ path: './components/', prefix: 'Portal' },
	],

	routeRules: {
		'/auth/**': { ssr: false },
		'/portal/**': { ssr: false, index: false },
	},

	runtimeConfig: {
		public: {
			stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
		},
		stripeSecretKey: process.env.STRIPE_SECRET_KEY,
		stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
	},
});
