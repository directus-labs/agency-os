<script setup lang="ts">
import { Page } from '~~/types'

const { $directus } = useNuxtApp()
const { params, path } = useRoute()

function getSlug() {
  console.log(path)
  if (path == '/') {
    return 'home'
  } else return params.slug[0]
}
console.log(getSlug())

// Fetch the page data from the Directus API using the Nuxt useAsyncData composable
// https://v3.nuxtjs.org/docs/usage/data-fetching#useasyncdata
const {
  data: page,
  pending,
  error,
} = await useAsyncData(
  path,
  () => {
    return $directus.items('pages').readByQuery({
      filter: {
        slug: { _eq: getSlug() },
      },
      fields: [
        '*',
        'seo.*',
        'blocks.collection',
        'blocks.item.*',
        'blocks.item.testimonials.testimonial.*',
        'blocks.item.logos.file.*',
        'blocks.item.form.*',
        'blocks.item.steps.*',
        'blocks.item.gallery_items.directus_files_id.*',
        'blocks.item.*',
        'blocks.item.rows.*',
        'blocks.item.posts.posts_id.*',
      ],
      limit: 1,
    })
  },
  {
    transform: (data: object) => data.data[0],
    pick: ['title', 'blocks', 'slug', 'id', 'seo'],
  }
)

// useHead({
//   title: () => (page.value.seo ? page.value.seo.title : page.value.title),
// })
// onMounted(() => useAnimation())
</script>
<template>
  <PageBuilder :page="page" />
</template>
