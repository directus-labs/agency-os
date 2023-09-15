<script setup lang="ts">
definePageMeta({
	layout: 'app',
});

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
					icon: 'solar:calendar-minimalistic-outline',
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
					title: 'Projects',
					href: '/app/projects',
				},
			]"
		>
			<template #actions>
				<VButton variant="primary">Action</VButton>
			</template>
		</AppPageHeader>
		<AppTable :columns="columns" :rows="projectsShown" column-attribute="label">
			<template #name-data="{ row }">
				<NuxtLink :href="`/app/projects/${row.id}`" class="text-lg font-semibold">{{ row.name }}</NuxtLink>
			</template>
			<template #milestones-data="{ row }">
				<ul class="flex items-center">
					<li
						v-for="({ isComplete, isCurrent, icon, name, status }, i) in row.tasks"
						:key="i"
						:class="[i !== row.tasks.length - 1 ? 'pr-4' : '', 'relative']"
					>
						<div class="absolute inset-0 flex items-center" aria-hidden="true">
							<div class="h-0.5 w-full" :class="[isComplete ? 'bg-accent' : 'bg-gray-300']" />
						</div>
						<div
							v-tooltip="{
								content: `<p>${name}</p><p class='mt-1 text-accent'>${
									isComplete && name !== 'Payment' ? 'Completed ' : ''
								}</p>`,
								html: true,
							}"
							:class="{
								'bg-accent w-4 h-4': isComplete,
								'border-gray-300 border-dashed bg-white h-10 w-10 border-2': isCurrent,
								'border-gray-300 bg-white border-2 w-4 h-4': !isCurrent && !isComplete,
							}"
							class="relative flex items-center justify-center flex-shrink-0 ring ring-gray-50"
						>
							<!-- Show check if complete -->
							<Icon v-if="isComplete" name="heroicons:check" class="w-5 text-white fill-current" solid />
							<!-- Else show the icon from the step -->
							<Icon
								v-else-if="icon && isCurrent"
								:name="icon"
								class="fill-current"
								:class="{
									'text-primary-600 w-7': isCurrent,
								}"
								outline
							/>
						</div>
					</li>
				</ul>
			</template>
			<template #actions-data="{ row }">
				<NuxtLink :href="`/app/projects/${row.id}`" class="btn btn-default btn-sm">
					<Icon name="solar:arrow-right-bold" class="w-4 h-4" />
				</NuxtLink>
			</template>
		</AppTable>
	</div>
</template>
