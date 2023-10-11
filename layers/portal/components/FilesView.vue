<script setup lang="ts">
export interface FilesViewProps {
	folderId?: string;
}

const props = defineProps<FilesViewProps>();

const { $directus, $readItem, $readFolders, $readFiles } = useNuxtApp();
const { fileUrl } = useFiles();

const { data, pending, error } = await useAsyncData(
	`folder-detail-${props.folderId}`,
	() => {
		const folderReq = $directus.request(
			$readFolders({
				fields: ['*'],
				filter: {
					parent: {
						_eq: props.folderId || null,
					},
				},
			}),
		);

		const fileReq = $directus.request(
			$readFiles({
				fields: ['*'],
				filter: {
					folder: {
						_eq: props.folderId || null,
					},
				},
			}),
		);

		return Promise.all([folderReq, fileReq]);
	},
	{
		transform: ([folders, files]) => {
			return {
				folders,
				files,
			};
		},
	},
);

// async function downloadAllFiles() {
// 	for (const file of data.value.files) {
// 		await navigateTo(fileUrl(file.id + '?download'), {
// 			external: true,
// 			open: {
// 				target: '_blank',
// 			},
// 		});
// 	}
// }
</script>
<template>
	<div class="flex flex-col gap-6">
		<section v-if="data.folders && data.folders.length > 0">
			<!-- <TypographyHeadline content="Folders" size="xs" /> -->
			<div class="grid gap-6 md:grid-cols-4">
				<NuxtLink v-for="folder in data.folders" :key="folder.id" :href="`/portal/files/folders/${folder.id}`">
					<UCard
						class="h-full"
						:ui="{
							ring: 'hover:ring-primary dark:hover:ring-primary',
							body: {
								base: 'h-full flex flex-col',
								padding: 'p-4 md:p-4',
							},
						}"
					>
						<div class="flex gap-x-4">
							<UIcon name="material-symbols:folder" class="w-6 h-6 text-gray-500" />
							<p class="text-sm truncate">{{ folder.name }}</p>
						</div>
					</UCard>
				</NuxtLink>
			</div>
		</section>
		<section class="">
			<!-- <TypographyHeadline content="Files" size="xs" /> -->
			<!-- <UButton @click="downloadAllFiles">Download All Files</UButton> -->
			<div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				<PortalFileCard :file="file" v-for="file in data.files" :key="file.id" />
			</div>
		</section>
	</div>
</template>
<style>
.aspect-square {
	aspect-ratio: 1 / 1;
}
</style>
