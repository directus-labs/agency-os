<script setup lang="ts">
import {
  Popover,
  PopoverGroup,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/vue'

import { NavigationItem } from '~~/types'

const props = defineProps({
  item: {
    type: Object as PropType<NavigationItem>,
    required: true,
  },
})

function getUrl(item: object) {
  if (item.type === 'page') {
    return `/${item.page.slug}`
  } else {
    return item.url
  }
}

function convertIconName(name: string) {
  // Convert the icon coming from the API to the name of the icon component
  // Directus uses Google Material Icons and the icon values are snake_case (e.g. "account_circle")
  const prefix = 'ic:outline-'
  // Change snake case to kebab case
  const kebabCase = name.replace(/_/g, '-')
  const iconName = prefix + kebabCase
  return iconName
}
</script>
<template>
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
          'rounded-br-xl rounded-tl-xl py-2 px-3 inline-flex items-center font-bold uppercase ring-accent ring-offset-2 ring-offset-gray-800  focus:ring-1 outline-none',
        ]"
      >
        {{ item.title }}
        <Icon
          name="heroicons:chevron-down"
          class="flex-none w-5 ml-1 text-gray-400"
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
              class="relative flex p-4 text-sm leading-6 rounded-tr-xl rounded-bl-xl group gap-x-6 hover:bg-gray-900"
            >
              <div
                class="flex items-center justify-center flex-none p-2 mt-1 border rounded-tr-lg rounded-bl-lg h-11 w-11 border-accent"
              >
                <Icon
                  v-if="childItem.icon"
                  :name="convertIconName(childItem.icon)"
                  class="w-10 h-10 text-accent"
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
