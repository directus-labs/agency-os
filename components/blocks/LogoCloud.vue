<script setup lang="ts">
export interface LogoCloudBlockProps {
  id: string
  headline?: string
  title?: string
  logos: Array<{
    file: {
      id: string
    }
  }>
}

defineProps<{
  data: LogoCloudBlockProps
}>()

const { fileUrl } = useFiles()
</script>
<template>
  <BlockContainer class="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <TypographyTitle v-if="data.title">{{ data.title }}</TypographyTitle>
    <TypographyHeadline v-if="data.headline" :content="data.headline" />
    <div class="flow-root mt-8 lg:mt-10">
      <div class="grid gap-4 md:grid-cols-4 md:gap-8">
        <div
          v-motion
          :initial="{
            opacity: 0,
            y: 100,
          }"
          :visibleOnce="{
            opacity: 1,
            y: 0,
          }"
          :delay="250 + 100 * fileIdx"
          v-for="({ file }, fileIdx) in data.logos"
          :key="file.id"
          class="flex items-center justify-center p-8 border-2 border-gray-200 rounded-tr-3xl rounded-bl-3xl dark:border-gray-700 dark:bg-gray-200"
        >
          <img class="h-12" :src="fileUrl(file.id)" />
        </div>
      </div>
    </div>
  </BlockContainer>
</template>
