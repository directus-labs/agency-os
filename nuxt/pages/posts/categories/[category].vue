<script setup lang="ts">
const { params, path } = useRoute();
const { globals } = useAppConfig();
const { fileUrl } = useFiles();

const { data } = await useAsyncData(
	path,
	() => {
		const categoryPromise = useDirectus(
			readItems('categories', {
				filter: {
					slug: {
						_eq: params.category,
					},
				},
				fields: [
					'title',
					'slug',
					'color',
					'headline',

					{
						seo: ['*'],
					},
				],
				limit: 1,
			}),
		);

		const postsPromise = useDirectus(
			readItems('posts', {
				filter: {
					category: {
						slug: {
							_eq: params.category,
						},
					},
				},
				sort: ['date_published'],
				fields: [
					'title',
					'slug',
					'summary',
					'date_published',
					'image',
					'type',
					{
						category: ['title', 'slug', 'color'],
						author: ['image', 'name', 'job_title'],
					},
				],
			}),
		);

		return Promise.all([categoryPromise, postsPromise]);
	},
	{
		transform: ([category, posts]) => {
			return {
				category: category[0],
				posts,
			};
		},
	},
);

const category = computed(() => unref(data)?.category ?? {});
const posts = computed(() => unref(data)?.posts ?? []);

// Compute metadata here to make it easier to populate all the different SEO tags
const metadata = computed(() => {
	const pageData = unref(category);
	return {
		title: pageData?.seo?.title ?? pageData?.title ?? undefined,
		description: pageData?.seo?.meta_description ?? stripHTML(pageData?.headline) ?? undefined,
		image: globals?.og_image ? fileUrl(globals?.og_image) : undefined,
	};
});

// Dynamic OG Images
defineOgImageComponent('OgImageTemplate', {
	title: unref(metadata)?.title,
	summary: unref(metadata)?.description,
	imageUrl: unref(metadata)?.image,
	badgeColor: unref(category)?.color ?? undefined,
	badgeLabel: unref(category)?.title ?? undefined,
});

// JSON-LD
useSchemaOrg([
	defineWebPage({
		'@type': 'CollectionPage',
		name: unref(metadata)?.title,
		description: unref(metadata)?.description,
	}),
]);

// Page Title
useHead({
	title: () => unref(metadata)?.title,
});

// SEO Meta
useServerSeoMeta({
	title: () => unref(metadata)?.title,
	description: () => unref(metadata)?.description,
	ogTitle: () => unref(metadata)?.title,
	ogDescription: () => unref(metadata)?.description,
});
</script>
<template>
	<BlockContainer>
		<header class="pb-6 border-b-2 border-gray-300 dark:border-gray-700">
			<TypographyTitle>{{ category.title }}</TypographyTitle>
			<TypographyHeadline :content="category.headline" />
			<div></div>
		</header>
		<section class="relative items-center w-full py-12 space-y-12">
			<div
				class="relative grid gap-12 pb-12 border-b-2 border-gray-300 md:grid-cols-2 lg:grid-cols-4 dark:border-gray-700"
			>
				<div>
					<TypographyTitle as="p" class="text-gray-700 dark:text-gray-400">Search</TypographyTitle>
					<GlobalSearch :collections="['posts']" class="flex" />
					<TypographyTitle as="p" class="mt-8 text-gray-700 dark:text-gray-400">Categories</TypographyTitle>
					<Categories />
				</div>
				<div class="space-y-4 lg:col-span-3">
					<TypographyTitle as="p">Items for Category: {{ deslugify(params.category as string) }}</TypographyTitle>
					<div class="relative grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-4">
						<PostCard
							v-for="post in posts"
							:key="post.id"
							:post="post"
							class="col-span-2 pb-6 border-b border-gray-300 dark:border-gray-700"
						/>
					</div>
				</div>
			</div>
		</section>
	</BlockContainer>
</template>
