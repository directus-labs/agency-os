// import { formatFonts } from './utils/fonts';
import { theme } from './theme';

export default defineNuxtConfig({
	// https://nuxt.com/docs/api/configuration/nuxt-config

	routeRules: {
		// '/**': {
		// 	prerender: true,
		// },
	},

	extends: [
		'./layers/proposals', // Proposals module
		'./layers/portal', // Client portal module
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
		'@nuxt/image',
		'@nuxt/ui',
		'@nuxtjs/color-mode',
		'@nuxtjs/google-fonts',
		'@vueuse/motion/nuxt', // https://motion.vueuse.org/nuxt.html
		'@vueuse/nuxt', // https://vueuse.org/
		'nuxt-icon', // https://github.com/nuxt-modules/icon
		'nuxt-og-image',
		'nuxt-schema-org', // https://nuxtseo.com/schema-org/guides/quick-setup
		'nuxt-simple-sitemap', // https://nuxtseo.com/sitemap/getting-started/how-it-works
	],

      baseUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
      i18n: {
        baseUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
      },

      token: process.env.DIRECTUS_SERVER_TOKEN || "",

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

	site: {
		url: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
		name: 'AgencyOS',
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

	// Sitemap Configuration - https://nuxtseo.com/sitemap/getting-started/how-it-works
	sitemap: {
		sitemaps: {
			pages: {
				exclude: ['/posts/**', '/help/**'],
			},
			posts: {
				include: ['/posts/**'],
			},
			help: {
				include: ['/help/**'],
			},
		},
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
