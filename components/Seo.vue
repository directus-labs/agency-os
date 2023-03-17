<script setup lang="ts">
const props = defineProps<{
  page: Page
}>()
useHead({
  title: () => (props.page.seo ? props.page.seo.title : props.page.title),
})

useSeoMeta({
  //   title: () => props.page.seo.title || props.page.title,
  description: props.page.seo.meta_description,
  //   ogTitle: () => props.page.seo.title,
  //   ogDescription: () => props.page.seo.meta_description,
  //   ogType: 'website',
  //   ogUrl: () => props.page.seo.og_url,
  //   ogLocale: () => props.page.seo.og_locale || 'en_US',
  //   ogImage: () => fileUrl(props.page.seo.og_image ) ,
  //   twitterCard: () => fileUrl(props.page.seo.twitter_image),
})
</script>
<template>
  <div></div>
</template>
