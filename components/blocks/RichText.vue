<script setup lang="ts">
import { PropType } from 'vue'
type Content = {
  id: string
  title: string
  headline: string
  content: string
}
const props = defineProps({
  data: {
    type: Object as PropType<Content>,
    required: true,
  },
})
</script>
<template>
  <BlockContainer>
    <div class="text-center">
      <TypographyTitle>{{ data.title }}</TypographyTitle>
      <TypographyHeadline :content="data.headline" size="xl" />
    </div>
    <TypographyProse :content="data.content" class="mx-auto mt-8 font-mono" />
  </BlockContainer>
</template>
