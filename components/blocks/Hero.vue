<script setup lang="ts">
import type { BlockHero } from '~/types';

defineProps<{
	data: BlockHero;
}>();
</script>
<template>
	<BlockContainer class="relative grid gap-6 md:grid-cols-3">
		<!-- Content -->
		<div class="md:pt-12 md:col-span-2">
			<TypographyHeadline :content="data.headline" size="title" as="h1" />
			<TypographyProse :content="data.content" size="lg" class="py-6 font-display" />
			<BlocksButtonGroup :data="data.button_group" />
		</div>
		<!-- Image -->
		<div
			v-if="data.image"
			class="overflow-hidden border lg:-mr-48 md:-mr-16 lg:relative lg:h-full dark:border-gray-700 rounded-xl"
		>
			<NuxtImg
				class="w-full overflow-hidden dark:brightness-90 max-h-[700px] h-full object-cover rounded-lg"
				:src="data.image"
				alt=""
			/>
		</div>
	</BlockContainer>
</template>
