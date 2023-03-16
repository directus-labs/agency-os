<script setup lang="ts">
import { PropType } from 'vue'
import { CheckBadgeIcon } from '@heroicons/vue/24/outline'
import { ArrowRightIcon } from '@heroicons/vue/24/solid'
type Form = {
  id: string
  headline: string
  form: {
    id: string
    key?: string
    schema: Array<{
      id: string
      type: string
      label: string
      placeholder: string
      required: boolean
    }>
    submit_label?: string
  }
}
const props = defineProps({
  data: {
    type: Object as PropType<Form>,
    required: true,
  },
})

const { fileUrl } = useFiles()
</script>
<template>
  <section>
    <PageContainer class="">
      <TypographyTitle>{{ data.title }}</TypographyTitle>
      <TypographyHeadline :content="data.headline" />
      <div
        class="p-8 mt-4 bg-gray-100 dark:bg-gray-800 rounded-bl-3xl rounded-tr-3xl"
      >
        <VForm :form="data.form" />
      </div>
    </PageContainer>
  </section>
</template>
