<template>
	<dl class="grid grid-cols-1 gap-px mx-auto sm:grid-cols-2 lg:grid-cols-4">
		<div
			v-for="stat in stats"
			:key="stat.name"
			class="flex flex-wrap items-baseline justify-between px-4 py-10 gap-x-4 gap-y-2 sm:px-6 xl:px-8"
		>
			<dt class="font-display text-sm font-medium leading-6 text-gray-500">{{ stat.name }}</dt>
			<dd class="flex-none w-full text-3xl font-medium leading-10 tracking-tight text-gray-900">
				{{ stat.value }}
			</dd>
		</div>
	</dl>
</template>

<script setup>
const stats = [{ name: 'Overdue invoices', value: '$12,787.00', change: '+54.02%', changeType: 'negative' }];
</script>
