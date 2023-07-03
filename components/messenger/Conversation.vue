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

// If new message form is active, watch for enter key to submit
onKeyDown('Enter', () => {
  sendMessage(newMessage)
})
onMounted(() => {
  showMenu.value = false
})
onUnmounted(() => {
  showMenu.value = true
})
</script>
<template>
  <div class="relative flex flex-col flex-1 h-full">
    <MessengerHeader>
      <VButton @click="selectedConversation = null" variant="outline" size="sm">
        <Icon name="heroicons:arrow-left" class="w-5 h-5" />
      </VButton>

      <TypographyHeadline content="Chat" />
    </MessengerHeader>
    <div class="relative flex flex-1">
      <div class="absolute py-4 inset-0 flex bottom-[56px] overflow-y-auto">
        <ol
          ref="chatWindow"
          v-auto-animate
          class="relative flex flex-col w-full px-4 space-y-4"
        >
          <li v-if="messages.length === 0">
            <TypographyHeadline content="No messages yet" />
          </li>
          <li
            v-for="message in messages"
            :key="message.id"
            class="flex items-start w-full space-x-2"
            :class="[isCurrentUser(message) ? 'justify-end' : 'justify-start']"
          >
            <img
              v-if="message.user_created && !isCurrentUser(message)"
              :class="['object-cover rounded-full dark:brightness-90 w-8 h-8']"
              :src="fileUrl(message.user_created.avatar)"
            />
            <p
              :class="[
                {
                  'bg-gray-200 dark:bg-gray-600 dark:text-white text-gray-800 rounded-br-none':
                    !isCurrentUser(message),
                  'bg-accent text-white rounded-bl-none':
                    isCurrentUser(message),
                },
                'px-4 py-2 rounded-xl  inline-block',
              ]"
            >
              {{ message.text }}
            </p>
          </li>
        </ol>
      </div>

      <form
        @submit.prevent="sendMessage(newMesssage)"
        class="absolute bottom-0 left-0 right-0 py-2 bg-white dark:bg-gray-800 min-h-[56px] max-h-[200px] border-t dark:border-t-gray-700"
      >
        <div class="flex items-center space-x-2">
          <input
            class="w-full bg-transparent border-0 focus:ring-0 dark:text-white"
            v-model="newMessage.text"
            type="text"
            id="message"
            placeholder="Type a message"
          />
        </div>
      </form>
    </div>
  </div>
</template>
