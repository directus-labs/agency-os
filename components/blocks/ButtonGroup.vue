<script setup lang="ts">
import type { BlockButtonGroup, BlockButton, Page, Post } from '~/types';

defineProps<{
	data: BlockButtonGroup;
}>();

function getUrl(button: BlockButton): string | undefined {
	switch (button.type) {
		case 'pages':
			return (button.page as Page)?.permalink ?? undefined;
		case 'posts':
			return (button.post as Post)?.slug ?? undefined;
		case 'external':
			return button.external_url ?? undefined;
		default:
			return undefined;
	}
}
</script>
<template>
	<div :class="`flex flex-col justify-${data.alignment} space-y-4 md:space-x-4 md:flex-row md:space-y-0`">
		<UButton
			v-for="button in data.buttons as BlockButton[]"
			:key="button.id"
			:to="getUrl(button)"
			:color="button?.color"
			:variant="button?.variant"
			:target="button?.external_url ? '_blank' : '_self'"
			:label="button?.label ?? undefined"
			size="xl"
			trailing-icon="material-symbols:arrow-forward-rounded"
		/>
	</div>
</template>
