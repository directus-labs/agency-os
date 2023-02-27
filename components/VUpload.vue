<template>
  <fieldset>
    <VLabel v-if="label" :label="label" />
    <!-- Dropzone -->
    <div
      v-if="multiple ? true : files.length === 0"
      @dragenter.prevent="onDragEnter"
      @dragover.prevent
      @dragleave.prevent="onDragLeave"
      @drop.stop.prevent="onDrop"
      :class="[
        'dropzone',
        {
          'border-primary-600 bg-primary-50 dark:bg-primary-800 !text-primary-600  dark:!text-gray-100 dark:border-primary-300':
            dragging,
          'hover:border-primary-600 hover:text-primary-600 dark:hover:text-primary-500 dark:hover:border-primary-500':
            !dragging && !uploading,
          'text-gray-500 border-gray-300 dark:text-gray-100 dark:border-gray-700':
            !uploading,
          'cursor-not-allowed dark:border-gray-700 dark:text-gray-100 text-gray-500 border-gray-300':
            uploading,
        },
      ]"
    >
      <input
        type="file"
        class="absolute inset-0 opacity-0 appearance-none cursor-pointer"
        @change="onSelect"
        :multiple="multiple"
        :accept="accept"
      />
      <div class="h-full mx-auto text-sm font-medium text-center">
        <CloudArrowUpIcon class="w-8 h-8 mx-auto mb-2" />
        <template v-if="dragging">
          <p>Drop to upload</p>
        </template>
        <template v-else>
          <p>Drag and drop files here or click to browse</p>
        </template>
        <p class="mt-1 text-xs" v-if="sizeLimitMb">
          Max File Size: {{ sizeLimitMb }} MB
        </p>
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
          <VLoading class="w-16 h-16 text-primary-600 dark:text-primary-500" />
        </div>
      </transition>
    </div>
    <!-- Show an alert if there's an error  -->
    <VAlert v-if="error" type="error" class="mt-2">{{ error }}</VAlert>
    <!-- File List -->
    <ul class="mt-2 space-y-2">
      <li v-for="(file, index) in files" :key="file.id">
        <div
          class="relative flex items-center px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-800"
        >
          <img
            :src="fileUrl(file.id)"
            class="object-contain w-12 h-12 mr-4 dark:brightness-90"
          />
          <span class="sm:text-sm dark:text-gray-200">{{
            file.filename_download
          }}</span>
          <span class="flex ml-auto cursor-pointer">
            <button @click="deleteImage(index)">
              <TrashIcon
                class="w-5 h-5 text-red-500 stroke-current hover:text-red-600 flex-shrink-none"
              />
            </button>
          </span>
        </div>
      </li>
    </ul>
  </fieldset>
</template>

<script setup>
import { CloudArrowUpIcon, TrashIcon } from '@heroicons/vue/24/outline'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  label: { type: String, default: 'Files' },
  modelValue: { type: Array, default: () => [] },
  multiple: { type: Boolean, default: false },
  sizeLimitMb: { type: Number, default: 5 },
  accept: { type: String, default: '' },
})

const { $directus } = useNuxtApp()
const { fileUrl } = useFiles()
const { dragging, onDragEnter, onDragLeave, onDrop } = useDragging()
const { uploading, error, onSelect, processUpload } = useUpload()

const files = ref(props.modelValue)

function deleteImage(index) {
  files.value = files.value.filter((image, i) => i !== index)
  emit('update:modelValue', files.value)
}

// Composable for drag and drop
function useDragging() {
  const dragging = ref(false)
  let dragCounter = 0

  return { onDragEnter, onDragLeave, onDrop, dragging }

  function onDragEnter() {
    dragCounter++
    if (dragCounter === 1) {
      dragging.value = true
    }
  }

  function onDragLeave() {
    dragCounter--
    if (dragCounter === 0) {
      dragging.value = false
    }
  }
  function onDrop(event) {
    dragCounter = 0
    dragging.value = false
    const fileList = event.dataTransfer.files
    if (fileList.length > 0) {
      processUpload(fileList)
    }
  }
}

// Composable for uploading
function useUpload() {
  const uploading = ref(false)
  const error = ref(null)

  return {
    uploading,
    error,
    processUpload,
    uploadFile,
    checkFileSize,
    onSelect,
  }

  async function processUpload(filesToProcess) {
    error.value = null
    uploading.value = true
    try {
      if (filesToProcess.length > 1) {
        const uploadedFiles = await Promise.all(
          filesToProcess.map((file) => uploadFile(file))
        )
        files.value.push(...uploadedFiles)
        emit('update:modelValue', files.value)
      } else {
        const fileToUpload = filesToProcess[0]
        checkFileSize(fileToUpload)
        const uploadedFile = await uploadFile(fileToUpload)
        files.value.push(uploadedFile)
        emit('update:modelValue', files.value)
      }
    } catch (e) {
      console.log(e)
      error.value = e.message
    } finally {
      uploading.value = false
    }
  }

  async function uploadFile(file) {
    try {
      const form = new FormData()
      form.append('file', file)
      const uploadedFile = await $directus.files.createOne(form)
      return uploadedFile
    } catch (e) {
      throw new Error(e)
    }
  }

  function checkFileSize(file) {
    if (props.sizeLimitMb) {
      const fileSize = file.size / 1000000
      if (fileSize > props.sizeLimitMb) {
        throw new Error(
          `Oops. Your file size is ${fileSize.toFixed(2)}MB, the max is ${
            props.sizeLimitMb
          }MB`
        )
      }
    }
  }

  function onSelect(event) {
    const fileList = event.target.files
    if (fileList.length > 0) {
      processUpload(fileList)
    }
  }
}
</script>
<style>
.dropzone {
  @apply relative flex items-center p-8 min-h-[100px] transition duration-150 border-2 border-dashed rounded-md;
}
</style>
