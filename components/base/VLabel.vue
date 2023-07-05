<template>
  <label
    :for="name"
    class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200"
    >{{ label }}</label
  >
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
})
</script>
