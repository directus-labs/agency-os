<script setup lang="ts">
export interface HeroBlockProps {
	id: string;
	headline: string;
	content: string;
	image: string;
	buttons?: Array<{
		label: string;
		href: string;
		variant: string;
		open_in_new_window: boolean;
	}>;
}

defineProps<{
	data: HeroBlockProps;
}>();
</script>
<template>
	<BlockContainer class="relative grid gap-6 md:grid-cols-3">
		<!-- Content -->
		<div class="md:pt-12 md:col-span-2">
			<TypographyHeadline :content="data.headline" size="title" as="h1" />
			<TypographyProse :content="data.content" size="lg" class="py-6 font-display" />
			<div class="flex flex-col space-y-4 md:space-x-4 md:flex-row md:space-y-0">
				<UButton
					v-for="(button, buttonIdx) in data.buttons"
					:key="buttonIdx"
					:href="button.href"
					:color="button.color"
					:variant="button.variant"
					:target="button.open_in_new_window ? '_blank' : '_self'"
					size="xl"
					trailing-icon="material-symbols:arrow-forward-rounded"
				>
					{{ button.label }}
				</UButton>
			</div>
		</div>
		<!-- Image -->
		<div
			v-if="data.image"
			class="overflow-hidden border lg:-mr-48 md:-mr-16 lg:relative lg:h-full dark:border-gray-700 rounded-xl"
		>
			<NuxtImg
				class="w-full overflow-hidden dark:brightness-90 max-h-[700px] h-full object-cover rounded-lg"
				:src="data.image"
				alt=""
			/>
		</div>
	</BlockContainer>
</template>
