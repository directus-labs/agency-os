<script setup lang="ts">
interface HeadlineProps {
  content: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

withDefaults(defineProps<HeadlineProps>(), {
  size: 'md',
})
</script>
<template>
  <div
    :class="[
      {
        'text-xl': size === 'xs',
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
