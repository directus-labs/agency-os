import satori from 'satori'
// Use the node fs module to read the font file.
import fs from 'fs'
import { promisify } from 'util'

export default defineEventHandler(async (event) => {
  //   const query = useQuery(event)
  //   const font = await loadFont('Roboto')

  const name = 'Roboto'
  const weight = 400

  const css = await $fetch(
    `https://fonts.googleapis.com/css2?family=${name}:wght@${weight}`,
    {
      headers: {
        // Make sure it returns TTF.
        'User-Agent':
          'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    }
  )

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (!resource) return
  //   return resource[1]

  //   const response = await $fetch(resource[1], {
  //     method: 'GET',
  //     responseType: 'arraybuffer',
  //   })

  // return response

  // Use the node fs module to read the font file.
  const readFile = promisify(fs.readFile)
  const font = await readFile('./public/fonts/roboto.ttf')

  const image = await satori(
    {
      type: 'div',
      props: {
        children: [
          {
            type: 'div',

            props: {
              children: 'Hello World',
            },
          },
        ],
        style: {
          display: 'flex',
          background: '#CC0100',
        },
      },
    },
    {
      width: 600,
      height: 400,
      fonts: [
        {
          name: 'Roboto',
          data: font,
          weight: 400,
          style: 'normal',
        },
      ],
    }
  )
  return image
})
