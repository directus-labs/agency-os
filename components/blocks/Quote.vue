<script setup lang="ts">
export interface QuoteBlockProps {
	id: string;

	title: string;
	subtitle: string;
	content: string;
}

defineProps<{
	data: QuoteBlockProps;
}>();

const { fileUrl } = useFiles();
</script>
<template>
	<BlockContainer>
		<div class="relative mx-auto max-w-screen-2xl">
			<div class="">
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
					class="pl-3 font-serif text-4xl italic leading-tight text-gray-900 xl:w-3/4 md:leading-tight indent-3 md:-indent-6 dark:text-gray-100 md:pl-6 md:text-6xl"
					v-html="data.content"
				></div>

				<div class="flex justify-end mt-6">
					<div
						class="w-full pl-3 font-mono text-sm font-bold tracking-widest text-right uppercase word-spacing-tight lg:text-base sm:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 md:pl-0 sm:text-left"
					>
						<div class="p-4 bg-white rounded-bl-none dark:bg-gray-800 chat rounded-xl">
							<div v-if="data.title" class="text-accent">
								{{ data.title }}
							</div>
							<div class="dark:text-white" v-if="data.subtitle">{{ data.subtitle }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</BlockContainer>
</template>
