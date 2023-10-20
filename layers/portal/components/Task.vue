<script setup lang="ts">
export interface TaskProps {
	taskId: string;
	isModal?: boolean;
}

const props = withDefaults(defineProps<TaskProps>(), {
	isModal: true,
});

const { fileUrl } = useFiles();

const task = ref<Task | null>(null);

async function fetchTask(id: string) {
	try {
		const data = await useDirectus(
			readItem('os_tasks', id, {
				fields: [
					'*',
					{
						form: ['*'],
						files: [{ directus_files_id: ['*'] }],
						assigned_to: ['id', 'first_name', 'last_name', 'email', 'avatar'],
					},
				],
			}),
		);
		task.value = data;
	} catch (error) {
		throw createError(error);
	}
}

async function updateTask(id: string, item: Partial<Task>) {
	try {
		const data = await useDirectus($updateItem('os_tasks', id, item));
		task.value = data;
	} catch (error) {
		throw createError(error);
	}
}

await fetchTask(props.taskId);

const taskStatus = computed(() => {
	return taskStatuses[task.value?.status];
});

const canMarkAsCompleted = computed(() => {
	// If task status is completed or task has a form, then we can't mark as completed
	if (task.value?.status === 'completed' || task.value?.form) {
		return false;
	} else {
		return true;
	}
});

const taskStatuses = {
	pending: {
		label: 'Pending',
		icon: 'i-heroicons-clock-20-solid',
		color: 'gray',
		sort: 1,
	},
	active: {
		label: 'Up Next',
		icon: 'i-heroicons-play-20-solid',
		color: 'blue',
		sort: 2,
	},
	in_progress: {
		label: 'In Progress',
		icon: 'i-heroicons-wrench-screwdriver-20-solid',
		color: 'amber',
		sort: 3,
	},
	in_review: {
		label: 'In Review',
		icon: 'i-heroicons-exclamation-circle-20-solid',
		color: 'orange',
		sort: 4,
	},
	completed: {
		label: 'Completed',
		icon: 'i-heroicons-check-20-solid',
		color: 'green',
		sort: 5,
	},
};

const availableStatuses = computed(() => {
	// Return the available statuses based on the current task status
	const statuses = Object.entries(taskStatuses).filter(([key, value]) => {
		if (key === task.value?.status) {
			return false;
		} else {
			return true;
		}
	});

	return statuses.map(([key, value]) => {
		return {
			label: 'Mark as ' + value.label,
			value: key,
			icon: value.icon,
			// If the task has a form, then we need to check for the form submission first
			disabled: key === 'completed' && task.value?.form && !task.value?.form_submission,
		};
	});
});

const selected = ref(null);

console.log('task', task.value);

const emit = defineEmits(['close']);
</script>
<template>
	<div class="w-full">
		<UContainer
			class="sticky top-0 z-20 py-4 space-y-4 bg-white shadow-lg shadow-white dark:bg-gray-900 backdrop-blur-md dark:shadow-gray-900"
		>
			<div class="flex items-center justify-between pb-4 border-b dark:border-gray-700">
				<div class="w-full">
					<USelectMenu v-slot="{ open }" v-model="selected" :options="availableStatuses">
						<UButton :leading-icon="taskStatus.icon" :color="taskStatus.color">
							{{ taskStatus.label }}
							<UIcon
								name="i-heroicons-chevron-right-20-solid"
								class="w-5 h-5 transition-transform"
								:class="[open && 'transform rotate-90']"
							/>
						</UButton>
					</USelectMenu>
				</div>
				<div>
					<UButton
						v-if="props.isModal"
						variant="ghost"
						color="primary"
						leading-icon="i-heroicons-x-mark"
						@click="$emit('close')"
					>
						Close
					</UButton>
				</div>
			</div>
			<TypographyHeadline :content="task?.name" size="xs" />
		</UContainer>

		<UContainer class="pb-12 mt-8 space-y-8">
			<div class="grid gap-8 md:grid-cols-2">
				<div>
					<VLabel label="Assigned To" />
					<VAvatar v-if="task?.assigned_to" :author="task?.assigned_to" />
				</div>
				<div class="">
					<VLabel label="Due Date" />
					<div class="flex space-x-1.5">
						<DateDisplay :date="task?.due_date" size="sm" />
					</div>
				</div>
			</div>

			<div>
				<VLabel label="Description" />
				<div v-html="task?.description" class="prose dark:prose-invert" />
			</div>
			<div class="space-y-2">
				<VLabel label="Files" />
				<div class="grid gap-4 sm:grid-cols-2" v-if="task.files.length > 0">
					<PortalFileCard v-for="file in task.files" :key="file.directus_files_id.id" :file="file.directus_files_id" />
				</div>
				<VUpload />
			</div>
			<div v-if="task.form">
				<VLabel label="Form" />
				<VForm :form="task.form" />
			</div>
			<div v-if="task.embed_url">
				<VLabel label="Embed" />
				<iframe
					:src="transformUrlToIframeSrc(task.embed_url)"
					class="w-full h-[550px] overflow-hidden border border-gray-300 dark:border-gray-700 rounded-xl"
				/>
			</div>
		</UContainer>
	</div>
</template>
