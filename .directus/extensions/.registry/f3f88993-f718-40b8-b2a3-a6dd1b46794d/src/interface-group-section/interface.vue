<template>
	<div class="group-section py-9 border-b border-b-solid border-slate-200" >
		<v-form
			:initial-values="initialValues"
			:fields="fields"
			:model-value="values"
			:primary-key="primaryKey"
			:group="field.meta?.field"
			:validation-errors="validationErrors"
			:loading="loading"
			:disabled="disabled"
			:badge="badge"
			:raw-editor-enabled="rawEditorEnabled"
			:direction="direction"
			:show-no-visible-fields="false"
			:show-validation-errors="false"
			@update:model-value="$emit('apply', $event)"
			class="grid-cols-1 !lg:grid-cols-3"
			:class="[gap]"
		/>
	</div>
</template>

<script setup lang="ts">
import { Field, ValidationError } from '@directus/types';

withDefaults(
	defineProps<{
		field: Field;
		fields: Field[];
		values: Record<string, unknown>;
		initialValues: Record<string, unknown>;
		primaryKey: number | string;
		disabled?: boolean;
		batchMode?: boolean;
		batchActiveFields?: string[];
		loading?: boolean;
		validationErrors?: ValidationError[];
		badge?: string;
		rawEditorEnabled?: boolean;
		direction?: string;
		gap?: string;
	}>(),
	{
		batchActiveFields: () => [],
		validationErrors: () => [],
		gap: 'gap-6'
	}
);

defineEmits(['apply']);
</script>
