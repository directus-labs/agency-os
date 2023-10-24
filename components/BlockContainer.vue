<script setup lang="ts">
interface BlockContainerProps {
	fullWidth?: boolean;
}

withDefaults(defineProps<BlockContainerProps>(), {
	fullWidth: false,
});
</script>
<template>
	<section :class="['py-8 mx-auto', !fullWidth ? 'px-6 lg:px-16 lg:py-24 max-w-6xl' : '']">
		<slot />
	</section>
</template>
