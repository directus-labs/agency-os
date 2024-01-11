<script setup lang="ts">
const {
	data: invoices,
	pending,
	error,
} = await useAsyncData(
	'organization-open-invoices',
	() => {
		return useDirectus(
			readItems('os_invoices', {
				fields: ['*'],
				filter: {
					_and: [
						{
							status: {
								_neq: 'open',
							},
						},
					],
				},
			}),
		);
	},
	{},
);

const totalAmountDue = computed(() => {
	return invoices.value?.reduce((acc, invoice) => {
		return acc + invoice.amount_due;
	}, 0);
});

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
		key: 'amount_due',
		label: 'Amount Due',
	},
];
</script>
<template>
	<div class="w-full px-4 py-10 bg-white border rounded-panel dark:border-gray-700 dark:bg-gray-900">
		<div>
			<dt class="font-medium leading-6 text-gray-500 font-display dark:text-gray-300">Open Invoices</dt>
			<dd class="flex-none w-full text-3xl font-medium leading-10 tracking-tight text-gray-900 dark:text-white">
				{{ totalAmountDue ? formatCurrency(totalAmountDue) : 'N/A' }}
			</dd>
		</div>

		<UTable :columns="columns" :rows="invoices as any">
			<template #invoice_number-data="{ row }">
				<UButton variant="outline" :to="`/portal/billing/invoices/${row.id}`">{{ row.invoice_number }}</UButton>
			</template>
			<template #due_date-data="{ row }">
				<p class="capitalize">{{ getFriendlyDate(row.due_date) }}</p>
			</template>
			<template #amount_due-data="{ row }">
				<p class="capitalize">{{ formatCurrency(row.amount_due) }}</p>
			</template>
		</UTable>
	</div>
</template>
