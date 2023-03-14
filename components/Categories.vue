<script setup lang="ts">
const { $directus } = useNuxtApp()

const {
  data: categories,
  pending,
  error,
} = await useAsyncData(
  'categories',
  () => {
    return $directus.items('categories').readByQuery({
      fields: ['*'],
    })
  },
  {
    transform: (data) => data.data,
  }
)
</script>
<template>
  <div class="mt-4 space-y-2">
    <NuxtLink
      v-for="category in categories"
      :href="`/posts/categories/${category.slug}`"
      class="block font-mono dark:text-gray-200 hover:opacity-80"
    >
      <VBadge :color="category.color" size="lg" class="rounded-bl-lg">
        {{ category.title }}
      </VBadge>
    </NuxtLink>
  </div>
</template>
