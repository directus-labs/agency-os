<script setup lang="ts">
import { PropType } from 'vue'
import { CheckBadgeIcon } from '@heroicons/vue/24/outline'
import { ArrowRightIcon } from '@heroicons/vue/24/solid'
type Quote = {
  id: string
  headline: string
  title: string
  subtitle: string
  content: string
  image: string
  background_color: string
}
const props = defineProps({
  data: {
    type: Object as PropType<Quote>,
    required: true,
  },
})

const { fileUrl } = useFiles()
</script>
<template>
  <section
    class="relative px-6 md:px-16 lg:px-28 py-10 md:py-16 lg:py-24 text-gray-900 dark:text-gray-100"
  >
    <div
      v-if="data.image"
      class="absolute inset-0 z-0 opacity-25"
      :style="{
        backgroundImage: `url(${fileUrl(data.image)})`,
        backgroundColor: data.background_color,
      }"
    />
    <div class="relative max-w-screen-2xl mx-auto">
      <div class="my-24">
        <div
          class="xl:w-3/4 italic font-serif leading-tight md:leading-tight indent-3 pl-3 md:-indent-6 md:pl-6 text-4xl md:text-6xl"
          v-html="data.content"
        ></div>

        <div class="flex justify-end mt-6">
          <div
            class="w-full pl-3 font-mono text-sm font-bold tracking-widest text-right uppercase word-spacing-tight lg:text-base sm:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 md:pl-0 sm:text-left"
          >
            <div
              class="bg-white dark:bg-gray-800 chat p-4 rounded-xl rounded-bl-none"
            >
              <div class="text-accent">
                {{ data.title }}
              </div>
              <div class="">{{ data.subtitle }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
