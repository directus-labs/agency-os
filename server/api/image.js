import playwright from 'playwright-aws-lambda'

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
  const url =
    'https://agency-os.vercel.app/_media/posts/how-to-become-a-very-productive-rabbit'

  //   const browser = await puppeteer.launch({
  //     headless: true,
  //   })

  //   const browser = await cpuppeteer.launch({
  //     executablePath: process.env.HOST_NAME.includes('localhost')
  //       ? null
  //       : await chromium.executablePath,
  //     args: chromium.args,
  //     defaultViewport: {
  //       ...viewportSettings['type'],
  //     },
  //     headless: chromium.headless,
  //   })
  const browser = await playwright.launchChromium({
    headless: true,
  })
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto(url)
  const screenshot = await page.screenshot({
    type: 'jpeg',
    // netlify functions can only return strings, so base64 it is
    // encoding: 'base64',
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

  // Create a buffer from the screenshot
  //   const buffer = Buffer.from(screenshot, 'base64')
  //   // Write the buffer to a file
  //   await fs.writeFileSync('./public/social-images/screenshot.jpg', buffer)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'image/jpg',
    },
    body: screenshot,
    isBase64Encoded: true,
  }
})
