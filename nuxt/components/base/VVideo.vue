<script setup lang="ts">
import { generateVideoEmbed } from '~~/utils/embed';

interface VideoProps {
	url: string;
	title?: string | null | undefined;
	name?: string;
}

defineProps<VideoProps>();
</script>

<template>
	<iframe
		:id="name"
		class="w-full aspect-video"
		loading="lazy"
		:src="generateVideoEmbed(url)"
		frameborder="0"
		allow="autoplay; fullscreen; picture-in-picture"
		allowfullscreen
		:title="title as string"
	></iframe>
</template>

<style>
.aspect-video {
	aspect-ratio: 16 / 9;
}
</style>
