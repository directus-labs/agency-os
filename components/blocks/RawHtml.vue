<script setup lang="ts">
export interface RawHtmlBlockProps {
	id: string;
	raw_html: string;
}

defineProps<{
	data: RawHtmlBlockProps;
}>();
</script>
<template>
	<BlockContainer>
		<div v-html="data.raw_html" />
	</BlockContainer>
</template>
