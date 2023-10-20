<script setup lang="ts">
// Get the params from the Nuxt route
const { params, path } = useRoute();

// Fetch the page data from the Directus API using the Nuxt useAsyncData composable
// https://v3.nuxtjs.org/docs/usage/data-fetching#useasyncdata
const { data, pending, error } = await useAsyncData(
	path,
	() => {
		const postPromise = useDirectus(
			readItems('posts', {
				filter: {
					type: { _eq: 'blog' },
				},
				sort: ['date_published'],
				fields: [
					'*',
					{
						category: ['title', 'slug', 'color'],
						author: ['first_name', 'last_name', 'avatar'],
					},
				],
			}),
		);

		const pagePromise = useDirectus(
			readSingleton('pages_blog', {
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

useHead({
	title: 'Posts',
});
</script>
<template>
	<BlockContainer>
		<header class="pb-6 border-b border-gray-300 dark:border-gray-700">
			<TypographyTitle>{{ data?.page.title }}</TypographyTitle>
			<TypographyHeadline :content="data?.page.headline" />
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

					<PostCard :post="data.posts[0]" direction="horizontal" />
				</div>
			</div>
			<div class="space-y-4">
				<TypographyTitle>Latest & Greatest</TypographyTitle>
				<div class="relative grid gap-8 md:grid-cols-3 lg:grid-cols-4">
					<PostCard
						v-for="(post, postIdx) in data.posts.slice(1)"
						:key="post.id"
						:post="post"
						:class="[
							'border-b border-gray-300 pb-6 dark:border-gray-700',
							// Make the first two posts span two columns
							postIdx < 2 ? 'md:col-span-2' : 'md:col-span-1',
						]"
					/>
				</div>
			</div>
		</section>
	</BlockContainer>
</template>
