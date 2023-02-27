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
    class="relative flex space-x-2 outline outline-2 outline-offset-4 outline-accent rounded-bl-3xl rounded-tr-3xl"
  >
    <NuxtLink class="group" :href="`/posts/${post.slug}`">
      <div
        :class="[
          'relative overflow-hidden h-[300px] w-[300px]  duration-300 rounded-bl-3xl rounded-tr-3xl',
        ]"
      >
        <img
          class="object-cover w-full h-full saturate-0 group-hover:opacity-75 transition-opacity duration-300"
          :src="fileUrl(post.image)"
          alt=""
        />
        <div
          class="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent group-hover:opacity-100 opacity-0 transition-opacity duration-300"
        />

        <VBadge
          v-if="post.category"
          size="lg"
          :color="post.category.color"
          :class="[
            {
              'rounded-br-lg': even,
              'rounded-bl-lg': !even,
            },
            'absolute bottom-0 left-0 ml-4 mb-4',
          ]"
          >{{ post.category.title }}</VBadge
        >
      </div>
    </NuxtLink>

    <div class="relative px-8 rounded-tl-3xl rounded-tr-3xl overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-white via-gray-300 to-accent dark:from-gray-700 dark:via-gray-900 dark:to-accent"
      />
      <div class="absolute inset-0 grain-bg dark:opacity-20" />
      <NuxtLink class="block relative" :href="`/posts/${post.slug}`">
        <!-- Icon -->
        <p
          class="mt-5 text-3xl font-semibold font-serif text-gray-900 dark:text-white group-hover:text-accent"
        >
          {{ post.title }}
        </p>
        <p class="mt-3 text-sm font-mono text-gray-500 dark:text-gray-300">
          {{ truncateString(post.summary, 150) }}
        </p>
      </NuxtLink>
      <VAvatar
        v-if="post.author"
        class="mt-4 relative"
        size="sm"
        :author="post.author"
      />
    </div>
  </figure>
</template>
