<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp();

const {
	data: categories,
	pending,
	error,
} = await useAsyncData('categories', () => {
	return $directus.request(
		$readItems('categories', {
			fields: ['*'],
		}),
	);
});
</script>
<template>
	<div class="mt-4 space-y-2">
		<div v-for="category in categories" :key="category.id">
			<NuxtLink :href="`/posts/categories/${category.slug}`" class="font-mono dark:text-gray-200 hover:opacity-80">
				<VBadge :color="category.color" size="lg">
					{{ category.title }}
				</VBadge>
			</NuxtLink>
		</div>
	</div>
</template>
