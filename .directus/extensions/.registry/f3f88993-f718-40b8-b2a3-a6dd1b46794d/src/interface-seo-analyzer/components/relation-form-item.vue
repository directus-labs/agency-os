<template>
    <div>
		<v-tabs v-model="currentTab" class="analyzer">
			<v-tab :value="1" v-if="!isSEOAdvanced" class="px-0"><v-button :secondary="! currentTab?.includes(1)">{{ `Readability` }}</v-button></v-tab>
			<v-tab :value="2" class="px-0"><v-button :secondary="! currentTab?.includes(2)">{{ `General` }}</v-button></v-tab>
			<v-tab :value="3" class="px-0"><v-button :secondary="! currentTab?.includes(3)">{{ `Social` }}</v-button></v-tab>
		</v-tabs>
		<v-tabs-items v-model="currentTab" class="mt-5">
			<v-tab-item v-if="!isSEOAdvanced" :value="1">
				<content-analyzer v-model="keywords" @update:model-value="onChangeKeywords" :result-manager="seoStore.resultManager"/>
			</v-tab-item>
			<v-tab-item :value="2">
				<v-form v-model="internalEdits" :initial-values="initialValues" :primary-key="primaryKey" :fields="generalFields" @update:model-value="save"></v-form>
			</v-tab-item>
			<v-tab-item :value="3">
				<v-tabs v-model="socialTabs">
					<v-tab @click="internalEdits.social_sharing_tab = 'facebook'"><v-icon name="facebook" class="mr-2"></v-icon> Facebook</v-tab>
					<v-tab @click="internalEdits.social_sharing_tab = 'twitter'"><v-icon name="twitter" class="mr-2"></v-icon> Twitter</v-tab>
				</v-tabs>
				<v-form v-model="internalEdits" :initial-values="initialValues" :primary-key="primaryKey" :fields="socialFields" @update:model-value="save"></v-form>
			</v-tab-item>
		</v-tabs-items>
    </div>
</template>

