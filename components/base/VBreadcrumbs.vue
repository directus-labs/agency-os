<script setup lang="ts">
export interface BreadcrumbsProps {
  items: Array<{
    title: string
    href: string
  }>
}
defineProps<BreadcrumbsProps>()
</script>
<template>
  <div
    class="flex flex-wrap items-baseline pb-4 space-x-2 font-mono text-base dark:text-gray-200"
  >
    <template v-for="(item, itemIdx) in items">
      <NuxtLink
        v-if="itemIdx != items.length - 1"
        :href="item.href"
        class="hover:text-accent"
      >
        {{ item.title }}
      </NuxtLink>
      <div v-if="itemIdx !== items.length - 1" class="">
        <Icon name="heroicons:chevron-right" class="h-5 mb-1" />
      </div>
      <span v-else>
        {{ item.title }}
      </span>
    </template>
  </div>
</template>
