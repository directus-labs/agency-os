<script setup lang="ts">
export interface FilesViewProps {
	folderId?: string;
}

const props = defineProps<FilesViewProps>();

const { data, pending, error } = await useAsyncData(
	`folder-detail-${props.folderId}`,
	() => {
		const folderReq = useDirectus(
			readFolders({
				fields: ['*'],
				...(props.folderId && {
					filter: {
						parent: {
							_eq: props.folderId,
						},
					},
				}),
			}),
		);

		const fileReq = useDirectus(
			readFiles({
				fields: ['*'],
				...(props.folderId && {
					filter: {
						folder: {
							_eq: props.folderId,
						},
					},
				}),
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

const folders = computed(() => {
	return unref(data)?.folders;
});

const files = computed(() => {
	return unref(data)?.files;
});
</script>
<template>
	<div class="flex flex-col gap-6">
		<section v-if="folders && folders.length > 0">
			<div class="grid gap-6 md:grid-cols-4">
				<NuxtLink v-for="folder in folders" :key="folder.id" :href="`/portal/files/folders/${folder.id}`">
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
						<div class="flex gap-2">
							<UIcon name="material-symbols:folder" class="w-6 h-6 text-gray-500" />
							<p class="text-sm truncate">{{ folder.name }}</p>
						</div>
					</UCard>
				</NuxtLink>
			</div>
		</section>
		<section class="">
			<div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				<PortalFileCard v-for="file in files" :key="file.id" :file="file" />
			</div>
		</section>
	</div>
</template>
