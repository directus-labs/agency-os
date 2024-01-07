<script setup lang="ts">
export interface HorizontalNavigationProps {
	items: Array<{
		name: string;
		href: string;
	}>;
}

const props = defineProps<HorizontalNavigationProps>();
</script>

<template>
	<div class="inline-flex">
		<nav class="flex gap-4">
			<NuxtLink
				v-for="tab in items"
				:key="tab.name"
				:href="tab.href"
				exact-active-class="text-primary-700 bg-primary-100 dark:bg-primary-900 dark:text-white"
				class="px-3 py-2 text-sm font-medium text-gray-500 transition duration-300 rounded-button hover:text-gray-700 dark:hover:text-gray-300 dark:text-gray-400"
			>
				{{ tab.name }}
			</NuxtLink>
		</nav>
	</div>
</template>
