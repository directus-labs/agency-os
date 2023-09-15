<script setup lang="ts">
import { omit, get } from '~/utils/lodash';
export interface AppTableProps {
	modelValue: any[];
	rows: [{ [key: string]: any; click?: Function }];
	columns: [
		{
			key: string;
			sortable?: Boolean;
			direction?: 'asc' | 'desc';
			columnAttribute: string;
			class?: string;
			[key: string]: any;
		},
	];
	columnAttribute: string;
}

withDefaults(defineProps<AppTableProps>(), {
	modelValue: null,
	rows: [],
	columns: null,
	columnAttribute: 'label',
});

function getRowData(row: Object, rowKey: string | string[], defaultValue: any = 'Failed to get cell value') {
	return get(row, rowKey, defaultValue);
}
</script>

<template>
	<div class="px-4 sm:px-6 lg:px-8">
		<table class="min-w-full divide-y divide-gray-300">
			<thead>
				<tr class="font-serif">
					<th
						v-for="(column, colIdx) in columns"
						:key="colIdx"
						scope="col"
						class="py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-0"
					>
						<slot :name="`${column.key}`" :column="column">
							{{ column[columnAttribute] }}
						</slot>
					</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200 divide-dashed">
				<tr v-for="(row, rowIdx) in rows" :key="rowIdx">
					<td class="py-4 text-gray-500 whitespace-nowrap" v-for="(column, subIdx) in columns" :key="subIdx">
						<slot
							:name="`${column.key}-data`"
							:column="column"
							:row="row"
							:index="rowIdx"
							:get-row-data="(defaultValue) => getRowData(row, column.key, defaultValue)"
						>
							{{ getRowData(row, column.key) }}
						</slot>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
