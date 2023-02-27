<script setup lang="ts">
import { SparklesIcon } from '@heroicons/vue/24/outline'
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
  <header class="relative w-full md:flex md:space-x-6">
    <div
      class="md:flex md:justify-between md:items-center bg-gray-800 rounded-tl-3xl rounded-br-3xl md:flex-1"
    >
      <!-- <h1 class="px-8 py-6 text-4xl font-extrabold text-white">
            {{ title }}
          </h1> -->
      <NuxtLink href="/">
        <Logo class="h-6 text-white" />
      </NuxtLink>
      <nav
        class="hidden font-mono lg:flex lg:space-x-8 lg:py-2"
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
            exact-active-class="text-white font-bold bg-gray-700"
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
                  class="h-5 w-5 ml-1 flex-none text-gray-400"
                  aria-hidden="true"
                />
              </PopoverButton>

              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-1"
              >
                <PopoverPanel
                  class="absolute top-full z-10 mt-8 w-screen max-w-md overflow-hidden rounded-tr-3xl rounded-bl-3xl bg-gray-800 shadow-lg ring-1 ring-gray-700"
                >
                  <div class="p-4">
                    <div
                      v-for="childItem in item.children"
                      :key="item.id"
                      class="group relative flex gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-900"
                    >
                      <div
                        class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
                      >
                        <!-- <component :is="item.icon" class="h-6 w-6 atext-gray-600 group-hover:text-indigo-600" aria-hidden="true" /> -->
                      </div>
                      <div class="flex-auto">
                        <NuxtLink
                          :href="getUrl(childItem)"
                          class="block text-white uppercase font-bold"
                        >
                          {{ childItem.title }}
                          <span class="absolute inset-0" />
                        </NuxtLink>
                        <p
                          v-if="childItem.label"
                          class="mt-1 text-sm text-gray-400 leading-tight"
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
        <!-- :aria-current="item.current ? 'page' : undefined" -->
      </nav>
      <div class="flex items-center justify-end p-4 space-x-2">
        <DarkModeToggle class="text-primary-200 hover:text-primary-400" />
        <button
          id="animation-toggle"
          class="text-primary-200 hover:text-primary-400"
        >
          <SparklesIcon class="w-8 h-8" />
        </button>
      </div>
    </div>
    <NuxtLink
      href="/contact-us"
      class="flex items-center font-mono text-sm font-bold leading-none tracking-widest text-white lowercase transition-colors duration-300 bg-accent rounded-tr-3xl rounded-bl-3xl sm:text-base md:text-lg word-spacing-tight sm:px-10"
    >
      Let's Talk
    </NuxtLink>
  </header>
</template>
