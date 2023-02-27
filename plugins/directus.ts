import { BaseStorage, Directus } from '@directus/sdk'
import { useAuth } from '~~/store/auth'

// Make sure you review the Directus SDK documentation for more information
// https://docs.directus.io/reference/sdk.html

export default defineNuxtPlugin(async (nuxtApp) => {
  const { directusUrl, directusToken } = useRuntimeConfig()

  // Create a new storage class to use with the SDK
  // Needed for the SSR to play nice with the SDK
  class CookieStorage extends BaseStorage {
    deletedKeys = new Set<string>()
    get(key: string) {
      if (this.deletedKeys.has(key)) return null
      const cookie = useCookie(key)
      return cookie.value
    }
    set(key: string, value: string) {
      this.deletedKeys.delete(key)
      const cookie = useCookie(key)
      return (cookie.value = value)
    }
    delete(key: string) {
      this.deletedKeys.add(key)
      const cookie = useCookie(key)
      return (cookie.value = null)
    }
  }

  // Create a new instance of the SDK
  const directus = new Directus(directusUrl, {
    // storage: new CookieStorage(),
    auth: {
      //   mode: 'json',
      staticToken: directusToken,
    },
  })

  // Inject the SDK into the Nuxt app
  nuxtApp.provide('directus', directus)

  // We're calling the useAuth composable here because we need to define Directus as a plugin first
  //   const auth = useAuth()

  //   const token = await directus.auth.token
  //   const side = process.server ? 'server' : 'client'

  //   // If there's a token but we don't have a user, fetch the user
  //   if (!auth.isLoggedIn && token) {
  //     console.log('Token found, fetching user from ' + side)
  //     console.log('Token is', token)
  //     try {
  //       await auth.getUser()
  //       console.log('User fetched succeessfully from ' + side)
  //     } catch (e) {
  //       console.log('Failed to fetch user from ' + side, e.message)
  //     }
  //   }

  //   // If the user is logged in but there's no token, reset the auth store {
  //   if (auth.isLoggedIn && !token) {
  //     console.log('Token not found, resetting auth store from ' + side)
  //     auth.$reset()
  //   }
})
