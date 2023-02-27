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
  data: projects,
  pending,
  error,
} = await useAsyncData(
  path,
  () => {
    return $directus.items('projects').readByQuery({
      filter: {
        // status: { _eq: 'published' },
      },

      fields: [],
    })
  },
  {
    transform: (data) => data.data,
    // pick: [],
  }
)

function isEven(n: number) {
  return n % 2 == 0
}

useHead({
  title: 'Projects',
})
</script>
<template>
  <PageContainer>
    <header class="pb-6 border-b-2 border-gray-300 dark:border-gray-700">
      <TypographyTitle>Agency Projects</TypographyTitle>
      <TypographyHeadline
        content="<p>We kill it for you <em>(our clients)</em>.</p>"
      />
    </header>
    <section class="relative items-center w-full py-12 space-y-12">
      <TypographyTitle>Latest Projects</TypographyTitle>
      <div class="gap-8 md:columns-3">
        <NuxtLink
          v-for="project in projects"
          :key="project.id"
          :href="`/projects/${project.slug}`"
          class="block relative w-full aspect-square mb-6 overflow-hidden rounded-tr-3xl rounded-bl-3xl group"
        >
          <img
            :src="fileUrl(project.image)"
            class="w-full object-cover group-hover:scale-110 transition duration-200"
          />
          <div
            class="absolute inset-0 opacity-0 hover:opacity-100 flex justify-center items-center"
          >
            <div class="bg-accent bg-opacity-50">
              <TypographyTitle>{{ project.title }}</TypographyTitle>
              <TypographyHeadline :content="project.summary" />
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>
  </PageContainer>
</template>
