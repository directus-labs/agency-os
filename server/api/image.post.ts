import chrome from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'
import FormData from 'form-data'
import { readBody } from 'h3'
import { createDirectus } from '~~/server/utils/directus-server'

// Aspect ratios for social media images
// OG Image: 1.91:1
// Square: 1:1
const viewportSettings = {
  og: {
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

const exePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

async function getOptions(isDev: boolean) {
  if (isDev) {
    return {
      product: 'chrome',
      args: [],
      executablePath: exePath,
      headless: true,
    }
  }
  return {
    product: 'chrome',
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  }
}

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    const $directus = createDirectus(config)

    const body: ImagePostBody = await readBody(event)
    const { id, collection, seo, slug, url, imageSize } = body

    const options = await getOptions(
      process.env.HOST_NAME.includes('localhost')
    )
    const browser = await puppeteer.launch(options)

    const page = await browser.newPage()

    await page.goto(url)

    await page.waitForNetworkIdle()

    const screenshot = await page.screenshot({
      type: 'jpeg',
      quality: 100,
      clip: {
        x: 0,
        y: 0,
        ...viewportSettings[imageSize ?? 'og'],
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
