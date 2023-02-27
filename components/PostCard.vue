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
  even: boolean
}>()
</script>
<template>
  <figure class="group">
    <NuxtLink class="" :href="`/posts/${post.slug}`">
      <div
        :class="[
          {
            'rounded-br-3xl rounded-tl-3xl': even,
            'rounded-bl-3xl rounded-tr-3xl': !even,
          },
          'relative overflow-hidden h-56 w-full group-hover:outline outline-2 outline-offset-4 outline-gray-300 dark:outline-gray-700 transition-[outline] duration-300',
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

    <NuxtLink class="" :href="`/posts/${post.slug}`">
      <!-- Icon -->
      <p
        class="mt-5 text-xl font-semibold font-serif text-gray-900 dark:text-white group-hover:text-accent"
      >
        {{ post.title }}
      </p>
      <p class="mt-3 text-sm font-mono text-gray-500 dark:text-gray-300">
        {{ truncateString(post.summary, 150) }}
      </p>
    </NuxtLink>
    <VAvatar v-if="post.author" class="mt-4" size="sm" :author="post.author" />
  </figure>
</template>
