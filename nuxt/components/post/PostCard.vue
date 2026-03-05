<script setup lang="ts">
import type { Post, PostType, Category, Team } from '~/types';

const props = withDefaults(
	defineProps<{
		post: Post;
		direction?: 'horizontal' | 'vertical';
	}>(),
	{
		direction: 'vertical',
	},
);

const iconMap: Record<PostType, string> = {
	blog: 'material-symbols:article-outline-rounded',
	video: 'material-symbols:video-library-outline-rounded',
	project: 'material-symbols:trophy-outline-rounded',
};

const postCategory = computed(() => {
	return (unref(props.post.category) as Category) ?? null;
});
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
				'relative block overflow-hidden border dark:border-gray-700 group rounded-card flex-shrink-0',
			]"
			:href="`/posts/${post.slug}`"
		>
			<NuxtImg
				v-if="post.image"
				class="relative flex-shrink-0 object-cover w-full h-full transition duration-300 saturate-0 group-hover:opacity-75"
				:src="safeRelationId(post.image) as string"
				:alt="safeRelation(post.image)?.alt ?? ''"
			/>
			<div
				class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-transparent via-transparent to-primary group-hover:opacity-100"
			/>
			<Category
				v-if="postCategory"
				size="lg"
				:color="postCategory.color as string"
				class="absolute bottom-0 left-0 mb-4 ml-4"
			>
				{{ postCategory.title }}
			</Category>
			<div v-if="post.type" class="absolute top-0 right-0 p-1.5 mt-4 mr-4 rounded-button bg-gray-900/50">
				<UIcon
					v-if="post.type"
					:name="iconMap[post.type ?? 'blog'] ?? 'material-symbols:article-outline-rounded'"
					class="w-6 h-6 text-white"
				/>
			</div>
		</NuxtLink>

		<div class="flex flex-col justify-between h-full gap-3">
			<NuxtLink class="space-y-4" :href="`/posts/${post.slug}`">
				<TypographyHeadline
					v-if="post.title"
					:content="post.title"
					class="group-hover:text-primary"
					size="xs"
					as="h3"
				/>
				<VText text-color="light" class="line-clamp-2">
					{{ post?.summary }}
				</VText>
			</NuxtLink>

			<Author v-if="post.author" size="sm" :author="post.author as Team" />
		</div>
	</figure>
</template>
