<script setup lang="ts">
import type { BlockForm, Form } from '~/types';

defineProps<{
	data: BlockForm;
}>();
</script>
<template>
	<BlockContainer>
		<div class="max-w-3xl p-8 mx-auto mt-4 bg-gray-100 dark:bg-gray-800 rounded-panel">
			<TypographyTitle v-if="data?.title">{{ data?.title }}</TypographyTitle>
			<TypographyHeadline v-if="data?.headline" :content="data?.headline" />
			<UForm v-if="data?.form" :form="data?.form as Form" class="mt-4" />
		</div>
	</BlockContainer>
</template>
