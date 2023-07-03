<script setup lang="ts">
export interface VideoBlockProps {
  id: string
  title?: string
  headline?: string
  type: string
  video_file?: string
  video_url?: string
}

const props = defineProps<{
  data: VideoBlockProps
}>()

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
  <BlockContainer class="max-w-4xl py-12 mx-auto text-center">
    <TypographyTitle v-if="data.title">{{ data.title }}</TypographyTitle>
    <TypographyHeadline v-if="data.headline" :content="data.headline" />
    <div class="relative">
      <div
        class="absolute inset-0 w-full h-full translate-x-4 translate-y-4 border-2 rounded-tl-2xl rounded-br-2xl border-gray-500/75"
      />

      <VVideo
        class="relative mt-4 overflow-hidden rounded-tl-xl rounded-br-xl"
        v-if="url"
        :url="url"
        :title="data.title"
      />
    </div>
  </BlockContainer>
</template>
