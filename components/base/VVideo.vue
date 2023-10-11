<script setup lang="ts">
import { generateVideoEmbed } from '~~/utils/embed';
interface VideoProps {
	url: string;
	title?: string;
	name?: string;
}

defineProps<VideoProps>();
</script>

<template>
	<iframe
		class="w-full aspect-video"
		:id="name"
		loading="lazy"
		:src="generateVideoEmbed(url)"
		frameborder="0"
		allow="autoplay; fullscreen; picture-in-picture"
		allowfullscreen
		:title="title"
	></iframe>
</template>

<style>
.aspect-video {
	aspect-ratio: 16 / 9;
}
</style>
