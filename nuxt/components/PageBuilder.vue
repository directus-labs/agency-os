<script setup lang="ts">
import type { Page, OsProposal, PageBlock, BlockType } from '~/types';

const componentMap: Record<BlockType, any> = {
	block_hero: resolveComponent('BlocksHero'),
	block_faqs: resolveComponent('BlocksFaqs'),
	block_richtext: resolveComponent('BlocksRichText'),
	block_testimonials: resolveComponent('BlocksTestimonials'),
	block_quote: resolveComponent('BlocksQuote'),
	block_cta: resolveComponent('BlocksCta'),
	block_form: resolveComponent('BlocksForm'),
	block_logocloud: resolveComponent('BlocksLogoCloud'),
	block_team: resolveComponent('BlocksTeam'),
	block_html: resolveComponent('BlocksRawHtml'),
	block_video: resolveComponent('BlocksVideo'),
	block_gallery: resolveComponent('BlocksGallery'),
	block_steps: resolveComponent('BlocksSteps'),
	block_columns: resolveComponent('BlocksColumns'),
	block_divider: resolveComponent('BlocksDivider'),
};

const props = defineProps<{
	page: Page | OsProposal;
}>();

const blocks = computed(() => {
	const blocks = unref(props.page as Page)?.blocks as PageBlock[];
	return blocks?.filter((block) => {
		return block.hide_block !== true;
	});
});
</script>
<template>
	<div id="content" class="mx-auto">
		<template v-for="block in blocks" :key="block.id">
			<component :is="componentMap[block.collection]" v-if="block && block.collection" :data="block.item" />
		</template>
	</div>
</template>
