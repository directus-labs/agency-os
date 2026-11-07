<script setup lang="ts">
const props = defineProps({
	radius: {
		type: Number,
		default: 50,
	},
	progress: {
		type: Number,
		default: 0,
	},
	stroke: {
		type: Number,
		default: 10,
	},
});

const normalizedRadius = props.radius - props.stroke * 2;
const circumference = normalizedRadius * 2 * Math.PI;

const strokeDashoffset = computed(() => {
	return circumference - ((props.progress * 100) / 100) * circumference;
});
</script>
<template>
	<svg :height="radius * 2" :width="radius * 2">
		<circle
			stroke="currentColor"
			:stroke-dasharray="circumference + ' ' + circumference"
			:style="{ strokeDashoffset: strokeDashoffset }"
			:stroke-width="stroke"
			fill="transparent"
			:r="normalizedRadius"
			:cx="radius"
			:cy="radius"
		/>
	</svg>
</template>
<style>
circle {
	transition: stroke-dashoffset 0.25s;
	transform: rotate(-90deg);
	transform-origin: 50% 50%;
}
</style>
