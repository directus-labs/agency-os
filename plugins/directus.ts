import { Directus } from '@directus/sdk'
// Make sure you review the Directus SDK documentation for more information
// https://docs.directus.io/reference/sdk.html

export default defineNuxtPlugin(async (nuxtApp) => {
  const { directusUrl, directusToken } = useRuntimeConfig()

  // Create a new instance of the SDK
  const directus = new Directus(directusUrl, {
    auth: {
      staticToken: directusToken,
    },
  })

  // Inject the SDK into the Nuxt app
  // Can be accessed from anywhere in the app using $directus
  // Ex:
  // const { $directus } = useNuxtApp()
  //
  nuxtApp.provide('directus', directus)
})
