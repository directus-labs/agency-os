<script setup lang="ts">
import { Page } from '~~/types'
const { $directus } = useNuxtApp()
const { params, path } = useRoute()

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
        slug: { _eq: 'home' },
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
        'blocks.item.posts.posts_id.category.*',
        'blocks.item.cards.*',
      ],
      limit: 1,
    })
  },
  {
    transform: (data) => data.data[0],
    pick: ['title', 'blocks', 'slug', 'id', 'seo'],
  }
)

const { fileUrl } = useFiles()

onMounted(() => useAnimation())

// Set the page title and meta tags using the Nuxt useHead and useSeoMeta composables
const pageData = unref(page)
useHead({
  title: () => pageData.seo.title || pageData.title,
})
useServerSeoMeta({
  title: () => pageData.seo.title || pageData.title,
  description: () => pageData.seo.meta_description,
  ogTitle: () => pageData.seo.title,
  ogDescription: () => pageData.seo.meta_description,
  ogType: 'website',
  ogUrl: () => pageData.seo.og_url,
  ogLocale: () => pageData.seo.og_locale || 'en_US',
  //   ogImage: () => fileUrl(pageData.seo.og_image ) ,
  //   twitterCard: () => fileUrl(pageData.seo.twitter_image),
})
</script>
<template>
  <PageBuilder :page="page" />
</template>
