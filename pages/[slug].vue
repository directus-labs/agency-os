<script setup lang="ts">
const { $directus } = useNuxtApp()
const { params, path } = useRoute()

interface Block {
  id: string
  collection: string
  item: Object
}
type Page = {
  id: string
  title: string
  slug: string
  image: string
  blocks: Block[]
}
// Fetch the page data from the Directus API using the Nuxt useAsyncData composable
// https://v3.nuxtjs.org/docs/usage/data-fetching#useasyncdata
const {
  data: page = {} as Page,
  pending,
  error,
} = await useAsyncData(
  path,
  () => {
    return $directus.items('pages').readByQuery({
      filter: {
        slug: { _eq: params.slug },
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
      ],
      limit: 1,
    })
  },
  {
    transform: (data) => data.data[0],
    pick: ['title', 'blocks', 'slug', 'id', 'seo'],
  }
)

onMounted(() => useAnimation())
</script>
<template>
  <PageBuilder :page="page" />
</template>
