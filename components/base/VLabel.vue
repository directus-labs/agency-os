<template>
	<label :for="name" class="block mb-1 text-sm font-semibold text-gray-600 dark:text-gray-300">{{ label }}</label>
</template>

<script setup>
const props = defineProps({
	label: {
		type: String,
		default: '',
	},
	name: {
		type: String,
		default: '',
	},
});
</script>
