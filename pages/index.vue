<script setup lang="ts">
// Map the page builder collection names to the components
// https://nuxt.com/docs/guide/directory-structure/components#dynamic-components
const map = {
  block_hero: resolveComponent('BlocksHero'),
  block_faqs: resolveComponent('BlocksFaqs'),
  block_richtext: resolveComponent('BlocksRichText'),
  block_testimonials: resolveComponent('BlocksTestimonials'),
  block_quote: resolveComponent('BlocksQuote'),
  block_cta: resolveComponent('BlocksCta'),
  block_form: resolveComponent('BlocksForm'),
  block_logocloud: resolveComponent('BlocksLogoCloud'),
  block_team: resolveComponent('BlocksTeam'),
  block_html: resolveComponent('BlocksRawHtml'),
  block_video: resolveComponent('BlocksVideo'),
  block_gallery: resolveComponent('BlocksGallery'),
  block_steps: resolveComponent('BlocksSteps'),
  block_columns: resolveComponent('BlocksColumns'),
  block_cardgroup: resolveComponent('BlocksCardGroup'),
}

type Page = {
  id: string
  title: string
  slug: string
  image: string
  blocks: Array<{
    id: string
    collection: string
    item: Object
  }>
}

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
  <div class="mx-auto" id="content">
    <template v-for="(block, blockIdx) in page.blocks" :key="blockIdx">
      <component :is="map[block.collection]" :data="block.item" />
    </template>
  </div>
</template>

<style>
.grain-bg {
  background-image: url('~~/assets/img/noise.png');
  /* content: ' '; */
  /* display: block; */
  /* position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%; */
  /* opacity: 0.3; */
  /* background-position: 50% 0; */
  /* background-attachment: fixed; */
}
</style>
