<script setup lang="ts">
export interface AppPageHeaderProps {
	breadcrumbs?: [
		{
			title: string;
			href?: string;
		},
	];
	title?: string;
}

defineProps<AppPageHeaderProps>();
</script>
<template>
	<header class="px-4 py-3 border-2 rounded-tr-lg rounded-bl-lg md:flex md:items-center md:justify-between">
		<div class="flex-1 min-w-0">
			<VBreadcrumbs v-if="breadcrumbs" :items="breadcrumbs" />
			<TypographyHeadline :content="title" />
		</div>
		<div class="flex mt-4 md:ml-4 md:mt-0">
			<slot name="actions" />
		</div>
	</header>
</template>
