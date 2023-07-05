<script setup lang="ts">
export interface CtaBlockProps {
  id: string
  title?: string
  headline?: string
  content?: string
  buttons?: Array<{
    id: string
    label: string
    href: string
    open_in_new_window: boolean
    variant: 'primary' | 'default' | 'outline'
  }>
}

defineProps<{
  data: CtaBlockProps
}>()
</script>
<template>
  <BlockContainer class="w-full max-w-5xl mx-auto">
    <div
      class="relative p-2 overflow-hidden text-gray-900 bg-transparent bg-white border-4 dark:bg-transparent border-accent rounded-br-3xl rounded-tl-3xl"
    >
      <div
        class="relative px-6 py-8 overflow-hidden rounded-br-2xl rounded-tl-2xl"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-white via-gray-300 to-accent dark:from-gray-800 dark:via-gray-900 dark:to-gray-600"
        />
        <div class="absolute inset-0 grain-bg dark:opacity-10" />
        <div
          class="relative md:flex md:items-center md:justify-between md:space-x-4"
        >
          <div>
            <TypographyTitle v-if="data.title">{{
              data.title
            }}</TypographyTitle>
            <TypographyHeadline
              v-if="data.headline"
              :content="data.headline"
              class="font-bold"
            />
            <TypographyProse
              v-if="data.content"
              :content="data.content"
              class="mt-2 font-mono"
            />
          </div>
          <div class="flex-shrink-0 mt-4 md:mt-0">
            <VButton
              v-for="button in data.buttons"
              :key="button.id"
              :href="button.href"
              :target="button.open_in_new_window ? '_blank' : '_self'"
              size="xl"
              variant="primary"
              class="block"
            >
              {{ button.label }}
            </VButton>
          </div>
        </div>
      </div>
    </div>
  </BlockContainer>
</template>
