<script setup lang="ts">
const { handleCheckout, loading: stripeLoading } = useStripe();
const { $directus, $readItem } = useNuxtApp();
const { path, params } = useRoute();

const {
	data: invoice,
	pending,
	error,
} = await useAsyncData(
	path,
	() => {
		return $directus.request(
			$readItem('os_invoices', params.id, {
				fields: [
					'*',
					{
						contact: ['id', 'first_name', 'last_name', 'email'],
						line_items: [
							'id',
							'line_item_number',
							'item_name',
							'quantity',
							'unit_price',
							'description',
							'line_amount',
							'tax_amount',
							{ item: ['id', 'name', 'description'] },
							{ tax_rate: ['id', 'name', 'rate'] },
						],

						payments: ['*'],
					},
				],
			}),
		);
	},
	{},
);

const lineItemColumns = [
	{
		key: 'line_item_number',
		label: 'Line #',
	},
	{
		key: 'item_name',
		label: 'Item',
	},
	{
		key: 'quantity',
		label: 'Quantity',
	},
	{
		key: 'unit_price',
		label: 'Unit Price',
	},
	{
		key: 'line_amount',
		label: 'Line Amount',
	},
	{
		key: 'tax_amount',
		label: 'Tax Amount',
	},
];

const isPaid = computed(() => {
	return unref(invoice)?.status === 'paid';
});
</script>
<template>
	<div>
		<PortalPageHeader
			:title="`Invoice #${invoice.invoice_number}`"
			:breadcrumbs="[
				{
					title: 'Portal',
					href: '/portal',
				},
				{
					title: 'Billing',
					href: '/portal/billing',
				},

				{
					title: 'Invoices',
					href: '/portal/billing/invoices',
				},
			]"
		>
			<template #center>
				<div v-if="!isPaid" class="flex items-center gap-2">
					<VText class="font-semibold">Due Date</VText>
					<DateDisplay :date="invoice.due_date" size="xs" />
				</div>
			</template>
			<template #actions>
				<UButton v-if="!isPaid" color="primary" size="xl" @click="handleCheckout(invoice.id)" :loading="stripeLoading">
					Pay Invoice
				</UButton>
				<div v-if="isPaid" class="inline-flex items-center gap-2 px-4 py-2 border rounded-full border-primary">
					<UIcon name="material-symbols:price-check-rounded" class="w-8 h-8 text-primary" />
					<VText size="lg" class="font-bold uppercase font-display">Paid</VText>
				</div>
			</template>
		</PortalPageHeader>

		<main
			class="relative flex flex-col p-8 mt-8 space-y-8 bg-white border rounded-lg dark:bg-gray-900 dark:border-gray-700"
		>
			<section class="relative flex flex-col gap-8 md:justify-between md:flex-row">
				<div id="invoice-details" class="space-y-1">
					<TypographyHeadline :content="`Invoice #${invoice.invoice_number}`" size="xs" />
					<VText text-color="light">Reference: {{ invoice.reference }}</VText>
					<VDivider />
					<VText text-color="light">Issued on {{ getFriendlyDate(invoice.issue_date) }}</VText>
					<VText>Due on {{ getFriendlyDate(invoice.due_date) }}</VText>
				</div>
				<div id="company-branding" class="space-y-1">
					<Logo class="w-32" />
					<p>123 Main Street</p>
					<p>Anytown, USA 12345</p>
					<p>Phone: 123-456-7890</p>
				</div>
			</section>
			<section id="bill-to">
				<TypographyHeadline content="Bill To" size="xs" />
				<VDivider />
				<div class="flex flex-col gap-8 mt-4 md:flex-row">
					<div>
						<VText>123 Main Street</VText>
						<VText>Anytown, USA 12345</VText>
						<VText>Phone: 123-456-7890</VText>
						<VText>Email:</VText>
					</div>
					<div>
						<UserBadge :author="invoice.contact" size="xs" />
						<p>{{ invoice.contact.email }}</p>
					</div>
				</div>
			</section>

			<section id="line-items">
				<TypographyHeadline content="Line Items" size="xs" />
				<VDivider />
				<UTable :columns="lineItemColumns" :rows="invoice.line_items">
					<template #unit_price-data="{ row }">
						{{ formatCurrency(row.unit_price) }}
					</template>
					<template #line_amount-data="{ row }">
						{{ formatCurrency(row.line_amount) }}
					</template>
					<template #tax_amount-data="{ row }">
						<p>{{ formatCurrency(row.tax_amount) }}</p>
						<p class="text-xs">{{ row.tax_rate.name }}</p>
					</template>
				</UTable>
			</section>
			<div id="totals" class="md:flex md:justify-end">
				<div class="w-full px-3 py-3 mt-8 border rounded-lg dark:border-gray-700 lg:mt-0 md:max-w-[300px]">
					<div class="flex items-baseline justify-between py-1">
						<VText text-color="light">Subtotal</VText>
						<VText>{{ formatCurrency(invoice.subtotal) }}</VText>
					</div>
					<div class="flex items-baseline justify-between py-1">
						<VText text-color="light">Taxes</VText>
						<VText>{{ formatCurrency(invoice.total_tax) }}</VText>
					</div>
					<VDivider />
					<div class="flex items-baseline justify-between py-2">
						<VText class="font-bold">Total</VText>
						<VText class="text-xl font-bold text-primary-600">{{ formatCurrency(invoice.total) }}</VText>
					</div>
					<div class="flex items-baseline justify-between py-1">
						<VText text-color="light">Amount Due</VText>
						<VText class="font-medium text-center">{{ formatCurrency(invoice.amount_due) }}</VText>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>
