<script setup lang="ts">
import { Bars3Icon, SparklesIcon } from '@heroicons/vue/24/outline'
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from '@heroicons/vue/20/solid'

import {
  Popover,
  PopoverGroup,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/vue'

// Import the $directus plugin
const { $directus } = useNuxtApp()

const { fileUrl } = useFiles()

// Get the params from the Nuxt route
const { params, path } = useRoute()

// Fetch the page data from the Directus API using the Nuxt useAsyncData composable
// https://v3.nuxtjs.org/docs/usage/data-fetching#useasyncdata

const {
  data: navigation,
  pending,
  error,
} = await useAsyncData(
  'mainNavigation',
  () => {
    return $directus.items('navigation').readOne('main', {
      fields: ['items.*', 'items.page.slug', 'items.children.*'],
    })
  },
  {
    transform: (data) => data,
    // pick: [
    //   'title',
    //   'content',
    //   'image',
    //   'author',
    //   'category',
    //   'summary',
    //   'date_published',
    // ],
  }
)

function getUrl(item: object) {
  if (item.type === 'page') {
    return `/${item.page.slug}`
  } else {
    return item.url
  }
}
</script>
<template>
  <header
    class="relative w-full space-y-4 md:flex md:items-center md:space-x-6 md:space-y-0"
  >
    <div
      class="flex items-center bg-gray-800 md:justify-between rounded-tl-3xl rounded-br-3xl md:flex-1"
    >
      <NuxtLink href="/" class="px-4 py-4">
        <Logo class="h-6 text-white" />
        <span class="sr-only">Title</span>
      </NuxtLink>
      <nav
        class="hidden font-mono md:flex md:space-x-4 lg:space-x-6"
        aria-label="Global"
      >
        <template v-for="item in navigation.items" :key="item.id">
          <NuxtLink
            v-if="!item.has_children"
            :href="getUrl(item)"
            :class="[
              'text-gray-300 hover:bg-gray-700  uppercase hover:text-white',
              'rounded-br-xl rounded-tl-xl py-2 px-3 inline-flex items-center font-bold',
            ]"
            exact-active-class="font-bold text-white bg-gray-700"
            :target="item.open_in_new_tab ? '_blank' : '_self'"
            >{{ item.title }}</NuxtLink
          >
          <PopoverGroup v-else class="">
            <Popover class="relative">
              <PopoverButton
                :class="[
                  'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'rounded-br-xl rounded-tl-xl py-2 px-3 inline-flex items-center font-bold uppercase',
                ]"
              >
                {{ item.title }}
                <ChevronDownIcon
                  class="flex-none w-5 h-5 ml-1 text-gray-400"
                  aria-hidden="true"
                />
              </PopoverButton>

              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="translate-y-1 opacity-0"
                enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="translate-y-0 opacity-100"
                leave-to-class="translate-y-1 opacity-0"
              >
                <PopoverPanel
                  class="absolute z-10 w-screen max-w-md mt-8 overflow-hidden bg-gray-800 shadow-lg top-full rounded-tr-3xl rounded-bl-3xl ring-1 ring-gray-700"
                >
                  <div class="p-4">
                    <div
                      v-for="childItem in item.children"
                      :key="item.id"
                      class="relative flex p-4 text-sm leading-6 rounded-lg group gap-x-6 hover:bg-gray-900"
                    >
                      <div
                        class="flex items-center justify-center flex-none mt-1 rounded-lg h-11 w-11 bg-gray-50 group-hover:bg-white"
                      >
                        <img
                          v-if="childItem.image"
                          :src="fileUrl(childItem.image)"
                          class="w-10 h-10"
                        />
                        <!-- <component :is="item.icon" class="w-6 h-6 atext-gray-600 group-hover:text-indigo-600" aria-hidden="true" /> -->
                      </div>
                      <div class="flex-auto">
                        <NuxtLink
                          :href="getUrl(childItem)"
                          class="block font-bold text-white uppercase"
                        >
                          {{ childItem.title }}
                          <span class="absolute inset-0" />
                        </NuxtLink>
                        <p
                          v-if="childItem.label"
                          class="mt-1 text-sm leading-tight text-gray-400"
                        >
                          {{ childItem.label }}
                        </p>
                      </div>
                    </div>
                  </div>
                </PopoverPanel>
              </transition>
            </Popover>
          </PopoverGroup>
        </template>
      </nav>
      <div class="flex items-center justify-end w-full p-3 space-x-2">
        <DarkModeToggle
          class="hidden md:block text-primary-200 hover:text-primary-400"
        />
        <button
          id="animation-toggle"
          class="hidden md:block text-primary-200 hover:text-primary-400"
        >
          <Icon name="heroicons:sparkles" class="w-8 h-8" />
        </button>
      </div>
    </div>
    <div class="hidden uppercase md:block">
      <NuxtLink href="/contact-us" class="btn bg-accent"> Let's Talk </NuxtLink>
    </div>

    <NavigationMobileMenu :navigation="navigation" />
  </header>
</template>
