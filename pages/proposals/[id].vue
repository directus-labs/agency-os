<script setup lang="ts">
definePageMeta({
	layout: 'proposal',
});
const { $directus, $readItem } = useNuxtApp();
const { params, path } = useRoute();

const { showSidebar, toggleSidebar } = useProposals();

// Fetch the page data from the Directus API using the Nuxt useAsyncData composable
// https://v3.nuxtjs.org/docs/usage/data-fetching#useasyncdata
const {
	data: proposal,
	pending,
	error,
} = await useAsyncData(path, () => {
	return $directus.request(
		$readItem('os_proposals', params.id, {
			fields: [
				'name',
				{
					organization: ['name', 'logo', 'brand_color'],
					owner: ['first_name', 'last_name', 'avatar', 'title'],

					// contacts: { contact_id: ['first_name', 'last_name'] }
					blocks: [
						'collection',
						{
							item: {
								block_richtext: ['id', 'title', 'headline', 'content', 'alignment'],
								block_team: ['title', 'headline', 'content'],
								block_logocloud: ['title', 'headline', { logos: ['directus_files_id'] }],
								block_quote: ['title', 'subtitle', 'headline', 'content', 'author', 'image', 'background_color'],
								block_divider: ['title'],
								block_steps: [
									'title',
									'headline',
									{ steps: ['id', 'title', 'content', 'image'] },
									'show_step_numbers',
									'alternate_image_position',
								],
							},
						},
					],
				},
			],
		}),
	);
});

if (!proposal.value) {
	// console.log(error.value.cause);
	throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}
</script>
<template>
	<div class="">
		<ProposalsHeader
			:title="proposal?.name"
			class="fixed top-0 z-20 flex justify-center w-full p-2"
			:name="proposal?.name"
			:organization="proposal?.organization?.name"
		/>
		<div>
			<!-- <ProposalsBlocksHero
				class="pt-36"
				:name="proposal?.name"
				:owner="proposal.owner"
				:organization="proposal?.organization?.name"
			/> -->
			<!-- Render the page using the PageBuilder component -->

			<!-- <PageBuilder :page="proposal" id="content" /> -->

			<ProposalsBlocksAcceptance id="accept" class="max-w-3xl mx-auto" />
		</div>
	</div>
</template>
