<script setup lang="ts">
import type { File } from '~/types';

const props = defineProps<{
	file: File;
}>();

const toast = useToast();
const { fileUrl } = useFiles();

const possibleActions = (file: File) => {
	return [
		[
			{
				label: 'Download File',
				icon: 'material-symbols:download',
				click: () => {
					navigateTo(fileUrl(file.id + '?download'), {
						external: true,
					});
				},
			},
			{
				label: 'Open File in New Tab',
				icon: 'material-symbols:tab-new-right-outline',
				click: () => {
					navigateTo(fileUrl(file.id), {
						external: true,
						open: {
							target: '_blank',
						},
					});
				},
			},
			{
				label: 'Preview Image',
				icon: 'material-symbols:zoom-in',
			},
			{
				label: 'Copy Link to File',
				icon: 'material-symbols:link',
				click: () => {
					if (!file || !file.id) return;

					navigator.clipboard.writeText(fileUrl(file.id) ?? '');

					toast.add({
						title: 'Link Copied',
						description: 'The link to the file has been copied to your clipboard.',
						icon: 'material-symbols:content-copy-outline',
						color: 'green',
						timeout: 3000,
					});
				},
			},
		],
	];
};
</script>
<template>
	<UCard
		class="h-full"
		:ui="{
			strategy: 'merge',
			ring: 'hover:ring-primary dark:hover:ring-primary',
			body: {
				base: 'h-full flex flex-col',
				padding: 'p-4 md:p-4',
			},
		}"
	>
		<div class="flex items-center justify-between w-full gap-2">
			<div class="flex items-center gap-2">
				<UIcon :name="getFileIcon(file?.type)" class="flex-shrink-0 w-6 h-6 text-gray-500" />
				<p class="text-xs line-clamp-2">{{ file.filename_download }}</p>
			</div>
			<UDropdown :items="possibleActions(file)">
				<UButton icon="material-symbols:more-vert" variant="ghost" color="gray" size="lg" />
			</UDropdown>
		</div>

		<div class="relative mt-2">
			<NuxtImg
				v-if="file.type.startsWith('image')"
				:src="file.id"
				:alt="file.filename_download"
				class="object-cover object-center w-full rounded-card aspect-square bg-checkerboard dark:brightness-90"
			/>
			<div v-else class="flex items-center justify-center h-full">
				<UIcon :name="getFileIcon(file.type)" class="w-24 h-24 text-gray-500/30" />
			</div>
			<div
				class="absolute inset-0 flex flex-col items-center justify-center gap-8 transition-opacity duration-300 bg-white bg-opacity-75 opacity-0 hover:opacity-100 dark:bg-gray-900 dark:bg-opacity-75"
			>
				<div class="flex gap-6">
					<UButton v-if="file.type.startsWith('image')" icon="material-symbols:zoom-in-rounded" size="xl" />
					<UTooltip text="Open File in New Tab">
						<UButton
							icon="material-symbols:tab-new-right-outline-rounded"
							size="xl"
							@click="
								navigateTo(fileUrl(file.id), {
									external: true,
									open: {
										target: '_blank',
									},
								})
							"
						/>
					</UTooltip>
					<UTooltip text="Download File">
						<UButton
							icon="material-symbols:download-rounded"
							size="xl"
							@click="
								navigateTo(fileUrl(file.id + '?download'), {
									external: true,
								})
							"
						/>
					</UTooltip>
				</div>
			</div>
		</div>
	</UCard>
</template>

<style>
.aspect-square {
	aspect-ratio: 1 / 1;
}

.bg-checkerboard {
	background: #eee
		url('data:image/svg+xml,\<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill-opacity=".10" >\<rect x="200" width="200" height="200" />\<rect y="200" width="200" height="200" />\</svg>');
	background-size: 30px 30px;
}
</style>
