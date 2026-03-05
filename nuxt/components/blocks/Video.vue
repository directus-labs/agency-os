<script setup lang="ts">
import type { BlockVideo } from '~/types';

const props = defineProps<{
	data: BlockVideo;
}>();

const { fileUrl } = useFiles();

const url = computed(() => {
	if (props.data.type === 'file' && props.data.video_file) {
		return fileUrl(props.data.video_file as string);
	}

	if (props.data.type === 'url' && props.data.video_url) {
		return props.data.video_url;
	}

	return null;
});
</script>
<template>
	<BlockContainer>
		<TypographyTitle v-if="data.title">{{ data.title }}</TypographyTitle>
		<TypographyHeadline v-if="data.headline" :content="data.headline" size="lg" />
		<VVideo
			v-if="url"
			class="relative mt-6 overflow-hidden border dark:border-gray-700 rounded-card"
			:url="url"
			:title="data.title ?? undefined"
		/>
	</BlockContainer>
</template>
