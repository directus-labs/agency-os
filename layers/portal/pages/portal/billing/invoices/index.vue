<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp();
const { path, params } = useRoute();

const {
	data: invoices,
	pending,
	error,
} = await useAsyncData(
	path,
	() => {
		return $directus.request(
			$readItems('os_invoices', {
				fields: [
					'*',
					{
						contact: ['id', 'first_name', 'last_name', 'email'],
					},
				],
			}),
		);
	},
	{},
);

const columns = [
	{
		key: 'invoice_number',
		label: '#',
	},
	{
		key: 'due_date',
		label: 'Due Date',
	},
	{
		key: 'issue_date',
		label: 'Issue Date',
	},
	{
		key: 'status',
		label: 'Status',
	},
	{
		key: 'contact',
		label: 'Contact',
	},
	{
		key: 'total',
		label: 'Total',
	},
	{
		key: 'amount_due',
		label: 'Amount Due',
	},

	{
		key: 'actions',
	},
];
</script>
<template>
	<div>
		<PortalPageHeader
			title="Invoices"
			:breadcrumbs="[
				{
					title: 'Portal',
					href: '/portal',
				},
				{
					title: 'Billing',
					href: '/portal/billing',
				},
			]"
		>
			<template #actions></template>
		</PortalPageHeader>
		<UCard class="mt-6">
			<template #header>
				<!-- Filters -->
				<div class="flex items-center justify-between gap-3">
					<UInput v-model="search" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />
					<!-- <USelectMenu v-model="selectedStatus" :options="todoStatus" multiple placeholder="Status" class="w-40" /> -->
				</div>
			</template>
			<!-- Table -->
			<UTable :columns="columns" :rows="invoices" column-attribute="label">
				<template #invoice_number-data="{ row }">
					<UButton variant="outline" :to="`/portal/billing/invoices/${row.id}`" :padding="false">
						{{ row.invoice_number }}
					</UButton>
				</template>
				<template #amount_due-data="{ row }">
					{{ formatCurrency(row.amount_due) }}
				</template>
				<template #total-data="{ row }">
					{{ formatCurrency(row.total) }}
				</template>
				<template #contact-data="{ row }">
					<UserBadge :author="row.contact" size="xs" />
				</template>
				<template #due_date-data="{ row }">
					<VText size="xs">
						{{
							getFriendlyDate(row.due_date, {
								monthAbbr: true,
							})
						}}
					</VText>
					<VText size="xs" text-color="light">{{ getRelativeTime(row.due_date) }}</VText>
				</template>
				<template #issue_date-data="{ row }">
					<VText size="xs">
						{{
							getFriendlyDate(row.issue_date, {
								monthAbbr: true,
							})
						}}
					</VText>
					<VText size="xs" text-color="light">{{ getRelativeTime(row.issue_date) }}</VText>
				</template>
				<template #actions-data="{ row }">
					<UButton
						:to="`/portal/billing/invoices/${row.id}`"
						color="primary"
						variant="outline"
						icon="i-heroicons-arrow-right"
					/>
				</template>
			</UTable>
		</UCard>
	</div>
</template>
