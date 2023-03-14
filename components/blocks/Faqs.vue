<script setup lang="ts">
type Faqs = {
  id: string
  title?: string
  headline?: string
  faqs?: Array<{
    title?: string
    answer?: string
  }>
}

const props = defineProps({
  data: {
    type: Object as PropType<Faqs>,
    default: () => ({}),
  },
})
</script>

<template>
  <section class="max-w-screen-xl px-4 py-12 mx-auto sm:py-16 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto text-center">
      <TypographyTitle>{{ data.title }}</TypographyTitle>
      <TypographyHeadline :content="data.headline" />
      <div class="pt-6 mt-6">
        <dl class="space-y-6">
          <VAccordion
            v-for="(item, itemIdx) in data.faqs"
            :key="itemIdx"
            :title="item.title"
          >
            {{ item.answer }}
          </VAccordion>
        </dl>
      </div>
    </div>
  </section>
</template>
