<script setup lang="ts">
const { params, path } = useRoute();
const { globals } = useAppConfig();
const { fileUrl } = useFiles();

const { data, pending, error } = await useAsyncData(
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
	return unref(data)?.posts;
});

const page = computed(() => {
	return unref(data)?.page;
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
defineOgImage({
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
		<header class="pb-6 border-b-2 dark:border-gray-700">
			<TypographyTitle>{{ page?.title }}</TypographyTitle>
			<TypographyHeadline :content="page?.headline" />
		</header>
		<section class="relative items-center w-full py-12">
			<TypographyTitle>Latest Projects</TypographyTitle>
			<div class="grid gap-6 mt-4 md:grid-cols-3">
				<NuxtLink
					v-for="(project, projectIdx) in posts"
					:key="project.id"
					:href="`/posts/${project.slug}`"
					:class="`relative block w-full mb-6 overflow-hidden transition duration-300 border rounded-lg dark:border-gray-700`"
				>
					<div :class="`relative h-56 overflow-hidden rounded-lg group`">
						<NuxtImg :src="project.image" class="object-cover transition duration-300 group-hover:scale-110" />
						<div
							class="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-white bg-opacity-75 opacity-0 hover:opacity-100 dark:bg-gray-900 dark:bg-opacity-75"
						>
							<div class="p-8">
								<TypographyTitle>{{ project.client }}</TypographyTitle>
								<TypographyHeadline :content="project.title" />
								<div class="flex flex-wrap gap-2 mt-2">
									<UBadge v-for="(item, itemIdx) in project.built_with" class="" size="md" color="black">
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
