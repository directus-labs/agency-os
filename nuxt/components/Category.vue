<script setup lang="ts">
const props = defineProps({
	color: {
		type: String,
		default: null,
	},
	size: {
		type: String,
		default: 'sm',
	},
});

const slots = useSlots();

const colorChoices = [
	'gray',
	'green',
	'purple',
	'blue',
	'amber',
	'orange',
	'red',
	'indigo',
	'violet',
	'pink',
	'yellow',
];

function randomBackgroundColor(seed: number, colors: string[]) {
	return colors[seed % colors.length];
}

const badgeColor = computed(() => {
	if (props.color) return props.color;

	const defaultSlot = slots.default ? slots.default()[0] : undefined;

	if (!defaultSlot || !defaultSlot?.children) return null;

	return randomBackgroundColor(defaultSlot?.children.length as number, colorChoices);
});

const styleProp = computed(() => {
	if (!props.color) return undefined;
	return {
		backgroundColor: props.color,
		color: getContrastColor(props.color),
	};
});
</script>

<template>
	<span
		:style="styleProp"
		:class="[
			'inline-flex items-center font-display font-medium rounded-button',
			badgeColor === 'gray' ? `bg-gray-100 text-gray-800` : '',
			badgeColor === 'green' ? `bg-green-100 text-green-800` : '',
			badgeColor === 'purple' ? `bg-purple-100 text-purple-800` : '',
			badgeColor === 'blue' ? `bg-blue-100 text-blue-800` : '',
			badgeColor === 'amber' ? `bg-amber-100 text-amber-800` : '',
			badgeColor === 'orange' ? `bg-orange-100 text-orange-800` : '',
			badgeColor === 'red' ? `bg-red-100 text-red-800` : '',
			badgeColor === 'indigo' ? `bg-indigo-100 text-indigo-800` : '',
			badgeColor === 'violet' ? `bg-violet-100 text-violet-800` : '',
			badgeColor === 'pink' ? `bg-primary-100 text-primary` : '',
			badgeColor === 'yellow' ? `bg-yellow-100 text-yellow-800` : '',
			size === 'sm' ? 'text-xs px-2 py-0.5' : '',
			size === 'lg' ? ' px-2.5 py-0.5' : '',

			{
				' bg-gray-100 text-gray-800': !props.color,
			},
		]"
	>
		<slot />
	</span>
</template>
