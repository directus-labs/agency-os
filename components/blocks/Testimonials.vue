<script setup lang="ts">
import { useDebounceFn } from '@vueuse/shared';
import type { BlockTestimonial } from '~/types';

const props = defineProps<{
	data: BlockTestimonial;
}>();

const testimonials = computed(() => {
	return props.data.testimonials.map((item) => {
		return item.testimonials_id;
	});
});

const testimonialContainer = ref(null);
const testimonialRefs = ref([]);

const currentItemIdx = ref(0);

function handleScroll(e) {
	// Select the testimonial that is closest to the center of the screen
	const testimonialWidth = testimonialRefs.value[0].offsetWidth;
	const testimonialCenter = testimonialWidth / 2;
	const scrollLeft = e.target.scrollLeft;
	const scrollCenter = scrollLeft + testimonialCenter;
	const closestTestimonial = Math.round(scrollCenter / testimonialWidth);
	// If the scoll postiion is at the beginning of the container, set the current item to the first item
	// If the scoll postiion is at the end of the container, set the current item to the last item
	if (scrollLeft === 0) {
		currentItemIdx.value = 0;
	} else if (scrollLeft + e.target.offsetWidth + 1 >= e.target.scrollWidth) {
		currentItemIdx.value = testimonialRefs.value.length - 1;
	} else {
		currentItemIdx.value = closestTestimonial;
	}
}

function handleScrollDebounced(e) {
	useDebounceFn(handleScroll(e), 150);
}

function handleIndicatorButton(index) {
	testimonialContainer.value.scrollLeft = testimonialRefs.value[index].offsetLeft - 16;
}

function handleNavButton(direction: ['left', 'right']) {
	if (direction === 'left') {
		testimonialContainer.value.scrollLeft -= testimonialRefs.value[currentItemIdx.value].offsetWidth;
	} else {
		testimonialContainer.value.scrollLeft += testimonialRefs.value[currentItemIdx.value].offsetWidth;
	}
}
</script>
<template>
	<BlockContainer class="relative overflow-hidden" full-width>
		<div
			class="absolute inset-0 bg-gradient-to-br from-white via-gray-300 to-primary dark:from-gray-700 dark:via-gray-900 dark:to-primary"
		/>
		<div class="absolute inset-0 opacity-50 grain-bg dark:opacity-10" />

		<div class="relative text-center">
			<TypographyTitle>{{ data.title }}</TypographyTitle>
			<TypographyHeadline :content="data.headline" size="lg" />
		</div>

		<div v-if="testimonials.length > 0" class="relative mt-4">
			<div class="flex items-center justify-end px-6 space-x-8 lg:px-16">
				<div class="inline-flex space-x-2">
					<button
						v-for="(item, itemIdx) in testimonials"
						:class="[
							{
								'bg-primary': itemIdx === currentItemIdx,
								'bg-gray-500 bg-opacity-50 dark:bg-gray-900 ': itemIdx !== currentItemIdx,
							},
						]"
						@click="handleIndicatorButton(itemIdx)"
						class="flex items-center justify-center w-12 h-3 rounded hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
					/>
				</div>
				<div class="flex gap-2 justify-self-end">
					<UButton
						:disabled="currentItemIdx === 0"
						@click="handleNavButton('left')"
						icon="material-symbols:arrow-back-rounded"
						size="lg"
						square
					/>
					<UButton
						:disabled="currentItemIdx === testimonials.length - 1"
						@click="handleNavButton('right')"
						icon="material-symbols:arrow-forward-rounded"
						size="lg"
						square
					/>
				</div>
			</div>
			<div
				class="flex w-full px-4 py-6 space-x-6 overflow-x-auto md:px-6 lg:px-16 scrollbar-hide md:pt-8 snap-x scroll-smooth"
				ref="testimonialContainer"
				@scroll="handleScrollDebounced"
			>
				<div
					v-for="(testimonial, itemIdx) in testimonials"
					:key="testimonial.id"
					ref="testimonialRefs"
					:class="['snap-center']"
					class="relative w-[350px] md:w[450px] lg:w-[600px] flex flex-col justify-between flex-shrink-0 p-8 bg-white dark:bg-gray-900 shadow-md rounded-xl overflow-hidden"
				>
					<UIcon
						name="material-symbols:format-quote-rounded"
						class="absolute w-20 h-20 rotate-180 left-2 text-primary/20 top-2"
					/>
					<TypographyProse :content="testimonial.content" size="lg" class="relative" />
					<div class="flex pt-6 mt-4 space-x-2 border-t border-gray-300 dark:border-gray-700">
						<NuxtImg
							v-if="testimonial.image"
							class="inline-block w-16 h-16 border rounded-full"
							:src="testimonial.image.id"
							:alt="testimonial.title ?? ''"
						/>
						<UIcon
							v-else
							name="material-symbols:account-circle"
							class="inline-block w-16 h-16 text-gray-300 border rounded-full"
						/>

						<div class="relative">
							<p v-if="testimonial.title" class="font-semibold text-primary font-display lg:text-2xl">
								{{ testimonial.title }}
							</p>
							<p class="text-sm text-gray-700 lg:text-lg dark:text-gray-300">
								{{ testimonial.subtitle }} at {{ testimonial.company }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</BlockContainer>
</template>
