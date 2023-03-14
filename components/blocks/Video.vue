<script setup lang="ts">
import { PropType } from 'vue'
type Video = {
  id: string
  title?: string
  headline?: string
  type: string
  video_file?: string
  video_url?: string
}
const props = defineProps({
  data: {
    type: Object as PropType<Video>,
    required: true,
  },
})

const { fileUrl } = useFiles()

const url = computed(() => {
  if (props.data.type === 'file' && props.data.video_file) {
    return fileUrl(props.data.video_file)
  }
  if (props.data.type === 'url' && props.data.video_url) {
    return props.data.video_url
  }
  return null
})
</script>
<template>
  <section class="max-w-3xl mx-auto text-center">
    <TypographyTitle v-if="data.title">{{ data.title }}</TypographyTitle>
    <TypographyHeadline v-if="data.headline" :content="data.headline" />
    <VVideo class="mt-4" v-if="url" :url="url" :title="data.title" />
  </section>
</template>
