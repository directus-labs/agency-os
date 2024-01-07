<script setup lang="ts">
import type { SEO, PagesProjects, Post } from '~/types';

const { globals } = useAppConfig();
const { fileUrl } = useFiles();

const { data } = await useAsyncData(
	`projects-index`,
	() => {
		const postPromise = useDirectus(
			readItems('posts', {
				filter: {
					type: { _eq: 'project' },
				},
			}),
		);

		const pagePromise = useDirectus(
			readSingleton('pages_projects', {
				fields: ['*', { seo: ['*'] }],
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

const posts = computed(() => {
	return unref(data)?.posts as Post[];
});

const page = computed(() => {
	return unref(data)?.page as PagesProjects;
});

// Compute metadata here to make it easier to populate all the different SEO tags
const metadata = computed(() => {
	const pageData = unref(page);
	const seo = pageData?.seo as SEO;
	return {
		title: seo?.title ?? pageData?.title ?? undefined,
		description: seo?.meta_description ?? pageData.headline ? stripHTML(pageData?.headline as string) : undefined,
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
	<BlockContainer>
		<header class="pb-6 border-b-2 dark:border-gray-700">
			<TypographyTitle>{{ page?.title }}</TypographyTitle>
			<TypographyHeadline v-if="page.headline" :content="page?.headline" />
		</header>
		<section class="relative items-center w-full py-12">
			<TypographyTitle>Latest Projects</TypographyTitle>
			<div class="grid gap-6 mt-4 md:grid-cols-3">
				<NuxtLink
					v-for="project in posts"
					:key="project.id"
					:href="`/posts/${project.slug}`"
					:class="`relative block w-full mb-6 overflow-hidden transition duration-300 border rounded-card dark:border-gray-700`"
				>
					<div class="relative h-56 overflow-hidden rounded-card group">
						<NuxtImg
							v-if="project.image"
							:src="project.image as string"
							class="object-cover transition duration-300 group-hover:scale-110"
						/>
						<div
							class="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-white bg-opacity-75 opacity-0 hover:opacity-100 dark:bg-gray-900 dark:bg-opacity-75"
						>
							<div class="p-8">
								<TypographyTitle v-if="project?.client">{{ project?.client }}</TypographyTitle>
								<TypographyHeadline v-if="project?.title" :content="project.title" />
								<div v-if="project?.built_with" class="flex flex-wrap gap-2 mt-2">
									<UBadge v-for="(item, itemIdx) in project?.built_with" :key="itemIdx" size="md" color="black">
										{{ item }}
									</UBadge>
								</div>
							</div>
						</div>
					</div>
				</NuxtLink>
			</div>
		</section>
	</BlockContainer>
</template>
