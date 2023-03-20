<script setup lang="ts">
import { PropType } from 'vue'
type Hero = {
  id: string
  headline: string
  content: string
  image: string
  buttons: Array<{
    label: string
    url: string
    open_in_new_window: boolean
  }>
}
const props = defineProps({
  data: {
    type: Object as PropType<Hero>,
    required: true,
  },
})

const { fileUrl } = useFiles()
</script>
<template>
  <BlockContainer class="relative grid gap-6 md:grid-cols-3">
    <!-- Content -->
    <div class="md:pt-12 md:col-span-2">
      <h1
        class="font-serif text-4xl font-extrabold leading-9 text-gray-900 xs:text-5xl sm:text-7xl lg:text-8xl dark:drop-shadow dark:text-gray-100 color-em"
        v-html="data.headline"
      />
      <p
        class="w-full py-6 font-serif text-xl lg:leading-loose lg:text-2xl dark:text-gray-200"
      >
        {{ data.content }}
      </p>

      <div class="space-y-4 md:space-x-4 md:flex md:space-y-0">
        <NuxtLink
          v-for="button in data.buttons"
          :key="button.id"
          :href="button.href"
          :target="button.open_in_new_window ? '_blank' : '_self'"
          :class="[
            {
              'btn-primary': button.variant === 'primary',
              'btn-default': button.variant === 'default',
              'btn-danger': button.variant === 'danger',
              'btn-outline': button.variant === 'outline',
            },
            'btn block w-full md:w-auto',
          ]"
        >
          {{ button.label }}
        </NuxtLink>
      </div>
    </div>
    <!-- Image -->
    <div class="">
      <div
        v-if="data.image"
        class="p-2 border-2 border-gray-300 lg:-mr-48 md:-mr-16 rounded-tl-[64px] lg:relative lg:h-full dark:border-gray-700"
      >
        <img
          class="w-full overflow-hidden rounded-tl-[56px] dark:brightness-90 max-h-[700px] object-cover"
          :src="fileUrl(data.image)"
          alt=""
        />
      </div>
    </div>
    <!-- Hidden Message -->
    <!-- <p
      class="absolute bottom-0 left-0 hidden h-32 p-4 mx-auto font-serif text-5xl font-bold text-white md:block dark:text-gray-900"
    >
      Powered by Directus + Nuxt
    </p> -->
  </BlockContainer>
</template>
