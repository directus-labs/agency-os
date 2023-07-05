<script setup lang="ts">
interface TitleProps {
  as?: string
}

withDefaults(defineProps<TitleProps>(), {
  as: 'h2',
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
