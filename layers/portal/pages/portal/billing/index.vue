<script setup lang="ts">
const tabs = [
	{
		name: 'Invoices',
		icon: 'i-heroicons-document-check',
		href: '/portal/billing/invoices',
		description: 'View and pay your invoices',
	},
	{
		name: 'Payments',
		icon: 'i-heroicons-currency-dollar',
		href: '/portal/billing/payments',
		description: 'View your payments',
	},
];

const { getPortalLink, loading: stripeLoading } = useStripe();
</script>
<template>
	<div>
		<PortalPageHeader
			title="Billing"
			:breadcrumbs="[
				{
					title: 'Portal',
					href: '/portal',
				},
				{
					title: 'Billing',
				},
			]"
		>
			<template #actions>
				<UButton
					color="primary"
					variant="outline"
					size="xl"
					@click="getPortalLink('cus_OlTbJKVanSb1zN')"
					:loading="stripeLoading"
				>
					Update Payment Settings
				</UButton>
			</template>
		</PortalPageHeader>
		<div class="grid mt-6 gap-x-4 sm:gap-x-6 gap-y-4 sm:gap-y-6 md:grid-cols-3">
			<NuxtLink v-for="collection in tabs" :key="collection.name" :href="collection.href">
				<UCard
					:ui="{
						ring: 'hover:ring-primary dark:hover:ring-primary',
					}"
				>
					<div class="flex items-center">
						<UIcon v-if="collection.icon" :name="collection.icon" class="w-10 h-10 text-primary" />
					</div>
					<div>
						<TypographyHeadline :content="collection.name" size="sm" />
						<p class="text-gray-500 dark:text-gray-300 line-clamp-3 text-md sm:line-clamp-3">
							{{ collection.description }}
						</p>
					</div>
				</UCard>
			</NuxtLink>
		</div>
	</div>
</template>
