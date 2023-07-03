<script setup lang="ts">
const { page } = useChat()
</script>
<template>
  <div class="relative flex flex-col h-full">
    <MessengerHeader class="flex-col">
      <div class="flex self-start space-x-4">
        <!-- <VButton @click="page = 'home'" variant="outline" size="sm">
          <Icon name="heroicons:arrow-left" class="w-5 h-5" />
        </VButton> -->
        <TypographyHeadline content="Search" />
      </div>
      <div class="w-full">
        <GlobalSearch
          :collections="['posts', 'pages', 'categories', 'projects']"
          class="flex"
        />
      </div>
    </MessengerHeader>
  </div>
</template>
