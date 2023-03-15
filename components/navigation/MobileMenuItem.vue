<script setup lang="ts">
import { Bars3Icon, SparklesIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { PlusIcon, ArrowLeftIcon } from '@heroicons/vue/24/solid'

const subMenuOpen = ref(false)
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['close'])
</script>
<template>
  <div v-if="item.children.length > 0">
    <button
      @click="subMenuOpen = !subMenuOpen"
      class="flex items-center px-3 py-2 font-mono rounded-md"
    >
      <span class="ml-2 text-2xl font-semibold dark:text-white">
        {{ item.title }}
      </span>
      <PlusIcon
        v-if="item.children.length > 0"
        class="w-6 h-6 ml-2 text-accent"
      />
    </button>
    <Motionable
      as="div"
      name="submenu"
      :show="subMenuOpen"
      v-motion
      :initial="{ opacity: 0, x: 200, scale: 0 }"
      :enter="{
        opacity: 1,
        scale: 1,
        x: 0,
      }"
      :leave="{
        opacity: 0,
        x: 200,
        scale: 0,
      }"
      class="fixed inset-0 z-50 flex flex-col items-center justify-center w-full h-full bg-gray-50 dark:bg-gray-800"
    >
      <div class="flex justify-between w-full px-6">
        <VButton @click="subMenuOpen = false">
          <ArrowLeftIcon class="w-5 h-5 mr-2" />
          <span class="font-mono text-sm font-bold">Back</span>
        </VButton>
      </div>
      <div class="w-full px-6 mt-8">
        <TypographyTitle class="pb-2 border-b border-b-accent">{{
          item.title
        }}</TypographyTitle>
        <NuxtLink
          v-for="child in item.children"
          :href="child.url"
          class="items-center px-3 py-2 font-mono rounded-md dark:text-white"
        >
          <p class="text-2xl font-semibold">
            {{ child.title }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-300">
            {{ child.label }}
          </p>
        </NuxtLink>
      </div>
    </Motionable>
  </div>
  <NuxtLink
    v-else
    :href="item.url"
    class="flex items-center px-3 py-2 font-mono rounded-md dark:text-white"
  >
    <span class="ml-2 text-2xl font-semibold">
      {{ item.title }}
    </span>
  </NuxtLink>
</template>
