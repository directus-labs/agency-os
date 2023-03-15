<script setup lang="ts">
import { Bars3Icon, SparklesIcon, XMarkIcon } from '@heroicons/vue/24/outline'

import { PlusIcon, ArrowLeftIcon } from '@heroicons/vue/24/solid'
const isOpen = ref(false)
const subMenuOpen = ref(false)
const toggle = () => {
  isOpen.value = !isOpen.value
  subMenuOpen.value = false
}

const { description } = useRuntimeConfig()

const props = defineProps({
  navigation: {
    type: Object,
    required: true,
  },
})

const route = useRoute()
// Watch route changes and close the menu
watch(
  () => route.path,
  (newVal, oldVal) => {
    isOpen.value = false
  }
)

// Disbale scrolling when the menu is open
watch(
  () => isOpen.value,
  (newVal, oldVal) => {
    if (newVal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }
)
</script>
<template>
  <div class="">
    <!-- Menu -->
    <div>
      <Motionable
        as="div"
        name="menu"
        :show="isOpen"
        v-motion
        :initial="{ opacity: 0, y: 100, scale: 0 }"
        :enter="{
          opacity: 1,
          scale: 1,
          y: 0,
        }"
        :leave="{
          opacity: 0,
          y: 100,
          scale: 0,
        }"
        class="fixed inset-0 z-50 flex flex-col w-full h-full bg-gray-50 dark:bg-gray-800"
      >
        <div class="relative w-full px-6 py-6">
          <NuxtLink href="/">
            <Logo class="h-6 dark:text-white" />
          </NuxtLink>
          <p class="pb-4 mt-2 font-mono text-gray-400 border-b border-gray-500">
            {{ description }}
          </p>
          <DarkModeToggle
            class="absolute text-gray-500 top-4 right-4 dark:text-gray-200 hover:text-primary-400"
          />
        </div>
        <div class="flex flex-col justify-center h-full px-6 space-y-2">
          <NavigationMobileMenuItem
            v-for="item in navigation.items"
            :key="item.id"
            :item="item"
            @close="toggle"
          />
          <div class="flex flex-col w-full px-4">
            <NuxtLink href="/contact-us" class="text-lg btn btn-primary">
              Let's Talk
            </NuxtLink>
          </div>
        </div>
      </Motionable>
    </div>
    <!-- Button -->
    <button
      @click="toggle"
      :class="{
        'bg-accent': isOpen || !isOpen,
      }"
      class="fixed z-50 p-4 text-white transition duration-300 shadow-md md:hidden bottom-4 right-4 bg-accent hover:bg-opacity-80 rounded-tr-xl rounded-bl-xl"
    >
      <div>
        <span class="sr-only">Close</span>
        <Bars3Icon v-if="!isOpen" class="w-6 h-6" />
        <XMarkIcon v-if="isOpen" class="w-6 h-6" />
      </div>
    </button>
  </div>
</template>
