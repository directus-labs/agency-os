<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp();
const { params, path } = useRoute();

const pageFilter = computed(() => {
	let finalPath;

	if (path === '/') {
		finalPath = '/';
	} else if (path.endsWith('/')) {
		finalPath = path.slice(0, -1);
	} else {
		finalPath = path;
	}

	return { permalink: { _eq: finalPath } };
});

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
				filter: unref(pageFilter),
				fields: [
					'*',
					{
						seo: ['*'],
						blocks: [
							'id',
							'collection',
							'hide_block',
							{
								item: {
									block_hero: ['id', 'title', 'headline', 'content', 'image', 'buttons', 'image_position'],
									block_faqs: ['id', 'title', 'faqs', 'headline', 'alignment'],
									block_richtext: ['id', 'title', 'headline', 'content', 'alignment'],
									block_testimonials: [
										'id',
										'title',
										'headline',
										{
											testimonials: [
												{
													testimonials_id: [
														'id',
														'title',
														'subtitle',
														'content',
														'company',
														'company_logo',
														{ image: ['id', 'title', 'description'] },
													],
												},
											],
										},
									],
									block_quote: ['id', 'title', 'subtitle', 'content'],
									block_cta: ['id', 'title', 'headline', 'content', 'buttons'],
									block_form: ['id', 'title', 'headline', { form: ['*'] }],
									block_logocloud: ['id', 'title', 'headline', { logos: ['*'] }],
									block_gallery: [
										'id',
										'title',
										'headline',
										{
											gallery_items: [
												{
													directus_files_id: ['id', 'title', 'description'],
												},
											],
										},
									],
									block_steps: [
										'id',
										'title',
										'headline',
										'show_step_numbers',
										'alternate_image_position',
										{
											steps: ['id', 'title', 'content', 'image'],
										},
									],
									block_columns: [
										'id',
										'title',
										'headline',
										{
											rows: [
												'title',
												'headline',
												'content',
												'image_position',
												{ image: ['id', 'title', 'description'] },
											],
										},
									],
									block_divider: ['id', 'title'],
									block_team: ['*'],
									block_html: ['*'],
									block_video: ['*'],
									block_cardgroup: ['*'],
								},
							},
						],
					},
				],
				limit: 1,
			}),
		);
	},
	{
		transform: (data) => {
			return data[0];
		},
	},
);

if (!unref(page)) {
	throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}

defineOgImage({
	title: 'My awesome home page.',
	summary:
		'Laboris deserunt occaecat esse incididunt laborum tempor adipisicing minim ex tempor eu est. Dolore occaecat anim mollit laborum anim exercitation eiusmod occaecat aliqua. Laborum est in mollit ad eiusmod cupidatat dolore sunt. Minim nisi nostrud voluptate esse Lorem minim velit nulla.',
	imageUrl:
		'https://images.unsplash.com/photo-1603202662706-62ead3176b8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1569&q=80',
	authorName: 'Bryant Gillespie',
	authorImage:
		'https://images.unsplash.com/photo-1603202662706-62ead3176b8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1569&q=80',

	badgeLabel: 'Badge Label',
	badgeColor: 'gray',
});

useHead({
	title: computed(() => unref(page)?.seo?.title ?? unref(page)?.title ?? null),
});

useServerSeoMeta({
	title: computed(() => unref(page)?.seo?.title ?? unref(page)?.title ?? null),
	description: computed(() => unref(page)?.seo?.meta_description ?? null),
	ogTitle: computed(() => unref(page)?.seo?.title ?? unref(page)?.title ?? null),
	ogDescription: computed(() => unref(page)?.seo?.meta_description ?? null),
});

useSchemaOrg([
	defineWebPage({
		url: `${path}`,
		name: unref(page)?.seo?.title ?? unref(page)?.title ?? undefined,
		description: unref(page)?.seo?.meta_description ?? undefined,
	}),
]);
</script>
<template>
	<NuxtErrorBoundary>
		<!-- Render the page using the PageBuilder component -->
		<PageBuilder v-if="page" :page="page" />

		<!-- If there is an error, display it using the VAlert component -->
		<template #error="{ error }">
			<BlockContainer>
				<VAlert type="error">{{ error }}</VAlert>
			</BlockContainer>
		</template>
	</NuxtErrorBoundary>
</template>
