<script setup lang="ts">
import { User } from '~~/types';

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
			<UAvatar :size="size" :src="author.avatar_url ?? fileUrl(author.avatar)" :alt="userName(author)" />
		</div>

		<div
			:class="[
				{
					'text-sm sm:text-base': size === 'sm',
					'text-base sm:text-lg': size === 'md',
					'text-lg sm:text-xl': size === 'lg',
				},
				'font-display font-bold word-spacing-tight',
			]"
		>
			{{ userName(author) }}

			<span
				v-if="author.title"
				:class="[
					{
						'text-xs': size === 'sm',
						'text-sm': size === 'md',
						'': size === 'lg',
					},
					'block  font-bold tracking-widest uppercase pt-0.5',
				]"
			>
				{{ author.title }}
			</span>
		</div>
	</div>
</template>
