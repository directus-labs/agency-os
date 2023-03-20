<script setup lang="ts">
import { Post } from '~~/types'
import { PropType } from 'vue'
type CardGroup = {
  id: string
  titlle: string
  headline: string
  content: string
  posts: {
    posts_id: Post
  }
}
const props = defineProps({
  data: {
    type: Object as PropType<CardGroup>,
    required: true,
  },
})
</script>
<template>
  <BlockContainer>
    <!-- Title -->
    <TypographyTitle v-if="data.title">{{ data.title }}</TypographyTitle>
    <TypographyHeadline v-if="data.headline" :content="data.headline" />

    <!-- Gallery -->
    <div class="gap-4 mt-4 md:columns-3">
      <PostCard
        v-for="(item, itemIdx) in data.posts"
        :key="itemIdx"
        :post="item.posts_id"
      />
    </div>
  </BlockContainer>
</template>
