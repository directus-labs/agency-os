<script setup lang="ts">
const props = defineProps({
	item: {
		type: String,
		default: null,
	},
	collection: {
		type: String,
		default: '',
	},
});

// const { data: activity } = await readByQuery('directus_activity', {
// 	fields: ['*', 'user.id', 'user.avatar', 'user.first_name', 'user.last_name', 'revisions.delta'],
// 	sort: '-timestamp',
// 	filter: {
// 		item: {
// 			_eq: props.item,
// 		},
// 	},
// });

const activities = ref([
	{
		type: 'milestone',
		item: {
			id: '1',
			name: 'Milestone 1',
		},
		action: 'completed',
		timestamp: '2023-09-02T00:00:00.000Z',
	},
	{
		type: 'update',
		item: {
			id: '1',
			message: `<p>I am pleased to announce the successful completion of Sprint 3. Kudos to all for the hard work and dedication that was poured into achieving our goals. Below is a brief update on the key accomplishments, upcoming priorities, and identified challenges:</p>
<h3>Key Accomplishments:</h3>
<ol>
<li>
<p><strong>Feature Development</strong>:</p>
<ul>
<li>Completed the User Authentication module which now supports OAuth 2.0.</li>
<li>Implemented real-time notifications, enhancing user engagement.</li>
<li>Optimized the website's load time by 30%, ensuring a smoother user experience.</li>
</ul>
</li>
<li>
<p><strong>Bug Fixes</strong>:</p>
<ul>
<li>Addressed 25 reported bugs, with a significant one being the payment gateway error.</li>
</ul>
</li>
<li>
<p><strong>Testing and Quality Assurance</strong>:</p>
<ul>
<li>Achieved 95% code coverage with automated testing.</li>
<li>Conducted usability testing with a selected user group, feedback has been overwhelmingly positive.</li>
</ul>
</li>
<li>
<p><strong>Collaborations</strong>:</p>
<ul>
<li>Coordinated with the Design team to finalize the UI/UX for the new dashboard.</li>
<li>Established a weekly sync with the Marketing team to align on product messaging.</li>
</ul>
</li>
</ol>`,
		},
		action: 'update',
		timestamp: '2023-09-01T00:00:00.000Z',
	},
	{
		type: 'milestone',
		item: {
			id: '1',
			name: 'Milestone 1',
		},
		action: 'started',
		timestamp: '2023-09-01T00:00:00.000Z',
	},
]);

type GroupedActivity = {
	date: string;
	activity: typeof activities.value;
};

const groupedActivity = computed<GroupedActivity[]>(() => {
	const grouped: GroupedActivity[] = activities.value
		.reduce((acc: GroupedActivity[], currentActivity) => {
			const date = new Date(currentActivity.timestamp).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			});

			const existing = acc.find((a) => a.date === date);

			if (existing) {
				existing.activity.push(currentActivity);
			} else {
				acc.push({
					date,
					activity: [currentActivity],
				});
			}

			return acc;
		}, [])
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return grouped;
});
</script>

<template>
	<div class="relative">
		<!-- Activity feed-->
		<div class="flow-root mt-6 space-y-4">
			<div v-for="(date, dateIdx) in groupedActivity" :key="`date-${dateIdx}`">
				<TypographyTitle>{{ date.date }}</TypographyTitle>
				<VDivider />

				<ul role="list" class="mt-4">
					<li v-for="(item, itemIdx) in date.activity" :key="itemIdx">
						<div class="relative pb-8">
							<span
								v-if="itemIdx !== date.activity.length - 1"
								class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-300 dark:bg-gray-700"
								aria-hidden="true"
							/>
							<div class="relative flex space-x-3">
								<div>
									<span :class="['h-8 w-8 rounded-full flex items-center justify-center bg-gray-500 ']">
										<Icon
											:name="
												item.type === 'milestone'
													? 'heroicons:flag'
													: item.type === 'update'
														? 'heroicons:document-text'
														: 'heroicons:document'
											"
											class="w-5 h-5 text-white"
											aria-hidden="true"
										/>
									</span>
								</div>
								<div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
									<div>
										<!-- Activity Detail -->
										<template v-if="item.type === 'update'">
											<div class="font-bold">User posted a project update</div>
											<TypographyProse v-if="item.item && item.item.message" :content="item.item.message" size="sm" />
										</template>
										<template v-else-if="item.type === 'milestone'">
											Milestone - {{ item.item.name }} - {{ item.action }}
										</template>
									</div>
									<div class="text-sm text-right text-gray-500 whitespace-nowrap">
										{{ getRelativeTime(item.timestamp) }}
									</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!-- <UTextarea v-model="newActivity" placeholder="Add a new activity" /> -->
	</div>
</template>
