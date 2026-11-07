<script setup lang="ts">
import type { File } from '~/types';
import { TransitionRoot } from '@headlessui/vue';

export interface GalleryProps {
	items: File[];
}

const props = defineProps<GalleryProps>();

const { fileUrl } = useFiles();

const isOpen = ref(false);
const currentItemIdx = ref(0);

const currentItem = computed(() => {
	return props.items[currentItemIdx.value];
});

function next() {
	// If the current item is the last item, go back to the first item
	currentItemIdx.value = currentItemIdx.value === props.items.length - 1 ? 0 : currentItemIdx.value + 1;
}

function prev() {
	// If the current item is the first item, go to the last item
	currentItemIdx.value = currentItemIdx.value === 0 ? props.items.length - 1 : currentItemIdx.value - 1;
}

function toggle() {
	isOpen.value = !isOpen.value;
}

const isHelpOpen = ref(false);

function toggleHelp() {
	isHelpOpen.value = !isHelpOpen.value;
}

// Add keyboard navigation
function onKeydown(e: KeyboardEvent) {
	if (!isOpen.value) return;

	if (e.key === 'Escape') {
		toggle();
	}

	if (e.key === 'ArrowRight') {
		next();
	}

	if (e.key === 'ArrowLeft') {
		prev();
	}
}

onMounted(() => {
	window.addEventListener('keydown', onKeydown);
});

onUnmounted(() => {
	window.removeEventListener('keydown', onKeydown);
});
</script>
<template>
	<!-- Gallery -->
	<div class="gap-4 mt-4 md:columns-3">
		<button
			v-for="(item, itemIdx) in items"
			:key="item.id"
			:class="[
				'block relative w-full mb-6 overflow-hidden border dark:border-gray-700 rounded-card focus:outline-none',
			]"
			@click="
				() => {
					currentItemIdx = itemIdx;
					toggle();
				}
			"
		>
			<div class="relative block w-full overflow-hidden rounded-card group">
				<NuxtImg
					:src="item.id"
					:alt="item.description ?? ''"
					class="object-cover w-full transition duration-300 group-hover:scale-110"
				/>
				<div
					class="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-white bg-opacity-75 opacity-0 hover:opacity-100 dark:bg-gray-900 dark:bg-opacity-75"
				>
					<UIcon name="material-symbols:zoom-in-rounded" class="w-12 h-12 text-primary" />
				</div>
			</div>
		</button>
	</div>
	<!-- Gallery Modal -->
	<TransitionRoot
		:show="isOpen"
		enter="ease-out duration-300"
		enter-from="opacity-0"
		enter-to="opacity-100"
		leave="ease-in duration-200"
		leave-from="opacity-100"
		leave-to="opacity-0"
	>
		<div class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gray-900 bg-opacity-75">
			<div class="relative flex flex-col items-center justify-center w-full h-full max-w-7xl">
				<!-- Help Button -->
				<div
					v-auto-animate
					class="absolute z-50 hidden gap-2 text-white bg-opacity-75 item-center md:flex top-4 left-4"
				>
					<div>
						<UButton
							:icon="isHelpOpen ? 'material-symbols:hide' : 'material-symbols:help-outline-rounded'"
							size="xl"
							@click="toggleHelp"
						/>
					</div>

					<div
						v-if="isHelpOpen"
						class="flex items-center px-3 py-1 text-xs bg-gray-900 backdrop-blur-sm rounded-button gap-x-4"
					>
						<p>
							Press
							<UKbd value="esc" />
							to close
						</p>
						<p>
							Press
							<UKbd value="←" />
							or
							<UKbd value="→" />
							to navigate
						</p>
					</div>
				</div>
				<!-- Close Button -->
				<UButton class="absolute z-50 top-4 right-4" icon="material-symbols:close-rounded" size="xl" @click="toggle" />
				<div class="flex items-center justify-center w-full h-full">
					<!-- Nav Buttons -->
					<UButton class="absolute z-50 left-4" icon="material-symbols:arrow-back-rounded" size="xl" @click="prev" />
					<UButton
						class="absolute z-50 right-4"
						icon="material-symbols:arrow-forward-rounded"
						size="xl"
						@click="next"
					/>
					<!-- Image -->
					<div class="relative flex flex-col items-center justify-center w-full h-full p-20 mx-auto">
						<p
							v-if="currentItem.description"
							class="inline-block px-6 py-2 text-sm text-white bg-gray-900 rounded-t-xl"
						>
							{{ currentItem.description }}
						</p>

						<template v-for="(item, itemIdx) in items" :key="item.id">
							<NuxtImg
								v-show="currentItemIdx === itemIdx"
								:src="item.id"
								:alt="item.description ?? ''"
								class="object-contain w-full rounded-card"
							/>
						</template>
					</div>
				</div>
			</div>
		</div>
	</TransitionRoot>
</template>
