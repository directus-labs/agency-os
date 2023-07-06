<script setup lang="ts">
import { generateVideoEmbed } from '~~/utils/embed'
interface VideoProps {
  url: string
  title?: string
  name?: string
}

defineProps<VideoProps>()
</script>

<template>
  <div>
    <iframe
      class="w-full aspect-video"
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
