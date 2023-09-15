<script setup lang="ts">
import { Form } from '~~/types';
import { transformSchema } from '~/utils/formkit';

const props = defineProps<{
	form: Form;
}>();

const { $directus } = useNuxtApp();
const emit = defineEmits(['submit', 'update:modelValue']);

// Get query params to allow prefilling of form fields
const { query } = useRoute();
const formData = reactive({ ...query });
const loading = ref(false);
const error = ref(null);
const success = ref(false);

const schema = transformSchema(props.form.schema);

async function submitForm() {
	loading.value = true;
	try {
		await $directus.items('inbox').createOne({
			data: formData,
		});
		success.value = true;
		if (props.form.on_success === 'redirect') {
			return navigateTo(props.form.redirect_url);
		}
	} catch (err) {
		error.value = err;
	} finally {
		loading.value = false;
	}
}

watch(
	formData,
	() => {
		emit('update:modelValue', formData);
	},
	{ deep: true },
);
</script>
<template>
	<div v-auto-animate>
		<div class="mb-4">
			<VAlert v-if="error" type="error">Oops! {{ error }}</VAlert>
			<VAlert
				v-if="form.on_success === 'message' && success"
				type="success"
				v-html="form.success_message ?? 'Success! Your form has been submitted.'"
			/>
		</div>
		<FormKit v-if="!success" type="form" v-model="formData" @submit="submitForm" :submit-label="form.submit_label">
			<div class="grid gap-6 md:grid-cols-6">
				<FormKitSchema :schema="schema" />
			</div>
		</FormKit>
	</div>
</template>
