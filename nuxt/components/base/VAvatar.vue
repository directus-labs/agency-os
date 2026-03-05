<script setup lang="ts">
import type { User } from '~~/types';

export interface AvatarProps {
	author: Partial<User>;
	size?: 'sm' | 'md' | 'lg';
}

withDefaults(defineProps<AvatarProps>(), {
	size: 'md',
});

const { fileUrl } = useFiles();
</script>
<template>
	<div class="flex items-center flex-none group dark:text-gray-100">
		<div class="mr-3">
			<NuxtImg
				v-if="author.avatar"
				:class="[
					{
						'w-8 h-8 sm:h-10 sm:w-10': size === 'sm',
						'w-10 h-10 sm:h-14 sm:w-14': size === 'md',
						'w-12 h-12 sm:h-16 sm:w-16': size === 'lg',
					},
					'object-cover rounded-full dark:brightness-90',
				]"
				:src="author.avatar as string"
			/>
		</div>

		<div
			:class="[
				{
					'text-sm sm:text-base': size === 'sm',
					'text-base sm:text-lg': size === 'md',
					'text-lg sm:text-xl': size === 'lg',
				},
				' ',
			]"
		>
			<span class="font-semibold font-display">{{ userName(author) }}</span>

			<span
				v-if="author.title"
				:class="[
					{
						'text-xs': size === 'sm',
						'text-sm': size === 'md',
						'': size === 'lg',
					},
					'block   pt-0.5',
				]"
			>
				{{ author.title }}
			</span>
		</div>
	</div>
</template>
