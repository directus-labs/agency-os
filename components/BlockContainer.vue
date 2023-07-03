<script setup lang="ts">
interface BlockContainerProps {
  fullWidth?: boolean
}

withDefaults(defineProps<BlockContainerProps>(), {
  fullWidth: false,
})
</script>
<template>
  <section
    :class="['py-12 mx-auto', !fullWidth ? ' lg:px-8 px-6 max-w-7xl' : '']"
  >
    <slot />
  </section>
</template>
