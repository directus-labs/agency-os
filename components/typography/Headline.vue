<script setup lang="ts">
const props = defineProps({

  content: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: 'md',
    // validator: (value: string) => {
    //   return ['sm', 'md', 'lg', 'xl'].includes(value)
    // },
  },
})
</script>
<template>
  <div
    :class="[
      {
        'text-2xl': size === 'sm',
        'text-3xl': size === 'md',
        'text-4xl': size === 'lg',
        'text-5xl': size === 'xl',
      },
      'font-serif font-bold leading-snug tracking-tight color-em dark:text-white',
    ]"
    v-html="content"
  />
</template>

<style>
.color-em {
  em {
    @apply text-accent not-italic;
  }
}
</style>
