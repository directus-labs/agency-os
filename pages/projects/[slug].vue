<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp();
const { params, path } = useRoute();

const {
	data: project,
	pending,
	error,
} = await useAsyncData(
	path,
	() => {
		return $directus.request(
			$readItems('projects', {
				filter: { slug: { _eq: params.slug } },
				limit: 1,
				fields: ['*', 'gallery.directus_files_id.*'],
			}),
		);
	},
	{
		transform: (data) => data[0],
	},
);
</script>
<template>
	<div class="py-12">
		<header class="relative h-[400px] overflow-hidden flex justify-center items-center">
			<NuxtImg class="absolute inset-0 object-cover w-full h-full" :src="project.image" />
			<div class="absolute inset-0 bg-gray-900 opacity-75" />
			<div class="relative max-w-3xl p-8 mx-auto overflow-hidden bg-gray-900 bg-opacity-50 rounded-xl">
				<TypographyHeadline :content="project.title" class="text-white" size="xl" />
				<TypographyProse :content="project.summary" class="text-white" />
			</div>
		</header>

		<BlockContainer class="md:flex">
			<main class="p-4">
				<article class="w-full">
					<!-- Main -->
					<TypographyProse :content="project.content" ref="article" />
				</article>

				<BlocksGallery
					v-if="project.gallery && project.gallery.length > 0"
					class="mt-8 overflow-hidden bg-white dark:bg-gray-800 rounded-xl"
					:data="{
						id: project.id,
						title: 'Gallery',
						gallery_items: project.gallery,
					}"
				/>
			</main>
			<aside class="space-y-8 md:w-[300px] flex-shrink-0 p-4 border-2 dark:border-gray-700 rounded-xl">
				<div>
					<TypographyTitle>Client</TypographyTitle>
					<p class="font-bold dark:text-white">
						{{ project.client }}
					</p>
				</div>
				<div>
					<TypographyTitle>Built With</TypographyTitle>
					<div v-for="(item, itemIdx) in project.built_with" class="mt-2">
						<UBadge size="lg" color="black">{{ item }}</UBadge>
					</div>
				</div>
				<div>
					<TypographyTitle>Cost</TypographyTitle>
					<p class="font-bold dark:text-white">
						{{ project.cost }}
					</p>
				</div>
			</aside>
		</BlockContainer>
	</div>
</template>
