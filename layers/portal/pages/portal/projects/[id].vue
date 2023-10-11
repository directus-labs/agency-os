<script setup lang="ts">
const { $directus, $readItem } = useNuxtApp();
const { path, params } = useRoute();

const {
	data: project,
	pending,
	error,
} = await useAsyncData(
	path,
	() => {
		return $directus.request(
			$readItem('os_projects', params.id, {
				fields: [
					'*',
					{
						organization: ['id', 'name'],
						owner: ['id', 'first_name', 'last_name', 'email', 'avatar'],
						contacts: [{ contacts_id: ['id', 'first_name', 'last_name', 'email'] }],
						tasks: ['id', 'name', 'type', 'status', 'due_date', 'date_completed'],
					},
				],
				deep: {
					tasks: {
						_filter: {
							_or: [
								{
									is_visible_to_client: {
										_eq: true,
									},
								},
								{
									type: {
										_eq: 'milestone',
									},
								},
							],
						},
					},
				},
			}),
		);
	},
	{},
);

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

const tabs = [
	{
		slot: 'overview',
		label: 'Overview',
		name: 'Overview',
		href: `/portal/projects/${params.id}`,
	},
	{
		slot: 'tasks',
		label: 'Tasks',
		name: 'Tasks',
		href: `/portal/projects/${params.id}/tasks`,
	},
	{
		label: 'Messages',
		slot: 'messages',
		name: 'Conversations',
		href: `/portal/projects/${params.id}/conversations`,
	},
	{
		label: 'Files',
		content: 'Files',
		name: 'Files',
		href: `/portal/projects/${params.id}/files`,
	},
	{
		label: 'Billing',
		content: 'Billing',
		name: 'Billing',
		href: `/portal/projects/${params.id}/billing`,
	},
];

const milestones = computed(() => {
	const items = unref(project)
		?.tasks?.filter((task) => task.type === 'milestone')
		.sort((a, b) => {
			return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
		});
	return items.map((task) => {
		return {
			isComplete: task.status === 'completed',
			isCurrent: task.status !== 'completed' && task.status !== 'pending',
			icon: 'i-heroicons-calendar',
			name: task.name,
			status: task.status === 'completed' ? task.date_completed : '',
			date: task.due_date,
		};
	});
});
</script>
<template>
	<div class="space-y-6">
		<PortalPageHeader
			:title="project?.name"
			:breadcrumbs="[
				{
					title: 'Portal',
					href: '/portal',
				},
				{
					title: 'Projects',
					href: '/portal/projects',
				},
			]"
		>
			<template #center></template>
			<template #actions>
				<div class="inline-flex items-center gap-x-4">
					<VText class="font-semibold" text-color="light">Target Date</VText>
					<DateDisplay :date="project?.due_date" size="xs" />
				</div>
			</template>
		</PortalPageHeader>

		<main class="relative">
			<!-- Tabs -->
			<VHorizontalNavigation :items="tabs" />
			<NuxtPage />
		</main>
	</div>
</template>
