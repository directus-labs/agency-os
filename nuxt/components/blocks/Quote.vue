<script setup lang="ts">
import type { BlockQuote } from '~/types';

defineProps<{
	data: BlockQuote;
}>();
</script>
<template>
	<BlockContainer>
		<div
			v-motion
			:initial="{
				opacity: 0,
				y: 100,
			}"
			:visibleOnce="{
				opacity: 1,
				y: 0,
				transition: {
					delay: 250,
				},
			}"
			class="relative"
		>
			<div
				class="relative text-4xl italic leading-tight text-gray-900 font-display md:leading-tight dark:text-gray-100 md:text-6xl text-wrap-[balance] dark:drop-shadow"
				v-html="data.content"
			/>
			<UIcon
				name="material-symbols:format-quote-rounded"
				class="absolute w-20 h-20 rotate-180 -left-8 text-primary/20 -top-8"
			/>
		</div>

		<div class="w-full mt-4 text-sm font-semibold tracking-wider uppercase word-spacing-tight lg:text-lg font-display">
			<p v-if="data.title" class="text-primary">
				{{ data.title }}
			</p>
			<p v-if="data.subtitle" class="dark:text-white">{{ data.subtitle }}</p>
		</div>
	</BlockContainer>
</template>
