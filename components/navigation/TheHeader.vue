<script setup lang="ts">
const {
	theme,
	globals: { title },
} = useAppConfig();

const {
	data: navigation,
	pending,
	error,
} = await useAsyncData(
	'mainNavigation',
	() => {
		return useDirectus(
			readItem('navigation', 'main', {
				fields: [
					{
						items: [
							'id',
							'has_children',
							'title',
							'icon',
							'label',
							'type',
							'url',
							{
								page: ['permalink', 'title'],
								children: [
									'id',
									'title',
									'has_children',
									'icon',
									'label',
									'type',
									'url',
									{
										page: ['permalink', 'title'],
									},
								],
							},
						],
					},
				],
			}),
		);
	},
	{
		transform: (data) => data,
	},
);
</script>
<template>
	<header class="relative w-full mx-auto space-y-4 md:flex md:items-center md:space-y-0 md:gap-x-4">
		<div class="flex items-center bg-gray-900 justify-between py-2 px-6 md:flex-1 rounded-card">
			<NuxtLink href="/" class="py-2">
				<Logo class="h-6 text-white" />
				<span class="sr-only">{{ title }}</span>
			</NuxtLink>
			<nav class="hidden md:flex md:space-x-4 lg:space-x-6" aria-label="Global">
				<NavigationMenuItem v-for="item in navigation?.items" :key="item.id" :item="item" />
			</nav>
			<div class="flex items-center justify-end flex-shrink-0 space-x-2">
				<DarkModeToggle class="hidden text-gray-200 md:block hover:text-gray-400" bg="dark" />
			</div>
		</div>

		<div class="hidden h-full gap-4 md:flex">
			<UButton to="/contact-us" color="primary" size="xl">Let's Talk</UButton>
			<UButton to="/portal" color="primary" variant="ghost" size="xl">Login</UButton>
		</div>
		<NavigationMobileMenu v-if="navigation" :navigation="navigation" />
	</header>
</template>
