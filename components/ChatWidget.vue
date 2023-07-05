<script setup lang="ts">
import { useActiveElement, onKeyDown } from '@vueuse/core'
const { fileUrl } = useFiles()
const isOpen = ref(false)
function toggle() {
  isOpen.value = !isOpen.value
}

const map = {
  home: resolveComponent('MessengerHome'),
  help: resolveComponent('MessengerHelp'),
  chat: resolveComponent('MessengerMessages'),
  articles: resolveComponent('MessengerArticles'),
}

const { page, chatWindow, modules, showMenu, getChatConfig } = useChat()

getChatConfig()

// If widget is open, watch for ESC key to close it
onKeyDown('Escape', () => {
  if (isOpen.value) {
    toggle()
  }
})
</script>
<template>
  <div>
    <Motionable
      name="chat"
      as="div"
      :show="isOpen"
      v-motion
      :initial="{
        opacity: 0,
        y: 50,
        scale: 0.0,
      }"
      :enter="{
        opacity: 1,
        scale: 1,
        y: 0,
        transformOrigin: 'bottom right',
      }"
      :leave="{
        opacity: 0,
        scale: 0.0,
        y: 50,
        transformOrigin: 'bottom right',
      }"
      class="chat-widget fixed flex flex-col overflow-hidden bottom-[84px] max-w-[350px] w-96 right-4 z-50 bg-white dark:bg-gray-800 shadow-lg border-2 border-accent rounded-bl-xl rounded-tr-xl dark:border-gray-700"
    >
      <div id="wrapper" class="absolute inset-0 flex flex-col">
        <component :is="map[page]" />
        <MessengerMenu
          class="block px-4 py-4 border-t dark:border-t-gray-700"
          v-if="showMenu"
        />
      </div>
    </Motionable>
    <!-- Button -->
    <button
      @click="toggle"
      class="fixed z-50 hidden p-3 text-white transition duration-300 shadow-md md:block bg-accent bottom-4 right-4 hover:bg-opacity-75 rounded-tr-xl rounded-bl-xl"
    >
      <div>
        <span class="sr-only">Close</span>
        <Icon
          name="heroicons:chat-bubble-left-ellipsis"
          v-if="!isOpen"
          class="w-8 h-8"
        />
        <Icon name="heroicons:chevron-down" v-if="isOpen" class="w-8 h-8" />
      </div>
    </button>
  </div>
</template>
<style>
.chat-widget {
  height: min(604px, 100% - 104px);
}
</style>
