<script setup lang="ts">
const { enabledModules, page } = useChat()
</script>
<template>
  <div id="menu">
    <div class="flex justify-around">
      <button
        type="button"
        v-for="(module, mdKey) in enabledModules"
        :key="mdKey"
        @click="
          () => {
            page = mdKey
          }
        "
        :class="[
          'flex flex-col items-center justify-center space-y-1 ',
          {
            'text-accent ': page === mdKey,
            ' dark:text-gray-200 hover:text-accent/80 dark:hover:text-accent/80':
              page !== mdKey,
          },
        ]"
      >
        <Icon v-if="module.icon" :name="module.icon" class="w-6 h-6" />
        <span class="text-sm">{{ module.title }}</span>
      </button>
    </div>
  </div>
</template>
