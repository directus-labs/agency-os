<script setup lang="ts">
const { page } = useChat()
</script>
<template>
  <div class="pb-56">
    <div
      class="relative px-4 py-4 bg-gradient-to-br from-white via-accent/50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-600"
    >
      <div class="flex items-center space-x-4">
        <VButton class="inline-flex" @click="page = 'home'" variant="outline">
          <Icon name="heroicons:arrow-left" class="w-5 h-5" />
        </VButton>
        <TypographyHeadline content="Search" />
      </div>
      <GlobalSearch
        :collections="['posts', 'pages', 'categories', 'projects']"
        class="flex"
      />
    </div>
  </div>
</template>
