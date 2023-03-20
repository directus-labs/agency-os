<script setup lang="ts">
const props = defineProps({
  fullWidth: {
    type: Boolean,
    default: false,
  },
})
</script>
<template>
  <section :class="['py-12', !fullWidth ? ' lg:px-8 px-6 ' : '']">
    <slot />
  </section>
</template>
