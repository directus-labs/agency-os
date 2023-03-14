<script setup lang="ts">
type Cta = {
  id: string
  title: string
  headline: string
  content: string
  buttons: Array<{
    label: string
    url: string
    open_in_new_window: boolean
  }>
}

const props = defineProps({
  data: {
    type: Object as PropType<Cta>,
    default: () => ({}),
  },
})
</script>
<template>
  <section>
    <PageContainer class="">
      <div
        class="relative w-full max-w-5xl px-8 py-8 mx-auto overflow-hidden text-gray-900 bg-white rounded-br-3xl rounded-tl-3xl outline outline-4 outline-accent outline-offset-8"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-white via-gray-300 to-accent dark:from-gray-700 dark:via-gray-900 dark:to-accent"
        />
        <div class="absolute inset-0 grain-bg dark:opacity-20" />
        <div class="relative md:flex md:items-center md:space-x-4">
          <div>
            <TypographyTitle>{{ data.title }}</TypographyTitle>
            <TypographyHeadline :content="data.headline" class="font-bold" />
            <TypographyProse :content="data.content" class="mt-2 font-mono" />
          </div>
          <div class="flex-shrink-0">
            <NuxtLink
              v-for="button in data.buttons"
              :key="button.id"
              :href="button.href"
              :target="button.open_in_new_window ? '_blank' : '_self'"
              class="px-8 py-4 font-mono text-xl font-bold leading-none tracking-widest text-white lowercase transition-colors duration-300 bg-gray-900 rounded-br-3xl rounded-tl-3xl word-spacing-tight sm:px-10 dark:bg-accent"
            >
              {{ button.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </PageContainer>
  </section>
</template>
