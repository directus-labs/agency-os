<script setup lang="ts">
import type { BlockRichtext } from '~/types';

withDefaults(
	defineProps<{
		data: BlockRichtext;
	}>(),
	{
		data: () => ({
			alignment: 'center',
		}),
	},
);
</script>

<template>
	<BlockContainer>
		<div
			:class="[
				{
					'text-left': data.alignment === 'left',
					'text-center': data.alignment === 'center',
				},
			]"
		>
			<TypographyTitle v-if="data.title">{{ data.title }}</TypographyTitle>
			<TypographyHeadline v-if="data.headline" :content="data.headline" size="lg" />
		</div>
		<TypographyProse
			v-if="data.content"
			:content="data.content"
			:class="[
				{
					'mx-auto': data.alignment === 'center',
				},
				'mt-8 ',
			]"
		/>
	</BlockContainer>
</template>
