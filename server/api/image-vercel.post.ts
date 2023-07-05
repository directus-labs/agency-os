import playwright from 'playwright-aws-lambda'
import FormData from 'form-data'
import { createDirectus } from '~~/server/utils/directus-server'
import { getQuery, readBody } from 'h3'

// Aspect ratios for social media images
// OG Image: 1.91:1
// Square: 1:1
const viewportSettings = {
  'og:image': {
    width: 1200,
    height: 630,
  },
  square: {
    width: 850,
    height: 850,
  },
}

interface ImagePostBody {
  id: string
  collection: string
  seo: string
  slug: string
  url: string
  imageSize?: 'og' | 'square'
}

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    const $directus = createDirectus(config)

    const body: ImagePostBody = await readBody(event)
    const { id, collection, seo, slug, url, imageSize } = body

    const browser = await playwright.launchChromium({
      headless: true,
    })
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto(url)

    await page.waitForSelector('body')

    const screenshot = await page.screenshot({
      type: 'jpeg',
      quality: 100,
      clip: {
        x: 0,
        y: 0,
        ...viewportSettings['og:image'],
      },
    })

    await browser.close()

    const timestamp = new Date().toISOString()
    const form = new FormData()
    form.append(
      'file',
      screenshot,
      `${collection}-${slug ?? id}-${timestamp}.jpg`
    )

    const fileId = await $directus.files.createOne(form)

    if (!fileId) {
      throw new Error('File not created')
    }

    if (seo) {
      await $directus.items('seo').updateOne(seo, {
        og_image: fileId,
      })
    }

    return {
      statusCode: 200,
      fileId: fileId,
    }
  } catch (error) {
    console.error(error)
    return error
  }
})
