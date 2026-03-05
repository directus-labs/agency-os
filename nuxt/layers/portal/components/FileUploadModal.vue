<script setup lang="ts">
export interface FileUploadModalProps {
	folderId: string | null | undefined;
}

const props = defineProps<FileUploadModalProps>();

const showUploadModal = ref(false);
</script>
<template>
	<UButton icon="material-symbols:upload-file-outline" size="lg" @click="showUploadModal = !showUploadModal">
		Upload Files
	</UButton>
	<UModal v-model="showUploadModal">
		<UCard>
			<template #header>
				<TypographyHeadline content="Upload File" size="xs" />
			</template>
			<VUpload
				:folder-id="folderId"
				multiple
				@success="
					() => {
						showUploadModal = false;
						refreshNuxtData('folder-detail-' + folderId);
					}
				"
			></VUpload>
			<template #footer>
				<div class="flex justify-end gap-x-4">
					<UButton color="primary" @click="showUploadModal = false">Done</UButton>
				</div>
			</template>
		</UCard>
	</UModal>
</template>
