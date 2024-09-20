<template>
    <div>
		<form-item
			active
			:collection="relationInfo?.relatedCollection?.collection"
			:primary-key="currentPrimaryKey"
			:fields="fields"
			:edits="edits"
			:disabled="disabled"
			:isSEOAdvanced="isSEOAdvanced"
			:map_title="map_title"
			:map_content="map_content"
			:map_url="map_url"
			:map_thumnail="map_thumnail"
			:root-values="rootValues"
			@input="onInput"
		/>
    </div>
</template>

<script setup lang="ts">
import { useRelationM2O } from './composables/use-relation-m2o'
import { useRelationSingle } from './composables/use-relation-single'
import { useApi, useStores } from '@directus/extensions-sdk';
import { Filter } from '@directus/types';
import { deepMap, getFieldsFromTemplate } from '@directus/utils';
import { get } from 'lodash';
import { computed, getCurrentInstance, inject, onMounted, Ref, ref, toRefs, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import FormItem from './components/relation-form-item.vue'

const props = withDefaults(
	defineProps<{
		value?: number | string | Record<string, any> | null;
		collection: string;
		field: string;
		template?: string | null;
		disabled?: boolean;
		filter?: Filter | null;
		loading?: boolean;
		primaryKey: Number | String;
		isSEOAdvanced?: boolean;
		map_title?: string
		map_content?: string
		map_url?: string
		map_thumnail?: string
	}>(),
	{
		value: null,
		disabled: false,
		template: null,
		filter: null,
		isSEOAdvanced: false,
		map_title: 'title',
		map_content: 'content',
		map_thumnail: 'thumbnail',
	},
);

const emit = defineEmits(['input']);

const stores = useStores()
const { useCollectionsStore } = stores

const values = inject('values', ref<Record<string, any>>({}));

const collectionsStore = useCollectionsStore();


const { t } = useI18n();
const { collection, field, isSEOAdvanced } = toRefs(props);
const { relationInfo } = useRelationM2O(collection, field);

const value = computed({
	get: () => props.value ?? null,
	set: (value) => {
		emit('input', value);
	},
});

const editModalActive = ref(true);

const displayTemplate = computed(() => {
	if (props.template) return props.template;

	if (!relationInfo.value) return '';

	const displayTemplate = collectionsStore.getCollection(relationInfo.value.relatedCollection.collection)?.meta
		?.display_template;

	return displayTemplate || `{{ ${relationInfo.value.relatedPrimaryKeyField.field || ''} }}`;
});

const query = ref<Ref>({
	fields: ['*'],
});

const { update, remove, displayItem, loading } = useRelationSingle(value, query, relationInfo, {
	enabled: computed(() => !props.loading),
});

const currentPrimaryKey = computed<string | number>(() => {
	if (!displayItem.value || !props.value || !relationInfo.value) return '+';

	if (typeof props.value === 'number' || typeof props.value === 'string') {
		return props.value;
	}

	return get(props.value, relationInfo.value.relatedPrimaryKeyField.field, '+');
});

const edits = computed(() => {
	if (!props.value || typeof props.value !== 'object') return {};

	return props.value;
});

function onInput(event: any) {
	if (props.disabled) return;
	update(event);
}

const selection = computed<(number | string)[]>(() => {
	const pkField = relationInfo.value?.relatedPrimaryKeyField.field;

	if (!props.value || !pkField) return [];

	if (typeof props.value === 'object' && pkField in props.value) {
		return [props.value[pkField]];
	}

	return [props.value];
});

function onSelection(selection: (number | string)[] | null) {
	if (selection) {
		if (selection[0]) {
			update(selection[0]);
		} else {
			remove();
		}
	}
}

const fields = [
{
		field: "meta_title",
		name: "Meta title",
		type: "string",
		meta: {
			width: "full",
			interface: 'input',
		}
	},
]

const rootValues = ref()
const parent = ref()

onMounted(() => {
	if( values.value?.post_id ) return;
	const instance = getCurrentInstance()

	// console.log('values', instance?.parent?.parent?.parent?.parent?.parent?.provides?.values)

	// let parentComponent = instance?.parent?.parent?.parent?.parent?.parent?.provides?.values
	// console.log('start', parentComponent?.type?.__name)
	// while (parentComponent && parentComponent?.type?.__name !=='translations') {
	// 	// console.log('com', parentComponent?.type?.__name)
	// 	parentComponent = parentComponent?.parent;
	// }

	// rootValues.value = parentComponent?.provides?.values?.value
	// parent.value = parentComponent

	// watch(
	// 	() => getCurrentInstance()?.parent?.parent?.parent?.parent?.parent?.provides?.values,
	// 	(value) => {
	// 		console.log('instance change', value)
	// 	},
	// 	{
	// 		immediate: true
	// 	}
	// )

	// console.log('parent values', rootValues)
	// console.log('instance', instance?.parent?.type?.__name, instance?.parent)
})
</script>

<style scoped>

</style>