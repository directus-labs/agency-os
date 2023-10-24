<script setup lang="ts">
export interface DividerProps {
	vertical?: boolean;
}

withDefaults(defineProps<DividerProps>(), {
	vertical: false,
});
</script>
<template>
	<div v-if="vertical" class="h-full border-l border-gray-300 dark:border-gray-700" />
	<div v-else class="w-full border-t border-gray-300 dark:border-gray-700" />
</template>
