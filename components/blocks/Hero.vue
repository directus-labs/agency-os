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
  <PageContainer>
    <h1
      class="font-serif text-4xl font-bold xs:text-5xl sm:text-7xl lg:text-8xl dark:drop-shadow dark:text-gray-100 color-em"
      v-html="data.headline"
    ></h1>

    <p
      class="w-full my-6 font-serif text-base lg:leading-loose tracking-snug sm:text-xl lg:text-2xl md:leading-relaxed md:my-10 dark:text-gray-400"
    >
      {{ data.content }}
    </p>

    <div class="pt-5">
      <div class="flex">
        <NuxtLink
          v-for="button in data.buttons"
          :key="button.id"
          :href="button.href"
          :target="button.open_in_new_window ? '_blank' : '_self'"
          class="box-border px-8 py-4 font-mono text-sm font-bold leading-none tracking-widest text-white lowercase transition-colors duration-300 bg-gray-900 btn rounded-tr-3xl rounded-bl-3xl sm:text-base md:text-lg word-spacing-tight sm:px-10 dark:bg-accent"
        >
          {{ button.label }}
        </NuxtLink>
      </div>
    </div>
  </PageContainer>
</template>
