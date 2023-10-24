export default defineNuxtConfig({
	components: [{ path: './components/', prefix: 'Proposals' }],

	build: {
		transpile: ['v-perfect-signature'],
	},
});
