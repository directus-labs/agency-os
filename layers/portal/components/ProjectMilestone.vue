<template>
	<div class="relative flex items-center justify-center w-24 md:w-full">
		<div class="flex flex-col items-center px-1 py-3 text-sm font-medium md:px-2 md:py-4">
			<!-- Step circle -->
			<span
				:class="{
					'bg-primary': isComplete,
					'border-primary border-dashed border-2': isCurrent,
					'border-2 border-dashed dark:border-gray-700': !isCurrent && !isComplete,
				}"
				class="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-button"
			>
				<!-- Show check if complete -->
				<UIcon v-if="isComplete" name="heroicons:check" class="w-8 h-8 text-white fill-current" solid />
				<!-- Else show the icon from the step -->
				<UIcon
					v-else-if="icon"
					:name="icon"
					class="w-6 h-6 fill-current"
					:class="{
						'text-primary': isCurrent,
						'text-gray-500 ': !isCurrent,
					}"
					outline
				/>
			</span>
			<!-- Step text -->
			<div
				class="mt-1 text-xs font-medium text-center md:text-sm md:mt-2"
				:class="{
					'line-through text-gray-900 dark:text-white': isComplete,
					'text-primary': isCurrent,
					'text-gray-500 dark:text-gray-300': !isCurrent && !isComplete,
				}"
			>
				<span class="whitespace-nowrap">{{ name }}</span>
			</div>
			<div v-if="status" class="mt-1 text-xs font-medium text-center text-gray-500 dark:text-gray-300">
				{{ status }}
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		name: { type: String, default: '' },
		small: { type: Boolean, default: false },
		icon: { type: String, default: '' },
		isCurrent: { type: Boolean, default: false },
		isComplete: { type: Boolean, default: false },
		status: { type: String, default: '' },
	},
};
</script>
