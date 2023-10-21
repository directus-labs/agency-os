<script setup lang="ts">
const { fileUrl } = useFiles();
const { globals } = useAppConfig();
const { params, path } = useRoute();

const componentMap = {
	blog: resolveComponent('PostBlog'),
	project: resolveComponent('PostProject'),
	video: resolveComponent('PostVideo'),
};

const { data: page } = await useAsyncData(
	path,
	() => {
		return useDirectus(
			readItems('posts', {
				filter: { slug: { _eq: params.slug } },
				limit: 1,
				fields: [
					'title',
					'summary',
					'slug',
					'content',
					'date_published',
					'image',
					'type',
					'client',
					'cost',
					'built_with',
					'video_url',
					{
						gallery: [{ directus_files_id: ['id', 'title', 'description'] }],
						author: ['name', 'job_title', 'image'],
						category: ['title', 'slug', 'color'],
						seo: ['meta_description', 'og_title', 'og_image'],
					},
				],
			}),
		);
	},
	{
		transform: (data) => data[0],
	},
);

// Compute metadata here to make it easier to populate all the different SEO tags
const metadata = computed(() => {
	const pageData = unref(page);
	return {
		title: pageData?.seo?.title ?? pageData?.title ?? undefined,
		description: pageData?.seo?.meta_description ?? pageData?.summary ?? undefined,
		image: pageData?.image ? fileUrl(pageData?.image) : undefined,
		authorImage: pageData?.author?.image ? fileUrl(pageData?.author?.image) : undefined,
		authorName: pageData?.author?.name ?? undefined,
	};
});

// Dynamic OG Images
defineOgImage({
	title: unref(metadata)?.title,
	summary: unref(metadata)?.description,
	imageUrl: unref(metadata)?.image,
	authorName: unref(metadata)?.authorName,
	authorImage: unref(metadata)?.authorImage,
	badgeColor: unref(page)?.category?.color ?? undefined,
	badgeLabel: unref(page)?.category?.title ?? undefined,
});

// JSON-LD
useSchemaOrg([
	defineArticle({
		headline: unref(metadata)?.title,
		description: unref(metadata)?.description,
		image: unref(metadata)?.image,
		datePublished: unref(page)?.date_published ?? undefined,
		author: [
			{
				name: unref(metadata)?.authorName,
				url: unref(page)?.author?.slug ? `https://directus.io/team/${unref(page)?.author?.slug}` : undefined,
				image: unref(metadata)?.authorImage,
			},
		],
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
	<div>
		<!-- Use the component map to render the correct component based on the type of the post -->
		<component :is="componentMap[page.type]" :page="page" />
	</div>
</template>
