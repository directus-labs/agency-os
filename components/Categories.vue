<script setup lang="ts">
const { data: categories } = await useAsyncData('categories', () => {
	return useDirectus(
		readItems('categories', {
			fields: ['*'],
		}),
	);
});
</script>
<template>
	<div class="mt-4 space-y-2">
		<div v-for="category in categories" :key="category.id">
			<NuxtLink :href="`/posts/categories/${category.slug}`" class="dark:text-gray-200 hover:opacity-80">
				<Category :color="category.color" size="lg">
					{{ category.title }}
				</Category>
			</NuxtLink>
		</div>
	</div>
</template>
