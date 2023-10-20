<script setup lang="ts">
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

useHead({
	title: 'Projects',
});
</script>
<template>
	<BlockContainer>
		<header class="pb-6 border-b-2 dark:border-gray-700">
			<TypographyTitle>{{ data.page.title }}</TypographyTitle>
			<TypographyHeadline :content="data.page.headline" />
		</header>
		<section class="relative items-center w-full py-12">
			<TypographyTitle>Latest Projects</TypographyTitle>
			<div class="grid gap-6 mt-4 md:grid-cols-3">
				<NuxtLink
					v-for="(project, projectIdx) in data.posts"
					:key="project.id"
					:href="`/projects/${project.slug}`"
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
									<UBadge class="" v-for="(item, itemIdx) in project.built_with" size="md" color="black">
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
