<script setup lang="ts">
const { fileUrl } = useFiles();
const { params, path } = useRoute();

const {
	data: page,
	pending,
	error,
} = await useAsyncData(
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
					{
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

useHead({
	title: () => page.value.title,
});

useSeoMeta({
	title: () => page.value.title,
	description: () => page.value.summary,
	ogDescription: () => (page.value.seo ? page.value.seo.meta_description : null),
	ogUrl: () => `https://directus.io/posts/${page.value.slug}`,
	ogTitle: () => (page.value.seo ? page.value.seo.og_title : null),
	ogImage: () => (page.value.seo ? fileUrl(page.value.seo.og_image) : null),
	twitterTitle: '[twitter:title]',
	twitterDescription: '[twitter:description]',
	twitterImage: '[twitter:image]',
	twitterCard: 'summary',
});
</script>

<template>
	<BlockContainer>
		<header>
			<div class="md:flex">
				<!-- Post Image -->
				<div class="relative w-full max-w-3xl">
					<div
						class="relative w-full mx-auto rounded-xl overflow-hidden bg-cover h-[300px] md:h-[450px] dark:outline-gray-800"
					>
						<NuxtImg :src="page.image" class="object-cover w-full h-full saturate-0 dark:brightness-90" alt="" />
						<div class="absolute inset-0 mix-blend-multiply bg-gradient-to-b from-gray-100 to-gray-900" />
					</div>
				</div>

				<!-- Post Meta -->
				<div class="hidden p-8 mt-12 space-y-6 md:block">
					<NuxtLink
						v-if="page.category"
						:href="`/posts/categories/${page.category.slug}`"
						class="inline-block hover:opacity-90"
					>
						<VBadge size="lg" :color="page.category.color">{{ page.category.title }}</VBadge>
					</NuxtLink>
					<Author v-if="page.author" v-bind="page.author" />
					<div class="space-y-2">
						<p class="flex text-gray-500 dark:text-gray-300">
							<UIcon name="material-symbols:timer-outline-rounded" class="w-6 h-6 mr-2" />
							{{ calculateReadTime(page.content) }}
						</p>
						<p class="flex text-gray-500 dark:text-gray-300">
							<UIcon name="material-symbols:calendar-today-rounded" class="w-6 h-6 mr-2" />
							{{ getRelativeTime(page.date_published) }}
						</p>
					</div>
				</div>
			</div>

			<!-- Title Container -->
			<div
				class="relative w-full max-w-4xl p-2 px-8 py-8 mx-auto -mt-12 overflow-hidden text-gray-900 border md:-mt-32 rounded-xl border-primary md:px-16 md:py-12"
			>
				<div
					class="absolute inset-0 bg-gradient-to-br from-white via-gray-300 to-primary dark:from-gray-700 dark:via-gray-900 dark:to-primary/50"
				/>
				<div class="absolute inset-0 opacity-50 grain-bg dark:opacity-10" />
				<div class="relative">
					<TypographyHeadline :content="page.title" as="h1" size="lg" />
					<TypographyProse :content="page.summary" class="mt-2" />
				</div>
			</div>

			<div class="block px-6 mt-6 md:hidden">
				<Author v-if="page.author" v-bind="page.author" />
				<div class="flex justify-between pb-4 mt-4 border-b dark:border-gray-700">
					<div class="space-y-2">
						<p class="flex text-gray-500 dark:text-gray-300">
							<Icon name="heroicons:clock" class="w-6 h-6 mr-2" />
							{{ calculateReadTime(page.content) }}
						</p>
						<p class="flex text-gray-500 dark:text-gray-300">
							<Icon name="heroicons:calendar" class="w-6 h-6 mr-2" />
							{{ getRelativeTime(page.date_published) }}
						</p>
					</div>
					<NuxtLink
						v-if="page.category"
						:href="`/posts/categories/${page.category.slug}`"
						class="inline-block hover:opacity-90"
					>
						<VBadge size="lg" :color="page.category.color">{{ page.category.title }}</VBadge>
					</NuxtLink>
				</div>
			</div>
		</header>

		<!-- Article -->
		<main class="w-full max-w-4xl mx-auto mt-12">
			<TypographyProse :content="page.content" ref="article" />
		</main>
	</BlockContainer>
</template>
