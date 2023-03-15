<script setup lang="ts">
// Import the components you need to use in your page builder
import BlocksHero from '~~/components/blocks/Hero.vue'
import BlocksFaqs from '~~/components/blocks/Faqs.vue'
import BlockRichText from '~~/components/blocks/RichText.vue'
import BlockTestimonials from '~~/components/blocks/Testimonials.vue'
import BlockQuote from '~~/components/blocks/Quote.vue'
import BlockCta from '~~/components/blocks/Cta.vue'
import BlockForm from '~~/components/blocks/Form.vue'
import BlockLogoCloud from '~~/components/blocks/LogoCloud.vue'
import BlockTeam from '~~/components/blocks/Team.vue'

// Map the page builder collection names to the components
const map = {
  block_hero: BlocksHero,
  block_faqs: BlocksFaqs,
  block_richtext: BlockRichText,
  block_testimonials: BlockTestimonials,
  block_quote: BlockQuote,
  block_cta: BlockCta,
  block_form: BlockForm,
  block_logocloud: BlockLogoCloud,
  block_team: BlockTeam,
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
        slug: { _eq: params.slug },
      },
      fields: [
        '*',
        'blocks.collection',
        'blocks.item.*',
        'blocks.item.testimonials.testimonial.*',
        'blocks.item.logos.file.*',
        'blocks.item.form.*',
      ],
      limit: 1,
    })
  },
  {
    transform: (data) => data.data[0],
    pick: ['title', 'blocks', 'slug', 'id'],
  }
)

const title = 'Directus & Nuxt 3 Starter'
useHead({
  title: title,
})

onMounted(() => useAnimation())
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
