<script setup lang="ts">
definePageMeta({
  layout: 'blank',
})
// Import the $directus plugin
const { $directus } = useNuxtApp()
const { fileUrl } = useFiles()

// Get the params from the Nuxt route
const { params, path, query } = useRoute()

// Fetch the page data from the Directus API using the Nuxt useAsyncData composable
// https://v3.nuxtjs.org/docs/usage/data-fetching#useasyncdata
const {
  data: page,
  pending,
  error,
} = await useAsyncData(
  path,
  () => {
    return $directus.items('posts').readByQuery({
      filter: {
        slug: { _eq: params.slug },
      },
      limit: 1,
      fields: [
        '*',
        'author.*',
        'category.title',
        'category.slug',
        'category.color',
      ],
    })
  },
  {
    transform: (data) => data.data[0],
    pick: [
      'title',
      'content',
      'image',
      'author',
      'category',
      'summary',
      'date_published',
    ],
  }
)

const type = query.type ?? 'og'
</script>
<template>
  <ImageOg
    v-if="type === 'og'"
    :image-url="fileUrl(page.image)"
    :title="page.title"
    :summary="page.summary"
    :author-name="
      page.author ? `${page.author.first_name} ${page.author.last_name}` : ''
    "
    :author-image="page.author ? fileUrl(page.author.avatar) : ''"
    :read-time="calculateReadTime(page.content)"
    :badge-label="page.category.title"
    :badge-color="page.category.color"
  />
  <ImageSquare
    v-else
    :image-url="fileUrl(page.image)"
    :title="page.title"
    :summary="page.summary"
    :author-name="
      page.author ? `${page.author.first_name} ${page.author.last_name}` : ''
    "
    :author-image="page.author ? fileUrl(page.author.avatar) : ''"
    :read-time="calculateReadTime(page.content)"
    :badge-label="page.category.title"
    :badge-color="page.category.color"
  />
</template>
