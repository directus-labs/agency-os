<script setup lang="ts">
import type { Folder, File } from '~/types';
export interface FilesViewProps {
	folderId?: string | undefined | null;
}

const props = defineProps<FilesViewProps>();

// We're not using the useAsyncData composables inside the portal because we're authenticated and there's no need for SSR. See ~/layers/portal/nuxt.config.ts
async function fetchData(props: FilesViewProps = {}) {
	try {
		const folderReq = useDirectus(
			readFolders({
				fields: ['*'],
				// @ts-ignore
				filter: {
					// parent: {
					// 	_eq: props.folderId ?? null,
					// },
				},
			}),
		);

		const fileReq = useDirectus(
			readFiles({
				fields: ['*'],
				// @ts-ignore
				filter: {
					folder: {
						_eq: props.folderId,
					},
				},
			}),
		);

		const [folders, files] = await Promise.all([folderReq, fileReq]);

		return {
			folders,
			files,
		} as { folders: Folder[]; files: File[] };
	} catch (error) {
		return null;
	}
}

const data = await fetchData(props);

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
