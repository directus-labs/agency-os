<script setup lang="ts">
// Import the $directus plugin
const { $directus } = useNuxtApp()

// Get the params from the Nuxt route
const { params, path } = useRoute()

// Fetch the page data from the Directus API using the Nuxt useAsyncData composable
// https://v3.nuxtjs.org/docs/usage/data-fetching#useasyncdata
const {
  data: posts,
  pending,
  error,
} = await useAsyncData(
  path,
  () => {
    return $directus.items('posts').readByQuery({
      filter: {
        // status: { _eq: 'published' },
      },
      sort: ['date_published'],

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
    transform: (data) => data.data,
  }
)

useHead({
  title: 'Posts',
})
</script>
<template>
  <PageContainer>
    <header class="pb-6 border-b border-gray-300 dark:border-gray-700">
      <TypographyTitle>Agency Blog</TypographyTitle>
      <TypographyHeadline
        content="<p>Articles on <em>development</em>, marketing, and more.</p>"
      />
    </header>
    <section class="relative w-full py-12 space-y-12">
      <div
        class="relative grid w-full gap-12 pb-12 border-b-2 border-gray-300 md:grid-cols-2 lg:grid-cols-4 dark:border-gray-700"
      >
        <div>
          <TypographyTitle class="text-gray-700 dark:text-gray-400">
            Search
          </TypographyTitle>
          <GlobalSearch :collections="['posts']" class="flex" />
          <TypographyTitle class="mt-8 text-gray-700 dark:text-gray-400">
            Categories
          </TypographyTitle>
          <Categories class="" />
        </div>
        <div class="space-y-4 lg:col-span-3">
          <TypographyTitle>Featured Article</TypographyTitle>
          <FeaturePostCard :post="posts[0]" />
        </div>
      </div>
      <div class="space-y-4">
        <TypographyTitle>Latest & Greatest</TypographyTitle>
        <div class="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <PostCard
            v-for="(post, postIdx) in posts"
            :key="post.id"
            :post="post"
            :even="isEven(postIdx)"
            :class="[
              'border-b border-gray-300 pb-6 dark:border-gray-700',
              // Make the first two posts span two columns
              postIdx < 2 ? 'md:col-span-2' : 'md:col-span-1',
            ]"
          />
        </div>
      </div>
    </section>
  </PageContainer>
</template>
