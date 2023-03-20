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
    :class="['py-12 mx-auto', !fullWidth ? ' lg:px-8 px-6 max-w-7xl' : '']"
  >
    <slot />
  </section>
</template>
