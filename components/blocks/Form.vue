<script setup lang="ts">
import { PropType } from 'vue'
import { Form } from '~~/types'
const props = defineProps({
  data: {
    type: Object as PropType<Form>,
    required: true,
  },
})

const { fileUrl } = useFiles()
</script>
<template>
  <BlockContainer>
    <div
      class="max-w-2xl p-8 mx-auto mt-4 bg-gray-100 dark:bg-gray-800 rounded-bl-3xl rounded-tr-3xl"
    >
      <TypographyTitle>{{ data.title }}</TypographyTitle>
      <TypographyHeadline :content="data.headline" />
      <VForm :form="data.form" class="mt-4" />
    </div>
  </BlockContainer>
</template>
