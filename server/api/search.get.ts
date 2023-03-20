import { getQuery } from 'h3'
import { createDirectus } from '~~/server/utils/directus-server'

function mapPost(post: any) {
  return {
    type: 'post',
    title: post.title,
    description: post.summary,
    image: post.image,
    url: `/posts/${post.slug}`,
  }
}

function mapProject(project: any) {
  return {
    type: 'project',
    title: project.title,
    description: project.summary,
    image: project.image,
    url: `/projects/${project.slug}`,
  }
}

function mapPage(page: any) {
  return {
    type: 'page',
    title: page.title,
    description: '',
    image: '',
    url: `/${page.slug}`,
  }
}

function mapCategory(category: any) {
  return {
    type: 'category',
    title: category.title,
    description: '',
    image: '',
    url: `/posts/categories/${category.slug}`,
  }
}

function mapResults(collection: string, results: any[]) {
  switch (collection) {
    case 'posts':
      return results.map(mapPost)
    case 'projects':
      return results.map(mapProject)
    case 'pages':
      return results.map(mapPage)
    case 'categories':
      return results.map(mapCategory)

    default:
      return []
  }
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

      // Validations
      // If missing collections param, throw an error
      if (!collections) {
        throw new Error('Missing collections param')
      }

      // If collections doesn't match one of these values, throw an error
      if (
        collections.every(
          (collection: string) =>
            !['posts', 'projects', 'pages', 'categories'].includes(collection)
        )
      ) {
        throw new Error('Invalid collection')
      }

      // For each collection, create a promise to fetch the data
      const promises = collections.map(async (collection) => {
        const { data } = await $directus.items(collection).readByQuery({
          search: search ?? '',
        })

        // If the raw param is passed in, return the raw data instead of transformed results
        if (raw) {
          return data
        } else {
          return mapResults(collection, data)
        }
      })

      // Wait for all promises to resolve
      const data = await Promise.all(promises)

      // Flatten the data array
      const flattenedData = data.flat()

      return {
        statusCode: 200,
        data: flattenedData,
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
