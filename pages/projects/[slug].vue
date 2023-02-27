<script setup lang="ts">
import {
  ArrowLongLeftIcon,
  ClockIcon,
  CalendarIcon,
} from '@heroicons/vue/24/outline'
// Import the $directus plugin
const { $directus } = useNuxtApp()
const { fileUrl } = useFiles()

// Get the params from the Nuxt route
const { params, path } = useRoute()

// Fetch the page data from the Directus API using the Nuxt useAsyncData composable
// https://v3.nuxtjs.org/docs/usage/data-fetching#useasyncdata
const {
  data: project,
  pending,
  error,
} = await useAsyncData(
  path,
  () => {
    return $directus.items('projects').readByQuery({
      filter: { slug: { _eq: params.slug } },
      limit: 1,
      fields: ['*'],
    })
  },
  {
    transform: (data) => data.data[0],
  }
)

// useHead({
//   title: project.value.title,
// })
</script>
<template>
  <PageContainer>
    <pre>
    {{ project }}
   </pre
    >
  </PageContainer>
</template>
