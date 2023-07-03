<script setup lang="ts">
const { isDark, toggleDark } = useDark()
</script>
<template>
  <button
    id="animation-toggle"
    class="hidden text-gray-200 md:block hover:text-gray-400"
  >
    <Icon name="heroicons:sparkles" class="w-8 h-8" />
  </button>
</template>
