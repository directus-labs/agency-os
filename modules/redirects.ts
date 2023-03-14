import { defineNuxtModule, extendRouteRules } from '@nuxt/kit'
import { Directus } from '@directus/sdk'

export default defineNuxtModule({
  async setup(moduleOptions, nuxt) {
    const directusUrl = nuxt.options.runtimeConfig.public.directusUrl
    if (!directusUrl) throw new Error('Missing directusUrl in runtimeConfig')

    const directus = new Directus(directusUrl, {
      // auth: {
      //   staticToken: directusToken,
      // },
    })

    const { data: redirects } = await directus.items('redirects').readByQuery()

    for (const redirect of redirects) {
      extendRouteRules(redirect.url_old, {
        redirect: {
          to: redirect.url_new,
          statusCode: redirect.response_code,
        },
      })
    }
    console.log('Redirects loaded:', redirects.length)
  },
})
