<script setup lang="ts">
import { usePointerSwipe } from '@vueuse/core'

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

const props = defineProps<{
  data: GalleryBlockProps
}>()

const { fileUrl } = useFiles()

const isOpen = ref(false)
const currentItemIdx = ref(0)

const currentItem = computed(() => {
  return props.data.gallery_items[currentItemIdx.value].directus_files_id
})

function next() {
  // If the current item is the last item, go back to the first item
  currentItemIdx.value =
    currentItemIdx.value === props.data.gallery_items.length - 1
      ? 0
      : currentItemIdx.value + 1
}

function prev() {
  // If the current item is the first item, go to the last item
  currentItemIdx.value =
    currentItemIdx.value === 0
      ? props.data.gallery_items.length - 1
      : currentItemIdx.value - 1
}

function toggle() {
  isOpen.value = !isOpen.value
}

// Add keyboard navigation
function onKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return
  if (e.key === 'Escape') {
    toggle()
  }
  if (e.key === 'ArrowRight') {
    next()
  }
  if (e.key === 'ArrowLeft') {
    prev()
  }
}
onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
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
