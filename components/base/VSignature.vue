<script setup lang="ts">
import { VPerfectSignature } from 'v-perfect-signature';
const { isDark } = useDark();

const props = defineProps({
	context: Object,
});

const options = props.context?.options ?? ['type', 'draw', 'upload'];

const signatureData = ref(
	props.context?.value ?? {
		type: 'draw',
		text: undefined,
		image: undefined,
	},
);

// Signature Pad Settings
const signaturePad = ref(null);
const strokeOptions = {
	size: 8,
	thinning: 0.75,
	smoothing: 0.5,
	streamline: 0.5,
};

const isDrawing = ref(false);

const signatureColor = computed(() => {
	return isDark.value ? '#ffffff' : '#0f172a';
});

function startDrawing() {
	isDrawing.value = true;
}
function endDrawing() {
	isDrawing.value = false;
	//  Convert to a File to standardize across all other form inputs
	// @TODO - Fix type error

	const file = dataURLtoFile((signaturePad.value as any)?.toDataURL(), 'signature.png');
	signatureData.value.image = file;
}

function onFileChange(e: Event) {
	const files = (e.target as HTMLInputElement).files;
	if (files && files.length > 0) {
		const file = files[0];
		signatureData.value.image = file;
	}
}

function clearData() {
	if (signatureData.value.type === 'draw') {
		signaturePad.value?.clear();
	} else {
		signatureData.value.text = undefined;
		signatureData.value.image = undefined;
	}
}

function dataURLtoFile(dataURL: string, filename: string) {
	const mimeType = dataURL.split(',')[0].split(':')[1].split(';')[0];
	const bytes = atob(dataURL.split(',')[1]);
	const array = new Uint8Array(bytes.length);

	for (let i = 0; i < bytes.length; i++) {
		array[i] = bytes.charCodeAt(i);
	}

	return new File([new Blob([array], { type: mimeType })], filename, { type: mimeType });
}

watch(
	signatureData.value,
	(oldVal, newVal) => {
		props.context?.node.input(newVal);
	},
	{ deep: true },
);
</script>
<template>
	<div class="relative w-full p-4 overflow-hidden bg-white border dark:bg-gray-800 dark:border-gray-700">
		<!-- Button group to toggle between type, draw, upload -->
		<div class="flex justify-between border-b dark:border-gray-700">
			<div class="flex gap-x-4">
				<button
					type="button"
					v-for="item in options"
					:key="item"
					@click="signatureData.type = item"
					:class="[
						signatureData.type === item ? ' border-accent' : 'border-transparent',
						'border-b-4 pb-2 font-mono px-2 capitalize dark:text-white transition duration-150 ease-in-out',
					]"
				>
					{{ item }}
				</button>
			</div>
			<div>
				<button type="button" class="px-2 pb-2 font-mono dark:text-white" @click="clearData">Clear</button>
			</div>
		</div>
		<!-- Signature area -->
		<div class="relative w-full" v-auto-animate>
			<template v-if="signatureData.type === 'type'">
				<input
					type="text"
					v-model="signatureData.text"
					class="w-full px-4 py-3 text-3xl text-gray-900 border-0 border-b border-gray-300 dark:bg-gray-800 dark:text-white focus:ring-0 focus:border-accent placeholder:text-gray-400 dark:placeholder:text-gray-600 font-signature"
					placeholder="Type your signature"
				/>
			</template>
			<template v-if="signatureData.type === 'draw'">
				<div class="absolute w-full h-px bg-gray-300 dark:bg-gray-700 bottom-8"></div>
				<div
					v-if="!isDrawing && signatureData.image === undefined"
					class="absolute inset-0 flex items-center justify-center w-full pointer-events-none"
				>
					<p class="text-5xl text-gray-300 dark:text-gray-600 font-signature">Draw Signature Here</p>
				</div>
				<div class="z-10">
					<VPerfectSignature
						:stroke-options="strokeOptions"
						ref="signaturePad"
						height="200px"
						:pen-color="signatureColor"
						@on-begin="startDrawing"
						@on-end="endDrawing"
					/>
				</div>
			</template>
			<template v-if="signatureData.type === 'upload'">
				<div class="p-4">
					<input
						class="block w-full text-sm text-gray-900 cursor-pointer dark:text-gray-400 focus:ring-1 focus:ring-accent focus:outline-none"
						type="file"
						@change="onFileChange"
						accept="image/*"
					/>
					<p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
						Accepted: SVG, PNG, JPG or GIF
					</p>
				</div>
			</template>
		</div>
	</div>
</template>

<style lang="postcss">
input::file-selector-button {
	@apply font-mono inline-flex items-center font-bold border-none transition duration-150 odd:rounded-tr-lg odd:rounded-bl-lg even:rounded-tl-lg even:rounded-br-lg hover:scale-105 active:hover:scale-95 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed text-gray-800 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300 px-4 py-2 text-sm cursor-pointer mr-2;
}
</style>
