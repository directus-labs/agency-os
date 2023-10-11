<script setup lang="ts">
import { convertIconName } from '~~/utils/strings';
const { $directus, $readItems } = useNuxtApp();
const { params, path } = useRoute();

const {
	data: collection,
	pending,
	error,
} = await useAsyncData(
	path,
	() => {
		return $directus.request(
			$readItems('help_collections', {
				filter: {
					slug: {
						_eq: params.slug,
					},
				},
				fields: ['*', 'articles.slug', 'articles.title', 'articles.id', 'articles.summary'],
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
		<HelpCollectionsDetail base-url="" />
	</BlockContainer>
</template>
