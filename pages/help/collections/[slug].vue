<script setup lang="ts">
import { convertIconName } from '~~/utils/strings'
const { $directus } = useNuxtApp()
const { params, path } = useRoute()

const {
  data: collection,
  pending,
  error,
} = await useAsyncData(
  path,
  () => {
    return $directus.items('help_collections').readByQuery({
      filter: {
        slug: {
          _eq: params.slug,
        },
      },
      fields: [
        '*',
        'articles.slug',
        'articles.title',
        'articles.id',
        'articles.summary',
      ],
    })
  },
  {
    transform: (data) => data.data[0],
  }
)
</script>
<template>
  <PageContainer>
    <header class="pb-8 border-b border-gray-300 dark:border-gray-700">
      <GlobalSearch
        placeholder="Search for articles"
        :collections="['help_articles']"
        class="flex"
      />
    </header>
    <section class="max-w-full mt-8">
      <VBreadcrumbs
        :items="[
          { title: 'All Collections', href: '/help' },
          {
            title: collection.title,
            href: `/help/collections/${collection.slug}`,
          },
        ]"
      />
      <div class="flex flex-col gap-10 pt-4 max-sm:gap-8 max-sm:pt-2">
        <div>
          <div class="mb-5">
            <Icon
              v-if="collection.icon"
              :name="convertIconName(collection.icon)"
              class="h-9 w-9 sm:h-10 sm:w-10 text-accent"
            ></Icon>
          </div>
          <div class="flex flex-col">
            <TypographyHeadline :content="collection.title" />

            <div class="font-mono text-gray-500 text-md">
              <p>{{ collection.description }}</p>
            </div>
          </div>
          <div class="mt-5 font-mono text-gray-500">
            {{ collection.articles.length }} articles
          </div>
        </div>
        <div
          class="flex flex-col gap-5 p-2 border-2 dark:border-gray-600 rounded-br-xl rounded-tl-xl"
        >
          <NuxtLink
            v-for="article in collection.articles"
            :key="article.id"
            :href="`/help/articles/${article.slug}`"
            class="flex flex-col p-3 transition duration-150 rounded-tl-lg rounded-br-lg hover:bg-accent/30 dark:hover:bg-gray-900"
          >
            <div class="flex items-center justify-between">
              <div>
                <TypographyHeadline :content="article.title" size="sm" />
                <p class="mt-2 font-mono text-sm text-gray-500">
                  {{ article.summary }}
                </p>
              </div>
              <Icon
                name="heroicons:arrow-right"
                class="w-6 h-6 dark:text-gray-300"
              />
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </PageContainer>
</template>
