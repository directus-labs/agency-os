<script setup lang="ts">
const { progress, scrollToTop } = useScroll();
</script>
<template>
	<div class="flex items-center">
		<div class="relative">
			<RadialProgress :radius="25" :progress="progress" :stroke="5" class="text-primary/75" />
			<button
				v-if="progress >= 0.95"
				class="absolute inset-0 flex items-center justify-center"
				@click="() => scrollToTop()"
			>
				<UIcon name="material-symbols:arrow-upward-rounded" class="w-4 h-4 text-primary/75 hover:text-gray-500" />
			</button>
		</div>
		<span
			v-if="progress >= 0.95"
			class="p-1.5 text-gray-700 bg-gray-300 bg-opacity-50 rounded-xl dark:bg-gray-700 dark:text-gray-200 font-display"
		>
			fin.
		</span>
	</div>
</template>
