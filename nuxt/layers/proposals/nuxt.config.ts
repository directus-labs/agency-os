export default defineNuxtConfig({
	components: [{ path: './components/', prefix: 'Proposals' }],

	routeRules: {
		'/proposals/**': { ssr: true },
	},

	build: {
		transpile: ['v-perfect-signature'],
	},
});
