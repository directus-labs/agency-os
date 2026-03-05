<script setup>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';

definePageMeta({
	layout: 'blank',
	middleware: ['auth'],
});

const { logout, user } = useDirectusAuth();

const NuxtLink = resolveComponent('NuxtLink');

function useCommandPalette() {
	const showCommandPalette = ref(false);

	defineShortcuts({
		meta_k: {
			usingInput: true,
			handler: () => {
				showCommandPalette.value = !showCommandPalette.value;
			},
		},
	});

	return {
		showCommandPalette,
	};
}

const sidebarNavigation = {
	top: [
		{ name: 'Search', click: () => (showCommandPalette.value = true), icon: 'material-symbols:search-rounded' },
		{ name: 'Dashboard', href: '/portal', icon: 'material-symbols:home-outline-rounded' },
		{ name: 'Projects', href: '/portal/projects', icon: 'material-symbols:tab-group-outline-rounded' },
		{ name: 'Files', href: '/portal/files', icon: 'material-symbols:folder-outline-rounded' },
		{ name: 'Billing', href: '/portal/billing', icon: 'material-symbols:attach-money-rounded' },
		{ name: 'Account', href: '/portal/account', icon: 'material-symbols:account-circle-outline' },
	],
	bottom: [{ name: 'Help', href: '/portal/help', icon: 'material-symbols:help-outline-rounded' }],
};

const userNavigation = [
	[
		{
			label: 'Your Profile',
			icon: 'i-heroicons-user-circle',
			click: () => {
				navigateTo('/portal/account#profile');
			},
		},
		{ label: 'Sign out', icon: 'i-heroicons-arrow-left-on-rectangle', click: () => logout() },
	],
];

const { showCommandPalette } = useCommandPalette();
const mobileMenuOpen = ref(false);
</script>

<template>
	<div class="flex h-full transition duration-150 bg-gray-100 dark:bg-gray-950">
		<div class="hidden p-3 md:block">
			<!-- Narrow sidebar -->
			<div class="w-24 h-full bg-gray-900 rounded-panel">
				<div class="flex flex-col items-center w-full h-full py-6">
					<div class="flex items-center flex-shrink-0">
						<Logo class="w-20 text-white" alt="Your Company" />
					</div>
					<div class="flex flex-col justify-between flex-1 h-full gap-y-4">
						<div class="w-full px-2 mt-6 space-y-1">
							<component
								:is="item.href ? NuxtLink : 'button'"
								v-for="item in sidebarNavigation.top"
								:key="item.name"
								:href="item.href ?? undefined"
								:class="[
									item.current ? 'bg-gray-800 text-white' : 'text-gray-100 hover:bg-gray-800 hover:text-white',
									'group flex w-full flex-col items-center rounded-card py-3 px-2 text-xs font-bold ',
								]"
								:aria-current="item.current ? 'page' : undefined"
								@click="item.click ? item.click() : undefined"
							>
								<UIcon
									:name="item.icon"
									:class="[item.current ? 'text-white' : 'text-gray-300 group-hover:text-white', 'h-6 w-6']"
									aria-hidden="true"
								/>
								<span class="mt-2">{{ item.name }}</span>
							</component>
						</div>
						<div class="flex flex-col items-center justify-center w-full px-2 space-y-2">
							<NuxtLink
								v-for="item in sidebarNavigation.bottom"
								:key="item.name"
								:href="item.href"
								:class="[
									item.current ? 'bg-gray-800 text-white' : 'text-gray-100 hover:bg-gray-800 hover:text-white',
									'group flex w-full flex-col items-center rounded-card py-3 px-2 text-xs font-bold ',
								]"
								:aria-current="item.current ? 'page' : undefined"
							>
								<UIcon
									:name="item.icon"
									:class="[item.current ? 'text-white' : 'text-gray-300 group-hover:text-white', 'h-6 w-6']"
									aria-hidden="true"
								/>
								<span class="mt-2">{{ item.name }}</span>
							</NuxtLink>
							<DarkModeToggle bg="dark" class="" />
							<!-- Profile dropdown -->
							<UDropdown class="relative" :items="userNavigation">
								<button>
									<span class="sr-only">Open user menu</span>
									<UAvatar class="w-12 h-12 mx-auto" :src="user.avatar" :alt="userName(user)" />
								</button>
							</UDropdown>
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
												'group flex items-center rounded-md py-2 px-3 text-sm font-medium ',
											]"
											:aria-current="item.current ? 'page' : undefined"
										>
											<UIcon
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
		<div class="flex flex-col flex-1 overflow-y-auto">
			<NuxtErrorBoundary>
				<template #error="{ error, clearError }">
					<VAlert type="error">{{ error }}</VAlert>
					<button class="mt-4 text-sm text-gray-500 underline" @click="clearError">Try again</button>
					<p>An error occurred: {{ error }}</p>
				</template>
				<div class="w-full max-w-5xl p-4 mx-auto">
					<NuxtPage />
				</div>
			</NuxtErrorBoundary>
		</div>

		<!-- Meta layer -->
		<UModal v-model="showCommandPalette">
			<PortalSearch @close="showCommandPalette = false" />
		</UModal>
		<UNotifications />
	</div>
</template>

<style>
html {
	@apply h-full;
}
body {
	@apply h-full antialiased;
}
#__nuxt {
	@apply h-full;
}
</style>
