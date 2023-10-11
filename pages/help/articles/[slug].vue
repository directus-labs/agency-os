<script setup lang="ts">
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
	<BlockContainer>
		<header class="pb-8 border-b border-gray-300 dark:border-gray-700">
			<GlobalSearch placeholder="Search for articles" :collections="['help_articles']" class="flex" />
		</header>
		<HelpArticleDetail base-url="" />
	</BlockContainer>
</template>
