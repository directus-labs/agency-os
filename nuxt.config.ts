import { formatFonts } from './utils/fonts';

const fontFamilies = {
	Inter: true,
	'Fira Code': true,
	Poppins: [400, 500, 600, 700, 800, 900],
	'Nothing You Could Do': true,
};

export default defineNuxtConfig({
	// https://nuxt.com/docs/api/configuration/nuxt-config

	routeRules: {
		//   '/**': { swr: true },
		//   '/api/**': { swr: false },
	},

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
		'@nuxt/devtools', // https://devtools.nuxtjs.org/
		'@nuxtjs/color-mode',
		'@nuxt/image',
		'nuxt-icon', // https://github.com/nuxt-modules/icon
		// '@nuxtjs/tailwindcss', // https://tailwindcss.nuxtjs.org/ Removed because of Nuxt UI
		'@vueuse/nuxt', // https://vueuse.org/
		'@vueuse/motion/nuxt', // https://motion.vueuse.org/nuxt.html
		'@formkit/nuxt', // https://formkit.com/getting-started/installation#with-nuxt
		'nuxt-og-image',
		'@nuxtjs/google-fonts',
		'nuxt-simple-sitemap', // https://nuxtseo.com/sitemap/getting-started/how-it-works
		'nuxt-schema-org', // https://nuxtseo.com/schema-org/guides/quick-setup
		// 'floating-vue/nuxt',
		'@nuxt/ui',
		'@nuxtjs/color-mode',
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
		families: fontFamilies,
		display: 'swap',
		download: true,
	},

	// OG Image Configuration - https://nuxtseo.com/og-image/getting-started/installation
	ogImage: {
		defaults: {
			component: 'ImageOg',
			width: 1200,
			height: 630,
		},
		// We're adjusting the default directory for OG image components because I don't like the standard convention 🤣
		componentDirs: ['image'],
		fonts: formatFonts(fontFamilies),
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
