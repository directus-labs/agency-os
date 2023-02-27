<script setup lang="ts">
import {
  StarIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@heroicons/vue/24/solid'
import { PropType } from 'vue'

type Testimonials = {
  id: string
  title: string
  headline: string
  subtitle: string
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
const props = defineProps({
  data: {
    type: Object as PropType<Testimonials>,
    required: true,
  },
})

const { fileUrl } = useFiles()
</script>
<template>
  <div class="relative overflow-hidden">
    <div
      class="absolute inset-0 bg-gradient-to-br from-white via-gray-300 to-accent dark:from-gray-700 dark:via-gray-900 dark:to-accent"
    />
    <div class="absolute inset-0 grain-bg dark:opacity-20" />
    <div class="relative mx-auto">
      <div class="relative pt-16 pb-48 space-y-4 text-center">
        <TypographyTitle>{{ data.title }}</TypographyTitle>
        <TypographyHeadline :content="data.headline" />

        <p class="max-w-3xl mx-auto leading-7 text-center">
          {{ data.subtitle }}
        </p>
      </div>
      <div class="flow-root relative" id="testimonials-{{ id }}">
        <div class="-mt-48">
          <div class="flex justify-end px-4 md:px-6 lg:px-8">
            <!-- {{# Left and Right Circle Buttons to Navigate testimonials #}} -->
            <div class="flex space-x-2">
              <button
                class="block p-2 bg-gray-900 rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeftIcon class="w-5 h-5 text-white" />
              </button>
              <button
                class="block p-2 bg-gray-900 rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowRightIcon class="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
          <div
            class="flex w-full px-4 py-6 pb-24 space-x-6 overflow-x-auto scrollbar-hide snap-x md:pt-8 scroll-smooth"
          >
            <div
              v-for="({ testimonial }, itemIdx) in data.testimonials"
              :key="testimonial.id"
              class="relative w-[450px] flex flex-col flex-shrink-0 p-8 bg-white dark:bg-gray-900 shadow-md snap-center rounded-bl-3xl rounded-tr-3xl overflow-hidden"
            >
              <!-- <div class="absolute inset-0 grain-bg opacity-25" />
              <div
                class="absolute inset-0 bg-gradient-to-br from-white via-white to-accent dark:from-accent dark:to-transparent o"
              /> -->
              <div class="relative">
                <div class="flex-1">
                  <div class="flex items-center space-x-1">
                    <!-- <StarIcon v-for="i in [1, 2, 3, 4, 5]" class="w-4 h-4" /> -->
                  </div>
                  <div class="relative mt-4">
                    <div
                      class="relative font-mono prose dark:prose-invert"
                      v-html="testimonial.content"
                    ></div>
                  </div>
                </div>
                <div class="flex mt-4 space-x-2">
                  <img
                    v-if="testimonial.image"
                    class="inline-block w-16 h-16 rounded-full"
                    :src="fileUrl(testimonial.image)"
                    alt=""
                  />
                  <svg
                    v-else
                    class="inline-block w-12 h-12 text-gray-300 border rounded-full"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <div class="relative">
                    <p
                      class="font-bold font-serif text-gray-900 dark:text-white"
                    >
                      {{ testimonial.title }}
                    </p>
                    <p
                      class="text-sm font-mono text-gray-700 dark:text-gray-300"
                    >
                      {{ testimonial.subtitle }} at {{ testimonial.company }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
