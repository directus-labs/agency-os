<script setup lang="ts">
export interface ProjectStepsProps {
	steps: [
		{
			name: string;
			icon: string;
			isComplete: boolean;
			isCurrent: boolean;
			status: string;
			date: string;
		},
	];
}

withDefaults(defineProps<ProjectStepsProps>(), {});
</script>

<template>
	<nav aria-label="Progress">
		<ol class="flex items-start w-full overflow-x-auto">
			<li v-for="(step, index) in steps" :key="index" class="flex flex-1">
				<!-- Step -->
				<PortalProjectMilestone
					:name="step.name"
					:icon="step.icon"
					:is-complete="step.isComplete"
					:is-current="step.isCurrent"
					:status="step.status"
					:date="step.date"
				/>
				<!-- Divider -->
				<div v-if="index !== steps.length - 1" class="mt-6 md:mt-8">
					<Icon
						name="i-heroicons-arrow-long-right"
						:class="step.isComplete ? 'text-primary-700 dark:text-primary' : 'text-gray-700 dark:text-gray-500'"
						class="w-8 h-8 fill-current"
						solid
					/>
				</div>
			</li>
		</ol>
	</nav>
</template>
