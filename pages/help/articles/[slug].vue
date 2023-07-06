<script setup lang="ts">
import { markdownToHtml } from '~~/utils/markdown'
const { $directus } = useNuxtApp()
const { params } = useRoute()
// Fetch the page data from the Directus API using the Nuxt useAsyncData composable
// https://v3.nuxtjs.org/docs/usage/data-fetching#useasyncdata
const {
  data: article,
  pending,
  error,
} = await useAsyncData(
  params.slug,
  () => {
    return $directus.items('help_articles').readByQuery({
      filter: {
        slug: {
          _eq: params.slug,
        },
      },
      fields: [
        '*',
        'help_collection.slug',
        'help_collection.title',
        'help_collection.id',
        'owner.first_name',
        'owner.last_name',
        'owner.avatar',
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
      <div class="flex flex-row-reverse justify-between">
        <div class="sticky self-start mt-16 max-lg:hidden">
          <!-- Table of Contents -->
        </div>
        <div class="relative w-full z-3 lg:max-w-160">
          <div class="flex pb-6 max-md:pb-2 lg:max-w-160">
            <VBreadcrumbs
              :items="[
                { title: 'All Collections', href: '/help' },
                {
                  title: article.help_collection.title,
                  href: `/help/collections/${article.help_collection.slug}`,
                },
                { title: article.title },
              ]"
            />
          </div>
          <div class="">
            <div class="article">
              <div class="mb-10 max-lg:mb-6">
                <div class="flex flex-col gap-4">
                  <div class="flex flex-col">
                    <TypographyHeadline
                      v-if="article.title"
                      :content="article.title"
                    />

                    <p v-if="article.summary" class="font-mono">
                      {{ article.summary }}
                    </p>
                  </div>
                  <VAvatar v-if="article.owner" :author="article.owner" />
                </div>
              </div>
              <div class="flex-col">
                <div class="ml-0 mb-7 text-md lg:hidden">
                  <!-- Table of Contents -->
                </div>
                <article>
                  <TypographyProse
                    v-if="article.content"
                    :content="markdownToHtml(article.content)"
                  />
                </article>
              </div>
            </div>
          </div>
          <hr class="mt-12 dark:border-gray-700" />
          <!-- Feedback Widget -->
          <HelpFeedback
            class="mt-4"
            :title="article.title"
            :url="`/help/articles/${article.slug}`"
          />
        </div>
      </div>
    </section>
  </PageContainer>
</template>
