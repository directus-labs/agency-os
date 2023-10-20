<script setup lang="ts">
import type { Post } from '~~/types';

withDefaults(
	defineProps<{
		post: Post;
		direction: 'horizontal' | 'vertical';
	}>(),
	{
		direction: 'vertical',
	},
);
</script>
<template>
	<figure
		:class="[
			{
				'flex-col': direction === 'vertical',
				'flex-col md:flex-row': direction === 'horizontal',
			},
			'flex group gap-6',
		]"
	>
		<NuxtLink
			:class="[
				{
					'w-full h-56': direction === 'vertical',
					'w-full h-56 md:w-72 md:h-72': direction === 'horizontal',
				},
				'relative block overflow-hidden border dark:border-gray-700 group rounded-xl flex-shrink-0',
			]"
			:href="`/posts/${post.slug}`"
		>
			<NuxtImg
				class="relative flex-shrink-0 object-cover w-full h-full transition duration-300 saturate-0 group-hover:opacity-75"
				:src="post.image ?? 'https://source.unsplash.com/random/800x800?sig=' + post.id"
				alt=""
			/>
			<div
				class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-transparent via-transparent to-primary group-hover:opacity-100"
			/>
			<VBadge v-if="post.category" size="lg" :color="post.category.color" class="absolute bottom-0 left-0 mb-4 ml-4">
				{{ post.category.title }}
			</VBadge>
		</NuxtLink>

		<div class="flex flex-col justify-between h-full gap-4">
			<NuxtLink class="space-y-4" :href="`/posts/${post.slug}`">
				<TypographyHeadline :content="post.title" class="group-hover:text-primary" size="xs" as="h3" />
				<VText text-color="light">
					{{ truncateString(post.summary, 150) }}
				</VText>
			</NuxtLink>

			<VAvatar v-if="isObject(post.author)" size="sm" :author="post.author" />
		</div>
	</figure>
</template>
