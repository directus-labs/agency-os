import { createDirectus } from '~~/server/utils/directus-server'
import { HelpFeedback } from 'types'

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    const $directus = createDirectus(config)

    const body: HelpFeedback = await readBody(event)
    const { id, title, url, rating, visitor_id, comments } = body

    let response

    if (id) {
      response = await $directus.items('help_feedback').updateOne(id, {
        title,
        url,
        rating,
        visitor_id,
        comments,
      })
    } else {
      response = await $directus.items('help_feedback').createOne({
        title,
        url,
        rating,
        visitor_id,
        comments,
      })
    }

    return response
  } catch (error) {
    console.error(error)
    return error
  }
})
