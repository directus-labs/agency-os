import { defineNuxtModule, extendRouteRules, useLogger } from '@nuxt/kit'
import { Directus } from '@directus/sdk'
import { DirectusCollections } from '~/types'

const log = useLogger()

export default defineNuxtModule({
  async setup(moduleOptions, nuxt) {
    log.start('Loading Directus Module')

    const directusUrl = nuxt.options.runtimeConfig.public.directusUrl
    const directusToken = nuxt.options.runtimeConfig.directusToken

    if (!directusUrl) {
      throw new Error('Missing directusUrl in runtimeConfig')
    }

    if (!directusToken) {
      throw new Error('Missing directusToken in runtimeConfig')
    }

    const directus = new Directus<DirectusCollections>(directusUrl, {
      auth: {
        staticToken: directusToken,
      },
    })

    // ** Handle Redirects **
    const { data: redirects } = await directus.items('redirects').readByQuery()

    if (!redirects) {
      return
    }

    for (const redirect of redirects) {
      redirect.response_code = parseInt(redirect.response_code)

      if (redirect.response_code !== 301 || redirect.response_code !== 302) {
        redirect.response_code = 301
      }
      extendRouteRules(redirect.url_old, {
        redirect: {
          to: redirect.url_new,
          statusCode: redirect.response_code,
        },
      })
    }

    log.success(`${redirects.length} Redirects loaded`)
    for (const redirect of redirects) {
      console.log(
        `  • ${redirect.response_code}`,
        `From: ${redirect.url_old}`,
        `To: ${redirect.url_new}`
      )
    }

    // ** Add Globals **
    const { data: globals } = await directus.items('globals').readByQuery({})

    // Add the globals to the runtime config – overwriting any existing values
    nuxt.options.runtimeConfig.public = {
      ...nuxt.options.runtimeConfig.public,
      ...globals,
    }

    log.success('Globals loaded into runtimeConfig')

    // Add title template to the app head for use with useHead composable
    nuxt.options.app.head.titleTemplate = `%s - ${
      globals?.title ?? 'Agency OS'
    }`
  },
})
