<script setup lang="ts">
// Import the $directus plugin
const { $directus } = useNuxtApp()

// Get the params from the Nuxt route
const { params, path } = useRoute()

// Fetch the page data from the Directus API using the Nuxt useAsyncData composable
// https://v3.nuxtjs.org/docs/usage/data-fetching#useasyncdata
const {
  data: categories,
  pending,
  error,
} = await useAsyncData(
  'categories',
  () => {
    return $directus.items('categories').readByQuery({
      filter: {
        // status: { _eq: 'published' },
      },

      fields: ['*'],
    })
  },
  {
    transform: (data) => data.data,
    // pick: [
    //   'title',
    //   'content',
    //   'image',
    //   'author',
    //   'category',
    //   'summary',
    //   'date_published',
    // ],
  }
)
</script>
<template>
  <div class="mt-4 space-y-2">
    <NuxtLink
      v-for="category in categories"
      :href="`/posts/categories/${category.slug}`"
      class="block font-mono dark:text-gray-200 hover:opacity-80"
    >
      <VBadge :color="category.color" size="lg" class="rounded-bl-lg">
        {{ category.title }}
      </VBadge>
    </NuxtLink>
  </div>
</template>
