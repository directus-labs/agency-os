<script setup lang="ts">
import type { BlockTeam, Team } from '~/types';
import { useIntersectionObserver, useResizeObserver } from '@vueuse/core';

defineProps<{
	data: BlockTeam;
}>();

const { data: team }: { data: Ref<Team[]> } = await useAsyncData(
	'team',
	() => {
		return useDirectus(readItems('team', {}));
	},
	{
		transform: (data) => data,
	},
);

function splitArray(array: any[], numParts: number = 2) {
	let result = [] as any[];

	for (let i = 0; i < array.length; i++) {
		let index = i % numParts;

		if (!result[index]) {
			result[index] = [];
		}

		result[index].push(array[i]);
	}

	return result;
}

const teamToDisplay = computed(() => {
	// Split the array into two arrays
	const teamMembersSplit = splitArray(unref(team), 2);

	// Return the two arrays as an object
	return {
		// Duplicate each array so we can animate the last item to the first position
		left: [...teamMembersSplit[0], ...teamMembersSplit[0]],
		right: [...teamMembersSplit[1], ...teamMembersSplit[1]],
	};
});

function animationDelay() {
	let possibleAnimationDelays = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s'];
	return possibleAnimationDelays[Math.floor(Math.random() * possibleAnimationDelays.length)];
}

const target = ref(null);
const isVisible = ref(false);
const leftCol: Ref<HTMLElement | null> = ref(null);
const rightCol: Ref<HTMLElement | null> = ref(null);
const colHeight = ref(0);
const leftColHeight = ref(0);
const rightColHeight = ref(0);

const { stop } = useIntersectionObserver(
	target,
	([{ isIntersecting }], observerElement) => {
		isVisible.value = isIntersecting;
	},
	{
		threshold: 0.25,
	},
);

useResizeObserver(leftCol, (entries) => {
	if (!entries[0]) return;
	colHeight.value = (entries[0].target as HTMLElement).offsetHeight;
});

const duration = computed(() => {
	return `${colHeight.value * 15}ms`;
});
</script>
<template>
	<section>
		<BlockContainer>
			<div class="flex flex-col mx-auto lg:flex-row">
				<!-- Text -->
				<div class="flex flex-col pr-4 lg:w-3/5">
					<TypographyTitle v-if="data.title">{{ data.title }}</TypographyTitle>
					<TypographyHeadline v-if="data.headline" :content="data.headline" size="lg" />
					<TypographyProse v-if="data.content" :content="data.content" class="mt-4" />
				</div>

				<!-- Team -->
				<div
					ref="target"
					class="w-full relative grid h-[49rem] max-h-[60vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 md:grid-cols-2 border-t-4 border-t-primary border-b-4 border-b-gray-500 mt-8 lg:mt-0"
				>
					<!-- <div class="absolute top-0 z-10 w-full h-16 bg-gradient-to-b from-white to-transparent dark:from-gray-800" /> -->
					<!-- <div
						class="absolute bottom-0 z-10 w-full h-16 bg-gradient-to-t from-white to-transparent dark:from-gray-800"
					/> -->

					<!-- Left Col -->
					<div
						ref="leftCol"
						:class="[{ 'animate-marquee': isVisible }, 'space-y-10 py-4 -mt-10 md:max-w-[320px] ']"
						:style="{
							'--marquee-duration': duration,
						}"
					>
						<TeamCard v-for="person in teamToDisplay.left" :key="person.id" :person="person" />
					</div>
					<!-- Right Col -->
					<div
						ref="rightCol"
						:class="[{ 'animate-marquee': isVisible }, 'space-y-10 py-4 md:max-w-[320px]']"
						:style="{
							'--marquee-duration': duration,
						}"
					>
						<TeamCard
							v-for="person in teamToDisplay.right"
							:key="person.id"
							:style="{
								animationDelay: animationDelay(),
							}"
							:person="person"
						/>
					</div>
				</div>
			</div>
		</BlockContainer>
	</section>
</template>

<style>
.animate-marquee {
	animation: marquee var(--marquee-duration) linear infinite;
	&:hover {
		animation-play-state: paused;
	}
}

@keyframes marquee {
	0% {
		transform: translateY(0);
	}
	100% {
		transform: translateY(calc(-50%));
	}
}
</style>
