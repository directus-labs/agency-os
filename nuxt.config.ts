// import { formatFonts } from './utils/fonts';
import { theme } from './theme';

// const fontFamilies = {
// 	Inter: true,
// 	'Fira Code': true,
// 	Poppins: [400, 500, 600, 700, 800, 900],
// 	'Nothing You Could Do': true,
// };

export default defineNuxtConfig({
	// https://nuxt.com/docs/api/configuration/nuxt-config

	extends: [
		'./layers/portal', // Client portal module
		'./layers/proposals', // Proposals module
	],

	components: [
		// Disable prefixing base components with `Base`
		{ path: '~/components/base', pathPrefix: false },
		// Auto import components from `~/components`
		'~/components',
	],

	css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],

	modules: [
		// '@formkit/nuxt', // https://formkit.com/getting-started/installation#with-nuxt
		'@nuxt/devtools', // https://devtools.nuxtjs.org/
		'@nuxt/image',
		'@nuxt/ui',
		'@nuxtjs/color-mode',
		'@nuxtjs/color-mode',
		'@nuxtjs/google-fonts',
		'@vueuse/motion/nuxt', // https://motion.vueuse.org/nuxt.html
		'@vueuse/nuxt', // https://vueuse.org/
		'nuxt-icon', // https://github.com/nuxt-modules/icon
		'nuxt-og-image',
		'nuxt-schema-org', // https://nuxtseo.com/schema-org/guides/quick-setup
		'nuxt-simple-sitemap', // https://nuxtseo.com/sitemap/getting-started/how-it-works
		// '@nuxtjs/tailwindcss', // https://tailwindcss.nuxtjs.org/ Removed because of Nuxt UI
	],

	experimental: {
		componentIslands: true,
	},

	runtimeConfig: {
		public: {
			directusUrl: process.env.DIRECTUS_URL,
			directusWsUrl: process.env.DIRECTUS_WS_URL,
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
			directusToken: process.env.DIRECTUS_ADMIN_TOKEN,
		},
		directusToken: process.env.DIRECTUS_ADMIN_TOKEN,
	},

	// Nuxt DevTools - https://devtools.nuxtjs.org/
	devtools: { enabled: true },

	ui: {
		icons: 'all',
	},

	// Color Mode Configuration - https://color-mode.nuxtjs.org/
	colorMode: {
		classSuffix: '', // This is so we play nice with TailwindCSS
	},

	// Image Configuration - https://image.nuxt.com/providers/directus
	image: {
		provider: 'directus',
		directus: {
			baseURL: `${process.env.DIRECTUS_URL}/assets/`,
		},
	},

	// Google Fonts Configuration - https://google-fonts.nuxtjs.org/
	googleFonts: {
		families: theme.googleFonts,
		display: 'swap',
		download: true,
	},

	// OG Image Configuration - https://nuxtseo.com/og-image/getting-started/installation
	ogImage: {
		defaults: {
			component: 'OgImageTemplate',
			width: 1200,
			height: 630,
		},
		// @TODO: Fix font families for OG Image
		// fonts: formatFonts(fontFamilies),
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
