<script setup lang="ts">
const { path } = useRoute();
const { globals } = useAppConfig();
const { fileUrl } = useFiles();

const { data } = await useAsyncData(
	path,
	() => {
		const postPromise = useDirectus(
			readItems('posts', {
				sort: ['date_published'],
				fields: [
					'*',
					{
						category: ['title', 'slug', 'color'],
						author: ['name', 'job_title', 'image'],
					},
				],
			}),
		);

		const pagePromise = useDirectus(
			readSingleton('pages_blog', {
				fields: [
					'*',
					{
						seo: ['*'],
						featured_post: [
							'id',
							'slug',
							'title',
							'summary',
							'type',
							{ image: ['id', 'title', 'description'], author: ['name', 'image', 'job_title'] },
						],
					},
				],
			}),
		);

		return Promise.all([postPromise, pagePromise]);
	},
	{
		transform: ([posts, page]) => {
			return {
				posts,
				page,
			};
		},
	},
);

const page = computed(() => {
	return unref(data)?.page;
});

const posts = computed(() => {
	// If the featured post is in the posts array, remove it
	const posts = unref(data)?.posts.filter((post) => post.id !== unref(page)?.featured_post?.id);
	return posts;
});

// Compute metadata here to make it easier to populate all the different SEO tags
const metadata = computed(() => {
	const pageData = unref(page);
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
		<header class="pb-6 border-b border-gray-300 dark:border-gray-700">
			<TypographyTitle>{{ page?.title }}</TypographyTitle>
			<TypographyHeadline :content="page?.headline" />
		</header>
		<section class="relative w-full py-12 space-y-12">
			<div
				class="relative grid w-full gap-12 pb-12 border-b-2 border-gray-300 md:grid-cols-2 lg:grid-cols-4 dark:border-gray-700"
			>
				<div>
					<TypographyTitle class="text-gray-700 dark:text-gray-400">Search</TypographyTitle>
					<GlobalSearch :collections="['posts']" class="flex" />
					<TypographyTitle class="mt-8 text-gray-700 dark:text-gray-400">Categories</TypographyTitle>
					<Categories class="" />
				</div>
				<div class="space-y-4 lg:col-span-3">
					<TypographyTitle>Featured Article</TypographyTitle>
					<PostCard :post="page?.featured_post" direction="horizontal" />
				</div>
			</div>
			<div class="space-y-4">
				<TypographyTitle>Latest & Greatest</TypographyTitle>
				<div class="relative grid gap-8 md:gap-12 md:grid-cols-3 lg:grid-cols-6">
					<PostCard
						v-for="(post, postIdx) in posts"
						:key="post.id"
						:post="post"
						:class="[
							'border-b border-gray-300 pb-6 dark:border-gray-700',
							// Make the first two posts span two columns
							postIdx < 2 ? 'md:col-span-3' : 'md:col-span-2',
						]"
					/>
				</div>
			</div>
		</section>
	</BlockContainer>
</template>
