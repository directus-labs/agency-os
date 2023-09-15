<!--
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
	<!--
	  This example requires updating your template:

	  ```
	  <html class="h-full bg-gray-50">
	  <body class="h-full overflow-hidden">
	  ```
	-->
	<div
		class="flex h-full antialiased transition duration-150 bg-white visual-effects bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-700"
	>
		<div class="p-2">
			<!-- Narrow sidebar -->
			<div class="hidden w-24 h-full bg-gray-800 rounded-tl-xl rounded-br-xl md:block">
				<div class="flex flex-col items-center w-full h-full py-6">
					<div class="flex items-center flex-shrink-0">
						<Logo class="w-24 h-8 p-2 text-white" alt="Your Company" />
					</div>
					<div class="flex flex-col justify-between flex-1 h-full gap-y-4">
						<div class="flex-1 w-full px-2 mt-6 space-y-1">
							<NuxtLink
								v-for="item in sidebarNavigation.top"
								:key="item.name"
								:href="item.href"
								:class="[
									item.current ? 'bg-gray-800 text-white' : 'text-gray-100 hover:bg-gray-800 hover:text-white',
									'group flex w-full flex-col items-center rounded-md p-3 text-xs font-bold font-mono',
								]"
								:aria-current="item.current ? 'page' : undefined"
							>
								<Icon
									:name="item.icon"
									:class="[item.current ? 'text-white' : 'text-gray-300 group-hover:text-white', 'h-6 w-6']"
									aria-hidden="true"
								/>
								<span class="mt-2">{{ item.name }}</span>
							</NuxtLink>
						</div>
						<div class="mt-auto">
							<NuxtLink
								v-for="item in sidebarNavigation.bottom"
								:key="item.name"
								:href="item.href"
								:class="[
									item.current ? 'bg-gray-800 text-white' : 'text-gray-100 hover:bg-gray-800 hover:text-white',
									'group flex w-full flex-col items-center rounded-md p-3 text-xs font-bold font-mono',
								]"
								:aria-current="item.current ? 'page' : undefined"
							>
								<Icon
									:name="item.icon"
									:class="[item.current ? 'text-white' : 'text-gray-300 group-hover:text-white', 'h-6 w-6']"
									aria-hidden="true"
								/>
								<span class="mt-2">{{ item.name }}</span>
							</NuxtLink>
							<DarkModeToggle />
							<!-- Profile dropdown -->
							<Menu as="div" class="relative flex justify-center flex-shrink-0">
								<div>
									<MenuButton
										class="flex text-sm bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
									>
										<span class="sr-only">Open user menu</span>
										<img
											class="w-12 h-12 rounded-md"
											src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
											alt=""
										/>
									</MenuButton>
								</div>
								<transition
									enter-active-class="transition duration-100 ease-out"
									enter-from-class="transform scale-95 opacity-0"
									enter-to-class="transform scale-100 opacity-100"
									leave-active-class="transition duration-75 ease-in"
									leave-from-class="transform scale-100 opacity-100"
									leave-to-class="transform scale-95 opacity-0"
								>
									<MenuItems
										class="absolute z-10 w-48 py-1 mt-2 font-mono bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
									>
										<MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
											<a
												:href="item.href"
												:class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
											>
												{{ item.name }}
											</a>
										</MenuItem>
									</MenuItems>
								</transition>
							</Menu>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Mobile menu -->
		<TransitionRoot as="template" :show="mobileMenuOpen">
			<Dialog as="div" class="relative z-20 md:hidden" @close="mobileMenuOpen = false">
				<TransitionChild
					as="template"
					enter="transition-opacity ease-linear duration-300"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
				</TransitionChild>

				<div class="fixed inset-0 z-40 flex">
					<TransitionChild
						as="template"
						enter="transition ease-in-out duration-300 transform"
						enter-from="-translate-x-full"
						enter-to="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leave-from="translate-x-0"
						leave-to="-translate-x-full"
					>
						<DialogPanel class="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-gray-700">
							<TransitionChild
								as="template"
								enter="ease-in-out duration-300"
								enter-from="opacity-0"
								enter-to="opacity-100"
								leave="ease-in-out duration-300"
								leave-from="opacity-100"
								leave-to="opacity-0"
							>
								<div class="absolute right-0 p-1 top-1 -mr-14">
									<button
										type="button"
										class="flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
										@click="mobileMenuOpen = false"
									>
										<Icon name="heroicons:x-mark" class="w-6 h-6 text-white" aria-hidden="true" />
										<span class="sr-only">Close sidebar</span>
									</button>
								</div>
							</TransitionChild>
							<div class="flex items-center flex-shrink-0 px-4">
								<Logo class="w-auto h-8" alt="Your Company" />
							</div>
							<div class="flex-1 h-0 px-2 mt-5 overflow-y-auto">
								<nav class="flex flex-col h-full">
									<div class="space-y-1">
										<NuxtLink
											v-for="item in sidebarNavigation.top"
											:key="item.name"
											:href="item.href"
											:class="[
												item.current ? 'bg-gray-800 text-white' : 'text-gray-100 hover:bg-gray-800 hover:text-white',
												'group flex items-center rounded-md py-2 px-3 text-sm font-medium font-mono',
											]"
											:aria-current="item.current ? 'page' : undefined"
										>
											<Icon
												:name="item.icon"
												:class="[item.current ? 'text-white' : 'text-gray-300 group-hover:text-white', 'mr-3 h-6 w-6']"
												aria-hidden="true"
											/>
											<span>{{ item.name }}</span>
										</NuxtLink>
									</div>
								</nav>
							</div>
						</DialogPanel>
					</TransitionChild>
					<div class="flex-shrink-0 w-14" aria-hidden="true">
						<!-- Dummy element to force sidebar to shrink to fit close icon -->
					</div>
				</div>
			</Dialog>
		</TransitionRoot>

		<!-- Content area -->
		<div class="flex flex-col flex-1 p-2 overflow-hidden">
			<!-- Main content -->
			<div class="flex items-stretch flex-1 overflow-hidden">
				<main class="flex-1 overflow-y-auto">
					<!-- Primary column -->
					<section aria-labelledby="primary-heading" class="flex flex-col flex-1 h-full min-w-0 lg:order-last">
						<slot />
					</section>
				</main>

				<!-- Secondary column (hidden on smaller screens) -->
				<!-- <aside class="hidden overflow-y-auto border-l border-gray-200 w-96 lg:block">
				</aside> -->
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import {
	Dialog,
	DialogPanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
	TransitionChild,
	TransitionRoot,
} from '@headlessui/vue';

const sidebarNavigation = {
	top: [
		{ name: '', href: '/', icon: 'solar:magnifer-outline', current: false },
		{ name: 'Dashboard', href: '/app', icon: 'solar:home-angle-linear', current: false },
		{ name: 'Projects', href: '/app/projects', icon: 'solar:checklist-bold', current: false },
		{ name: 'Messages', href: '/app/messages', icon: 'solar:chat-line-outline', current: false },
		{ name: 'Files', href: '/app/files', icon: 'solar:folder-with-files-outline', current: false },
		{ name: 'Billing', href: '/app/billing', icon: 'solar:money-bag-outline', current: true },
		{ name: 'Account', href: '/app/account', icon: 'solar:buildings-2-linear' },
	],
	bottom: [{ name: 'Help', href: '/app/help', icon: 'solar:question-square-outline' }],
};
const userNavigation = [
	{ name: 'Your Profile', href: '#' },
	{ name: 'Sign out', href: '#' },
];

const mobileMenuOpen = ref(false);
</script>

<style>
html {
	@apply h-full;
}
body {
	@apply h-full antialiased;
}
#__nuxt {
	@apply h-full overflow-hidden;
}
</style>
