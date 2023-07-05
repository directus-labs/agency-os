<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

interface DropdownProps {
  buttonLabel?: string
  variant?: 'default' | 'primary' | 'outline' | 'danger'
  menuItems?: Array<{
    label: string
    action: () => void
  }>
}

withDefaults(defineProps<DropdownProps>(), {
  buttonLabel: 'Actions',
  variant: 'primary',
  menuItems: [
    {
      label: 'Action',
      action: () => {},
    },
  ],
})

function handleMenuItemClick(item = { action: () => {} }) {
  item.action()
}
</script>

<template>
  <div class="relative">
    <Menu as="div" class="relative inline-block text-left">
      <VButton>
        <span>{{ buttonLabel }}</span>
        <Icon
          name="heroicons:chevron-down"
          class="w-5 h-5 ml-2 -mr-1 text-primary-200 hover:text-primary-100"
          aria-hidden="true"
        />
      </VButton>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem
              v-for="(item, itemIdx) in menuItems"
              :key="itemIdx"
              v-slot="{ active }"
            >
              <button
                type="button"
                @click="handleMenuItemClick(item)"
                :class="[
                  active
                    ? 'bg-accent dark:bg-accent text-white'
                    : 'text-gray-900 dark:text-gray-100',
                  'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                ]"
              >
                {{ item.label }}
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
