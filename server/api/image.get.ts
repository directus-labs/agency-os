import { Directus } from '@directus/sdk'
import playwright from 'playwright-aws-lambda'
import FormData from 'form-data'
import { getQuery } from 'h3'

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
  try {
    const { id, seo, slug } = getQuery(event)
    const config = useRuntimeConfig()

    const directusUrl = config.public.directusUrl
    const directusToken = config.directusToken

    const $directus = new Directus(directusUrl, {
      auth: {
        staticToken: directusToken,
      },
    })

    const url = `https://agency-os.vercel.app/_media/posts/${slug}`

    const browser = await playwright.launchChromium({
      headless: true,
    })
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto(url)

    // Wait for the page to load
    await page.waitForSelector('body')

    // Take a screenshot of the page
    const screenshot = await page.screenshot({
      type: 'jpeg',
      quality: 100,
      clip: {
        x: 0,
        y: 0,
        ...viewportSettings['og:image'],
      },
    })

    // Close the browser instance
    await browser.close()

    // Get timestamp for filename
    const timestamp = new Date().toISOString()
    const form = new FormData()
    form.append('file', screenshot, `posts-${slug}-${timestamp}.jpg`)

    // Upload the screenshot to Directus
    const fileId = await $directus.files.createOne(form)

    // Update the post.seo with the screenshot
    await $directus.items('seo').updateOne(seo, {
      og_image: fileId,
    })

    return {
      statusCode: 200,
      fileId: fileId,
    }
  } catch (error) {
    console.error(error)
    return error
  }
})
