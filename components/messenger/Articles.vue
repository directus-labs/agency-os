<script setup lang="ts">
import { useActiveElement, onKeyDown } from '@vueuse/core'
defineProps<{
  id: string
}>()
const { $directus } = useNuxtApp()
const { fileUrl } = useFiles()
const session = useCookie('session')
const {
  page,
  messages,
  newMessage,
  sendMessage,
  isCurrentUser,
  chatWindow,
  chatConfig,
  showMenu,
  subscribeToMessages,
  selectedConversation,
} = useChat()

// Fetch the page data from the Directus API using the Nuxt useAsyncData composable
// https://v3.nuxtjs.org/docs/usage/data-fetching#useasyncdata
const {
  data: articles,
  pending,
  error,
} = await useAsyncData(
  'articles-messenger',
  () => {
    return $directus.items('posts').readByQuery({
      sort: ['date_published'],
    })
  },
  {
    transform: (data) => data.data,
  }
)
</script>
<template>
  <div class="relative flex flex-col flex-1 h-full overflow-hidden">
    <MessengerHeader>
      <TypographyHeadline content="Articles" />
    </MessengerHeader>
    <div class="overflow-y-auto">
      <div class="px-4 py-4">
        <TypographyHeadline content="The latest from our team" size="sm" />
      </div>
      <div class="relative p-4 space-y-4">
        <figure
          v-for="post in articles"
          :id="post.id"
          class="flex flex-col p-3 border-2 dark:border-gray-600 group rounded-br-xl rounded-tl-3xl"
        >
          <NuxtLink class="" :href="`/posts/${post.slug}`">
            <div
              :class="[
                'relative rounded-br-2xl rounded-tl-2xl overflow-hidden h-32 w-full ',
              ]"
            >
              <img
                class="object-cover w-full h-full transition-opacity duration-300 saturate-0 group-hover:opacity-75"
                :src="fileUrl(post.image)"
                alt=""
              />
              <div
                class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-transparent via-transparent to-accent group-hover:opacity-100"
              />
              <VBadge
                v-if="post.category"
                size="lg"
                :color="post.category.color"
                :class="[
                  {
                    'rounded-br-lg': even,
                    'rounded-bl-lg': !even,
                  },
                  'absolute bottom-0 left-0 ml-4 mb-4',
                ]"
              >
                {{ post.category.title }}
              </VBadge>
            </div>
          </NuxtLink>
          <NuxtLink class="h-full" :href="`/posts/${post.slug}`">
            <!-- Icon -->
            <p
              class="mt-2 font-serif text-lg font-semibold text-gray-900 dark:text-white group-hover:text-accent"
            >
              {{ post.title }}
            </p>
            <p class="mt-2 font-mono text-xs text-gray-500 dark:text-gray-300">
              {{ truncateString(post.summary, 100) }}
            </p>
          </NuxtLink>
        </figure>
      </div>
    </div>
  </div>
</template>
