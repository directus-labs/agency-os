import { Directus } from '@directus/sdk'
import playwright from 'playwright-aws-lambda'
import { Readable } from 'stream'
import FormData from 'form-data'
import fs from 'fs'

const captureWidth = 1200
const captureHeight = 630
// const clipY = 72

// Twitter Card: Website: 800 x 418 px
//

// Aspect ratios for social media images
// OG Image: 1.91:1
// Twitter: 1.91:1
// Square: 1:1
//

const viewportSettings = {
  'og:image': {
    width: 1200,
    height: 630,
    // deviceScaleFactor: 2,
  },
  square: {
    width: 850,
    height: 850,
    deviceScaleFactor: 2,
  },
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const directusUrl = config.public.directusUrl
  const directusToken = config.directusToken

  const $directus = new Directus(directusUrl, {
    auth: {
      staticToken: directusToken,
    },
  })

  // Get the slug from the event
  const { id, seoId } = getQuery(event)

  const url = `https://agency-os.vercel.app/_media/posts/${id}`

  const browser = await playwright.launchChromium({
    headless: true,
  })
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto(url)
  const screenshot = await page.screenshot({
    type: 'jpeg',
    quality: 100,
    defaultViewport: {
      ...viewportSettings['og:image'],
    },
    clip: {
      x: 0,
      y: 0,
      ...viewportSettings['og:image'],
    },
  })

  await browser.close()

  try {
    const form = new FormData()
    form.append('file', screenshot, 'screenshot.jpg')

    // Upload the screenshot to Directus
    const fileId = await $directus.files.createOne(form)
    console.log('fileId', fileId)

    // Update the post.seo with the screenshot
    await $directus.items('seo').updateOne(seoId, {
      og_image: fileId,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        screenshot,
      }),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error,
      }),
    }
  }
})
