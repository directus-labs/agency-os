<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp();
const { params, path } = useRoute();

function getSlug() {
	if (path == '/') {
		return 'home';
	} else return params.slug[0];
}

// Fetch the page data from the Directus API using the Nuxt useAsyncData composable
// https://v3.nuxtjs.org/docs/usage/data-fetching#useasyncdata
const {
	data: page,
	pending,
	error,
} = await useAsyncData(
	path,
	() => {
		return $directus.request(
			$readItems('pages', {
				filter: {
					slug: { _eq: getSlug() },
				},
				limit: 1,
			}),
		);
	},
	{
		transform: (data: object) => data[0],
		pick: ['title', 'blocks', 'slug', 'id', 'seo'],
	},
);

if (!page.value) {
	throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}
</script>
<template>
	<NuxtErrorBoundary>
		<!-- Render the page using the PageBuilder component -->
		<PageBuilder :page="page" />

		<!-- If there is an error, display it using the VAlert component -->
		<template #error="{ error }">
			<BlockContainer>
				<VAlert type="error">{{ error }}</VAlert>
			</BlockContainer>
		</template>
	</NuxtErrorBoundary>
</template>
