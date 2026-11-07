<script setup lang="ts">
// @TODO This should be coming from the user > organization > folder
const folderId = null;
</script>
<template>
	<div>
		<PortalPageHeader
			title="File Library"
			:breadcrumbs="[
				{
					title: 'Portal',
					href: '/portal',
				},
				{
					title: 'Files',
				},
			]"
		>
			<template #actions>
				<div>
					<PortalFileUploadModal :folder-id="folderId" />
				</div>
			</template>
		</PortalPageHeader>
		<PortalFilesView :folder-id="folderId" class="mt-6" />
	</div>
</template>
