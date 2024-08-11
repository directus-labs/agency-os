<script setup lang="ts">
import type { RouteLocationRaw } from '#vue-router';
import type { NavigationItem } from '~~/types';

const { globals } = useAppConfig();

const { data: navigation } = await useAsyncData('footerNav', () => {
	return useDirectus(
		readItem('navigation', 'footer', {
			fields: [
				{
					items: [
						'id',
						'title',
						'icon',
						'label',
						'type',
						'url',
						'has_children',
						{
							page: ['permalink', 'title'],
							children: [
								'id',
								'title',
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
});

const { data: form } = await useAsyncData(
	'newsletterForm',
	() => {
		return useDirectus(
			readItems('forms', {
				filter: {
					key: {
						_eq: 'newsletter',
					},
				},
			}),
		);
	},
	{
		transform: (data) => data[0],
	},
);
</script>
<template>
	<footer
		class="relative px-8 py-8 bg-white md:px-12 md:py-10 dark:bg-gray-900 rounded-panel"
		aria-labelledby="footer-heading"
	>
		<div class="mx-auto">
			<!-- Header -->
			<div class="flex justify-between items-start">
				<div class="w-full">
					<NuxtLink href="/">
						<Logo class="h-8 dark:text-white" />
					</NuxtLink>
					<VText v-if="globals?.tagline" text-color="light" class="mt-2">
						{{ globals.tagline }}
					</VText>
				</div>
				<div class="flex items-center justify-end">
					<DarkModeToggle class="hidden text-gray-600 md:block hover:text-gray-400" />
				</div>
			</div>

			<!-- Navigation + Form -->
			<nav class="grid gap-8 mt-8 md:grid-cols-2 xl:mt-0 xl:col-span-2">
				<div class="mt-4">
					<TypographyTitle>Menu</TypographyTitle>
					<ul role="list" class="grid gap-2 mt-2 md:grid-cols-2">
						<li v-for="item in navigation?.items as NavigationItem[]" :key="item.id">
							<NuxtLink
								:to="getNavItemUrl(item) as RouteLocationRaw"
								class="font-medium text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-primary"
							>
								{{ item.title }}
							</NuxtLink>
						</li>
					</ul>
				</div>

				<div v-if="form" class="relative">
					<TypographyHeadline :content="`<p>Subscribe to our <em>newsletter</em></p>`" size="sm">
						Subscribe to our newsletter
					</TypographyHeadline>
					<UForm class="mt-4 mb-8" :form="form" />
				</div>
			</nav>
		</div>

		<!-- Bottom -->
		<div class="pt-6 mx-auto border-t dark:border-t-gray-700 max-w-7xl md:flex md:items-center md:justify-between">
			<div class="flex items-center justify-center space-x-6 md:order-last md:mb-0">
				<NuxtLink
					v-for="link in globals?.social_links"
					:key="link.url"
					:href="link.url"
					class="w-6 h-6 text-white"
					target="_blank"
				>
					<span class="sr-only">{{ link.service }}</span>
					<Icon class="w-8 h-8 text-gray-700 dark:text-white hover:opacity-75" :name="`mdi:${link.service}`" />
				</NuxtLink>
			</div>
			<div class="mt-8 md:mt-0 md:order-1">
				<span class="mt-2 text-gray-600 dark:text-gray-400">
					Copyright © 1988 - {{ new Date().getFullYear() }}
					<NuxtLink v-if="globals?.title" href="/" class="mx-2 hover:text-primary" rel="noopener noreferrer">
						{{ globals.title }}.
					</NuxtLink>
					All rights reserved.
				</span>
				<!-- You're free to remove this footer if you want. But we'd appreciate it if you keep the credits. -->
				<span class="block mt-2 text-gray-600 dark:text-gray-400">
					<Icon name="heroicons:bolt" class="w-4 h-4 text-primary" />
					Site powered by
					<NuxtLink
						href="https://www.directus.io?ref=agencyos_footer"
						target="_blank"
						rel="noopener noreferrer"
						class="border-b dark:border-b-gray-700 hover:text-primary"
					>
						Directus
					</NuxtLink>
					and
					<NuxtLink
						href="https://www.nuxt.com?ref=agencyos_footer"
						target="_blank"
						rel="noopener noreferrer"
						class="border-b dark:border-b-gray-700 hover:text-primary"
					>
						Nuxt
					</NuxtLink>
					.
				</span>
			</div>
		</div>
	</footer>
</template>
