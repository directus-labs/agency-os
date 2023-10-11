<script setup lang="ts">
export interface LogoCloudBlockProps {
	id: string;
	headline?: string;
	title?: string;
	logos: Array<{
		directus_files_id: {
			id: string;
		};
	}>;
}

defineProps<{
	data: LogoCloudBlockProps;
}>();

const { fileUrl } = useFiles();
</script>
<template>
	<BlockContainer>
		<TypographyTitle v-if="data.title">{{ data.title }}</TypographyTitle>
		<TypographyHeadline v-if="data.headline" :content="data.headline" size="lg" />
		<div class="flow-root mt-8 lg:mt-10">
			<div class="grid gap-4 md:grid-cols-4 md:gap-8">
				<div
					v-motion
					:initial="{
						opacity: 0,
						y: 100,
					}"
					:visibleOnce="{
						opacity: 1,
						y: 0,
					}"
					:delay="250 + 100 * fileIdx"
					v-for="(logo, fileIdx) in data.logos"
					:key="logo.directus_files_id"
					class="flex items-center justify-center p-8 border rounded-xl dark:border-gray-700 dark:bg-gray-200"
				>
					<img class="h-12" :src="fileUrl(logo.directus_files_id)" />
				</div>
			</div>
		</div>
	</BlockContainer>
</template>
