<script setup lang="ts">
import type { BlockButtonGroup, BlockColumn, BlockColumnRow } from '~/types';

defineProps<{
	data: BlockColumn;
}>();
</script>

<template>
	<BlockContainer>
		<TypographyTitle v-if="data?.title">{{ data?.title }}</TypographyTitle>
		<TypographyHeadline v-if="data?.headline" :content="data?.headline" />
		<div class="mt-12 space-y-16">
			<div
				v-for="row in data?.rows as BlockColumnRow[]"
				:key="row?.id"
				class="relative grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-24"
			>
				<div class="my-auto">
					<TypographyTitle v-if="row?.title">{{ row?.title }}</TypographyTitle>
					<TypographyHeadline v-if="row?.headline" :content="row?.headline" />
					<TypographyProse v-if="row?.content" :content="row?.content" class="mt-4" />
					<BlocksButtonGroup v-if="row?.button_group" :data="row?.button_group as BlockButtonGroup" class="mt-4" />
				</div>
				<div
					v-if="row.image"
					v-motion
					class="order-first block w-full h-full overflow-hidden border dark:border-gray-700 rounded-card"
					:initial="{ opacity: 0, scale: 0.5, y: 0 }"
					:visibleOnce="{ opacity: 1, scale: 1, y: 0 }"
					:duration="1000"
					:delay="250"
					:class="[
						{
							'lg:order-last': row?.image_position === 'right',
							'lg:order-first': row?.image_position === 'left',
						},
					]"
				>
					<NuxtImg
						:alt="safeRelation(row.image)?.description ?? ''"
						:src="safeRelationId(row.image) ?? ''"
						height="600"
						width="600"
						class="object-cover object-center w-full h-full bg-gray-100 rounded-card dark:brightness-90"
					/>
				</div>
			</div>
		</div>
	</BlockContainer>
</template>
