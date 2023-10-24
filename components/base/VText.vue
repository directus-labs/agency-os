<script setup lang="ts">
export interface TextProps {
	as?: 'div' | 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label';
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
	textColor?: 'default' | 'light';
}

const props = withDefaults(defineProps<TextProps>(), {
	as: 'p',
	size: 'sm',
	textColor: 'default',
});
</script>
<template>
	<component
		:is="as"
		:class="[
			{
				'text-gray-900 dark:text-white': textColor === 'default',
				'text-gray-600 dark:text-gray-300': textColor === 'light',
			},
			{
				'text-xs sm:text-sm': size === 'xs',
				'text-sm sm:text-base': size === 'sm',
				'text-base sm:text-lg': size === 'md',
				'text-lg sm:text-xl': size === 'lg',
				'text-xl sm:text-2xl': size === 'xl',
				'text-2xl sm:text-3xl': size === '2xl',
				'text-3xl sm:text-4xl': size === '3xl',
			},
		]"
	>
		<slot />
	</component>
</template>
