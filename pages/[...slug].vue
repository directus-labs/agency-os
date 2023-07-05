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

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}
</script>
<template>
  <NuxtErrorBoundary>
    <!-- Render the page using the PageBuilder component -->
    <PageBuilder :page="page" />

    <!-- If there is an error, display it using the VAlert component -->
    <template #error="{ error }">
      <BlockContainer>
        <VAlert type="error">{{ error }}</VAlert>
      </BlockContainer>
    </template>
  </NuxtErrorBoundary>
</template>
