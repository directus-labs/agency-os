<script setup lang="ts">
const { fileUrl } = useFiles()

export interface ColumnsBlockProps {
  id: string
  title: string
  headline: string
  rows: Array<{
    id: string
    title: string
    headline: string
    content: string
    image: string
    image_position: string
  }>
}

defineProps<{
  data: ColumnsBlockProps
}>()
</script>

<template>
  <BlockContainer
    class="relative items-center w-full px-5 py-24 mx-auto bg-white md:px-12 lg:px-16 max-w-7xl dark:bg-gray-800"
  >
    <TypographyTitle v-if="data.title">{{ data.title }}</TypographyTitle>
    <TypographyHeadline v-if="data.headline" :content="data.headline" />
    <div
      v-for="row in data.rows"
      :key="row.id"
      class="relative flex-col items-start mt-16 align-middle"
    >
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-24">
        <div class="relative items-center gap-12 m-auto lg:inline-flex">
          <div class="max-w-xl text-left">
            <div>
              <TypographyTitle v-if="row.title">{{
                row.title
              }}</TypographyTitle>
              <TypographyHeadline v-if="row.headline" :content="row.headline" />
              <TypographyProse
                v-if="row.content"
                :content="row.content"
                class="mt-4 font-mono"
              />
            </div>
          </div>
        </div>
        <div
          class="order-first block w-full p-2 mt-12 border-2 border-gray-300 aspect-square lg:mt-0 dark:border-gray-700"
          :class="[
            {
              'lg:order-last': row.image_position === 'right',
              'lg:order-first': row.image_position === 'left',
            },
            {
              'rounded-tl-3xl rounded-br-3xl ': row.image_position === 'left',
              'rounded-tr-3xl rounded-bl-3xl': row.image_position === 'right',
            },
          ]"
        >
          <img
            v-motion
            :initial="{ opacity: 0, scale: 0.8, y: 50 }"
            :visibleOnce="{ opacity: 1, scale: 1, y: 0 }"
            :duration="1000"
            :delay="250"
            class="object-cover object-center w-full h-full mx-auto bg-gray-100 lg:ml-auto dark:brightness-90"
            :class="[
              {
                'rounded-tl-2xl rounded-br-2xl ': row.image_position === 'left',
                'rounded-tr-2xl rounded-bl-2xl': row.image_position === 'right',
              },
            ]"
            alt=""
            :src="fileUrl(row.image)"
          />
        </div>
      </div>
    </div>
  </BlockContainer>
</template>
