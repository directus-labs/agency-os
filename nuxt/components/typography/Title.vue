<script setup lang="ts">
interface TitleProps {
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p' | 'div';
}

withDefaults(defineProps<TitleProps>(), {
	as: 'h2',
});
</script>
<template>
	<component :is="as" class="font-medium tracking-wider uppercase font-display text-primary">
		<slot />
	</component>
</template>
