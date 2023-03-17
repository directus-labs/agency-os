<script setup lang="ts">
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
      <Icon
        name="heroicons:plus"
        v-if="item.children.length > 0"
        class="w-6 h-6 ml-2 text-accent"
      />
    </button>
    <Motionable
      as="div"
      name="submenu"
      :show="subMenuOpen"
      v-motion
      :initial="{ opacity: 0, x: 400, scale: 0.9 }"
      :enter="{
        opacity: 1,
        scale: 1,
        x: 0,
        transition: {
          duration: 300,
        },
      }"
      :leave="{
        opacity: 0,
        x: 400,
        scale: 0.9,
        transition: {
          duration: 300,
        },
      }"
      class="fixed inset-0 z-50 flex flex-col items-center justify-center w-full h-full bg-gray-50 dark:bg-gray-800"
    >
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
      <div class="absolute bottom-4 left-4">
        <VButton class="inline-flex" @click="subMenuOpen = false">
          <Icon name="heroicons:arrow-left" class="w-5 h-5 mr-2" />
          <span class="font-mono text-sm font-bold">Back</span>
        </VButton>
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
