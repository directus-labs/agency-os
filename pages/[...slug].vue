<script setup lang="ts">
const { $directus } = useNuxtApp()
const { params, path } = useRoute()

function getSlug() {
  if (path == '/') {
    return 'home'
  } else return params.slug[0]
}

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
</script>
<template>
  <PageBuilder :page="page" />
</template>
