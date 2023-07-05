<script setup lang="ts">
export interface GalleryBlockProps {
  id: string
  title?: string
  headline?: string
  gallery_items: Array<{
    directus_files_id:
      | string
      | {
          id: string
          title?: string
          description?: string
          tags?: string
        }
  }>
}

defineProps<{
  data: GalleryBlockProps
}>()
</script>

<template>
  <BlockContainer>
    <!-- Title -->
    <TypographyTitle v-if="data.title">{{ data.title }}</TypographyTitle>
    <TypographyHeadline v-if="data.headline" :content="data.headline" />
    <VGallery
      v-if="data.gallery_items.length > 0"
      :items="
        data.gallery_items.map((item) => {
          return item.directus_files_id
        })
      "
    />
  </BlockContainer>
</template>
