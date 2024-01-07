<script setup lang="ts">
export interface TaskListProps {
	projectId: string;
}

const props = defineProps<TaskListProps>();

const {
	data: tasks,
	pending,
	error,
} = await useAsyncData(`${props.projectId}-tasks`, () => {
	return useDirectus(
		readItems('os_tasks', {
			fields: [
				'*',
				{
					assigned_to: ['id', 'first_name', 'last_name', 'email', 'avatar'],
				},
			],
			filter: {
				_and: [
					{
						project: {
							_eq: props.projectId,
						},
					},

					{
						is_visible_to_client: {
							_eq: true,
						},
					},
					{
						type: {
							_neq: 'milestone',
						},
					},
				],
			},
		}),
	);
});

const columns = [
	{
		key: 'name',
		label: 'Name',
		sortable: true,
	},
	{
		key: 'due_date',
		label: 'Due Date',
		sortable: true,
	},
	{
		key: 'status',
		label: 'Status',
		sortable: true,
	},
	{
		key: 'type',
		label: 'Type',
		sortable: true,
	},
	{
		key: 'assigned_to',
		label: 'Assigned To',
		sortable: true,
	},

	{
		key: 'actions',
	},
];

const showTask = ref(false);
const selectedTaskId: Ref<string | null> = ref(null);

async function openTask(id: string) {
	selectedTaskId.value = id;
	showTask.value = true;
}

const searchQuery = ref();

const tasksShown = computed(() => {
	// Filter out tasks with a type of "milestone" and use search query to filter tasks

	const items = unref(tasks)
		?.filter((task) => task.type !== 'milestone')
		.filter((task) => {
			if (!searchQuery.value) return true;
			return task.name.toLowerCase().includes(searchQuery?.value?.toLowerCase());
		});

	return items;
});
</script>
<template>
	<!-- Filters -->
	<div class="flex items-center justify-between gap-3 pb-3 border-b dark:border-gray-700">
		<UInput v-model="searchQuery" type="text" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />
	</div>
	<!-- Table -->
	<UTable :columns="columns" :rows="tasksShown" column-attribute="label">
		<template #name-data="{ row }">
			<UButton variant="link" :padded="false" @click="openTask(row.id)">{{ row.name }}</UButton>
		</template>
		<template #due_date-data="{ row }">
			<p class="font-medium text-gray-900">
				{{
					getFriendlyDate(row.due_date, {
						monthAbbr: true,
					})
				}}
			</p>
			<p class="text-xs capitalize">{{ getRelativeTime(row.due_date) }}</p>
		</template>
		<template #type-data="{ row }">
			<UBadge class="capitalize" variant="subtle">{{ row.type }}</UBadge>
		</template>
		<template #assigned_to-data="{ row }">
			<UserBadge v-if="row.assigned_to" :user="row.assigned_to" size="sm" />
		</template>
		<template #actions-data="{ row }">
			<UButton icon="i-heroicons-arrow-right" color="primary" size="sm" variant="outline" @click="openTask(row.id)" />
		</template>
	</UTable>
	<!-- Task Item -->
	<USlideover
		v-model="showTask"
		:ui="{
			width: 'max-w-xl',
		}"
	>
		<PortalTask v-if="selectedTaskId" :task-id="selectedTaskId" class="overflow-y-auto" @close="showTask = false" />
	</USlideover>
</template>
