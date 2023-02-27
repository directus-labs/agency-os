<script setup lang="ts">
import { PropType } from 'vue'
import { CheckBadgeIcon } from '@heroicons/vue/24/outline'
import { ArrowRightIcon } from '@heroicons/vue/24/solid'
type LogoCloud = {
  id: string
  headline: string
  title: string
  logos: Array<{
    file: {
      id: string
    }
  }>
}
const props = defineProps({
  data: {
    type: Object as PropType<LogoCloud>,
    required: true,
  },
})

const { fileUrl } = useFiles()
</script>
<template>
  <section class="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <TypographyTitle v-if="data.title">{{ data.title }}</TypographyTitle>
    <TypographyHeadline v-if="data.headline" :content="data.headline" />
    <div class="flow-root mt-8 lg:mt-10">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div
          v-for="{ file } in data.logos"
          :key="file.id"
          class="flex justify-center items-center rounded-tr-3xl rounded-bl-3xl border-2 border-gray-200 dark:border-gray-700 p-8"
        >
          <img class="h-12" :src="fileUrl(file.id)" />
        </div>
      </div>
    </div>
  </section>
</template>
