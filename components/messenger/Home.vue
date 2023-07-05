<script setup lang="ts">
const { page } = useChat()
</script>
<template>
  <div class="flex flex-col h-full">
    <div
      class="relative flex-1 px-4 py-12 bg-gradient-to-br from-white via-accent/50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-600"
    >
      <div class="pb-24">
        <Logo class="h-8 dark:text-white" />
      </div>
      <div class="space-y-8">
        <TypographyHeadline content="How can we help?" />
        <button
          type="button"
          @click="
            () => {
              page = 'chat'
            }
          "
          class="flex justify-between w-full p-4 font-mono transition duration-150 bg-white dark:bg-gray-700 dark:text-white dark:hover:text-accent hover:text-accent rounded-tl-xl rounded-br-xl"
        >
          <div class="text-left">
            <p class="font-bold">Ask us anything</p>
            <p class="text-gray-500 dark:text-gray-300">We're here to help.</p>
          </div>
          <div class="flex items-center justify-center p-2">
            <Icon name="heroicons:chat-bubble-left-ellipsis" class="w-8 h-8" />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
