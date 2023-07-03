<script setup lang="ts">
export interface RichTextBlockProps {
  id: string
  title: string
  headline: string
  content: string
}

defineProps<{
  data: RichTextBlockProps
}>()
</script>
<template>
  <BlockContainer>
    <div class="text-center">
      <TypographyTitle v-if="data.title">{{ data.title }}</TypographyTitle>
      <TypographyHeadline
        v-if="data.headline"
        :content="data.headline"
        size="xl"
      />
    </div>
    <TypographyProse :content="data.content" class="mx-auto mt-8 font-mono" />
  </BlockContainer>
</template>
