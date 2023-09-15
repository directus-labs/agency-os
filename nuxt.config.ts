export default defineNuxtConfig({
	// https://nuxt.com/docs/api/configuration/nuxt-config

	// Nuxt DevTools https://devtools.nuxtjs.org/
	devtools: { enabled: true },

	// https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering
	routeRules: {
		//   '/**': { swr: true },
		//   '/api/**': { swr: false },
	},

	components: [
		// Disable prefixing base components with `Base`
		{ path: '~/components/base', pathPrefix: false },
		// Auto import components from `~/components`
		'~/components',
	],

	css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],

	modules: [
		'@nuxt/devtools', // https://devtools.nuxtjs.org/
		'@nuxtjs/color-mode', // https://color-mode.nuxtjs.org/
		'nuxt-icon', // https://github.com/nuxt-modules/icon
		'@nuxtjs/tailwindcss', // https://tailwindcss.nuxtjs.org/
		'@nuxt/image', // https://image.nuxt.com/get-started/installation
		'@vueuse/nuxt', // https://vueuse.org/
		'@vueuse/motion/nuxt', // https://motion.vueuse.org/nuxt.html
		'@formkit/nuxt', // https://formkit.com/getting-started/installation#with-nuxt
		'@nuxtjs/google-fonts', // https://google-fonts.nuxtjs.org/
		'nuxt-simple-sitemap', // https://nuxtseo.com/sitemap/getting-started/how-it-works
		'nuxt-schema-org', // https://nuxtseo.com/schema-org/guides/quick-setup
		'floating-vue/nuxt',
	],

	experimental: {
		componentIslands: true,
	},

	runtimeConfig: {
		public: {
			directusUrl: process.env.DIRECTUS_URL,
			directusWsUrl: process.env.DIRECTUS_WS_URL,
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
		},
		directusToken: process.env.DIRECTUS_ADMIN_TOKEN,
	},

	image: {
		proivder: 'directus',
		directus: {
			baseURL: process.env.DIRECTUS_URL,
		},
	},

	googleFonts: {
		families: {
			Inter: true,
			'Fira Code': true,
			'Playfair Display': [400, 500, 600, 700, 800, 900],
			'Nothing You Could Do': true,
		},
		display: 'swap',
		download: true,
	},

	postcss: {
		plugins: {
			'postcss-import': {},
			'tailwindcss/nesting': {},
			tailwindcss: {},
			autoprefixer: {},
		},
	},

	build: {
		transpile: ['v-perfect-signature'],
	},
});
