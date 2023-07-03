<script setup lang="ts">
const { $directus } = useNuxtApp()
const { fileUrl } = useFiles()
const { params, path } = useRoute()

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
        'seo.*',
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
      'seo',
      'date_published',
    ],
  }
)

useHead({
  title: () => page.value.title,
})

useSeoMeta({
  title: () => page.value.title,
  description: () => page.value.summary,
  ogDescription: () =>
    page.value.seo ? page.value.seo.meta_description : null,
  ogUrl: () => `https://directus.io/posts/${page.value.slug}`,
  ogTitle: () => (page.value.seo ? page.value.seo.og_title : null),
  ogImage: () => (page.value.seo ? fileUrl(page.value.seo.og_image) : null),
  twitterTitle: '[twitter:title]',
  twitterDescription: '[twitter:description]',
  twitterImage: '[twitter:image]',
  twitterCard: 'summary',
})
</script>

<template>
  <div>
    <article class="">
      <!--Featured Image Full Width-->
      <header>
        <div class="md:flex">
          <!-- Post Image -->
          <div class="relative w-full max-w-3xl pt-6 md:px-6">
            <div
              class="relative w-full mx-auto rounded-bl-3xl overflow-hidden bg-cover h-[300px] md:h-[450px] dark:outline-gray-800"
            >
              <img
                :src="fileUrl(page.image)"
                class="object-cover w-full h-full saturate-0 dark:brightness-90"
                alt=""
              />
              <div
                class="absolute inset-0 mix-blend-multiply bg-gradient-to-b from-gray-100 to-gray-900"
              />
            </div>
          </div>
          <!-- Post Meta -->
          <div class="hidden p-8 mt-12 space-y-6 md:block">
            <NuxtLink
              v-if="page.category"
              :href="`/posts/categories/${page.category.slug}`"
              class="inline-block hover:opacity-90"
            >
              <VBadge size="lg" :color="page.category.color">{{
                page.category.title
              }}</VBadge>
            </NuxtLink>
            <VAvatar v-if="page.author" :author="page.author" />
            <div class="space-y-2">
              <p class="flex font-mono text-gray-500 dark:text-gray-300">
                <Icon name="heroicons:clock" class="w-6 h-6 mr-2" />
                {{ calculateReadTime(page.content) }}
              </p>
              <p class="flex font-mono text-gray-500 dark:text-gray-300">
                <Icon name="heroicons:calendar" class="w-6 h-6 mr-2" />
                {{ getRelativeTime(page.date_published) }}
              </p>
            </div>
          </div>
        </div>
        <!-- Title Container -->
        <div
          class="relative w-full max-w-4xl p-2 mx-auto -mt-12 overflow-hidden text-gray-900 border-2 md:-mt-32 rounded-br-3xl rounded-tl-3xl border-accent"
        >
          <div
            class="relative px-8 py-8 overflow-hidden md:px-16 rounded-br-2xl rounded-tl-2xl md:py-12"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-white via-gray-300 to-accent dark:from-gray-700 dark:via-gray-900 dark:to-accent"
            />
            <div class="absolute inset-0 grain-bg dark:opacity-20" />
            <div class="relative">
              <div class="flex justify-between"></div>
              <TypographyHeadline :content="page.title" as="h1" size="lg" />

              <p
                class="mt-4 font-mono font-semibold md:text-lg font-display dark:text-gray-200"
              >
                {{ page.summary }}
              </p>
            </div>
          </div>
        </div>

        <div class="block px-6 mt-6 md:hidden">
          <VAvatar v-if="page.author" :author="page.author" />
          <div
            class="flex justify-between pb-4 mt-4 border-b dark:border-gray-700"
          >
            <div class="space-y-2">
              <p class="flex font-mono text-gray-500 dark:text-gray-300">
                <Icon name="heroicons:clock" class="w-6 h-6 mr-2" />
                {{ calculateReadTime(page.content) }}
              </p>
              <p class="flex font-mono text-gray-500 dark:text-gray-300">
                <Icon name="heroicons:calendar" class="w-6 h-6 mr-2" />
                {{ getRelativeTime(page.date_published) }}
              </p>
            </div>
            <NuxtLink
              v-if="page.category"
              :href="`/posts/categories/${page.category.slug}`"
              class="inline-block hover:opacity-90"
            >
              <VBadge size="lg" :color="page.category.color">{{
                page.category.title
              }}</VBadge>
            </NuxtLink>
          </div>
        </div>
      </header>

      <PageContainer>
        <main class="w-full max-w-4xl mx-auto">
          <!-- Main -->
          <TypographyProse :content="page.content" ref="article" />
        </main>
        <aside>
          <!-- <TableOfContents :toc="tableOfContents.toc" /> -->
        </aside>
      </PageContainer>
    </article>
  </div>
</template>
