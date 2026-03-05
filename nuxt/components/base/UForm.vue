<script setup lang="ts">
import type { Form } from '~/types';
import type { FormError } from '@nuxt/ui/dist/runtime/types';

const props = defineProps<{
	form: Form;
}>();

const emit = defineEmits(['submit', 'update:modelValue']);

// Get query params to allow prefilling of form fields
const { query } = useRoute();
const formData = reactive({ ...query });
const loading = ref(false);
const error: any = ref(null);
const success = ref(false);

const validate = (state: any): FormError[] => {
	const errors = [];
	if (!state.email) errors.push({ path: 'email', message: 'Required' });

	return errors;
};

async function submitForm() {
	loading.value = true;

	try {
		await useDirectus(
			createItem('inbox', {
				data: formData,
				form: props.form.id,
			}),
		);

		success.value = true;

		if (props.form.on_success === 'redirect') {
			return navigateTo(props.form.redirect_url);
		}
	} catch (err: any) {
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
			<VAlert v-if="form.on_success === 'message' && success" type="success">
				<div v-if="form.success_message" v-dompurify-html="form.success_message"></div>
				<p v-else>Success! Your form has been submitted.</p>
			</VAlert>
		</div>
		<div>
			<FormCustom
				v-if="!success"
				:schema="props.form.schema"
				:state="formData"
				:validate="validate"
				class="grid gap-6 md:grid-cols-6"
				:on-submit="submitForm"
			/>
		</div>
	</div>
</template>
