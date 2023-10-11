<script setup lang="ts">
import { BlockColumns } from '~/types/blocks';

defineProps<{
	data: BlockColumns;
}>();
</script>

<template>
	<BlockContainer>
		<TypographyTitle v-if="data.title">{{ data.title }}</TypographyTitle>
		<TypographyHeadline v-if="data.headline" :content="data.headline" />
		<div class="mt-12 space-y-16">
			<div v-for="row in data.rows" :key="row.id" class="relative grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-24">
				<div class="my-auto">
					<TypographyTitle v-if="row.title">{{ row.title }}</TypographyTitle>
					<TypographyHeadline v-if="row.headline" :content="row.headline" />
					<TypographyProse v-if="row.content" :content="row.content" class="mt-4" />
				</div>
				<div
					class="order-first block w-full overflow-hidden border aspect-square dark:border-gray-700 rounded-xl"
					:class="[
						{
							'lg:order-last': row.image_position === 'right',
							'lg:order-first': row.image_position === 'left',
						},
					]"
				>
					<NuxtImg
						v-motion
						:initial="{ opacity: 0, scale: 0.8, y: 50 }"
						:visibleOnce="{ opacity: 1, scale: 1, y: 0 }"
						:duration="1000"
						:delay="250"
						class="object-cover object-center w-full h-full bg-gray-100 rounded-md dark:brightness-90"
						:alt="row.image.description ?? ''"
						:src="row.image.id"
					/>
				</div>
			</div>
		</div>
	</BlockContainer>
</template>
