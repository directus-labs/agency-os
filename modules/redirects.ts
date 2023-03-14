import { defineNuxtModule, extendRouteRules } from '@nuxt/kit'

async function fetchRedirects(url: string) {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('Failed to fetch redirects')
    const { data: redirects } = await response.json()

    return redirects
  } catch (error) {
    console.error(error)
    return []
  }
}

export default defineNuxtModule({
  async setup(moduleOptions, nuxt) {
    const baseUrl = nuxt.options.runtimeConfig.public.directusUrl
    if (!baseUrl) throw new Error('Missing directusUrl in runtimeConfig')

    const redirects = await fetchRedirects(`${baseUrl}/items/redirects`)
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
