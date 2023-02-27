<script setup lang="ts">
import { PropType } from 'vue'
import { CheckBadgeIcon } from '@heroicons/vue/24/outline'
import { ArrowRightIcon } from '@heroicons/vue/24/solid'
type Form = {
  id: string
  headline: string
  form: {
    schema: Array<{
      id: string
      type: string
      label: string
      placeholder: string
      required: boolean
    }>
  }
}
const props = defineProps({
  data: {
    type: Object as PropType<Form>,
    required: true,
  },
})

function tranformSchema(schema: object) {
  // Loop through the form schema and change 'type' key for each object to '$formkit'
  // This is required for FormKit to work
  const items = unref(schema)
  return items.map((item: any) => {
    item.$formkit = item.type
    return item
  })
}

const schema = tranformSchema(props.data.form.schema)
const { fileUrl } = useFiles()
</script>
<template>
  <PageContainer class="">
    <TypographyTitle>{{ data.title }}</TypographyTitle>
    <TypographyHeadline :content="data.headline" />
    <FormKit type="form" outer-class="space-y-4">
      <FormKitSchema :schema="schema" />
    </FormKit>
  </PageContainer>
</template>
