<script setup lang="ts">
import type { PostType, SEO, Team, Category } from '~/types';

const { fileUrl } = useFiles();
const { params, path } = useRoute();

const componentMap: Record<PostType, any> = {
	blog: resolveComponent('PostBlog'),
	project: resolveComponent('PostProject'),
	video: resolveComponent('PostVideo'),
};

const { data: page } = await useAsyncData(
	path,
	() => {
		return useDirectus(
			readItems('posts', {
				// @ts-ignore
				filter: { slug: { _eq: params.slug as string } },
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
						seo: ['title', 'meta_description'],
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
	const seo = pageData?.seo as SEO;
	const author = pageData?.author as Team;
	return {
		title: seo?.title ?? pageData?.title ?? undefined,
		description: seo?.meta_description ?? pageData?.summary ?? undefined,
		image: pageData?.image ? fileUrl(pageData?.image as any) : undefined,
		authorImage: author?.image ? fileUrl(author.image as any) : undefined,
		authorName: author?.name ?? undefined,
		category: (pageData?.category as Category) ?? undefined,
	};
});

// Dynamic OG Images
defineOgImageComponent('OgImageTemplate', {
	title: unref(metadata)?.title,
	summary: unref(metadata)?.description,
	imageUrl: unref(metadata)?.image,
	authorName: unref(metadata)?.authorName,
	authorImage: unref(metadata)?.authorImage,
	badgeColor: unref(metadata)?.category?.color ?? undefined,
	badgeLabel: unref(metadata)?.category?.title ?? undefined,
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
				image: unref(metadata)?.authorImage,
			},
		],
	}),
]);

// Page Title
useHead({
	title: unref(metadata)?.title,
});

// SEO Meta
useServerSeoMeta({
	title: unref(metadata)?.title,
	description: unref(metadata)?.description,
	ogTitle: unref(metadata)?.title,
	ogDescription: unref(metadata)?.description,
});
</script>

<template>
	<div>
		<!-- Use the component map to render the correct component based on the type of the post -->
		<component :is="componentMap[page.type as PostType]" v-if="page && page.type" :page="page" />
	</div>
</template>
