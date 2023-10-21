<script setup lang="ts">
const page = ref(1);
const rowsPerPage = ref(5);

const {
	data: tasks,
	pending,
	error,
	refresh,
} = await useAsyncData(
	'user-open-tasks',
	() => {
		const filter = {
			_and: [
				{
					status: {
						_neq: 'open',
					},
				},
				{
					is_visible_to_client: {
						_eq: true,
					},
				},
			],
		};

		const data = useDirectus(
			readItems('os_tasks', {
				fields: ['id', 'name', 'due_date'],
				sort: ['due_date'],
				filter,
				limit: unref(rowsPerPage),
				offset: (unref(page) - 1) * 5,
			}),
		);

		const count = useDirectus(
			readItems('os_tasks', {
				filter,
				aggregate: { count: ['*'] },
			}),
		);

		return Promise.all([data, count]);
	},
	{
		transform: ([data, count]) => {
			return {
				data,
				count: parseInt(count[0].count),
			};
		},
	},
);

const columns = [
	{
		key: 'name',
		label: 'Name',
	},
	{
		key: 'due_date',
		label: 'Due Date',
	},
];

watch(page, () => {
	refresh();
});

const showTask = ref(false);
const selectedTaskId = ref(null);

async function openTask(id) {
	selectedTaskId.value = id;
	showTask.value = true;
}
</script>
<template>
	<div class="px-4 py-10 bg-white border border-gray-300 rounded-panel dark:border-gray-700 dark:bg-gray-900">
		<div>
			<dt class="font-medium leading-6 text-gray-500 font-display dark:text-gray-300">Open Tasks</dt>
			<dd class="flex-none w-full text-3xl font-medium leading-10 tracking-tight text-gray-900 dark:text-white">
				{{ tasks.count }} tasks
			</dd>
		</div>

		<UTable :columns="columns" :rows="tasks.data">
			<template #name-data="{ row }">
				<UButton variant="link" class="w-56" @click="openTask(row.id)">
					<span class="truncate">{{ row.name ?? 'Task with no name' }}</span>
				</UButton>
			</template>
			<template #due_date-data="{ row }">
				<p class="capitalize">{{ getRelativeTime(row.due_date) }}</p>
			</template>
		</UTable>
		<UPagination v-model="page" :max="5" :page-count="rowsPerPage" :total="tasks.count" />
		<!-- Task Item -->
		<USlideover
			v-model="showTask"
			:ui="{
				width: 'max-w-xl',
			}"
		>
			<PortalTask :task-id="selectedTaskId" class="overflow-y-auto" @close="showTask = false" />
		</USlideover>
	</div>
</template>
