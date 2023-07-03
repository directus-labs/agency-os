import { getQuery } from 'h3'
import { createDirectus } from '~~/server/utils/directus-server'

function mapEntity({
  entity,
  type,
  urlPattern,
  description = '',
  image = '',
}: {
  entity: any
  type: string
  urlPattern: string
  description?: string
  image?: string
}) {
  return {
    type,
    title: entity.title,
    description,
    image,
    url: urlPattern.replace(':slug', entity.slug),
  }
}

function mapResults(collection: string, results: any[]) {
  const mapping = {
    posts: (post: any) =>
      mapEntity({
        entity: post,
        type: 'post',
        urlPattern: '/posts/:slug',
        description: post.summary,
        image: post.image,
      }),
    projects: (project: any) =>
      mapEntity({
        entity: project,
        type: 'project',
        urlPattern: '/projects/:slug',
        description: project.summary,
        image: project.image,
      }),
    pages: (page: any) =>
      mapEntity({
        entity: page,
        type: 'page',
        urlPattern: '/:slug',
      }),
    categories: (category: any) =>
      mapEntity({
        entity: category,
        type: 'category',
        urlPattern: '/posts/categories/:slug',
      }),
    help_articles: (article: any) =>
      mapEntity({
        entity: article,
        type: 'article',
        urlPattern: '/help/articles/:slug',
        description: '',
        image: '',
      }),
  }

  return results.map(mapping[collection])
}

export default cachedEventHandler(
  async (event) => {
    try {
      const config = useRuntimeConfig()
      const $directus = createDirectus(config)

      const query = getQuery(event)

      let { collections, search, raw } = query

      if (typeof collections === 'string') {
        collections = [collections]
      }

      if (
        !collections ||
        collections.every(
          (collection: string) =>
            ![
              'posts',
              'projects',
              'pages',
              'categories',
              'help_articles',
            ].includes(collection)
        )
      ) {
        throw new Error('Invalid or missing collections param')
      }

      const data = await Promise.all(
        collections.map(async (collection) => {
          const { data } = await $directus
            .items(collection)
            .readByQuery({ search: search ?? '' })

          if (raw) {
            return data
          } else {
            return mapResults(collection, data)
          }
        })
      )

      return {
        statusCode: 200,
        data: data.flat(),
      }
    } catch (error) {
      console.error(error)
      return error
    }
  },
  {
    swr: true,
    maxAge: 0, // 60 * 5, // Cache the results for 5 minutes
  }
)
