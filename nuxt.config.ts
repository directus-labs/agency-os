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
		'@nuxt/image',
		'@nuxt/ui', // https://ui.nuxt.com
		'@nuxtjs/color-mode', // https://color-mode.nuxtjs.org
		'@nuxtjs/google-fonts', // https://google-fonts.nuxtjs.org
		'@nuxtjs/seo', // https://nuxtseo.com
		'@formkit/auto-animate/nuxt',
		'@vueuse/motion/nuxt', // https://motion.vueuse.org/nuxt.html
		'@vueuse/nuxt', // https://vueuse.org/
		'@nuxt/icon', // https://github.com/nuxt-modules/icon
	],

	experimental: {
		componentIslands: true,
		asyncContext: true, // https://nuxt.com/docs/guide/going-further/experimental-features#asynccontext
	},

	runtimeConfig: {
		public: {
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
		},
	},

	// Directus Configuration
	directus: {
		rest: {
			baseUrl: process.env.DIRECTUS_URL || 'http://localhost:8055',
			nuxtBaseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
		},
		auth: {
			enabled: true,
			enableGlobalAuthMiddleware: false, // Enable auth middleware on every page
			userFields: ['*', { contacts: ['*'] }], // Select user fields
			redirect: {
				login: '/auth/signin', // Path to redirect when login is required
				logout: '/', // Path to redirect after logout
				home: '/portal', // Path to redirect after successful login
				resetPassword: '/auth/reset-password', // Path to redirect for password reset
				callback: '/auth/callback', // Path to redirect after login with provider
			},
		},
	},

	// Nuxt DevTools - https://devtools.nuxtjs.org/
	devtools: { enabled: true },

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
		url: process.env.SITE_URL || 'http://localhost:3000',
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

	compatibilityDate: '2024-07-28',
});
