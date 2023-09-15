<script setup lang="ts">
definePageMeta({
	layout: 'app',
});

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
						tasks: ['id', 'name', 'type', 'status', 'due_date'],
					},
				],
				deep: {
					tasks: {
						_filter: {
							is_visible_to_client: {
								_eq: true,
							},
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
	},
	{
		key: 'due_date',
		label: 'Due Date',
	},
	{
		key: 'type',
		label: 'Type',
	},
	{
		key: 'assigned_to',
		label: 'Assigned To',
	},

	{
		key: 'actions',
	},
];

const tabs = [
	{
		slot: 'tasks',
		label: 'Tasks',
	},
	{
		label: 'Messages',
		content: 'Messages',
	},
	{
		label: 'Files',
		content: 'Files',
	},
	{
		label: 'Billing',
		content: 'Billing',
	},
];
</script>
<template>
	<div class="space-y-4">
		<AppPageHeader
			:title="project?.name"
			:breadcrumbs="[
				{
					title: 'Projects',
					href: '/app/projects',
				},
				{
					title: project?.name,
					href: '/app/projects/1',
				},
			]"
		>
			<template #actions>
				<VButton variant="primary">Action</VButton>
			</template>
		</AppPageHeader>

		<section>
			<!-- Milestones -->
		</section>

		<section>
			<!-- Tabs -->
			<VTabs :items="tabs" class="block w-full">
				<template #tasks="{ item }">
					<AppTable :columns="columns" :rows="project.tasks" column-attribute="label">
						<template #name-data="{ row }">
							<NuxtLink :href="`/app/projects/${row.id}`" class="text-lg font-semibold">{{ row.name }}</NuxtLink>
						</template>
						<template #type-data="{ row }">
							<VBadge class="capitalize">{{ row.type }}</VBadge>
						</template>
						<template #actions-data="{ row }">
							<NuxtLink :href="`/app/projects/${row.id}`" class="btn btn-default btn-sm">
								<Icon name="solar:arrow-right-bold" class="w-4 h-4" />
							</NuxtLink>
						</template>
					</AppTable>
				</template>
			</VTabs>
		</section>
	</div>
</template>
