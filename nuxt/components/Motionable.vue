<script setup lang="ts">
import { useMotions } from '@vueuse/motion';

interface MotionableProps {
	as?: string | object;
	name: string;
	show?: boolean;
}

const props = withDefaults(defineProps<MotionableProps>(), {
	as: 'div',
	show: true,
});

const motions = useMotions();
const leaved = ref(!props.show);

watch(
	() => props.show,
	async (newShow) => {
		const motion = motions[props.name];

		if (motion && motion.isAnimating.value) {
			motion.stop('leave');

			if (newShow) {
				motion.apply('enter');
			}
		}

		if (!newShow) {
			leaved.value = false;

			motion.leave(() => {
				leaved.value = true;
			});
		}
	},
);
</script>
<template>
	<component :is="as" v-if="show || !leaved" v-motion="name">
		<slot />
	</component>
</template>
