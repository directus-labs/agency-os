<script setup lang="ts">
const { $directus } = useNuxtApp()
const { params, path } = useRoute()

const {
  data: posts,
  pending,
  error,
} = await useAsyncData(
  path,
  () => {
    return $directus.items('posts').readByQuery({
      filter: {
        category: {
          slug: {
            _eq: params.category,
          },
        },
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

function isEven(n: number) {
  return n % 2 == 0
}

useHead({
  title: 'Posts',
})
</script>
<template>
  <PageContainer>
    <header class="pb-6 border-b-2 border-gray-300 dark:border-gray-700">
      <TypographyTitle>Agency Blog</TypographyTitle>
      <TypographyHeadline
        content="<p>Articles on <em>development</em>, marketing, and more.</p>"
      />
      <div></div>
    </header>
    <section class="relative items-center w-full py-12 space-y-12">
      <div
        class="relative grid gap-12 pb-12 border-b-2 border-gray-300 md:grid-cols-2 lg:grid-cols-4 dark:border-gray-700"
      >
        <div>
          <TypographyTitle as="p" class="text-gray-700 dark:text-gray-400"
            >Search</TypographyTitle
          >
          <GlobalSearch :collections="['posts']" class="flex" />
          <TypographyTitle as="p" class="mt-8 text-gray-700 dark:text-gray-400"
            >Categories</TypographyTitle
          >
          <Categories />
        </div>
        <div class="space-y-4 lg:col-span-3">
          <TypographyTitle as="p"
            >Articles for Category:
            {{ deslugify(params.category) }}</TypographyTitle
          >
          <span>{{}}</span>
          <div
            class="relative grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            <PostCard
              v-for="(post, postIdx) in posts"
              :key="post.id"
              :post="post"
              :even="isEven(postIdx)"
              :class="[
                'border-b border-gray-300 pb-6 dark:border-gray-700 col-span-2',
                // Make the first two posts span two columns
              ]"
            />
          </div>
        </div>
      </div>
    </section>
  </PageContainer>
</template>
