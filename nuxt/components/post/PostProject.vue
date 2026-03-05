<script setup lang="ts">
import type { BlockGalleryFile } from '~/types';

export interface PostProjectProps {
	page: any;
}

const props = defineProps<PostProjectProps>();

const galleryItems = computed(() => {
	if (!props.page) return;
	return unref(props.page)?.gallery.map((item: BlockGalleryFile) => {
		return item.directus_files_id;
	});
});
</script>
<template>
	<div class="py-12">
		<header class="relative h-[400px] overflow-hidden flex justify-center items-center">
			<NuxtImg class="absolute inset-0 object-cover w-full h-full" :src="page?.image" />
			<div class="absolute inset-0 bg-gray-900 opacity-75" />
			<div class="relative max-w-3xl p-8 mx-auto overflow-hidden bg-gray-900 bg-opacity-50 rounded-card">
				<TypographyHeadline :content="page?.title" class="text-white" size="xl" />
				<TypographyProse :content="page?.summary" class="text-white mt-4" />
			</div>
		</header>

		<BlockContainer class="md:flex gap-8">
			<!-- Main -->
			<main class="p-4">
				<article class="w-full">
					<TypographyProse ref="article" :content="page?.content" />
				</article>
				<!-- Optional Image Gallery -->
				<VGallery v-if="galleryItems && galleryItems.length > 0" :items="galleryItems" />
			</main>
			<!-- Project Metadata -->
			<aside class="md:w-[300px] flex-shrink-0">
				<div class="p-4 space-y-8 border-2 dark:border-gray-700 rounded-card">
					<div>
						<TypographyTitle>Client</TypographyTitle>
						<p class="font-bold dark:text-white">
							{{ page?.client }}
						</p>
					</div>
					<div>
						<TypographyTitle>Built With</TypographyTitle>
						<div v-for="(item, itemIdx) in page?.built_with" :key="itemIdx" class="mt-2">
							<UBadge size="lg" color="black">{{ item }}</UBadge>
						</div>
					</div>
					<div>
						<TypographyTitle>Cost</TypographyTitle>
						<p class="font-bold dark:text-white">
							{{ page?.cost }}
						</p>
					</div>
				</div>
			</aside>
		</BlockContainer>
	</div>
</template>
