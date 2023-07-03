<script setup lang="ts">
const isOpen = ref(false)
const subMenuOpen = ref(false)
const toggle = () => {
  isOpen.value = !isOpen.value
  subMenuOpen.value = false
}

const { tagline } = useRuntimeConfig()

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
        :initial="{ opacity: 0, y: 400, scale: 0.9 }"
        :enter="{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 300,
          },
        }"
        :leave="{
          opacity: 0,
          y: 400,
          scale: 0.9,
          transition: {
            duration: 300,
          },
        }"
        class="fixed inset-0 z-50 flex flex-col w-full h-full bg-gray-50 dark:bg-gray-800"
      >
        <div class="relative w-full px-6 py-6">
          <NuxtLink href="/">
            <Logo class="h-6 dark:text-white" />
          </NuxtLink>
          <p class="pb-4 mt-2 font-mono text-gray-400 border-b border-gray-500">
            {{ tagline }}
          </p>
          <DarkModeToggle
            class="absolute text-gray-500 top-4 right-4 dark:text-gray-200 hover:text-accent"
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
            <VButton href="/contact-us" variant="primary">Let's Talk</VButton>
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
      class="fixed z-50 p-4 text-white transition duration-300 shadow-md md:hidden bottom-4 right-4 bg-accent hover:bg-opacity-75 rounded-tr-xl rounded-bl-xl"
    >
      <div>
        <span class="sr-only">Close</span>
        <Icon name="heroicons:bars-3" v-if="!isOpen" class="w-6 h-6" />
        <Icon name="heroicons:x-mark" v-if="isOpen" class="w-6 h-6" />
      </div>
    </button>
  </div>
</template>
