<script setup lang="ts">
export interface PageHeaderProps {
	breadcrumbs?: [
		{
			title: string;
			href?: string;
		},
	];
	title?: string;
}

defineProps<PageHeaderProps>();
</script>
<template>
	<header class="px-4 py-3 border-b md:flex md:items-center md:justify-between dark:border-gray-700">
		<div class="flex-shrink-0 min-w-0">
			<VBreadcrumbs v-if="breadcrumbs" :items="breadcrumbs" />
			<TypographyHeadline :content="title" />
			<slot />
		</div>
		<slot name="center" />
		<div class="flex mt-4 md:ml-4 md:mt-0">
			<slot name="actions" />
		</div>
	</header>
</template>
