<script setup lang="ts">
export interface StepsBlockProps {
  id: string
  title?: string
  headline?: string
  steps: Array<{
    id: string
    title: string
    content: string
    image: string
  }>
  show_step_numbers?: boolean
  alternate_image_position?: boolean
}

defineProps<{
  data: StepsBlockProps
}>()

const { fileUrl } = useFiles()
</script>
<template>
  <BlockContainer class="max-w-4xl mx-auto text-center">
    <TypographyTitle v-if="data.title">{{ data.title }}</TypographyTitle>
    <TypographyHeadline v-if="data.headline" :content="data.headline" />
    <div class="mt-8">
      <template v-for="(step, stepIdx) in data.steps" :key="stepIdx">
        <div
          v-motion
          :initial="{
            opacity: 0,
            scale: 1,
            x: isEven(stepIdx) ? -200 : 200,
          }"
          :visibleOnce="{
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
              duration: 300,
            },
          }"
          :delay="300"
          :class="[
            {
              'rounded-br-3xl rounded-tl-3xl mr-8': isEven(stepIdx),
              'rounded-bl-3xl rounded-tr-3xl ml-8': !isEven(stepIdx),
            },
            {
              'md:flex-row': isEven(stepIdx) && !data.alternate_image_position,
              'md:flex-row-reverse md:space-x-reverse':
                !isEven(stepIdx) && data.alternate_image_position,
            },
            'relative p-6 md:flex md:space-x-8 ring-accent ring-2',
          ]"
        >
          <div class="flex-shrink-0">
            <img
              :class="[
                {
                  'rounded-br-xl rounded-tl-xl': isEven(stepIdx),
                  'rounded-bl-xl rounded-tr-xl': !isEven(stepIdx),
                },
                'object-cover w-full h-32 md:w-48 md:h-full dark:brightness-90',
              ]"
              alt=""
              :src="fileUrl(step.image)"
            />
          </div>

          <div class="w-full mt-4 text-left md:mt-0">
            <div
              v-if="data.show_step_numbers"
              class="font-mono text-sm font-bold tracking-wide uppercase text-accent text-primary"
            >
              Step {{ stepIdx + 1 }}
            </div>
            <h3 class="mt-2 font-serif text-3xl font-bold dark:text-white">
              {{ step.title }}
            </h3>
            <TypographyProse :content="step.content" class="mt-4 font-mono" />
          </div>
        </div>
        <!-- Animation Timeline -->
        <svg
          v-if="stepIdx !== data.steps.length - 1"
          class="h-16 m-0 mx-auto stroke-current text-accent md:h-20 steps-animation"
          viewBox="0 0 60 200"
        >
          <line
            class="path"
            x1="15"
            x2="15"
            y1="0"
            y2="200"
            stroke-width="8"
            stroke-linecap="square"
          />
        </svg>
      </template>
    </div>
  </BlockContainer>
</template>

<style>
.steps-animation .path {
  stroke-dasharray: 1, 30;
  -webkit-animation: dash 5s linear both infinite;
  animation: dash 5s linear both infinite;
}

@keyframes dash {
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: -15rem;
  }
}
</style>
