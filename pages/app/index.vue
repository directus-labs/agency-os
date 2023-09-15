<script setup lang="ts">
definePageMeta({
	layout: 'app',
});
</script>
<template>
	<PageContainer>
		<img class="w-64 ml-auto mr-0" src="~/assets/illustrations/tokyo-luminous-table-lamp-on-boxes.svg" />
		<TypographyTitle class="normal-case">{{ greetUser() }} Bryant,</TypographyTitle>
		<TypographyHeadline
			content="Breathe easy – you're an amazing client and <em>our team has got your back.</em>"
			size="xl"
		/>
		<VDivider class="my-8" />
		<div class="grid grid-cols-2">
			<div
				class="flex flex-wrap items-baseline justify-between px-4 py-10 border border-gray-300 rounded-tr-xl rounded-bl-xl"
			>
				<div class="flex justify-between w-full">
					<div>
						<dt class="font-serif font-medium leading-6 text-gray-500">Overdue Invoices</dt>
						<dd class="flex-none w-full font-mono text-3xl font-medium leading-10 tracking-tight text-gray-900">
							$12,787.00
						</dd>
					</div>
					<TypographyHeadline
						content="Look, we get it. Sometimes things happen. But really, we need you to pay these like now."
						size="sm"
						class="max-w-2xl text-gray-500 [text-wrap:balance]"
					/>
				</div>
				<!-- Table of past due invoices -->
				<div class="flex flex-col w-full mt-8 space-y-4">
					<div class="overflow-hidden border-gray-200">
						<div class="overflow-x-auto">
							<table class="w-full table-auto">
								<thead>
									<tr
										class="font-serif text-xs font-semibold tracking-wide text-left text-gray-500 border-b bg-gray-50"
									>
										<th class="px-4 py-3">Invoice</th>
										<th class="px-4 py-3">Amount</th>
										<th class="px-4 py-3">Status</th>
									</tr>
								</thead>
								<tbody class="divide-y divide-gray-200">
									<tr class="text-sm text-gray-500">
										<td class="px-4 py-3">0001</td>
										<td class="px-4 py-3">$2,500.00</td>
										<td class="px-4 py-3">
											<VBadge>Past Due</VBadge>
										</td>
									</tr>
									<tr class="text-sm text-gray-500">
										<td class="px-4 py-3">0002</td>
										<td class="px-4 py-3">$2,500.00</td>
										<td class="px-4 py-3">
											<VBadge>Past Due</VBadge>
										</td>
									</tr>
									<tr class="text-sm text-gray-500">
										<td class="px-4 py-3">0003</td>
										<td class="px-4 py-3">$2,500.00</td>
										<td class="px-4 py-3">
											<VBadge>Past Due</VBadge>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</PageContainer>
</template>
