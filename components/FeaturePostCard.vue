<script setup lang="ts">
const { fileUrl } = useFiles()
const props = defineProps<{
  post: {
    id: string
    title: string
    summary: string
    image: string
    slug: string
    category: {
      title: string
      slug: string
      color: string
    }
  }
}>()
</script>
<template>
  <figure
    class="relative p-2 space-x-2 border-2 md:flex border-accent rounded-bl-3xl rounded-tr-3xl]"
  >
    <NuxtLink class="group" :href="`/posts/${post.slug}`">
      <div
        :class="[
          'relative overflow-hidden h-[300px] w-[300px] duration-300 rounded-bl-2xl ',
        ]"
      >
        <img
          class="object-cover w-full h-full transition-opacity duration-300 saturate-0 group-hover:opacity-75"
          :src="fileUrl(post.image)"
          alt=""
        />
        <div
          class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-transparent via-transparent to-accent group-hover:opacity-100"
        />

        <VBadge
          v-if="post.category"
          size="lg"
          :color="post.category.color"
          class="absolute bottom-0 left-0 mb-4 ml-4 rounded-bl-lg"
          >{{ post.category.title }}</VBadge
        >
      </div>
    </NuxtLink>

    <div
      class="relative px-8 overflow-hidden transition duration-300 rounded-tl-3xl rounded-tr-3xl group"
    >
      <NuxtLink class="relative block g" :href="`/posts/${post.slug}`">
        <!-- Icon -->
        <p
          class="mt-5 font-serif text-3xl font-semibold text-gray-900 transition duration-300 dark:text-white group-hover:text-accent"
        >
          {{ post.title }}
        </p>
        <p class="mt-3 font-mono text-sm text-gray-500 dark:text-gray-300">
          {{ truncateString(post.summary, 150) }}
        </p>
      </NuxtLink>
      <VAvatar
        v-if="post.author"
        class="relative mt-4"
        size="sm"
        :author="post.author"
      />
    </div>
  </figure>
</template>
