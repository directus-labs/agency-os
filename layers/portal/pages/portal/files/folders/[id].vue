<script setup lang="ts">
// const folderId = '27fe9681-9b11-4969-91c8-765e916894f6';
const { path, params } = useRoute();

const {
	data: folder,
	pending,
	error,
} = await useAsyncData(
	`folder-${params.id}`,
	() => {
		return useDirectus(readFolder(params.id, {}));
	},
	{
		cache: false,
	},
);
</script>
<template>
	<div>
		<PortalPageHeader
			:title="folder.name"
			:breadcrumbs="[
				{
					title: 'Portal',
					href: '/portal',
				},
				{
					title: 'Files',
					href: '/portal/files',
				},
			]"
		>
			<template #actions>
				<div>
					<PortalFileUploadModal :folder-id="folder.id" />
				</div>
			</template>
		</PortalPageHeader>
		<PortalFilesView :folder-id="params.id" class="mt-6" />
	</div>
</template>
