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
						organization: ['id', 'name', 'logo'],
						owner: ['id', 'first_name', 'last_name', 'email', 'avatar'],
						contacts: [{ contacts_id: ['id', 'first_name', 'last_name', 'email'] }],
						tasks: ['id', 'name', 'type', 'status', 'due_date', 'date_completed'],
						updates: ['id', 'message', 'user_created', 'date_created', 'date_updated', 'user_updated'],
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

const { fileUrl } = useFiles();

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
			icon: 'heroicons:calendar',
			name: task.name,
			status: task.status === 'completed' ? getRelativeTime(task.date_completed) : '',
			date: task.due_date,
		};
	});
});
</script>
<template>
	<div id="overview" class="grid lg:grid-cols-2">
		<UCard class="mt-6 space-y-4 lg:col-span-2">
			<!-- Milestones -->
			<TypographyHeadline content="Milestones" size="xs" />
			<PortalProjectMilestones :steps="milestones" />
		</UCard>
		<section class="px-4 py-3 mt-8 space-y-4">
			<TypographyHeadline content="Description" size="xs" />
			<TypographyProse :content="project.description" />
		</section>
		<UCard class="mt-8">
			<!-- Project Team -->
			<TypographyHeadline content="Team" size="xs" />
			<div class="grid divide-y-2 md:divide-y-0 md:divide-x-2 md:grid-cols-2 dark:divide-gray-700">
				<div class="p-4 space-y-4">
					<Logo class="h-6" />
					<p class="text-sm font-bold">{{ /* @TODO */ 'Company Name' }}</p>

					<VLabel label="Project Owner" />
					<VAvatar :author="project.owner" size="sm" />
				</div>
				<div class="p-4 space-y-4">
					<img v-if="project.organization.logo" :src="fileUrl(project.organization.logo)" class="h-6" />
					<p class="text-sm font-bold">{{ project.organization.name }}</p>

					<VLabel label="Contacts" />
					<UserBadge
						v-for="contact in project.contacts"
						:key="contact.contacts_id?.id"
						:author="contact.contacts_id"
						size="sm"
					/>
				</div>
			</div>
		</UCard>
		<div class="px-4 py-3 mt-12 lg:col-span-2">
			<TypographyHeadline content="Updates" size="xs" />
			<PortalProjectActivity />
		</div>
	</div>
</template>
