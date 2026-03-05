<script setup lang="ts">
const { handleCheckout, loading: stripeLoading } = useStripe();
const { path, params } = useRoute();
const { globals } = useAppConfig();

const {
	data: invoice,
	pending,
	error,
} = await useAsyncData(
	path,
	() => {
		return useDirectus(
			readItem('os_invoices', params.id as string, {
				fields: [
					'*',
					{
						contact: ['id', 'first_name', 'last_name', 'email', 'phone'],
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
						organization: ['id', 'name', 'logo', { addresses: ['*'] }],
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

const billingAddress = computed(() => {
	return getPrimaryBillingAddress(unref(invoice)?.organization);
});
</script>
<template>
	<div>
		<PortalPageHeader
			:title="`Invoice #${invoice?.invoice_number}`"
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
					<DateDisplay :date="invoice?.due_date" size="xs" />
				</div>
			</template>
			<template #actions>
				<UButton v-if="!isPaid" color="primary" size="xl" :loading="stripeLoading" @click="handleCheckout(invoice?.id)">
					Pay Invoice
				</UButton>
				<div v-if="isPaid" class="inline-flex items-center gap-2 px-4 py-2 border rounded-button border-primary">
					<UIcon name="material-symbols:price-check-rounded" class="w-8 h-8 text-primary" />
					<VText size="lg" class="font-bold uppercase font-display">Paid</VText>
				</div>
			</template>
		</PortalPageHeader>

		<main
			class="relative flex flex-col p-8 mt-8 space-y-8 bg-white border rounded-panel dark:bg-gray-900 dark:border-gray-700"
		>
			<section class="relative flex flex-col gap-8 md:justify-between md:flex-row">
				<div id="invoice-details" class="space-y-1">
					<div class="inline-flex">
						<TypographyHeadline :content="`Invoice #${invoice?.invoice_number}`" size="xs" />
						<UBadge :color="isPaid ? 'primary' : 'rose'" class="ml-2 capitalize">
							{{ invoice?.status }}
						</UBadge>
					</div>
					<VText text-color="light">Reference: {{ invoice?.reference }}</VText>
					<VDivider />
					<VText text-color="light">Issued on {{ getFriendlyDate(invoice?.issue_date) }}</VText>
					<VText class="font-bold">Due on {{ getFriendlyDate(invoice?.due_date) }}</VText>
				</div>
				<div id="company-branding" class="space-y-1.5">
					<Logo class="w-32" />
					<p v-if="globals?.street_address">{{ globals.street_address }}</p>
					<p v-if="globals?.address_locality || globals?.address_region || globals?.postal_code">
						{{ globals.address_locality }}, {{ globals.address_region }} {{ globals.postal_code }}
					</p>
					<p v-if="globals?.phone">
						<UButton
							:to="createTel(globals.phone)"
							color="gray"
							variant="link"
							:padded="false"
							icon="material-symbols:phone-android-outline-rounded"
						>
							{{ globals.phone }}
						</UButton>
					</p>
					<p v-if="globals?.email">
						<UButton
							:to="createMailto(globals.email, { subject: `Invoice #${invoice?.invoice_number}` })"
							color="gray"
							variant="link"
							:padded="false"
							icon="material-symbols:alternate-email-rounded"
						>
							{{ globals.email }}
						</UButton>
					</p>
				</div>
			</section>
			<section id="bill-to">
				<TypographyHeadline content="Bill To" size="xs" />
				<VDivider />
				<div class="flex flex-col gap-8 mt-4 md:flex-row">
					<div>
						<p class="font-bold">{{ invoice?.organization?.name }}</p>
						<p v-if="billingAddress?.street_address">{{ billingAddress.street_address }}</p>
						<p v-if="billingAddress?.address_locality || billingAddress?.address_region || billingAddress?.postal_code">
							{{ billingAddress.address_locality }}, {{ billingAddress.address_region }}
							{{ billingAddress.postal_code }}
						</p>
					</div>
					<div>
						<UserBadge :user="invoice?.contact" size="sm" />
						<p>{{ invoice?.contact.email }}</p>
						<p>{{ invoice?.contact.phone }}</p>
					</div>
				</div>
			</section>

			<section id="line-items">
				<TypographyHeadline content="Line Items" size="xs" />
				<VDivider />
				<UTable :columns="lineItemColumns" :rows="invoice?.line_items">
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

			<section id="totals" class="md:flex md:justify-end">
				<div class="w-full px-3 py-3 mt-8 border rounded-panel dark:border-gray-700 lg:mt-0 md:max-w-[300px]">
					<div class="flex items-baseline justify-between py-1">
						<VText text-color="light">Subtotal</VText>
						<VText>{{ formatCurrency(invoice?.subtotal) }}</VText>
					</div>
					<div class="flex items-baseline justify-between py-1">
						<VText text-color="light">Taxes</VText>
						<VText>{{ formatCurrency(invoice?.total_tax) }}</VText>
					</div>
					<VDivider />
					<div class="flex items-baseline justify-between py-2">
						<VText class="font-bold">Total</VText>
						<VText class="text-xl font-bold text-primary-600">{{ formatCurrency(invoice?.total) }}</VText>
					</div>
					<div class="flex items-baseline justify-between py-1">
						<VText text-color="light">Amount Due</VText>
						<VText class="font-medium text-center">{{ formatCurrency(invoice?.amount_due) }}</VText>
					</div>
				</div>
			</section>
		</main>
	</div>
</template>
