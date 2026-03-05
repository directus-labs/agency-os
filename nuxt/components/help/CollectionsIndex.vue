<script setup lang="ts">
export interface HelpCollectionsProps {
	baseUrl?: string | null;
}

const props = withDefaults(defineProps<HelpCollectionsProps>(), {
	baseUrl: '',
});

const {
	data: collections,
	pending,
	error,
} = await useAsyncData(
	'help-collections-index',
	() => {
		return useDirectus(
			readItems('help_collections', {
				filter: {
					articles: {
						_nnull: true,
					},
				},
			}),
		);
	},
	{
		transform: (data) => data,
	},
);
</script>
<template>
	<div class="grid mt-8 gap-x-4 sm:gap-x-6 gap-y-4 sm:gap-y-6 md:grid-cols-3">
		<NuxtLink
			v-for="collection in collections"
			:key="collection.id"
			:href="`${baseUrl}/help/collections/${collection.slug}`"
			class="flex overflow-hidden no-underline transition duration-200 bg-white border dark:bg-gray-800 hover:border-primary dark:border-gray-700 rounded-card dark:hover:border-primary"
		>
			<div class="flex flex-col p-5 sm:p-6">
				<div class="flex items-center">
					<UIcon
						v-if="collection.icon"
						:name="convertIconName(collection.icon) as string"
						class="w-10 h-10 text-primary"
					/>
				</div>
				<div>
					<TypographyHeadline :content="collection.title" size="sm" />
					<p class="text-gray-500 dark:text-gray-300 line-clamp-3 text-md sm:line-clamp-3">
						{{ collection.description }}
					</p>
				</div>
				<div class="mt-4 text-sm text-gray-500 dark:text-gray-300">{{ collection.articles.length }} articles</div>
			</div>
		</NuxtLink>
	</div>
</template>
