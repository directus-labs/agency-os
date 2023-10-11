<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp();

const {
	data: collections,
	pending,
	error,
} = await useAsyncData(
	'posts',
	() => {
		return $directus.request(
			$readItems('help_collections', {
				filter: {
					articles: {
						_nnull: true,
					},
				},
			}),
		);
	},
	{
		transform: (data) => data,
	},
);
</script>
<template>
	<BlockContainer>
		<header class="pb-8 border-b border-gray-300 dark:border-gray-700">
			<TypographyTitle>Help Center</TypographyTitle>
			<TypographyHeadline content="<p>How can we <em>help</em> you?</p>" />
			<GlobalSearch placeholder="Search for articles" :collections="['help_articles']" class="flex" />
		</header>

		<HelpCollectionsIndex base-url="" />
	</BlockContainer>
</template>
