<script setup lang="ts">
import type { BlockGalleryFile } from '~/types';

export interface PostVideoProps {
	page: any;
}

const props = defineProps<PostVideoProps>();
</script>
<template>
	<div class="py-12">
		<div
			class="relative flex items-center justify-center w-full overflow-hidden bg-gray-900 dark:bg-gray-900 border-t-2 border-b-2 border-primary/50"
		>
			<VVideo :url="page?.video_url" class="max-w-5xl" />
		</div>

		<BlockContainer>
			<!-- Main -->
			<main class="flex flex-col gap-4">
				<TypographyHeadline :content="page?.title" as="h1" size="lg" />
				<TypographyProse :content="page?.summary" />
				<div
					class="pb-4 space-y-4 border-b md:space-y-0 md:flex md:justify-between md:items-center dark:border-gray-700"
				>
					<Author v-if="page?.author" :author="page?.author" />
					<NuxtLink
						v-if="page?.category"
						:href="`/posts/categories/${page?.category.slug}`"
						class="inline-block hover:opacity-90"
					>
						<Category size="lg" :color="page?.category.color">{{ page?.category.title }}</Category>
					</NuxtLink>
					<div class="inline-flex gap-4">
						<p class="flex text-gray-500 dark:text-gray-300">
							<UIcon name="material-symbols:timer-outline-rounded" class="w-6 h-6 mr-2" />
							{{ calculateReadTime(page?.content) }}
						</p>
						<p class="flex text-gray-500 dark:text-gray-300">
							<UIcon name="material-symbols:calendar-today-rounded" class="w-6 h-6 mr-2" />
							{{ getRelativeTime(page?.date_published) }}
						</p>
					</div>
				</div>
				<article>
					<TypographyProse ref="article" :content="page?.content" />
				</article>
			</main>
		</BlockContainer>
	</div>
</template>
