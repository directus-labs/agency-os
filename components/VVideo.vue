<script setup lang="ts">
import { generateVideoEmbed } from '~~/utils/embed'
const props = defineProps({
  url: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="aspect-w-16 aspect-h-9">
    <iframe
      class="aspect-video"
      :id="name"
      loading="lazy"
      :src="generateVideoEmbed(url)"
      frameborder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowfullscreen
      :title="title"
    ></iframe>
  </div>
</template>
