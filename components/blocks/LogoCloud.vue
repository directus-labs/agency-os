<script setup lang="ts">
import type { BlockLogocloud, BlockLogocloudFile, File } from '~/types';

defineProps<{
	data: BlockLogocloud;
}>();

const { fileUrl } = useFiles();
</script>
<template>
	<BlockContainer>
		<TypographyTitle v-if="data?.title">{{ data?.title }}</TypographyTitle>
		<TypographyHeadline v-if="data?.headline" :content="data?.headline" size="lg" />
		<div class="flow-root mt-8 lg:mt-10">
			<div v-if="data.logos && data.logos.length > 0" class="grid gap-4 md:grid-cols-4 md:gap-8">
				<div
					v-for="(logo, fileIdx) in data?.logos as BlockLogocloudFile[]"
					:key="logo.id"
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
					class="flex items-center justify-center p-8 border rounded-card dark:border-gray-700 dark:bg-gray-200"
				>
					<NuxtImg
						v-if="(logo.directus_files_id as File)?.id"
						class="h-12"
						:src="(logo.directus_files_id as File)?.id"
						:alt="(logo.directus_files_id as File)?.description ?? ''"
					/>
				</div>
			</div>
		</div>
	</BlockContainer>
</template>
