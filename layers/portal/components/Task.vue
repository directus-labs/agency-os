<script setup lang="ts">
import type { OsTask, OsTaskFile, User, Form } from '~/types';
export interface TaskProps {
	taskId: string;
	isModal?: boolean;
}

const props = withDefaults(defineProps<TaskProps>(), {
	isModal: true,
});

const { fileUrl } = useFiles();

const task: Ref<OsTask | null> = ref(null);

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
	} catch (err) {
		throw createError({
			statusCode: 404,
			message: 'Task not found',
		});
	}
}

async function updateTask(id: string, item: Partial<OsTask>) {
	try {
		const data = await useDirectus(updateItem('os_tasks', id, item));
		task.value = data;
	} catch (error) {
		throw createError({
			statusCode: 500,
			message: 'Error updating task',
		});
	}
}

await fetchTask(props.taskId);

const taskStatus = computed(() => {
	const status: TaskStatusKey | undefined = task.value?.status;

	if (status) {
		return taskStatuses[status]; // This should now be type-safe
	}

	return undefined;
});

const canMarkAsCompleted = computed(() => {
	// If task status is completed or task has a form, then we can't mark as completed
	if (task.value?.status === 'completed' || task.value?.form) {
		return false;
	} else {
		return true;
	}
});

type TaskStatusKey = 'pending' | 'active' | 'in_progress' | 'in_review' | 'completed' | string;

interface TaskStatusDetail {
	label?: string;
	icon?: string;
	color?: string;
	sort?: number;
}

const taskStatuses: Record<TaskStatusKey, TaskStatusDetail> = {
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
			disabled: key === 'completed' && task.value?.form,
		};
	});
});

const selected = ref();

const emit = defineEmits(['close']);
</script>
<template>
	<div class="w-full">
		<UContainer
			class="sticky top-0 z-20 py-4 space-y-4 bg-white shadow-lg shadow-white dark:bg-gray-900 backdrop-blur-md dark:shadow-gray-900"
		>
			<div class="flex items-center justify-between pb-4 border-b dark:border-gray-700">
				<div class="w-full">
					<USelectMenu v-slot="{ open }" v-model="selected" :options="availableStatuses as any">
						<UButton :leading-icon="taskStatus?.icon" :color="taskStatus?.color">
							{{ taskStatus?.label }}
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
			<TypographyHeadline v-if="task?.name" :content="task.name" size="xs" />
		</UContainer>

		<UContainer class="pb-12 mt-8 space-y-8">
			<div class="grid gap-8 md:grid-cols-2">
				<div>
					<VLabel label="Assigned To" />
					<VAvatar v-if="task?.assigned_to" :author="task?.assigned_to as User" />
				</div>
				<div class="">
					<VLabel label="Due Date" />
					<div class="flex space-x-1.5">
						<DateDisplay :date="task?.due_date as string" size="sm" />
					</div>
				</div>
			</div>

			<div>
				<VLabel label="Description" />
				<div class="prose dark:prose-invert" v-html="task?.description" />
			</div>
			<div class="space-y-2">
				<VLabel label="Files" />
				<div v-if="task?.files && task?.files?.length > 0" class="grid gap-4 sm:grid-cols-2">
					<PortalFileCard
						v-for="file in task.files as any[]"
						:key="(file.directus_files_id as OsTaskFile)?.id"
						:file="file.directus_files_id"
					/>
				</div>
			</div>
			<div v-if="task?.form">
				<VLabel label="Form" />
				<UForm :form="task.form as Form" />
			</div>
			<div v-if="task?.embed_url">
				<VLabel label="Embed" />
				<iframe
					:src="transformUrlToIframeSrc(task.embed_url)"
					class="w-full h-[550px] overflow-hidden border border-gray-300 dark:border-gray-700 rounded-panel"
				/>
			</div>
		</UContainer>
	</div>
</template>
