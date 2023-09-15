<script setup lang="ts">
definePageMeta({
	layout: 'default',
});

const props = defineProps({
	error: Object,
});

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
	<div>
		{{ error }}
	</div>
</template>
