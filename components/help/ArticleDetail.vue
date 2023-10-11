<script setup lang="ts">
export interface HelpCollectionsProps {
	baseUrl: string;
}

const props = defineProps<HelpCollectionsProps>();

import { markdownToHtml } from '~~/utils/markdown';
const { $directus, $readItems } = useNuxtApp();
const { params } = useRoute();
// Fetch the page data from the Directus API using the Nuxt useAsyncData composable
// https://v3.nuxtjs.org/docs/usage/data-fetching#useasyncdata
const {
	data: article,
	pending,
	error,
} = await useAsyncData(
	params.slug,
	() => {
		return $directus.request(
			$readItems('help_articles', {
				filter: {
					slug: {
						_eq: params.slug,
					},
				},
				fields: [
					'*',
					'help_collection.slug',
					'help_collection.title',
					'help_collection.id',
					'owner.first_name',
					'owner.last_name',
					'owner.avatar',
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
			<TypographyHeadline v-if="article.title" :content="article.title" />

			<p v-if="article.summary" class="">
				{{ article.summary }}
			</p>
		</div>

		<VAvatar v-if="article.owner" :author="article.owner" />

		<div class="flex-col">
			<article>
				<TypographyProse v-if="article.content" :content="markdownToHtml(article.content)" />
			</article>
		</div>
		<hr class="mt-12 dark:border-gray-700" />
		<!-- Feedback Widget -->
		<HelpFeedback class="mt-4" :title="article.title" :url="`/help/articles/${article.slug}`" />
	</div>
</template>
