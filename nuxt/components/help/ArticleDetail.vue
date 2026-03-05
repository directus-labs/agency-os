<script setup lang="ts">
export interface HelpCollectionsProps {
	baseUrl?: string;
}

const props = defineProps<HelpCollectionsProps>();

import { markdownToHtml } from '~/utils/markdown';

const { path, params } = useRoute();

const {
	data: article,
	pending,
	error,
} = await useAsyncData(
	path as string,
	() => {
		return useDirectus(
			readItems('help_articles', {
				// @ts-ignore
				filter: {
					slug: {
						_eq: params.slug as string,
					},
				},
				fields: [
					'*',
					{
						help_collection: ['slug', 'title', 'id'],
						owner: ['first_name', 'last_name', 'avatar'],
					},
				],
			}),
		);
	},
	{
		transform: (data) => data[0],
	},
);
</script>
<template>
	<div class="">
		<div class="flex flex-col">
			<TypographyHeadline v-if="article?.title" :content="article?.title" />

			<p v-if="article?.summary" class="">
				{{ article?.summary }}
			</p>
		</div>

		<UserBadge v-if="article?.owner" :user="article?.owner" />

		<div class="flex-col">
			<article>
				<TypographyProse v-if="article?.content" :content="markdownToHtml(article?.content)" />
			</article>
		</div>

		<hr class="mt-12 dark:border-gray-700" />

		<HelpFeedback class="mt-4" :title="article?.title" :url="`/help/articles/${article?.slug}`" />
	</div>
</template>
