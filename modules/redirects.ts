import { defineNuxtModule, extendRouteRules } from '@nuxt/kit'
import { Directus } from '@directus/sdk'
import { DirectusCollections } from '~/types'

export default defineNuxtModule({
  async setup(moduleOptions, nuxt) {
    const directusUrl = nuxt.options.runtimeConfig.public.directusUrl
    const directusToken = nuxt.options.runtimeConfig.directusToken
    if (!directusUrl) throw new Error('Missing directusUrl in runtimeConfig')
    if (!directusToken)
      throw new Error('Missing directusToken in runtimeConfig')

    const directus = new Directus<DirectusCollections>(directusUrl, {
      auth: {
        staticToken: directusToken,
      },
    })

    const { data: redirects } = await directus.items('redirects').readByQuery()

    if (!redirects) return

    for (const redirect of redirects) {
      // Ensure redirect code is an integer
      redirect.response_code = parseInt(redirect.response_code)

      // If the response code is not either 301 or 302, set it to 301
      if (redirect.response_code !== 301 || redirect.response_code !== 302) {
        redirect.response_code = 301
      }

      // Add the redirect to the route rules
      // https://nuxt.com/docs/guide/concepts/rendering#route-rules
      extendRouteRules(redirect.url_old, {
        redirect: {
          to: redirect.url_new,
          statusCode: redirect.response_code,
        },
      })
    }

    // Log the redirects to the console
    console.log(`${redirects.length} redirects loaded`)
    for (const redirect of redirects) {
      console.log(
        `${redirect.response_code} - From: ${redirect.url_old} To:${redirect.url_new}`
      )
    }
  },
})
