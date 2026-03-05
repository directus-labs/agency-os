<script setup lang="ts">
import { useDebounceFn } from '@vueuse/shared';
import type { BlockTestimonial, BlockTestimonialItem, Testimonial, File } from '~/types';

const props = defineProps<{
	data: BlockTestimonial;
}>();

const testimonials = computed(() => {
	const testimonialsArray = unref(props.data).testimonials as BlockTestimonialItem[];

	if (!testimonialsArray) return [];

	return testimonialsArray.map((item) => {
		return item.testimonials_id as Testimonial;
	});
});

const testimonialContainer: Ref<HTMLElement | null> = ref(null);
const testimonialRefs: Ref<(HTMLElement | null)[]> = ref([]);

const currentItemIdx = ref(0);

function handleScroll(e: Event) {
	const target = e.target as HTMLElement;

	if (!testimonialContainer.value || !testimonialRefs.value) return;

	const testimonialWidth = testimonialRefs.value[0]?.offsetWidth || 0;
	const testimonialCenter = testimonialWidth / 2;
	const scrollLeft = target.scrollLeft;
	const scrollCenter = scrollLeft + testimonialCenter;
	const closestTestimonial = Math.round(scrollCenter / testimonialWidth);

	if (scrollLeft === 0) {
		currentItemIdx.value = 0;
	} else if (scrollLeft + target.offsetWidth + 1 >= target.scrollWidth) {
		currentItemIdx.value = testimonialRefs.value.length - 1;
	} else {
		currentItemIdx.value = closestTestimonial;
	}
}

const debouncedScroll = useDebounceFn(handleScroll, 150);

function handleScrollDebounced(e: Event) {
	debouncedScroll(e);
}

function handleIndicatorButton(index: number) {
	if (!testimonialContainer.value || !testimonialRefs.value) return;

	const scrollLeft = testimonialContainer?.value?.scrollLeft;
	const offsetLeft = testimonialRefs?.value[index]?.offsetLeft;

	if (typeof scrollLeft !== 'undefined' && typeof offsetLeft !== 'undefined') {
		testimonialContainer.value.scrollLeft = offsetLeft - 16;
	}
}

function handleNavButton(direction: 'left' | 'right') {
	if (!testimonialContainer.value || !testimonialRefs.value) return;

	const scrollLeft = testimonialContainer?.value?.scrollLeft;
	const offsetWidth = testimonialRefs?.value[currentItemIdx?.value]?.offsetWidth;

	if (typeof scrollLeft !== 'undefined' && typeof offsetWidth !== 'undefined') {
		if (direction === 'left') {
			testimonialContainer.value.scrollLeft -= offsetWidth;
		} else {
			testimonialContainer.value.scrollLeft += offsetWidth;
		}
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
			<TypographyTitle v-if="data.title">{{ data.title }}</TypographyTitle>
			<TypographyHeadline v-if="data.headline" :content="data.headline" size="lg" />
		</div>

		<div v-if="testimonials.length > 0" class="relative mt-4">
			<div class="flex items-center justify-end px-6 space-x-8 lg:px-16">
				<div class="inline-flex space-x-2">
					<button
						v-for="(item, itemIdx) in testimonials"
						:key="item.id"
						:class="[
							{
								'bg-primary': itemIdx === currentItemIdx,
								'bg-gray-500 bg-opacity-50 dark:bg-gray-900 ': itemIdx !== currentItemIdx,
							},
						]"
						class="flex items-center justify-center w-12 h-3 rounded-button hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
						@click="handleIndicatorButton(itemIdx)"
					/>
				</div>
				<div class="flex gap-2 justify-self-end">
					<UButton
						:disabled="currentItemIdx === 0"
						icon="material-symbols:arrow-back-rounded"
						size="lg"
						square
						@click="handleNavButton('left')"
					/>
					<UButton
						:disabled="currentItemIdx === testimonials.length - 1"
						icon="material-symbols:arrow-forward-rounded"
						size="lg"
						square
						@click="handleNavButton('right')"
					/>
				</div>
			</div>
			<div
				ref="testimonialContainer"
				class="flex w-full px-4 py-6 space-x-6 overflow-x-auto md:px-6 lg:px-16 scrollbar-hide md:pt-8 snap-x scroll-smooth"
				@scroll="handleScrollDebounced"
			>
				<div
					v-for="testimonial in testimonials as Testimonial[]"
					:key="testimonial.id"
					ref="testimonialRefs"
					:class="['snap-center']"
					class="relative w-[350px] md:w[450px] lg:w-[600px] flex flex-col justify-between flex-shrink-0 p-8 bg-white dark:bg-gray-900 shadow-md rounded-card overflow-hidden"
				>
					<UIcon
						name="material-symbols:format-quote-rounded"
						class="absolute w-20 h-20 rotate-180 left-2 text-primary/20 top-2"
					/>
					<TypographyProse v-if="testimonial?.content" :content="testimonial?.content" size="lg" class="relative" />
					<div class="flex pt-6 mt-4 space-x-2 border-t border-gray-300 dark:border-gray-700">
						<!-- Person Image -->
						<NuxtImg
							v-if="(testimonial?.image as unknown as File)?.id"
							class="inline-block w-16 h-16 border rounded-button"
							:src="(testimonial?.image as unknown as File)?.id"
							:alt="testimonial.title ?? ''"
						/>
						<UIcon
							v-else
							name="material-symbols:account-circle"
							class="inline-block w-16 h-16 text-gray-300 border rounded-button"
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
