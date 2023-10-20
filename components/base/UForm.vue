<script setup lang="ts">
import type { Form } from '~/types';
import { transformSchema } from '~/utils/formkit';

const props = defineProps<{
	form: Form;
}>();

const emit = defineEmits(['submit', 'update:modelValue']);

// Get query params to allow prefilling of form fields
const { query } = useRoute();
const formData = reactive({ ...query });
const loading = ref(false);
const error = ref(null);
const success = ref(false);

const schema = transformSchema(props.form.schema);

const validate = (state: any): FormError[] => {
	const errors = [];
	if (!state.email) errors.push({ path: 'email', message: 'Required' });
	if (!state.password) errors.push({ path: 'password', message: 'Required' });
	return errors;
};

async function submitForm() {
	loading.value = true;
	try {
		await useDirectus(
			$createItem('inbox', {
				data: formData,
			}),
		);
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
		<!-- <FormKit v-if="!success" type="form" v-model="formData" @submit="submitForm" :submit-label="form.submit_label"> -->
		<div>
			<FormCustom
				:schema="props.form.schema"
				:state="formData"
				:validate="validate"
				class="grid gap-6 md:grid-cols-6"
			/>
			<!-- <FormKitSchema :schema="schema" /> -->
		</div>
		<!-- </FormKit> -->
	</div>
</template>
