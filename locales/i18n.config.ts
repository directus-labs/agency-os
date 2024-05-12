export const i18n = {
  // baseUrl set with runtimeConfig
  legacy: false,
  lazy: true,
  defaultDirection: "ltr",
  langDir: "locales/", // Let Nuxt i18n know the root directory of our translations
  defaultLocale: "en-US", // default locale of your project for Nuxt pages and routings
  strategy: "no_prefix", // no_prefix | prefix | prefix_except_default | prefix_and_default
  compilation: {
    strictMessage: false,
    escapeHtml: true,
  },
  locales: [
    //  Consider fetching the locales array from an API
    {
      code: "en-US",
      name: "English",
      iso: "en-US",
      dir: "ltr",
      file: "i18n.translations.ts", // add file name for each locale
    },
    {
      code: "ar-SA",
      name: "العربية (Arabic)",
      iso: "ar-SA",
      dir: "rtl",
      file: "i18n.translations.ts",
    },
    {
      code: "es-MX",
      name: "Español (Mexico)",
      iso: "es-MX",
      dir: "ltr",
      file: "i18n.translations.ts",
    },
  ],
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: "i18n_redirected",
    redirectOn: "root",
  },
};
