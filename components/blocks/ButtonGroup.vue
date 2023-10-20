<script setup lang="ts">
import type { BlockButtonGroup, BlockButton } from '~/types';

defineProps({
	data: {
		type: Object as PropType<BlockButtonGroup>,
		required: true,
	},
});

function getUrl(button: BlockButton) {
	if (button.type === 'pages') {
		return button.page?.permalink ?? undefined;
	} else if (button.type === 'posts') {
		return button.post?.slug ?? undefined;
	} else if (button.type === 'external') {
		return button.external_url;
	} else {
		return undefined;
	}
}
</script>
<template>
	<div class="flex flex-col space-y-4 md:space-x-4 md:flex-row md:space-y-0">
		<UButton
			v-for="(button, buttonIdx) in data.buttons"
			:key="buttonIdx"
			:to="getUrl(button)"
			:color="button.color"
			:variant="button.variant"
			:target="button.open_in_new_window ? '_blank' : '_self'"
			size="xl"
			trailing-icon="material-symbols:arrow-forward-rounded"
		>
			{{ button.label }}
		</UButton>
	</div>
</template>
