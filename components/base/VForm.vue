<script setup lang="ts">
import { Form } from '~~/types'

const props = defineProps<{
  form: Form
}>()

const { $directus } = useNuxtApp()

// Get query params to allow prefilling of form fields
const { query } = useRoute()
const formData = reactive({ ...query })
const loading = ref(false)
const error = ref(null)
const success = ref(false)

function tranformSchema(schema: Array<{}>) {
  // Loop through the form schema from Directus
  // This is required for FormKit to work
  const items = unref(schema)
  return items.map((item: any) => {
    // Change 'type' key for each object to '$formkit'
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

async function submitForm() {
  loading.value = true
  try {
    await $directus.items('inbox').createOne({
      data: formData,
    })
    success.value = true
    if (props.form.on_success === 'redirect') {
      return navigateTo(props.form.redirect_url)
    }
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div v-auto-animate>
    <div class="mb-4">
      <VAlert v-if="error" type="error">Oops! {{ error }}</VAlert>
      <VAlert
        v-if="form.on_success === 'message' && success"
        type="success"
        v-html="
          form.success_message ?? 'Success! Your form has been submitted.'
        "
      />
    </div>
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
