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
    // https://v3.nuxtjs.org/guide/directory-structure/nuxt.config/

    // As of RC12 Nuxt 3 supports Hybrid rendering mode
    // https://v3.nuxtjs.org/guide/concepts/rendering#route-rules
    routeRules: {
      '/**': { swr: true },
    },

    css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],

    // Add Google Fonts
    // https://v3.nuxtjs.org/docs/directory-structure/assets#google-fonts
    app: {
      head: {
        titleTemplate: `%s - ${globals.title}`,
        link: [
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Fira+Code&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap',
          },
        ],
      },
    },

    modules: [
      //   '@nuxtjs/eslint-module',
      'nuxt-icon',
      '@nuxtjs/tailwindcss',
      // https://pinia.esm.dev
      '@pinia/nuxt',
      // https://vueuse.org/
      '@vueuse/nuxt',
      // https://motion.vueuse.org/nuxt.html
      '@vueuse/motion/nuxt',
      '@formkit/nuxt',
    ],

    imports: {
      dirs: ['./stores'],
    },

    pinia: {
      autoImports: ['defineStore', 'acceptHMRUpdate'],
    },

    runtimeConfig: {
      public: {
        directusUrl: process.env.DIRECTUS_URL,
        ...globals,
      },
      directusToken: process.env.DIRECTUS_ADMIN_TOKEN,
    },

    postcss: {
      plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {},
      },
    },

    //   Currently still needed
    build: {
      transpile: ['@heroicons/vue', '@headlessui/vue'],
    },

    vite: {
      optimizeDeps: {
        include: ['@headlessui/vue', 'vue', 'pinia'],
      },
    },
  })
}
