<script setup lang="ts">
/*
	Display a date in the ole desk-calendar looking format
*/
export interface DateDisplayProps {
	date: string | null;
	size: 'xs' | 'sm' | 'md' | 'lg';
	color?: 'primary' | 'gray' | 'amber';
}

const props = withDefaults(defineProps<DateDisplayProps>(), {
	size: 'md',
	color: 'primary',
});
</script>
<template>
	<div
		:class="[
			{
				'border-primary-500': color === 'primary',
				'border-gray-500': color === 'gray',
				'border-amber-500': color === 'amber',
			},
			'overflow-hidden text-center border rounded-lg',
		]"
	>
		<div
			:class="[
				{
					'px-2 py-0.5 text-xs': size === 'xs',
					'px-2 py-1 text-xs': size === 'sm',
					'px-4 py-1 text-sm': size === 'md',
					'px-6 py-2 text-base': size === 'lg',
				},
				{
					'bg-primary-500': color === 'primary',
					'bg-gray-500': color === 'gray',
					'bg-amber-500': color === 'amber',
				},
				'font-semibold text-white uppercase',
			]"
		>
			{{ date ? getMonth(date) : '?' }}
		</div>
		<div
			:class="[
				{
					'py-1 px-1 text-xs': size === 'xs',
					'px-2': size === 'sm',
					'px-4 text-2xl': size === 'md',
					'px-6 text-3xl': size === 'lg',
				},
				'font-bold',
			]"
		>
			{{ date ? getDate(date) : 'TBD' }}
		</div>
		<div
			v-if="size !== 'xs'"
			:class="[
				{
					'px-2 text-xs': size === 'sm',
					'px-4 text-sm': size === 'md',
					'px-6 text-base': size === 'lg',
				},
				'text-primary-500',
			]"
		>
			{{ date ? getDay(date) : '' }}
		</div>
	</div>
</template>
