<script setup lang="ts">
import { PropType } from 'vue'
import { CheckBadgeIcon } from '@heroicons/vue/24/outline'
import { ArrowRightIcon } from '@heroicons/vue/24/solid'
type Features = {
  id: string
  headline: string
  features: Array<{
    headline: string
    content: string
    url: boolean
  }>
}
const props = defineProps({
  data: {
    type: Object as PropType<Features>,
    required: true,
  },
})

const { fileUrl } = useFiles()
</script>
<template>
  <section class="">
    <h1
      class="mb-12 text-2xl font-bold text-center text-gray-900 sm:text-3xl dark:text-white title-font"
    >
      {{ data.headline }}
    </h1>
    <div
      class="flex flex-wrap -mx-4 -mt-4 -mb-10 space-y-6 sm:-m-4 md:space-y-0"
    >
      <div
        v-for="feature in data.features"
        :key="feature.id"
        class="flex p-4 md:w-1/3"
      >
        <div
          class="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4 rounded-full text-primary-500 bg-primary-100 dark:bg-primary-800 dark:text-primary-200"
        >
          <CheckBadgeIcon class="w-8 h-8" />
        </div>
        <div class="flex-grow pl-6">
          <h2
            class="mb-2 text-lg font-medium text-gray-900 dark:text-white title-font"
          >
            {{ feature.headline }}
          </h2>
          <p class="text-base leading-relaxed dark:text-gray-200">
            {{ feature.content }}
          </p>
          <NuxtLink :href="feature.url" class="mt-4 btn btn-outline"
            >Learn More
            <ArrowRightIcon class="w-4 h-4 ml-2" viewBox="0 0 24 24" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