<script setup lang="ts">
import { useApi, useStores } from '@directus/extensions-sdk';
import { useCollection } from '@directus/composables';
import { Field, PrimaryKey, Relation } from '@directus/types';
import { getEndpoint } from '@directus/utils';
import { isSystemCollection } from '@directus/system-data';
import { isEmpty, merge, set } from 'lodash';
import { Ref, computed, getCurrentInstance, inject, ref, toRefs, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { unexpectedError } from '../../shared/utils/unexpected-error';
import { getDefaultValuesFromFields } from '../../shared/utils/get-default-values-from-fields';
import { useRoute } from 'vue-router';
import { destr } from "destr";
import ContentAnalyzer from './content-analyzer.vue'
import { useSEOStore } from '../stores/useSEOStore';
import useImage from '../composables/use-image';
import { get } from 'lodash';

interface Props {
	collection: string;
	active?: boolean;
	primaryKey?: PrimaryKey | null;
	edits?: Record<string, any>;
	junctionField?: string | null;
	fields?: Field[] | null;
	disabled?: boolean;
	// There's an interesting case where the main form can be a newly created item ('+'), while
	// it has a pre-selected related item it needs to alter. In that case, we have to fetch the
	// related data anyway.
	relatedPrimaryKey?: PrimaryKey;
	// If this drawer-item is opened from a relational interface, we need to force-block the field
	// that relates back to the parent item.
	circularField?: string | null;
	junctionFieldLocation?: string;
	isSEOAdvanced?: boolean;
	map_title?: string
	map_content?: string
	map_url?: string
	map_thumnail?: string
	rootValues: Ref | null
}

interface seoSetting {
	id?: number | null
	meta_title?: string
	meta_robots?: string
	meta_keywords?: string[] | string
	meta_description?: string
	facebook_image?: string
	twitter_image?: string
	facebook_title?: string
	facebook_description?: string
	twitter_title?: string
	twitter_description?: string
}

const props = withDefaults(defineProps<Props>(), {
	primaryKey: null,
	fields: null,
	junctionField: null,
	relatedPrimaryKey: '+',
	circularField: null,
	junctionFieldLocation: 'bottom',
	isSEOAdvanced: false,
	map_title: 'title',
	map_content: 'content',
	map_thumnail: 'thumbnail',
	map_url: '',
	rootValues: null
});

const emit = defineEmits<{
	'update:active': [value: boolean];
	input: [value: Record<string, any>];
}>();

const i18n = useI18n();
const { t, te } = i18n

const validationErrors = ref<any[]>([]);

const stores = useStores()
const { useFieldsStore, useRelationsStore, useNotificationsStore, useCollectionsStore } = stores

const fieldsStore = useFieldsStore();
const relationsStore = useRelationsStore();
const notify = useNotificationsStore()
const collectionsStore = useCollectionsStore();

const api = useApi()


const isCollectionExist = (collection: string) => collectionsStore.getCollection(collection)

const { internalActive } = useActiveState();

const { internalEdits, loading, initialValues, refresh } = useItem();

const { save, cancel } = useActions();

const { collection, primaryKey, isSEOAdvanced, rootValues } = toRefs(props);

const { info: collectionInfo, primaryKeyField } = useCollection(collection);

const isNew = computed(() => props.primaryKey === '+' );

const hasEdits = computed(() => !isEmpty(internalEdits.value));

const route = useRoute();

const values = inject('values', ref<Record<string, any>>({}));

// const values = computed(() => rootValues.value !== null ? rootValues.value : withoutTranslationsValues.value)

const currentTab = ref([!isSEOAdvanced.value ? 1 : 2])
const socialTabs = ref()

const metaTemplateCollection = isSEOAdvanced.value ?
	(route.params?.primaryKey || route.params?.collection) :
	(values.value?.seo_advanced_setting_collection ||
	values.value?.collection ||
	collection.value)

const interfaceTemplate = isCollectionExist(metaTemplateCollection) ? 'meta-template' : 'input'


const facebookTitle = computed(() => internalEdits.value?.facebook_title || values.value?.[props.map_title] || initialValues.value?.meta_title)
const twitterTitle = computed(() => internalEdits.value?.twitter_title || values.value?.[props.map_title] || initialValues.value?.meta_title)

const facebookDescription = computed(() => internalEdits.value?.facebook_description || stripDescription(values.value?.[props.map_content]) || initialValues.value?.meta_description)
const twitterDescription = computed(() => internalEdits.value?.twitter_description || stripDescription(values.value?.[props.map_content]) || initialValues.value?.meta_description)


const generalFields = computed(() => [
	{
		field: "meta_robots",
		name: "Robots Meta",
		type: "json",
		meta: {
			width: "full",
			interface: "select-multiple-checkbox",
			options: {
				"choices": [
					{
						"text": "Index",
						"value": "index"
					},
					{
						"text": "No Index",
						"value": "noindex"
					},
					{
						"text": "No follow",
						"value": "nofollow"
					},
					{
						"text": "No Archive",
						"value": "noarchive"
					},
					{
						"text": "No Image Index",
						"value": "noimageindex"
					},
					{
						"text": "No Snippet",
						"value": "nosnippet"
					}
				],
				"itemsShown": 6
			}
		},
		schema: {
			default_value: ['index']
		}
	},
	{
		field: "meta_title",
		name: "Meta title",
		type: "string",
		meta: {
			width: "full",
			interface: interfaceTemplate,
			options: {
				placeholder: internalEdits.value?.meta_title || initialValues.value?.meta_title || values.value?.[props.map_title] || '',
				collectionName: metaTemplateCollection,
				inject: {
					fields: [
						{
							field: "sep",
							name: "Seperator",
							collection: metaTemplateCollection,
							type: "string",
						},
					],
				},
			},
		}
	},
	{
		field: "meta_description",
		name: "Meta description",
		type: "string",
		meta: {
			width: "full",
			interface: interfaceTemplate,
			options: {
				placeholder: internalEdits.value?.meta_description || initialValues.value?.meta_description || stripDescription(values.value?.[props.map_content]) || '',
				collectionName: metaTemplateCollection,
				inject: {
					fields: [
						{
							field: "sep",
							name: "Seperator",
							collection: metaTemplateCollection,
							type: "string",
						},
					],
				},
			},
		}
	},
])
const socialFields = computed(() => [
	{
        field: "social_sharing_tab",
        type: "string",
        schema: {
            default_value: "facebook",
        },
        meta: {
            field: "social_sharing_tab",
            special: null,
            interface: "radio-button",
            options: {
                choices: [
                    {
                        text: "Facebook",
                        value: "facebook",
                    },
                    {
                        text: "Twitter",
                        value: "twitter",
                    },
                ],
            },
            sort: 1,
			hidden: true,
            width: "full",
        },
        name: "",
    },
	{
        field: "facebook_image",
        type: "uuid",
        meta: {
            special: null,
            interface: "social-preview",
            options: {
				title: facebookTitle.value,
				description: facebookDescription.value
			},
            sort: 1,
            width: "full",
            note: null,
            conditions: [
                {
                    name: "social_facebook",
                    rule: {
                        _and: [
                            {
                                social_sharing_tab: {
                                    _neq: "facebook",
                                },
                            },
                        ],
                    },
                    hidden: true,
                    options: {
                        font: "sans-serif",
                        trim: false,
                        masked: false,
                        clear: false,
                        slug: false,
                    },
                },
            ],
            required: false,
        },
        name: "",
    },
	{
		field: "facebook_title",
		name: "Facebook title",
		type: "string",
		meta: {
			width: "full",
			interface: interfaceTemplate,
			options: {
				placeholder: facebookTitle.value,
				collectionName: metaTemplateCollection,
				inject: {
					fields: [
						{
							field: "sep",
							name: "Seperator",
							collection: metaTemplateCollection,
							type: "string",
						},
					],
				},
			},
			conditions: [
                {
                    name: "social_facebook",
                    rule: {
                        _and: [
                            {
                                social_sharing_tab: {
                                    _neq: "facebook",
                                },
                            },
                        ],
                    },
                    hidden: true,
                    options: {
                        font: "sans-serif",
                        trim: false,
                        masked: false,
                        clear: false,
                        slug: false,
                    },
                },
            ],
		}
	},
	{
		field: "facebook_description",
		name: "Facebook description",
		type: "string",
		meta: {
			width: "full",
			interface: interfaceTemplate,
			options: {
				placeholder: facebookDescription.value,
				collectionName: metaTemplateCollection,
				inject: {
					fields: [
						{
							field: "sep",
							name: "Seperator",
							collection: metaTemplateCollection,
							type: "string",
						},
					],
				},
			},
			conditions: [
                {
                    name: "social_facebook",
                    rule: {
                        _and: [
                            {
                                social_sharing_tab: {
                                    _neq: "facebook",
                                },
                            },
                        ],
                    },
                    hidden: true,
                    options: {
                        font: "sans-serif",
                        trim: false,
                        masked: false,
                        clear: false,
                        slug: false,
                    },
                },
            ],
		}
	},
	{
        field: "twitter_image",
        type: "uuid",
        meta: {
            special: null,
            interface: "social-preview",
            options: {
                provider: 'twitter',
				title: twitterTitle.value,
				description: twitterDescription.value
            },
            sort: 8,
            width: "full",
            note: null,
            conditions: [
                {
                    name: "social_twitter",
                    rule: {
                        _and: [
                            {
                                social_sharing_tab: {
                                    _neq: "twitter",
                                },
                            },
                        ],
                    },
                    hidden: true,
                    options: {
                        font: "sans-serif",
                        trim: false,
                        masked: false,
                        clear: false,
                        slug: false,
                    },
                },
            ],
            required: false,
        },
        name: "",
    },
	{
		field: "twitter_title",
		name: "Twitter title",
		type: "string",
		meta: {
			width: "full",
			interface: interfaceTemplate,
			options: {
				placeholder: twitterTitle.value,
				collectionName: metaTemplateCollection,
				inject: {
					fields: [
						{
							field: "sep",
							name: "Seperator",
							collection: metaTemplateCollection,
							type: "string",
						},
					],
				},
			},
			conditions: [
                {
                    name: "social_twitter",
                    rule: {
                        _and: [
                            {
                                social_sharing_tab: {
                                    _neq: "twitter",
                                },
                            },
                        ],
                    },
                    hidden: true,
                    options: {
                        font: "sans-serif",
                        trim: false,
                        masked: false,
                        clear: false,
                        slug: false,
                    },
                },
            ],
		}
	},
	{
		field: "twitter_description",
		name: "Twitter description",
		type: "string",
		meta: {
			width: "full",
			interface: interfaceTemplate,
			options: {
				placeholder: twitterDescription.value,
				collectionName: metaTemplateCollection,
				inject: {
					fields: [
						{
							field: "sep",
							name: "Seperator",
							collection: metaTemplateCollection,
							type: "string",
						},
					],
				},
			},
			conditions: [
                {
                    name: "social_twitter",
                    rule: {
                        _and: [
                            {
                                social_sharing_tab: {
                                    _neq: "twitter",
                                },
                            },
                        ],
                    },
                    hidden: true,
                    options: {
                        font: "sans-serif",
                        trim: false,
                        masked: false,
                        clear: false,
                        slug: false,
                    },
                },
            ],
		}
	},
])

const keywords = ref([''])
const seoStore = useSEOStore()
const { idToUrl } = useImage()

function onChangeKeywords() {
	const newKeywords = keywords.value
	
	seoStore.setOptions({
		title: get(values.value, props.map_title) || '',
		keywords: newKeywords || [''],
		thumbnail: values.value?.[props.map_thumnail] ? idToUrl(values.value?.[props.map_thumnail]) : '',
		url: get(values.value, props.map_url) || '',
	})
	seoStore.setContent(values.value?.[props.map_content])
	save()
}

function getDisplayValue(data) {
	
	const {
		id,
		meta_title,
		meta_description,
		facebook_image,
		twitter_image,
	} = data

	let meta_keywords = data?.meta_keywords?.split(',') || ['']
	const meta_social = destr(data.meta_social || '{}')
	let meta_robots =  destr(data?.meta_robots || '["index"]')

	return {
		id,
		meta_title,
		meta_description,
		facebook_image,
		twitter_image,
		meta_robots,
		meta_keywords,
		...meta_social,
	}
}

function useActiveState() {
	const localActive = ref(false);

	const internalActive = computed({
		get() {
			return props.active ?? localActive.value;
		},
		set(newActive: boolean) {
			localActive.value = newActive;
			emit('update:active', newActive);
		},
	});

	return { internalActive };
}

function useItem() {
	const internalEdits = ref<Record<string, any>>({});
	const loading = ref(false);
	const initialValues = ref<Record<string, any> | null>(null);

	if (props.primaryKey !== '+') fetchItem();

	watch(
		() => props.edits,
		() => {
			internalEdits.value = props.edits ?? {}
		},
		{ immediate: true },
	);

	watch(
		() => props.primaryKey,
		(isActive) => {
			if (props.primaryKey !== '+') {
				fetchItem();
			} else {
				initialValues.value = {}
			}
		},
		{ immediate: true },
	);

	return { internalEdits, loading, initialValues, refresh };

	async function refresh() {
		loading.value = false;
		if (props.primaryKey !== '+') fetchItem();
	}

	async function fetchItem() {
		if (!props.primaryKey) return;

		loading.value = true;

		const baseEndpoint = getEndpoint(props.collection);

		const endpoint = isSystemCollection(props.collection)
			? `${baseEndpoint}/${props.primaryKey}`
			: `${baseEndpoint}/${encodeURIComponent(props.primaryKey)}`;

		let fields = '*';

		if (props.junctionField) {
			fields = `*,${props.junctionField}.*`;
		}

		try {
			const response = await api.get(endpoint, { params: { fields } });
			console.log('response', response)
			initialValues.value = getDisplayValue(response.data.data);
		} catch (error) {
			unexpectedError(error, notify,i18n);
		} finally {
			loading.value = false;
		}
	}
}

function useActions() {
	return { save, cancel };

	function save() {

		if( internalEdits.value?.meta_robots ){
			internalEdits.value.meta_robots = toggleIndexNoindex(internalEdits.value?.meta_robots)
		} else {
			internalEdits.value.meta_robots = ['index']
		}

		const editsToValidate = internalEdits.value;
		const fieldsToValidate = [...generalFields.value,...socialFields.value];
		const defaultValues = getDefaultValuesFromFields(fieldsToValidate);
		const existingValues = initialValues?.value;

		// const errors = validateItem(
		// 	merge({}, defaultValues.value, existingValues, editsToValidate),
		// 	fieldsToValidate,
		// 	isNew.value,
		// );

		// if (errors.length > 0) {
		// 	validationErrors.value = errors;
		// 	return;
		// } else {
		// 	validationErrors.value = [];
		// }

		let saveValues = merge({}, defaultValues.value, existingValues, editsToValidate, {
			meta_keywords: keywords.value?.join(',')
		})
		delete saveValues.social_sharing_tab

		if (props.primaryKey && props.primaryKey !== '+' && primaryKeyField.value) {
			// internalEdits.value[primaryKeyField.value.field] = props.primaryKey;
			saveValues[primaryKeyField.value.field] = props.primaryKey;
		}

		// emit('input', internalEdits.value);
		emit('input', saveValues);

		// internalActive.value = false;
		// internalEdits.value = {};
	}

	function cancel() {
		validationErrors.value = [];
		internalActive.value = false;
		internalEdits.value = {};
	}
}

save()

function stripDescription(str: string = '') {
	return str?.replace(/(<([^>]+)>)/gi, "").replaceAll("\n", " ")?.substring(0, 255)
}

function toggleIndexNoindex(arr) {
	const indexPos = arr.lastIndexOf('index');
	const noindexPos = arr.lastIndexOf('noindex');

	if (indexPos !== -1 && noindexPos !== -1) {
		return indexPos > noindexPos
		? arr.filter(item => item !== 'noindex')
		: arr.filter(item => item !== 'index');
	}

	return arr;
}
</script>
<style lang="scss" scoped>
@import '../../styles/form.scss';
.v-tabs.horizontal.analyzer {
	background-color: #F1F5F9;
	padding: 4px;
	gap: 4px;
	border-radius: 24px;
    :deep() {
		.v-tab {
			height: auto;
			padding: 0;
			--v-tab-background-color: transparent;
			--v-tab-background-color-active: transparent;
		}
		.button {
			// --v-button-background-color: transparent;
			--border-width: 0;
			--border-radius: 24px;
			--v-button-height: 40px;
			--v-button-min-width: 0;
			padding: 0 16px;
			gap: 0;
		}
	}
	
}
</style>