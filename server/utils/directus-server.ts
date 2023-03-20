import { Directus } from '@directus/sdk'
import { RuntimeConfig } from 'nuxt/schema'

export function createDirectus(config: RuntimeConfig) {
  const directusUrl = config.public.directusUrl
  const directusToken = config.directusToken
  const $directus = new Directus(directusUrl, {
    auth: {
      staticToken: directusToken,
    },
  })
  return $directus
}
