<script setup lang="ts">
const { $directus } = useNuxtApp()
const { params, path } = useRoute()

type Page = {
  id: string
  title: string
  slug: string
  image: string
  blocks: Block[]
}
interface Block {
  id: string
  collection: string
  item: Object
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

// Set the page title and meta tags using the Nuxt useSeoMeta composable

useHead({
  title: page.value.seo.title || page.value.title,
})
useServerSeoMeta({
  title: () => page.value.seo.title || page.value.title,
  description: () => page.value.seo.meta_description,
  ogTitle: () => page.value.seo.title,
  ogDescription: () => page.value.seo.meta_description,
  ogType: 'website',
  ogUrl: () => page.value.seo.og_url,
  ogLocale: () => page.value.seo.og_locale || 'en_US',
  ogImage: () => fileUrl(page.value.og_image),
  twitterCard: () => fileUrl(page.value.twitter_image),
})
</script>
<template>
  <PageBuilder :page="page" />
</template>
