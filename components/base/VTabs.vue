<template>
	<HTabGroup
		:vertical="orientation === 'vertical'"
		:selected-index="selectedIndex"
		as="div"
		v-bind="attrs"
		@change="onChange"
	>
		<HTabList
			ref="listRef"
			:class="[
				ui.list.base,
				ui.list.background,
				ui.list.rounded,
				ui.list.shadow,
				ui.list.padding,
				ui.list.width,
				orientation === 'horizontal' && ui.list.height,
				orientation === 'horizontal' && 'inline-grid items-center',
			]"
			:style="[orientation === 'horizontal' && `grid-template-columns: repeat(${items.length}, minmax(0, 1fr))`]"
		>
			<div ref="markerRef" :class="ui.list.marker.wrapper">
				<div :class="[ui.list.marker.base, ui.list.marker.background, ui.list.marker.rounded, ui.list.marker.shadow]" />
			</div>

			<HTab
				v-for="(item, index) of items"
				:key="index"
				ref="itemRefs"
				v-slot="{ selected, disabled }"
				:disabled="item.disabled"
				as="template"
			>
				<button
					:class="[
						ui.list.tab.base,
						ui.list.tab.background,
						ui.list.tab.height,
						ui.list.tab.padding,
						ui.list.tab.size,
						ui.list.tab.font,
						ui.list.tab.rounded,
						ui.list.tab.shadow,
						selected ? ui.list.tab.active : ui.list.tab.inactive,
					]"
				>
					<slot :item="item" :index="index" :selected="selected" :disabled="disabled">
						{{ item.label }}
					</slot>
				</button>
			</HTab>
		</HTabList>

		<HTabPanels :class="ui.container">
			<HTabPanel v-for="(item, index) of items" :key="index" v-slot="{ selected }" :class="ui.base">
				<slot :name="item.slot || 'item'" :item="item" :index="index" :selected="selected">
					{{ item.content }}
				</slot>
			</HTabPanel>
		</HTabPanels>
	</HTabGroup>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import {
	TabGroup as HTabGroup,
	TabList as HTabList,
	Tab as HTab,
	TabPanels as HTabPanels,
	TabPanel as HTabPanel,
} from '@headlessui/vue';
import { useResizeObserver } from '@vueuse/core';
import { omit } from '~/utils/lodash';

const ui = {
	wrapper: 'relative space-y-2',
	container: 'relative w-full',
	base: 'focus:outline-none',
	list: {
		base: 'relative',
		background: 'bg-gray-100 dark:bg-gray-800 ',
		rounded: '',
		shadow: '',
		padding: 'p-2',
		height: 'h-12',
		width: 'w-full',
		marker: {
			wrapper: 'absolute top-[4px] left-[4px] duration-200 ease-out focus:outline-none',
			base: 'w-full h-full',
			background: 'bg-white dark:bg-gray-900',
			rounded: '',
			shadow: '',
		},
		tab: {
			base: 'relative inline-flex items-center justify-center flex-shrink-0 w-full whitespace-nowrap focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors duration-200 ease-out font-mono',
			background: '',
			active: 'text-gray-900 dark:text-white',
			inactive: 'text-gray-500 dark:text-gray-400',
			height: 'h-8',
			padding: 'px-3',
			size: 'text-sm',
			font: 'font-medium',
			rounded: 'rounded-md',
			shadow: '',
		},
	},
};

export default defineComponent({
	components: {
		HTabGroup,
		HTabList,
		HTab,
		HTabPanels,
		HTabPanel,
	},
	inheritAttrs: false,
	props: {
		modelValue: {
			type: Number,
			default: undefined,
		},
		orientation: {
			type: String as PropType<'horizontal' | 'vertical'>,
			default: 'horizontal',
			validator: (value: string) => ['horizontal', 'vertical'].includes(value),
		},
		defaultIndex: {
			type: Number,
			default: 0,
		},
		items: {
			type: Array,
			default: () => [],
		},
	},
	emits: ['update:modelValue', 'change'],
	setup(props, { attrs, emit }) {
		const listRef = ref<HTMLElement>();
		const itemRefs = ref<HTMLElement[]>([]);
		const markerRef = ref<HTMLElement>();

		const selectedIndex = ref(props.modelValue || props.defaultIndex);

		// Methods

		function calcMarkerSize(index: number) {
			// @ts-ignore
			const tab = itemRefs.value[index]?.$el;
			if (!tab) {
				return;
			}

			markerRef.value.style.top = `${tab.offsetTop}px`;
			markerRef.value.style.left = `${tab.offsetLeft}px`;
			markerRef.value.style.width = `${tab.offsetWidth}px`;
			markerRef.value.style.height = `${tab.offsetHeight}px`;
		}

		function onChange(index) {
			selectedIndex.value = index;

			emit('change', index);

			if (props.modelValue !== undefined) {
				emit('update:modelValue', index);
			}

			calcMarkerSize(index);
		}

		useResizeObserver(listRef, () => {
			calcMarkerSize(selectedIndex.value);
		});

		watch(
			() => props.modelValue,
			(value) => {
				selectedIndex.value = value;
				calcMarkerSize(value);
			},
		);

		onMounted(() => calcMarkerSize(selectedIndex.value));

		return {
			attrs: computed(() => omit(attrs, ['class'])),
			// eslint-disable-next-line vue/no-dupe-keys
			listRef,
			itemRefs,
			markerRef,
			selectedIndex,
			onChange,
			ui,
		};
	},
});
</script>
