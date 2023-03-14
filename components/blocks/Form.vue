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

const { $directus } = useNuxtApp()
const form = reactive({})
const loading = ref(false)
const error = ref(null)
const success = ref(false)

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

async function submitForm() {
  loading.value = true
  try {
    await $directus.items('inbox').createOne({
      //   form: props.data.form.id,
      data: form,
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
  <section>
    <PageContainer class="">
      <TypographyTitle>{{ data.title }}</TypographyTitle>
      <TypographyHeadline :content="data.headline" />
      <div
        class="p-8 mt-4 bg-gray-100 dark:bg-gray-800 rounded-bl-3xl rounded-tr-3xl"
      >
        <VAlert v-if="error" type="error">Oops! {{ error }}</VAlert>
        <VAlert v-if="success" type="success">
          Success! Your form has been submitted.
        </VAlert>
        <FormKit
          v-if="!success"
          type="form"
          v-model="form"
          @submit="submitForm"
        >
          <FormKitSchema :schema="schema" />
        </FormKit>
      </div>
    </PageContainer>
  </section>
</template>
