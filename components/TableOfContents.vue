<script setup lang="ts">
const props = defineProps({
  toc: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    default: null,
  },
})
</script>
<template>
  <div class="relative block">
    <nav class="py-4 lg:py-8 lg:pl-8 lg:pr-2">
      <h3 v-if="title" class="mb-3 text-6xl text-accent lg:mb-2 text-neon">
        {{ title }}
      </h3>
      <ul class="mb-8">
        <li
          v-for="link of toc"
          :key="link.id"
          class="relative mb-1 leading-tight text-gray-700 dark:text-gray-300"
          :class="{
            'border-t border-dashed dark:border-gray-800 first:border-t-0':
              link.depth === 'h2',
          }"
        >
          <NuxtLink
            :href="`#${link.id}`"
            class="relative z-10 inline-block py-1 text-sm text-gray-800 duration-300 ease-in-out hover:text-accent"
            :class="{
              'py-2': link.depth === 'h2',
              'ml-2 pb-2': link.depth === 'h3',
            }"
            >{{ link.text }}</NuxtLink
          >
        </li>
      </ul>
    </nav>
  </div>
</template>
