<script setup lang="ts">
const props = defineProps({
  as: {
    type: String,
    default: 'h2',
  },
})
</script>
<template>
  <component
    :is="as"
    class="font-mono font-bold tracking-wider uppercase text-accent"
  >
    <slot />
  </component>
</template>
