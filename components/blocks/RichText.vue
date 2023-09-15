<script setup lang="ts">
export interface RichTextBlockProps {
	id: string;
	title: string;
	headline: string;
	content: string;
	alignment: 'left' | 'center';
}

withDefaults(
	defineProps<{
		data: RichTextBlockProps;
	}>(),
	{
		alignment: 'center',
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
			<TypographyHeadline v-if="data.headline" :content="data.headline" size="xl" />
		</div>
		<TypographyProse
			:content="data.content"
			:class="[
				{
					'mx-auto': data.alignment === 'center',
				},
				'mt-8 font-mono',
			]"
		/>
	</BlockContainer>
</template>
