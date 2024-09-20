<template>
	<div class="flex gap-2 text-lg font-semibold"
	>
		<template v-if="icon"><v-icon :name="icon" /></template>
		<template v-if="title">{{ title }}</template>
	</div>
</template>

<script setup lang="ts">
import { inject } from 'vue';

defineProps<{
	color?: string;
	icon?: string;
	title?: string;
	inlineTitle?: boolean;
}>();

const values = inject('values');

</script>

<style lang="scss" scoped>
.add-margin-top {
	margin-top: 40px;
}
</style>
