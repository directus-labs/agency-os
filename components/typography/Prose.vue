<script setup lang="ts">
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <div
    :class="[
      'prose prose-sm md:prose-base lg:prose-lg dark:prose-invert prose-img:rounded-br-3xl prose-img:rounded-tl-3xl prose-img:border-2 prose-img:border-gray-500 prose-headings:font-serif prose-p:font-mono',
    ]"
    v-html="content"
  />
</template>
