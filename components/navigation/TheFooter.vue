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
  }
)

const { description } = useRuntimeConfig()

function getUrl(item: object) {
  if (item.type === 'page') {
    return `/${item.page.slug}`
  } else {
    return item.url
  }
}
</script>
<template>
  <footer
    class="bg-white dark:bg-gray-900 rounded-tl-3xl rounded-br-3xl"
    aria-labelledby="footer-heading"
  >
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="px-5 py-12 mx-auto max-w-7xl lg:py-16 md:px-12 lg:px-20">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="xl:col-span-1">
          <NuxtLink href="/">
            <Logo class="h-8 dark:text-white" />
          </NuxtLink>
          <p class="mt-2 font-mono text-sm text-gray-500">
            {{ description }}
          </p>
        </div>
        <div class="grid grid-cols-2 gap-8 mt-12 xl:mt-0 xl:col-span-2">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="font-semibold leading-6 text-black uppercase">
                Solutions
              </h3>
              <ul role="list" class="mt-4 space-y-3">
                <li>
                  <a href="#" class="text-sm text-gray-500 hover:text-blue-600">
                    Marketing
                  </a>
                </li>
                <li>
                  <a href="#" class="text-sm text-gray-500 hover:text-blue-600">
                    Analytics
                  </a>
                </li>
                <li>
                  <a href="#" class="text-sm text-gray-500 hover:text-blue-600">
                    Commerce
                  </a>
                </li>
                <li>
                  <a href="#" class="text-sm text-gray-500 hover:text-blue-600">
                    Insights
                  </a>
                </li>
              </ul>
            </div>
            <div class="mt-12 md:mt-0">
              <h3 class="font-semibold leading-6 text-black uppercase">
                Support
              </h3>
              <ul role="list" class="mt-4 space-y-4">
                <li>
                  <a href="#" class="text-sm text-gray-500 hover:text-blue-600">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" class="text-sm text-gray-500 hover:text-blue-600">
                    Alpine.js
                  </a>
                </li>
                <li>
                  <a href="#" class="text-sm text-gray-500 hover:text-blue-600">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" class="text-sm text-gray-500 hover:text-blue-600">
                    API Status
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="hidden lg:justify-end md:grid md:grid-cols-1">
            <div class="w-full mt-12 md:mt-0">
              <div class="mt-8 lg:justify-end xl:mt-0">
                <h3 class="font-semibold leading-6 text-black uppercase">
                  Subscribe to our newsletter
                </h3>
                <p class="mt-4 text-sm font-light text-gray-500 lg:ml-auto">
                  The latest news, articles, and resources, sent to your inbox
                  weekly.
                </p>
                <div
                  class="inline-flex items-center gap-2 mt-12 list-none lg:ml-auto"
                >
                  <form>
                    <div class="w-full sm:relative sm:flex sm:items-center">
                      <div class="min-w-0 w-60 shrink">
                        <input
                          type="email"
                          aria-label="Email address"
                          placeholder="Email address"
                          autocomplete="email"
                          required=""
                          class="block w-full p-3 text-black bg-white border border-gray-200 appearance-none rounded-xl placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <button
                        class="relative inline-flex justify-center flex-none px-3 py-3 ml-1 overflow-hidden text-sm font-medium text-white transition-colors bg-black rounded-xl outline-2 outline-offset-2 before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-blue-600 active:text-white/80 before:transition-colors"
                        type="submit"
                      >
                        <span class="inline"> Join us! </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="px-5 py-12 mx-auto border-t max-w-7xl sm:px-6 md:flex md:items-center md:justify-between lg:px-20"
    >
      <div class="flex justify-center mb-8 space-x-6 md:order-last md:mb-0">
        <span
          class="inline-flex justify-center w-full gap-3 lg:ml-auto md:justify-start md:w-auto"
        >
          <a class="w-6 h-6 transition fill-black hover:text-blue-500">
            <span class="sr-only"> github</span>
          </a>
          <a class="w-6 h-6 transition fill-black hover:text-blue-500">
            <span class="sr-only"> twitter</span>
          </a>
          <a class="w-6 h-6 transition fill-black hover:text-blue-500">
            <span class="sr-only">Instagram</span>
          </a>
          <a class="w-6 h-6 transition fill-black hover:text-blue-500">
            <span class="sr-only">Linkedin</span>
          </a>
        </span>
      </div>
      <div class="mt-8 md:mt-0 md:order-1">
        <span class="mt-2 text-sm font-light text-gray-500">
          Copyright © 2020 - 2021
          <a
            href="#"
            class="mx-2 text-wickedblue hover:text-gray-500"
            rel="noopener noreferrer"
          ></a
          >. Since 2020
        </span>
      </div>
    </div>
  </footer>
</template>
