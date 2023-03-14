import { defineNuxtModule, extendRouteRules } from '@nuxt/kit'
import { Directus } from '@directus/sdk'

interface Redirect {
  url_old: string
  url_new: string
  response_code: string | number
}

export default defineNuxtModule({
  async setup(moduleOptions, nuxt) {
    const directusUrl = nuxt.options.runtimeConfig.public.directusUrl
    if (!directusUrl) throw new Error('Missing directusUrl in runtimeConfig')

    const directus = new Directus(directusUrl, {
      // auth: {
      //   staticToken: directusToken,
      // },
    })

    const { data: redirects }: Array<Redirect> = await directus
      .items('redirects')
      .readByQuery()

    for (const redirect of redirects) {
      // If the response code is not an integer, convert it to an integer
      // If the response code is not a valid HTTP status code, set it to 301
      if (isNaN(parseInt(redirect.response_code))) {
        redirect.response_code = 301
      } else if (
        parseInt(redirect.response_code) < 300 ||
        parseInt(redirect.response_code) > 308
      ) {
        redirect.response_code = 301
      }
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
