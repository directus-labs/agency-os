<template>
	<div>
		<v-tabs v-model="currentTab" class="analyzer">
			<v-tab :value="0" v-if="!isSEOAdvanced" class="px-0"><v-button :secondary="! currentTab.includes(0)">{{ `Readability` }}</v-button></v-tab>
			<v-tab :value="1" class="px-0"><v-button :secondary="! currentTab.includes(1)">{{ `General` }}</v-button></v-tab>
			<v-tab :value="2" class="px-0"><v-button :secondary="! currentTab.includes(2)">{{ `Social` }}</v-button></v-tab>
		</v-tabs>
		<v-tabs-items v-model="currentTab" class="mt-5">
			<v-tab-item v-if="!isSEOAdvanced" :value="0">
				<content-analyzer v-model="keywords" @update:model-value="onChangeKeywords" :result-manager="seoStore.resultManager"/>
			</v-tab-item>
			<v-tab-item :value="1">
				<v-form v-model="settings" :initial-values="item" :primary-key="value" :fields="generalFields"></v-form>
			</v-tab-item>
			<v-tab-item :value="2">
				<v-tabs v-model="socialTabs">
					<v-tab @click="settings.social_sharing_tab = 'facebook'"><v-icon name="facebook" class="mr-2"></v-icon> Facebook</v-tab>
					<v-tab @click="settings.social_sharing_tab = 'twitter'"><v-icon name="twitter" class="mr-2"></v-icon> Twitter</v-tab>
				</v-tabs>
				<v-form v-model="settings" :initial-values="item" :primary-key="value" :fields="socialFields"></v-form>
				<v-tabs-items v-model="socialTabs">
					<v-tab-item>
						<!-- {{ item.meta_title }}
						<interface-social-preview
							:title="facebookTitle"
							:description="settings?.facebook_description || item.facebook_description"
							:value="settings?.facebook_image || values?.[map_thumnail] || item.facebook_image"
							@input="onSelectImage($event, 'facebook')"
						/> -->
					</v-tab-item>
					<v-tab-item>
						<!-- <interface-social-preview
							:title="twitterTitle"
							:description="settings?.twitter_description"
							:value="settings?.twitter_image || values?.[map_thumnail]"
							type="twitter"
							@input="onSelectImage($event, 'twitter')"
						/>
						<v-form v-model="settings" :initial-values="item" :primary-key="value" :fields="twitterFields"></v-form> -->
					</v-tab-item>
				</v-tabs-items>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script setup lang="ts">
import { computed, inject, ref, toRefs,getCurrentInstance, h, watch, onMounted } from 'vue';
import { useApi, useStores } from '@directus/extensions-sdk';
// import { useI18n } from 'vue-i18n';
import { useSEOStore } from './stores/useSEOStore'
import debounce from 'lodash/debounce';
import isNumber from 'lodash/isNumber';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import SidebarSEO from './components/sidebar-seo.vue'
import ContentAnalyzer from './components/content-analyzer.vue'
import SocialPreview from './components/social-preview.vue'
import useImage from './composables/use-image';
import SEOAdvancedField from './fields/seo-advanced'
import { COLLECTION } from '../shared/constants';
import { indexOf, join, merge } from 'lodash';


const props = withDefaults(
	defineProps<{
		value?: number | string | Record<string, any> | null;
		collection: string;
		field: string;
		disabled?: boolean;
		isSEOAdvanced?: boolean;
		primaryKey: [Number, String];
		map_title?: string
		map_content?: string
		map_url?: string
		map_thumnail?: string
	}>(),
	{
		value: () => null,
		disabled: false,
		isSEOAdvanced: false,
		map_title: 'title',
		map_content: 'content',
		map_thumnail: 'thumbnail',
	}
);

const emit = defineEmits(['input']);
const values = inject('values', ref<Record<string, any>>({}));
const { useCollectionsStore } = useStores();
const collectionsStore = useCollectionsStore();
const isCollectionExist = (collection: string) => collectionsStore.getCollection(collection)

const { collection, field, isSEOAdvanced, primaryKey } = toRefs(props);
const api = useApi()
const route = useRoute()

const currentTab = ref()

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

