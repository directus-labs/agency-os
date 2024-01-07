<script setup lang="ts">
const { path, params } = useRoute();

const {
	data: folder,
	pending,
	error,
} = await useAsyncData(`folder-${params.id}`, () => {
	return useDirectus(readFolder(params.id as string, {}));
});
</script>
<template>
	<div>
		<PortalPageHeader
			:title="folder?.name"
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
					<PortalFileUploadModal :folder-id="folder?.id" />
				</div>
			</template>
		</PortalPageHeader>
		<PortalFilesView :folder-id="params.id as string" class="mt-6" />
	</div>
</template>
