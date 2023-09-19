<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp();
const { path, params } = useRoute();

const {
	data: projects,
	pending,
	error,
} = await useAsyncData(
	path,
	() => {
		return $directus.request(
			$readItems('os_projects', {
				fields: [
					'id',
					'name',
					'due_date',
					{
						tasks: ['id', 'name', 'status', 'due_date'],
					},
				],
				deep: {
					tasks: {
						_filter: {
							type: {
								_eq: 'milestone',
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
		key: 'milestones',
		label: 'Milestones',
	},
	{
		key: 'actions',
	},
];

const projectsShown = computed(() => {
	return projects.value?.map((project) => {
		return {
			id: project.id,
			name: project.name,
			due_date: project.due_date,
			tasks: project.tasks.map((task) => {
				return {
					isComplete: task.status === 'completed',
					isCurrent: task.status !== 'completed' || task.status !== 'pending',
					icon: 'i-heroicons-calendar',
					name: task.name,
					status: task.status,
				};
			}),
		};
	});
});
</script>
<template>
	<div>
		<AppPageHeader
			title="Projects"
			:breadcrumbs="[
				{
					title: 'Portal',
					href: '/portal',
				},
				{
					title: 'Projects',
				},
			]"
		>
			<template #actions></template>
		</AppPageHeader>
		<UTable :columns="columns" :rows="projectsShown" column-attribute="label">
			<template #name-data="{ row }">
				<UButton variant="link" :to="`/portal/projects/${row.id}`" size="xl">
					{{ row.name }}
				</UButton>
			</template>
			<template #milestones-data="{ row }">
				<ul class="flex items-center">
					<template v-for="({ isComplete, isCurrent, icon, name }, i) in row.tasks" :key="i">
						<li :class="[i !== row.tasks.length - 1 ? '' : '', 'relative']">
							<div
								v-tooltip="{
									content: `<p>${name}</p><p class='mt-1 text-primary'>${isComplete ? 'Completed ' : ''}</p>`,
									html: true,
								}"
								:class="{
									'border-gray-300 border-dashed  h-10 w-10 border': isCurrent && !isComplete,
									'bg-primary w-5 h-5': isComplete,
									'border-gray-300 bg-white border w-5 h-5': !isCurrent && !isComplete,
								}"
								class="relative flex items-center justify-center flex-shrink-0 rounded-lg"
							>
								<UIcon v-if="isComplete" name="i-heroicons-check" class="w-4 text-white" />
								<UIcon
									v-else-if="icon && isCurrent"
									:name="icon"
									class="fill-current"
									:class="{
										'text-primary-600 w-7': isCurrent,
									}"
								/>
							</div>
						</li>
						<li v-if="i !== row.tasks.length - 1" class="w-3" aria-hidden="true">
							<div class="h-0.5 w-full bg-gray-300" :class="[isComplete ? 'bg-primary' : 'bg-gray-300']" />
						</li>
					</template>
				</ul>
			</template>
			<template #actions-data="{ row }">
				<UButton :to="`/portal/projects/${row.id}`" color="primary" variant="outline" icon="i-heroicons-arrow-right" />
			</template>
		</UTable>
	</div>
</template>