const settings = ref<seoSetting>({})
const item = ref<seoSetting>({})

// const SEOAdvancedFields = SEOAdvancedField(collection.value)
const metaTemplateCollection = isSEOAdvanced.value ?
	(route.params?.primaryKey || route.params?.collection) :
	(values?.seo_advanced_setting_collection ||
	values?.collection ||
	collection.value)

const interfaceTemplate = isCollectionExist(metaTemplateCollection) ? 'meta-template' : 'input'

const facebookTitle = computed(() => settings.value?.facebook_title || values.value?.[props.map_title] || item.value.meta_title)
const twitterTitle = computed(() => settings.value?.twitter_title || values.value?.[props.map_title] || item.value.meta_title)

const facebookDescription = computed(() => settings.value?.facebook_description || stripDescription(values.value?.[props.map_content]) || item.value.meta_description)
const twitterDescription = computed(() => settings.value?.twitter_description || stripDescription(values.value?.[props.map_content]) || item.value.meta_description)


const socialTabs = ref()
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
				placeholder: settings.value?.meta_title || item.value?.meta_title || values.value?.[props.map_title] || '',
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
				placeholder: settings.value?.meta_description || item.value?.meta_description || stripDescription(values.value?.[props.map_content]) || '',
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
	// {
	// 	collection: COLLECTION.seo_detail,
	// 	field: "facebook_image",
	// 	name: "Add image",
	// 	type: "uuid",
	// 	meta: {
	// 		collection: COLLECTION.seo_detail,
	// 		interface: "file-image",
	// 		special: [
	// 			"file"
	// 		],
	// 		note: "Field notes ... ?"
	// 	},
	// },
	{
        field: "social_sharing_tab",
        type: "string",
        schema: {
            name: "social_sharing_tab",
            data_type: "varchar",
            default_value: "facebook",
            max_length: 255,
            numeric_precision: null,
            numeric_scale: null,
            is_generated: false,
            generation_expression: null,
            is_nullable: true,
            is_unique: false,
            is_primary_key: false,
            has_auto_increment: false,
            foreign_key_column: null,
            foreign_key_table: null,
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
            options: null,
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
                provider: 'twitter'
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
const twitterFields = ref([
	// {
	// 	collection: COLLECTION.seo_detail,
	// 	field: "twitter_image",
	// 	name: "Add image",
	// 	type: "uuid",
	// 	meta: {
	// 		collection: COLLECTION.seo_detail,
	// 		interface: "file-image",
	// 		special: [
	// 			"file"
	// 		],
	// 		note: "Field notes ... ?"
	// 	},
	// },
	{
		field: "twitter_title",
		name: "Twitter title",
		type: "string",
		meta: {
			width: "full",
			interface: interfaceTemplate,
			options: {
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
		field: "twitter_description",
		name: "Twitter description",
		type: "string",
		meta: {
			width: "full",
			interface: interfaceTemplate,
			options: {
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

const onSelectImage = ($event, provider) => {
	if( provider === 'facebook' ) {
		settings.value.facebook_image = $event
	}
	if( provider === 'twitter' ) {
		settings.value.twitter_image = $event
	}
}


const keywords = ref([''])
const seoStore = useSEOStore()
const { options } = storeToRefs(seoStore)
const { idToUrl } = useImage()
const getValue = (key, val = values.value) => {
	return Object.keys(val).includes(key) ? val[key] : null
}

function onChangeKeywords() {
	const newKeywords = keywords.value
	
	seoStore.setOptions({
		title: getValue(props.map_title, values.value) || '',
		keywords: newKeywords || [''],
		thumbnail: values.value?.[props.map_thumnail] ? idToUrl(values.value?.[props.map_thumnail]) : '',
		url: getValue(props.map_url, values.value) || '',
	})
	seoStore.setContent(values.value?.[props.map_content])
}

watch([settings, keywords], function([newSettings, newKeywords],[oldSettings]) {
	if( ! oldSettings?.meta_robots ) {
		oldSettings.meta_robots = ['index']
	}
	let newIndex = indexOf(newSettings.meta_robots, 'index')
	let newNoIndex = indexOf(newSettings.meta_robots, 'noindex')
	let oldIndex = indexOf(oldSettings.meta_robots, 'index')
	let oldNoIndex = indexOf(oldSettings.meta_robots, 'noindex')
	console.log('index', newIndex, newNoIndex, oldIndex, oldNoIndex)
	if(  newIndex >= 0 &&  oldNoIndex >=0 ) {
		newSettings.meta_robots = newSettings.meta_robots?.filter((item) => item !== 'noindex')
	}
	if(  newNoIndex >=0 &&  oldIndex >=0 ) {
		newSettings.meta_robots = newSettings.meta_robots?.filter((item) => item !== 'index')
	}
	let data = merge({...item.value}, newSettings, {meta_keywords: newKeywords})
	console.log(newSettings, oldSettings, data)
	// if( !!isSEOAdvanced.value ) {
	// 	emit('input', data);
	// 	return
	// }

	const {
		id,
		meta_title,
		meta_description,
		facebook_title,
		facebook_description,
		twitter_title,
		twitter_description,
		meta_robots,
		facebook_image,
		twitter_image,
		meta_keywords
	} = data
	data = {
		id,
		meta_title,
		meta_description,
		meta_robots,
		facebook_image,
		twitter_image,
		meta_social: {
			facebook_title,
			facebook_description,
			twitter_title,
			twitter_description
		},
		meta_keywords: join((meta_keywords), ',')
	}
	
	console.log('data', data);
	
	emit('input', data);

})

watch(values, (newVal) =>{
	if( ! settings.value?.facebook_image ) {
		settings.value.facebook_image = values.value?.[props.map_thumnail]
	}
	if( ! settings.value?.twitter_image ) {
		settings.value.twitter_image = values.value?.[props.map_thumnail]
	}
} )


const getSettingData = async(id) => {
	console.log('id', id)
	try {
		await api.get(`/items/${COLLECTION.seo_detail}/${id}`, {
			params: {
				field: ['*.*']
			}
		}).then((res) => {
			let data = res?.data?.data
			console.log("data", data);

			// if( !!isSEOAdvanced.value ) {
			// 	item.value = data
			// 	return
			// }
			
			const {
				id,
				meta_title,
				meta_description,
				facebook_image,
				twitter_image,
			} = data
			let meta_keywords = data?.meta_keywords?.split(',') || ['']
			const meta_social = JSON.parse(data.meta_social || '{}')
			let meta_robots = JSON.parse(data?.meta_robots || '[]')
			item.value = {
				id,
				meta_title,
				meta_description,
				meta_robots: meta_robots,
				facebook_image,
				twitter_image,
				meta_keywords,
				...meta_social
			}

			if( meta_robots.length < 1 ) {
				settings.value.meta_robots = ['index']
			}

			console.log('item.value', item.value)

			if( !!isSEOAdvanced.value ) {
				return
			}
			keywords.value = meta_keywords
			seoStore.setSelectedKeyword(meta_keywords?.[0])
		})
	} catch (error) {
		
	}
}

onMounted(() => {

	if( !!isSEOAdvanced.value ) {
		return
	}

	const instance = getCurrentInstance()

	console.log('instance', instance?.parent?.type?.__name, instance?.parent)

	// let parent = instance?.parent
	// while (parent && parent?.type?.__name !== 'private-view') {
	// 	parent = parent?.parent;
	// }

	// // @ts-ignore
	// const renderSidebarSEO = h(SidebarSEO, {modelValue: keywords} )
	// // @ts-ignore
	// const sidebar = parent?.slots?.sidebar()
	
	// sidebar.push( renderSidebarSEO )
	// // @ts-ignore
	// parent.slots.sidebar = () => sidebar
})

onMounted(async() => {
	console.log('props.value', props);
	if( props.value ) {
		console.log('props.valueprops.value', props);
		
		await getSettingData(props.value);
	}
})

watch(() => props.value , async(newValue, oldValue) => {
	if( isNumber(newValue) ) {
		getSettingData(newValue);
	}
})

function stripDescription(str: string = '') {
	return str?.replace(/(<([^>]+)>)/gi, "").replaceAll("\n", " ")?.substring(0, 255)
}

</script>
<style lang="scss" scoped>
@import '../styles/form.scss';
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