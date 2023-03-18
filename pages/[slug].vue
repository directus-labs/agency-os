<script setup lang="ts">
import { Page } from '~~/types'

const { $directus } = useNuxtApp()
const { params, path } = useRoute()

// Create a reactive page object
const page = ref({} as Page)

// Set the page title and meta tags using the Nuxt useHead and useSeoMeta composables. THESE HAVE TO BE CALLED BEFORE THE FIRST AWAIT IN THE SCRIPT TAG
useHead({
  title: () => (page.value.seo ? page.value.seo.title : page.value.title),
})

// Fetch the page data from the Directus API using the Nuxt useAsyncData composable
// https://v3.nuxtjs.org/docs/usage/data-fetching#useasyncdata
const { data, pending, error } = await useAsyncData(
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
    transform: (data: object) => data.data[0],
    pick: ['title', 'blocks', 'slug', 'id', 'seo'],
  }
)

// Set the page data
page.value = data.value

defineOgImageStatic({ component: 'OgImage', title: page.value.title })

onMounted(() => useAnimation())
</script>
<template>
  <PageBuilder :page="page" />
</template>
