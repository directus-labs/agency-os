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
  data: page,
  pending,
  error,
} = await useAsyncData(
  path,
  () => {
    return $directus.items('posts').readByQuery({
      filter: { slug: { _eq: params.slug } },
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

useHead({
  title: page.value.title,
})
</script>
<template>
  <div>
    <article class="">
      <!--Featured Image Full Width-->
      <header class="flex">
        <div class="relative w-full max-w-3xl px-6 pt-6">
          <div
            class="relative w-full mx-auto rounded-bl-3xl overflow-hidden bg-cover h-[300px] md:h-[450px] dark:outline-gray-800"
          >
            <img
              :src="fileUrl(page.image)"
              class="w-full h-full object-cover saturate-0 dark:brightness-90"
              alt=""
            />
            <div
              class="absolute inset-0 mix-blend-multiply bg-gradient-to-b from-gray-100 to-gray-900"
            />
          </div>
        </div>
        <div class="mt-12 p-8 space-y-6">
          <NuxtLink
            v-if="page.category"
            :href="`/posts/categories/${page.category.slug}`"
            class="inline-block"
          >
            <VBadge size="lg" :color="page.category.color">{{
              page.category.title
            }}</VBadge>
          </NuxtLink>
          <VAvatar v-if="page.author" :author="page.author" />
          <div class="space-y-2">
            <p class="flex text-gray-500 font-mono dark:text-gray-300">
              <ClockIcon class="w-6 h-6 mr-2" />
              {{ calculateReadTime(page.content) }}
            </p>
            <p class="flex text-gray-500 font-mono dark:text-gray-300">
              <CalendarIcon class="w-6 h-6 mr-2" />
              {{ getRelativeTime(page.date_published) }}
            </p>
          </div>
        </div>
      </header>

      <!-- Title Container -->
      <div class="">
        <div
          class="relative max-w-4xl mx-auto -mt-32 w-full px-8 py-8 text-gray-900 bg-white rounded-br-3xl rounded-tl-3xl overflow-hidden md:px-16 md:py-12 outline outline-4 outline-accent outline-offset-8"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-white via-gray-300 to-accent dark:from-gray-700 dark:via-gray-900 dark:to-accent"
          />
          <div class="absolute inset-0 grain-bg dark:opacity-20" />
          <div class="relative">
            <div class="flex justify-between"></div>
            <h1
              class="mt-4 text-3xl font-extrabold font-serif leading-tight tracking-tight text-gray-900 sm:text-5xl dark:text-white"
            >
              {{ page.title }}
            </h1>
            <p
              class="mt-4 font-semibold font-mono md:text-lg font-display dark:text-gray-200"
            >
              {{ page.summary }}
            </p>
          </div>
        </div>
      </div>

      <PageContainer>
        <main class="w-full max-w-4xl mx-auto">
          <!-- Main -->
          <TypographyProse :content="page.content" />
        </main>
      </PageContainer>
    </article>
  </div>
</template>
