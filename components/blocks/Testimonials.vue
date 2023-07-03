<script setup lang="ts">
import { useDebounceFn } from '@vueuse/shared'

export interface TestimonialsBlockProps {
  id: string
  title?: string
  headline?: string
  subtitle?: string
  testimonials: Array<{
    testimonial: {
      title: string
      subtitle: string
      image: string
      company: string
      company_logo: string
      link: string
      content: string
    }
  }>
}

defineProps<{
  data: TestimonialsBlockProps
}>()

const testimonialContainer = ref(null)
const testimonialRefs = ref([])

const currentItemIdx = ref(0)

function handleScroll(e) {
  // Select the testimonial that is closest to the center of the screen
  const testimonialWidth = testimonialRefs.value[0].offsetWidth
  const testimonialCenter = testimonialWidth / 2
  const scrollLeft = e.target.scrollLeft
  const scrollCenter = scrollLeft + testimonialCenter
  const closestTestimonial = Math.round(scrollCenter / testimonialWidth)
  // If the scoll postiion is at the beginning of the container, set the current item to the first item
  // If the scoll postiion is at the end of the container, set the current item to the last item
  if (scrollLeft === 0) {
    currentItemIdx.value = 0
  } else if (scrollLeft + e.target.offsetWidth + 1 >= e.target.scrollWidth) {
    currentItemIdx.value = testimonialRefs.value.length - 1
  } else {
    currentItemIdx.value = closestTestimonial
  }
  //   currentItemIdx.value = Math.round(
  //     e.target.scrollLeft / (e.target.scrollWidth / testimonialRefs.value.length)
  //   )
}

function handleScrollDebounced(e) {
  useDebounceFn(handleScroll(e), 150)
}

function handleIndicatorButton(index) {
  testimonialContainer.value.scrollLeft =
    testimonialRefs.value[index].offsetLeft - 16
}

function handleNavButton(direction: ['left', 'right']) {
  if (direction === 'left') {
    testimonialContainer.value.scrollLeft -=
      testimonialRefs.value[currentItemIdx.value].offsetWidth
  } else {
    testimonialContainer.value.scrollLeft +=
      testimonialRefs.value[currentItemIdx.value].offsetWidth
  }
}

const { fileUrl } = useFiles()
</script>
<template>
  <BlockContainer class="relative overflow-hidden" full-width>
    <div
      class="absolute inset-0 bg-gradient-to-br from-white via-gray-300 to-accent dark:from-gray-700 dark:via-gray-900 dark:to-accent"
    />
    <div class="absolute inset-0 grain-bg dark:opacity-20" />

    <div class="relative pt-16 space-y-4 text-center">
      <TypographyTitle>{{ data.title }}</TypographyTitle>
      <TypographyHeadline :content="data.headline" size="xl" />

      <p class="max-w-3xl mx-auto leading-7 text-center">
        {{ data.subtitle }}
      </p>
    </div>
    <div class="relative mt-4">
      <div class="flex items-center justify-end px-6 space-x-8">
        <div class="inline-flex space-x-2">
          <!-- Indicator Buttons -->
          <button
            v-for="(item, itemIdx) in data.testimonials"
            :class="[
              {
                'bg-accent': itemIdx === currentItemIdx,
                'bg-gray-500 bg-opacity-50 dark:bg-gray-900 ':
                  itemIdx !== currentItemIdx,
              },
            ]"
            @click="handleIndicatorButton(itemIdx)"
            class="flex items-center justify-center w-12 h-3 hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <!-- Left and Right Circle Buttons to Navigate testimonials -->
        <div class="flex space-x-2 justify-self-end">
          <button
            :disabled="currentItemIdx === 0"
            class="flex items-center justify-center w-10 h-10 bg-gray-900 rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="handleNavButton('left')"
          >
            <Icon name="heroicons:arrow-left" class="w-5 h-5 text-white" />
          </button>
          <button
            :disabled="currentItemIdx === data.testimonials.length - 1"
            class="flex items-center justify-center w-10 h-10 bg-gray-900 rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="handleNavButton('right')"
          >
            <Icon name="heroicons:arrow-right" class="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
      <div
        class="flex w-full px-4 py-6 pb-24 space-x-6 overflow-x-auto md:px-6 lg:px-8 scrollbar-hide md:pt-8 snap-x scroll-smooth"
        ref="testimonialContainer"
        @scroll="handleScrollDebounced"
      >
        <div
          v-for="({ testimonial }, itemIdx) in data.testimonials"
          :key="testimonial.id"
          ref="testimonialRefs"
          :class="['snap-center']"
          class="relative w-[350px] md:w[450px] lg:w-[600px] flex flex-col justify-between flex-shrink-0 p-8 bg-white dark:bg-gray-900 shadow-md even:rounded-bl-3xl even:rounded-tr-3xl odd:rounded-br-3xl odd:rounded-tl-3xl overflow-hidden"
        >
          <div
            class="relative font-mono prose-sm prose md:prose-base dark:prose-invert"
            v-html="testimonial.content"
          />

          <div
            class="flex pt-6 mt-4 space-x-2 border-t border-gray-300 dark:border-gray-700"
          >
            <img
              v-if="testimonial.image"
              class="inline-block w-16 h-16 border rounded-full"
              :src="fileUrl(testimonial.image)"
              alt=""
            />
            <Icon
              name="ic:baseline-account-circle"
              v-else
              class="inline-block w-16 h-16 text-gray-300 border rounded-full"
            />

            <div class="relative">
              <p
                class="font-serif font-bold text-gray-900 lg:text-2xl dark:text-white"
              >
                {{ testimonial.title }}
              </p>
              <p
                class="font-mono text-sm text-gray-700 lg:text-lg dark:text-gray-300"
              >
                {{ testimonial.subtitle }} at {{ testimonial.company }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BlockContainer>
</template>
