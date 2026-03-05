<script setup lang="ts">
const { params } = useRoute();
const folderId = '3545f8b9-d7a4-449c-86e1-5353bd69101a';
</script>
<template>
	<UCard
		class="mt-6"
		:ui="{
			background: 'bg-transparent dark:bg-transparent',
		}"
	>
		<template #header>
			<div class="flex items-center justify-between w-full">
				<div>
					<TypographyHeadline content="Files" size="xs" />
					<TypographyProse size="sm" content="These are the files you'll need to complete your project" />
				</div>
				<div>
					<PortalFileUploadModal :folder-id="folderId" />
				</div>
			</div>
		</template>
		<PortalFilesView :folder-id="folderId" />
	</UCard>
</template>
