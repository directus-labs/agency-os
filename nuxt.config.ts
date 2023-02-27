// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://v3.nuxtjs.org/guide/directory-structure/nuxt.config/

  // As of RC12 Nuxt 3 supports Hybrid rendering mode
  // https://v3.nuxtjs.org/guide/concepts/rendering#route-rules
  //   routeRules: {
  //     '/pages/**': { swr: true },
  //     '/posts/**': { static: true },
  //   },

  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],

  // Add Google Fonts
  // https://v3.nuxtjs.org/docs/directory-structure/assets#google-fonts
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fira+Code&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap',
        },
      ],
    },
  },

  modules: [
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
  //   build: {
  //     transpile: ['@heroicons/vue', '@headlessui/vue'],
  //   },

  //   vite: {
  //     optimizeDeps: {
  //       include: [
  //         '@heroicons/vue/20/solid',
  //         '@heroicons/vue/24/solid',
  //         '@heroicons/vue/24/outline',
  //         '@headlessui/vue',
  //         'vue',
  //         'pinia',
  //       ],
  //     },
  //   },
})
