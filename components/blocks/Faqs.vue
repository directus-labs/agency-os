<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui/dist/runtime/types';
import type { BlockFaq, BlockFaqQuestion } from '~/types';

const props = defineProps<{
	data: BlockFaq;
}>();

const offset = ref(0);
const limit = ref(5);

const faqs = computed(() => {
	// We don't want to overwhelm the user with too many FAQs at once so let's only show 5 until they want more
	return props.data?.faqs?.slice(offset.value, limit.value).map((item: BlockFaqQuestion) => {
		return {
			label: item?.title,
			content: item?.answer,
		};
	});
});

function loadMore() {
	limit.value += 5;
}
</script>

<template>
	<BlockContainer>
		<div
			:class="[
				{
					'mx-auto max-w-3xl': data.alignment === 'center',
				},
			]"
		>
			<TypographyTitle v-if="data.title">{{ data.title }}</TypographyTitle>
			<TypographyHeadline v-if="data.headline" :content="data.headline" size="lg" />
			<div class="pt-6 mt-6">
				<UAccordion v-if="faqs" v-auto-animate :items="faqs as Partial<AccordionItem>[]" :ui="{ wrapper: 'space-y-2' }">
					<template #default="{ item, index, open }">
						<button
							:key="index"
							:class="[
								open ? 'bg-primary/20' : 'bg-gray-100 dark:bg-gray-800',
								`rounded-card`,
								'relative px-6 py-4   0',
							]"
							class="flex items-center justify-between w-full text-left text-gray-400 transition duration-150 focus:outline-none focus:text-gray-900 dark:focus:text-primary"
						>
							<span class="text-sm font-medium text-gray-900 dark:text-white font-display md:text-base">
								{{ item.label }}
							</span>
							<span class="flex items-center">
								<UIcon
									v-if="!open"
									name="material-symbols:add-rounded"
									class="w-8 h-8 rounded-full fill-current text-primary"
								/>

								<UIcon
									v-if="open"
									name="material-symbols:remove-rounded"
									class="w-8 h-8 rounded-full fill-current text-primary"
								/>
							</span>
						</button>
					</template>
					<template #item="{ item, open }">
						<div v-show="open" class="relative px-6 pt-2 pb-6">
							<div class="prose text-left dark:prose-invert">
								{{ item.content }}
							</div>
						</div>
					</template>
				</UAccordion>
				<div class="mt-2 text-center">
					<UButton
						v-if="faqs && props.data.faqs && faqs.length < props.data.faqs.length"
						variant="ghost"
						size="xl"
						@click="loadMore"
					>
						Load More
					</UButton>
				</div>
			</div>
		</div>
	</BlockContainer>
</template>
