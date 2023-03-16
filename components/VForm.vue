<script setup lang="ts">
import { PropType } from 'vue'

type Form = {
  form: {
    id: string
    key?: string
    submit_label?: string
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
  form: {
    type: Object as PropType<Form>,
    required: true,
  },
})

const { $directus } = useNuxtApp()
const formData = reactive({})
const loading = ref(false)
const error = ref(null)
const success = ref(false)

function tranformSchema(schema: object) {
  // Loop through the form schema and change 'type' key for each object to '$formkit'
  // This is required for FormKit to work
  const items = unref(schema)
  return items.map((item: any) => {
    item.$formkit = item.type
    // Switch statement to handle item widths
    switch (item.width) {
      case '33':
        item.outerClass = 'md:col-span-2'
        break
      case '50':
        item.outerClass = 'md:col-span-3'
        break
      case '67':
        item.outerClass = 'md:col-span-4'
        break
      case '100':
        item.outerClass = 'md:col-span-6'
        break
      default:
        item.outerClass = 'md:col-span-6'
    }
    return item
  })
}

const schema = tranformSchema(props.form.schema)
const { fileUrl } = useFiles()

async function submitForm() {
  loading.value = true
  try {
    await $directus.items('inbox').createOne({
      //   form: props.data.form.id,
      data: formData,
    })
    success.value = true
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div v-auto-animate>
    <VAlert v-if="error" type="error">Oops! {{ error }}</VAlert>
    <VAlert v-if="success" type="success">
      Success! Your form has been submitted.
    </VAlert>
    <FormKit
      v-if="!success"
      type="form"
      v-model="formData"
      @submit="submitForm"
      :submit-label="form.submit_label"
    >
      <div class="grid gap-6 md:grid-cols-6">
        <FormKitSchema :schema="schema" />
      </div>
    </FormKit>
  </div>
</template>
