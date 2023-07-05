<script setup lang="ts">
import { Page } from '~~/types'

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

defineProps<{
  page: Page
}>()
</script>
<template>
  <div class="mx-auto" id="content">
    <template v-for="block in page.blocks" :key="block.id">
      <component :is="map[block.collection]" :data="block.item" />
    </template>
  </div>
</template>
