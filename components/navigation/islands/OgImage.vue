<script setup lang="ts">
const props = defineProps({
  title: String,
})
</script>

<template>
  <div
    class="flex items-center justify-center w-full h-full text-white bg-blue-500"
  >
    <h1 :style="{ fontSize: '70px' }">{{ title }}</h1>
  </div>
</template>
