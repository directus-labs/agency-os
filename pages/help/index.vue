<script setup lang="ts">
const { $directus } = useNuxtApp()

const {
  data: collections,
  pending,
  error,
} = await useAsyncData(
  'posts',
  () => {
    return $directus.items('help_collections').readByQuery({
      filter: {
        articles: {
          _nnull: true,
        },
      },
    })
  },
  {
    transform: (data) => data.data,
  }
)
</script>
<template>
  <PageContainer class="max-w-7xl">
    <header class="pb-8 border-b border-gray-300 dark:border-gray-700">
      <TypographyTitle>Help Center</TypographyTitle>
      <TypographyHeadline content="<p>How can we <em>help</em> you?</p>" />
      <GlobalSearch
        placeholder="Search for articles"
        :collections="['help_articles']"
        class="flex"
      />
    </header>
    <div class="grid mt-8 gap-x-4 sm:gap-x-6 gap-y-4 sm:gap-y-6 md:grid-cols-3">
      <NuxtLink
        v-for="collection in collections"
        :key="collection.id"
        :href="`/help/collections/${collection.slug}`"
        class="flex overflow-hidden no-underline transition duration-200 bg-white border dark:bg-gray-800 hover:border-accent dark:border-gray-600 rounded-tr-xl rounded-bl-xl dark:hover:border-accent"
      >
        <div class="flex flex-col p-5 sm:p-6">
          <div class="flex items-center">
            <Icon
              v-if="collection.icon"
              :name="convertIconName(collection.icon)"
              class="w-10 h-10 text-accent"
            />
          </div>
          <div>
            <TypographyHeadline :content="collection.title" size="sm" />
            <p
              class="font-mono text-gray-500 dark:text-gray-300 line-clamp-3 text-md sm:line-clamp-3"
            >
              {{ collection.description }}
            </p>
          </div>
          <div class="mt-4 font-mono text-sm text-gray-500 dark:text-gray-300">
            {{ collection.articles.length }} articles
          </div>
        </div>
      </NuxtLink>
    </div>
  </PageContainer>
</template>
