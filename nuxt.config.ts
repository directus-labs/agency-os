import { Directus } from '@directus/sdk'

// https://nuxt.com/docs/api/configuration/nuxt-config
// Define the Nuxt 3 config asyncronously
export default async () => {
  const directus = new Directus(process.env.DIRECTUS_URL, {
    auth: {
      staticToken: process.env.DIRECTUS_TOKEN,
    },
  })

  const { data: globals } = await directus.items('globals').readByQuery({})

  return defineNuxtConfig({
    // As of RC12 Nuxt 3 supports Hybrid rendering mode
    // https://v3.nuxtjs.org/guide/concepts/rendering#route-rules
    routeRules: {
      //   '/**': { swr: true },
      //   '/api/**': { swr: false },
      // Route rules are causing some issues with the API routes on Vercel
    },

    css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],

    app: {
      head: {
        titleTemplate: `%s - ${globals.title}`,
      },
    },

    modules: [
      '@nuxt/devtools', // https://devtools.nuxtjs.org/
      'nuxt-icon', // https://github.com/nuxt-modules/icon
      '@nuxtjs/tailwindcss', // https://tailwindcss.nuxtjs.org/
      '@pinia/nuxt', // https://pinia.esm.dev
      //   '@nuxt/image-edge', // https://image.nuxtjs.org/
      '@vueuse/nuxt', // https://vueuse.org/
      '@vueuse/motion/nuxt', // https://motion.vueuse.org/nuxt.html
      '@formkit/nuxt', // https://formkit.com/getting-started/installation#with-nuxt
      '@nuxtjs/google-fonts', // https://google-fonts.nuxtjs.org/
    ],

    experimental: {
      componentIslands: true,
    },

    runtimeConfig: {
      public: {
        directusUrl: process.env.DIRECTUS_URL,
        siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        ...globals,
      },
      directusToken: process.env.DIRECTUS_ADMIN_TOKEN,
    },

    // Start Modules Configuration
    googleFonts: {
      families: {
        Inter: true,
        'Fira Code': true,
        'Playfair Display': [400, 500, 600, 700, 800, 900],
      },
      display: 'swap',
      download: true,
    },
    // End Modules Configuration

    postcss: {
      plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {},
      },
    },

    // Currently still needed for Headless UI to work
    build: {
      transpile: ['@headlessui/vue'],
    },

    vite: {
      optimizeDeps: {
        include: ['@headlessui/vue', 'vue', 'pinia'],
      },
    },
  })
}
