<script setup lang="ts">
import { Post } from '~~/types'

export interface CardGroupBlockProps {
  id: string
  title: string
  headline: string
  content: string
  posts: Array<{
    posts_id: Post
  }>
}

defineProps<{
  data: CardGroupBlockProps
}>()
</script>

<template>
  <BlockContainer>
    <!-- Title -->
    <TypographyTitle v-if="data.title">{{ data.title }}</TypographyTitle>
    <TypographyHeadline v-if="data.headline" :content="data.headline" />
    <!-- Gallery -->
    <div class="grid gap-8 mt-4 md:grid-cols-3">
      <PostCard
        v-for="(item, itemIdx) in data.posts"
        :key="itemIdx"
        :post="item.posts_id"
      />
    </div>
  </BlockContainer>
</template>
