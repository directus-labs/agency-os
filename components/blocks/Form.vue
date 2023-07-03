<script setup lang="ts">
import { Form } from '~~/types'

export interface FormBlockProps {
  title?: string
  headline?: string
  form: Form
}

defineProps<{
  data: FormBlockProps
}>()
</script>
<template>
  <BlockContainer>
    <div
      class="max-w-2xl p-8 mx-auto mt-4 bg-gray-100 dark:bg-gray-800 rounded-bl-3xl rounded-tr-3xl"
    >
      <TypographyTitle v-if="data.title">{{ data.title }}</TypographyTitle>
      <TypographyHeadline v-if="data.headline" :content="data.headline" />
      <VForm :form="data.form" class="mt-4" />
    </div>
  </BlockContainer>
</template>
