<script setup lang="ts">
const { path, params } = useRoute();

const {
	data: project,
	pending,
	error,
} = await useAsyncData(Math.random().toString(36).substring(2, 15), () => {
	return useDirectus(readItem('os_projects', params.id as string));
});

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
