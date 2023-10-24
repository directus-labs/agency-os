<script setup lang="ts">
export interface ProseProps {
	content: string;
	size?: 'sm' | 'md' | 'lg'; // @TODO: Rework the sizes
}

withDefaults(defineProps<ProseProps>(), {
	size: 'md',
});

const config = useRuntimeConfig();
const contentEl = ref<HTMLElement | null>(null);

onMounted(() => {
	if (!contentEl.value) return;

	const anchors = Array.from(contentEl.value.getElementsByTagName('a'));
	if (!anchors) return;

	for (const anchor of anchors) {
		const href = anchor.getAttribute('href');

		if (!href) return;

		const url = new URL(href, window.location.origin);

		const isLocal = url.hostname === config.public.siteUrl;

		if (isLocal) {
			anchor.addEventListener('click', (e) => {
				const { pathname, searchParams, hash } = new URL(anchor.href);

				navigateTo({
					path: pathname,
					hash: hash,
					query: Object.fromEntries(searchParams.entries()),
				});

				e.preventDefault();
			});
		} else {
			anchor.setAttribute('target', '_blank');
			anchor.setAttribute('rel', 'noopener noreferrer');
		}
	}
});
</script>

<template>
	<div
		ref="contentEl"
		:class="[
			{
				'prose-sm': size === 'sm',
				'md:prose-base lg:prose-lg': size === 'md',
				'prose-lg lg:prose-xl': size === 'lg',
			},
			'prose dark:prose-invert prose-img:rounded-lg prose-img:rounded-lg prose-img:border-2 prose-img:border-gray-500 prose-headings:font-display prose-headings:font-semibold',
		]"
		v-html="content"
	/>
</template>
