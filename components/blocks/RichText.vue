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
  <PageContainer class="">
    <div class="text-center">
      <TypographyTitle>{{ data.title }}</TypographyTitle>
      <TypographyHeadline :content="data.headline" />
    </div>
    <TypographyProse :content="data.content" class="mx-auto mt-8" />
  </PageContainer>
</template>
