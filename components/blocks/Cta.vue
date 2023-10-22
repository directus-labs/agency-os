<script setup lang="ts">
import type { BlockCta } from '~/types';

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
					<UButton
						v-for="button in data.buttons"
						:key="button.id"
						:href="button.href"
						:target="button.open_in_new_window ? '_blank' : '_self'"
						size="xl"
						color="black"
						:label="button.label"
						trailing-icon="material-symbols:arrow-forward-rounded"
					>
						{{ button.label }}
					</UButton>
				</div>
			</div>
		</div>
	</BlockContainer>
</template>
