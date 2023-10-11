<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp();
const { theme } = useAppConfig();

const { params, path } = useRoute();

const {
	data: projects,
	pending,
	error,
} = await useAsyncData(
	path,
	() => {
		return $directus.request(
			$readItems('projects', {
				filter: {
					// status: { _eq: 'published' },
				},

				fields: [],
			}),
		);
	},
	{
		transform: (data) => data,
		// pick: [],
	},
);

useHead({
	title: 'Projects',
});
</script>
<template>
	<BlockContainer>
		<header class="pb-6 border-b-2 dark:border-gray-700">
			<TypographyTitle>Agency Projects</TypographyTitle>
			<TypographyHeadline content="<p>We kill it for you <em>(our clients)</em>.</p>" />
		</header>
		<section class="relative items-center w-full py-12">
			<TypographyTitle>Latest Projects</TypographyTitle>
			<div class="grid gap-6 mt-4 md:grid-cols-3">
				<NuxtLink
					v-for="(project, projectIdx) in projects"
					:key="project.id"
					:href="`/projects/${project.slug}`"
					:class="`relative block w-full mb-6 overflow-hidden transition duration-300 border rounded-${theme.borderRadius} dark:border-gray-700`"
				>
					<div :class="`relative h-56 overflow-hidden rounded-${theme.borderRadius} group`">
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
