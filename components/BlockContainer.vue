<script setup lang="ts">
const props = defineProps({
  fullWidth: {
    type: Boolean,
    default: false,
  },
})
</script>
<template>
  <section
    :class="['py-12 mx-auto max-w-7xl', !fullWidth ? ' lg:px-8 px-6' : '']"
  >
    <slot />
  </section>
</template>
