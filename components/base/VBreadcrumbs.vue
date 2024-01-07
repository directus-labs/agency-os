<script setup lang="ts">
export interface BreadcrumbsProps {
	items: Array<{
		title: string;
		href?: string | null | undefined;
	}>;
}

defineProps<BreadcrumbsProps>();
</script>
<template>
	<div class="flex flex-wrap items-center space-x-1 text -sm dark:text-gray-200">
		<template v-for="(item, itemIdx) in items" :key="itemIdx">
			<template v-if="item.href">
				<NuxtLink :href="item.href" class="hover:text-primary">
					{{ item.title }}
				</NuxtLink>
				<div v-if="itemIdx !== items.length - 1">
					<Icon name="material-symbols:chevron-right-rounded" class="h-6 w-6 text-gray-500" />
				</div>
			</template>
			<span v-else class="font-bold">
				{{ item.title }}
			</span>
		</template>
	</div>
</template>
