<script setup lang="ts">
const { $directus } = useNuxtApp()
const { fileUrl } = useFiles()
const session = useCookie('session')
const { subscribeToMessages, selectedConversation, isCurrentUser } = useChat()

// Fetch the page data from the Directus API using the Nuxt useAsyncData composable
// https://v3.nuxtjs.org/docs/usage/data-fetching#useasyncdata
const {
  data: conversations,
  pending,
  error,
} = await useAsyncData(
  'conversations',
  () => {
    return $directus.items('conversations').readByQuery({
      filter: {
        visitor_id: { _eq: session.value?.id },
      },
      sort: ['date_created'],
    })
  },
  {
    transform: (data) => data.data,
  }
)

async function createNewConversation() {
  try {
    const data = await $directus.items('conversations').createOne({
      visitor_id: session.value?.id,
    })
    conversations.value.push(data)
    selectedConversation.value = data.id
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  subscribeToMessages()
})
</script>
<template>
  <div class="relative flex flex-col h-full overflow-hidden">
    <template v-if="!selectedConversation">
      <MessengerHeader>
        <TypographyHeadline content="Messages" />
      </MessengerHeader>
      <div class="flex-1 block h-full max-h-full min-w-full">
        <div id="messages-body" class="flex flex-col h-full overflow-y-scroll">
          <div class="pb-20" v-if="conversations.length > 0">
            <ul class="block h-full pb-20 divide-y dark:divide-gray-500">
              <li v-for="conversation in conversations" :key="conversation.id">
                <button
                  @click="selectedConversation = conversation.id"
                  class="flex items-center w-full px-4 py-4 space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span class="block w-3 h-3 bg-green-500 rounded-full" />
                  <div class="flex -space-x-1 overflow-hidden">
                    <img
                      class="inline-block w-6 h-6 rounded-full ring-2 ring-white dark:ring-gray-800"
                      src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <img
                      class="inline-block w-6 h-6 rounded-full ring-2 ring-white dark:ring-gray-800"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                      alt=""
                    />
                    <img
                      class="inline-block w-6 h-6 rounded-full ring-2 ring-white dark:ring-gray-800"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <p class="dark:text-white">
                    {{ getRelativeTime(conversation.date_created) }}
                  </p>
                </button>
              </li>
            </ul>
          </div>
          <div v-else class="px-4 py-4 space-y-8">
            <TypographyHeadline content="No conversations" size="sm" />
          </div>
        </div>
      </div>
      <div
        class="absolute bottom-0 flex justify-center w-full pb-4 mx-auto bg-gradient-to-b from-transparent to-white dark:from-transparent dark:to-gray-800"
      >
        <VButton class="" @click="createNewConversation()" variant="primary">
          Send Us A Message
        </VButton>
      </div>
    </template>
    <MessengerConversation
      v-if="selectedConversation"
      :id="selectedConversation"
    />
  </div>
</template>
