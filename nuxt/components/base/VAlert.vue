<script setup lang="ts">
interface AlertProps {
	type: 'info' | 'success' | 'warning' | 'error';
}

const iconMap = {
	info: 'heroicons:information-circle-solid',
	success: 'heroicons:check-circle-solid',
	warning: 'heroicons:exclamation-triangle-solid',
	error: 'heroicons:x-circle-solid',
};

withDefaults(defineProps<AlertProps>(), {
	type: 'info',
});
</script>
<template>
	<div
		:class="[
			'p-4 dark:brightness-90 border-2',
			{
				'border-amber-500 text-amber-800 dark:text-amber-200': type === 'warning',
				'border-rose-500 text-rose-800 dark:text-rose-200': type === 'error',
				'border-green-500 text-green-800 dark:text-green-200': type === 'success',
				'border-blue-500 text-blue-800 dark:text-blue-200': type === 'info',
			},
		]"
	>
		<div class="flex items-center">
			<div class="flex-shrink-0">
				<Icon
					:name="iconMap[type]"
					:class="[
						'w-6 h-6',
						{
							'text-amber-500': type === 'warning',
							'text-rose-500': type === 'error',
							'text-green-500': type === 'success',
							'text-blue-500': type === 'info',
						},
					]"
					aria-hidden="true"
				/>
			</div>
			<div class="ml-3"><slot /></div>
		</div>
	</div>
</template>
