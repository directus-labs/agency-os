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
      extendRouteRules(redirect.url_old, {
        redirect: {
          to: redirect.url_new,
          statusCode: parseInt(redirect.response_code),
        },
      })
    }
    console.log('Redirects loaded:', redirects.length)
  },
})
