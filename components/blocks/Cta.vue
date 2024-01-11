<script setup lang="ts">
import type { BlockButtonGroup, BlockCta } from '~/types';

defineProps<{
	data: BlockCta;
}>();
</script>
<template>
	<BlockContainer>
		<div class="relative overflow-hidden p-8 text-gray-900 border md:px-10 md:py-8 border-primary/50 rounded-panel">
			<div
				class="absolute inset-0 bg-gradient-to-br from-white via-gray-300 to-primary dark:from-gray-800 dark:via-gray-900 dark:to-gray-600"
			/>
			<div class="absolute inset-0 opacity-50 grain-bg dark:opacity-10" />
			<div class="relative md:flex md:items-center md:justify-between md:space-x-4">
				<div>
					<TypographyTitle v-if="data?.title">{{ data.title }}</TypographyTitle>
					<TypographyHeadline v-if="data.headline" :content="data.headline" class="font-bold" />
					<TypographyProse v-if="data.content" :content="data.content" class="mt-2" />
				</div>
				<div class="flex-shrink-0 mt-4 md:mt-0">
					<BlocksButtonGroup v-if="data.button_group" :data="data.button_group as BlockButtonGroup" />
				</div>
			</div>
		</div>
	</BlockContainer>
</template>
