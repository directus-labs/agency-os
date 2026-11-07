<script setup lang="ts">
export interface UploadProps {
	label?: string;
	modelValue?: any[];
	multiple?: boolean;
	sizeLimitMb?: number;
	accept?: string;
	folderId?: string | null | undefined;
}

const props = withDefaults(defineProps<UploadProps>(), {
	modelValue: () => [],
	multiple: false,
	sizeLimitMb: 5, // 5mb file size limit by default
	accept: 'image/*',
	folderId: null,
});

const emit = defineEmits(['update:modelValue', 'error', 'success']);

const { dragging, onDragEnter, onDragLeave, onDrop } = useDragging();
const { uploading, error, onSelect, processUpload } = useUpload();

const files = ref(props.modelValue);

function deleteImage(index: number) {
	files.value = files.value.filter((image, i) => i !== index);
	emit('update:modelValue', files.value);
}

// Composable for drag and drop
function useDragging() {
	const dragging = ref(false);
	let dragCounter = 0;

	return { onDragEnter, onDragLeave, onDrop, dragging };

	function onDragEnter() {
		dragCounter++;

		if (dragCounter === 1) {
			dragging.value = true;
		}
	}

	function onDragLeave() {
		dragCounter--;

		if (dragCounter === 0) {
			dragging.value = false;
		}
	}

	function onDrop(event: DragEvent) {
		dragCounter = 0;
		dragging.value = false;

		if (!event.dataTransfer) {
			return;
		}

		const fileList = event.dataTransfer.files;

		if (fileList.length > 0) {
			processUpload(fileList);
		}
	}
}

// Composable for uploading
function useUpload() {
	const uploading = ref(false);
	const error = ref(null);

	return {
		uploading,
		error,
		processUpload,
		uploadFile,
		checkFileSize,
		onSelect,
	};

	async function processUpload(fileList: FileList) {
		error.value = null;
		uploading.value = true;

		// Convert FileList to Array
		const filesToProcess = Array.from(fileList);

		try {
			if (filesToProcess.length > 1) {
				const uploadedFiles = await Promise.all(filesToProcess.map((file) => uploadFile(file)));
				files.value.push(...uploadedFiles);
				emit('update:modelValue', files.value);
			} else {
				const fileToUpload = filesToProcess[0];
				checkFileSize(fileToUpload);
				const uploadedFile = await uploadFile(fileToUpload);
				files.value.push(uploadedFile);
				emit('update:modelValue', files.value);
			}

			// Emit success event
			emit('success', files.value);
		} catch (e: any) {
			error.value = e.message;
		} finally {
			uploading.value = false;
		}
	}

	async function uploadFile(file: File) {
		try {
			const form = new FormData();

			if (props.folderId) {
				form.append('folder', props.folderId);
			}

			form.append('file', file);
			const uploadedFile = await useDirectus(uploadFiles(form));
			return uploadedFile;
		} catch (e) {
			throw createError({
				statusCode: 500,
				statusMessage: 'Error uploading file...',
			});
		}
	}

	function checkFileSize(file: File) {
		if (props.sizeLimitMb) {
			const fileSize = file.size / 1000000;

			if (fileSize > props.sizeLimitMb) {
				throw new Error(`Oops. Your file size is ${fileSize.toFixed(2)}MB, the max is ${props.sizeLimitMb}MB`);
			}
		}
	}

	function onSelect(event: Event) {
		const input = event.target as HTMLInputElement;

		const fileList = input.files;

		if (fileList && fileList.length > 0) {
			processUpload(fileList);
		}
	}
}
</script>
<template>
	<fieldset>
		<VLabel v-if="label" :label="label" />
		<!-- Dropzone -->
		<div
			v-if="multiple ? true : files.length === 0"
			:class="[
				'dropzone',
				{
					'border-primary bg-primary-50 dark:bg-primary !text-primary  dark:!text-gray-100 dark:border-primary':
						dragging,
					'hover:border-primary hover:text-primary dark:hover:text-primary dark:hover:border-primary':
						!dragging && !uploading,
					'text-gray-500 border-gray-300 dark:text-gray-100 dark:border-gray-700': !uploading,
					'cursor-not-allowed dark:border-gray-700 dark:text-gray-100 text-gray-500 border-gray-300': uploading,
				},
			]"
			@dragenter.prevent="onDragEnter"
			@dragover.prevent
			@dragleave.prevent="onDragLeave"
			@drop.stop.prevent="onDrop"
		>
			<input
				type="file"
				class="absolute inset-0 opacity-0 appearance-none cursor-pointer"
				:multiple="multiple"
				:accept="accept"
				@change="onSelect"
			/>
			<div class="h-full mx-auto text-sm font-medium text-center">
				<Icon name="heroicons:cloud-arrow-up" class="w-8 h-8 mx-auto mb-2" />
				<template v-if="dragging">
					<p>Drop to upload</p>
				</template>
				<template v-else>
					<p>Drag and drop files here or click to browse</p>
				</template>
				<p v-if="sizeLimitMb" class="mt-1 text-xs">Max File Size: {{ sizeLimitMb }} MB</p>
			</div>

			<!-- Show spinner while uploading -->
			<transition
				enter-active-class="transition duration-150 ease-out"
				enter-from-class="transform scale-95 opacity-0"
				enter-to-class="transform scale-100 opacity-100"
				leave-active-class="transition duration-100 ease-in"
				leave-from-class="transform scale-100 opacity-100"
				leave-to-class="transform scale-95 opacity-0"
			>
				<div
					v-if="uploading"
					class="absolute inset-0 flex items-center justify-center bg-white rounded-md bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-90"
				>
					<VLoading class="w-16 h-16 text-primary dark:text-primary" />
				</div>
			</transition>
		</div>
		<!-- Show an alert if there's an error  -->
		<VAlert v-if="error" type="error" class="mt-2">{{ error }}</VAlert>
		<!-- File List -->
		<ul class="mt-2 space-y-2">
			<li v-for="(file, fileIdx) in files" :key="file.id">
				<div class="relative flex items-center px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-800">
					<NuxtImg :src="file.id" class="object-contain w-12 h-12 mr-4 dark:brightness-90" />
					<span class="sm:text-sm dark:text-gray-200">{{ file.filename_download }}</span>
					<span class="flex ml-auto cursor-pointer">
						<button @click="deleteImage(fileIdx)">
							<Icon
								name="heroicons:trash"
								class="w-5 h-5 text-red-500 stroke-current hover:text-red-600 flex-shrink-none"
							/>
						</button>
					</span>
				</div>
			</li>
		</ul>
	</fieldset>
</template>

<style lang="postcss">
.dropzone {
	@apply relative flex items-center p-8 min-h-[100px] transition duration-150 border-2 border-dashed rounded-card;
}
</style>
