<script setup lang="ts">
import { Post } from '~~/types'
const { fileUrl } = useFiles()
defineProps<{
  post: Post
  even?: boolean
}>()
</script>
<template>
  <figure class="flex flex-col group">
    <NuxtLink class="" :href="`/posts/${post.slug}`">
      <div
        :class="[
          {
            'rounded-br-3xl rounded-tl-3xl': even,
            'rounded-bl-3xl rounded-tr-3xl': !even,
          },
          'relative overflow-hidden h-56 w-full p-2 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-700 transition duration-150',
        ]"
      >
        <div
          :class="[
            {
              'rounded-br-2xl rounded-tl-2xl': even,
              'rounded-bl-2xl rounded-tr-2xl': !even,
            },
            'block w-full group h-full relative overflow-hidden',
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
            :class="[
              {
                'rounded-br-lg': even,
                'rounded-bl-lg': !even,
              },
              'absolute bottom-0 left-0 ml-4 mb-4',
            ]"
          >
            {{ post.category.title }}
          </VBadge>
        </div>
      </div>
    </NuxtLink>

    <NuxtLink class="h-full" :href="`/posts/${post.slug}`">
      <!-- Icon -->
      <p
        class="mt-5 font-serif text-xl font-semibold text-gray-900 dark:text-white group-hover:text-accent"
      >
        {{ post.title }}
      </p>
      <p class="mt-3 font-mono text-sm text-gray-500 dark:text-gray-300">
        {{ truncateString(post.summary, 150) }}
      </p>
    </NuxtLink>

    <VAvatar
      v-if="isObject(post.author)"
      class="mt-4"
      size="sm"
      :author="post.author"
    />
  </figure>
</template>
