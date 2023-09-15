<script setup lang="ts">
export interface ProjectStepsProps {
	steps: [
		{
			name: string;
			icon: string;
			isComplete: boolean;
			isCurrent: boolean;
			status: string;
		},
	];
}

withDefaults(defineProps<ProjectStepsProps>(), {});
</script>

<template>
	<nav aria-label="Progress">
		<ol class="flex items-start justify-between flex-1 overflow-x-auto">
			<li v-for="(step, index) in steps" :key="index" class="flex flex-1">
				<!-- Step -->
				<OrderStep
					:name="step.name"
					:icon="step.icon"
					:is-complete="step.isComplete"
					:is-current="step.isCurrent"
					:status="step.status"
				/>
				<!-- Divider -->
				<div v-if="index !== steps.length - 1" class="mt-6 md:mt-8">
					<Icon
						name="arrow-narrow-right"
						:class="step.isComplete ? 'text-accent-700' : 'text-gray-200'"
						class="h-6 fill-current"
						solid
					/>
				</div>
			</li>
		</ol>
	</nav>
</template>
