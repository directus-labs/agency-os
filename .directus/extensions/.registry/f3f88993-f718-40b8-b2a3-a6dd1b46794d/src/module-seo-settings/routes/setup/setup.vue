<template>
<private-view smallHeader title="Setup">
    <template #navigation>
        <ol class="list-step list-none p-3 overflow-hidden space-y-8">
            <li v-for="(step, id, index) in steps" :key="id" :value="id" :class="{'active': currentStep.includes(id)}" >
                <!-- @click="currentStep = [id]" -->
                <div class="flex items-center font-medium w-full  ">
                    <span :class="currentStep.includes(id) ? 'bg-primary text-white border-transparent' : 'bg-[var(--background-normal-alt)] text-primary'" class="w-8 h-8 border-2 rounded-full flex justify-center items-center mr-3 text-sm lg:w-10 lg:h-10">
                        <svg v-if="currentStep.includes(id)" class="w-5 h-5 stroke-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12L9.28722 16.2923C9.62045 16.6259 9.78706 16.7927 9.99421 16.7928C10.2014 16.7929 10.3681 16.6262 10.7016 16.2929L20 7" stroke="stroke-current" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="my-path"></path>
                        </svg>
                        <span v-else>{{ index + 1 }}</span>
                    </span>
                    <div class="block">
                        <h4 class="text-lg text-primary">{{ step.label }}</h4>
                    </div>
                </div>
            </li>
        </ol>
        <!-- <v-tabs v-model="currentStep" vertical>
            <v-tab v-for="(step, id) in steps" :key="id" :value="id"><v-icon :name="currentStep.includes(id) ? `radio_button_checked` : `radio_button_unchecked`" />{{ step.label }}</v-tab>
        </v-tabs> -->
    </template>
    <div class="px-5 pt-10 pb-3">
        <v-tabs-items v-model="currentStep">
            <v-tab-item :value="stepNames[0]">
                <v-info icon="info" :title="current.title" type="warning">
                    {{ current.description }}
                    <v-button class="mt-5" :disabled="loading" :loading="loading" @click="setup">
                        {{ loading ? 'Setting up...' : 'Start' }}
                        <template #loading>
                            <div class="flex gap-2 items-center">
                                <div class="inline-block"><v-progress-circular indeterminate /></div>
                                <span>{{ 'Setting up...' }}</span>
                            </div>
                        </template>
                    </v-button>
                </v-info>
            </v-tab-item>
            <v-tab-item :value="stepNames[1]">
                <v-notice icon="info" type="warning" class="mb-10">
                    <h2>{{ current.description }}</h2>
                </v-notice>
                <div class="field mb-10">
                    <div class="field-label type-label mb-2">Do you want SEO module support multi-language?</div>
                    <v-radio v-model="useLanguage" :value="1" label="Let SEO module create a new one name: languages" />
                    <v-radio v-model="useLanguage" :value="2" label="Choose from existing collection" />
                </div>
                <v-form v-if="useLanguage === 2" v-model="languageCollection" :fields="languageFields"></v-form>
                <v-form v-model="languageCollection" :fields="defaultLanguageFields" class="mt-6"></v-form>
                <div class="flex items-center justify-between gap-3">

                    <v-button class="mt-5" :disabled="loading" @click="goToPrevious">
                        {{ 'Back' }}
                        <template #loading>
                            <div class="flex gap-2 items-center">
                                <div class="inline-block"><v-progress-circular indeterminate /></div>
                            </div>
                        </template>
                    </v-button>
                    <v-button class="mt-5" :disabled="loading" :loading="loading" @click="createMultiLanguage">
                        {{ loading ? 'Setting up...' : 'Next step' }}
                        <template #loading>
                            <div class="flex gap-2 items-center">
                                <div class="inline-block"><v-progress-circular indeterminate /></div>
                                <span>{{ 'Setting up...' }}</span>
                            </div>
                        </template>
                    </v-button>
                </div>
                
            </v-tab-item>
            <v-tab-item :value="stepNames[2]">
                <v-info icon="check" :title="current.title" type="success">
                    {{ current.description }}
                    <v-button class="mt-5" :disabled="loading" :loading="loading" @click="complete">
                        {{  'Go to Setting' }}
                    </v-button>
                </v-info>
            </v-tab-item>
        </v-tabs-items>

    </div>
    
</private-view>
</template>

<script setup lang="ts">
import { useApi, useStores } from '@directus/extensions-sdk'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStepper } from '@vueuse/core'
import {
    collectionModuleSettings,
    collectionRedirection,
    collectionSeoAdvanced,
    collectionSeoDetails,
    relationsSeoDetails,
    collectionLanguages,
    getCollectionSeoAdvanced,
    getRelationSeoAdvancedTranslation,
collectionSeoAdvancedTrans,
} from './fields'
import { __EXTENSION_VERSION__, COLLECTION } from '../../../shared/constants';
import { lt as ltVersion } from 'semver'

const api = useApi()
const { useCollectionsStore, useFieldsStore, useRelationsStore } = useStores();
const collectionsStore = useCollectionsStore();
const fieldsStore = useFieldsStore()
const relationsStore = useRelationsStore()

const { t } = useI18n()
const router = useRouter()

const loading = ref(false)
// const currentStep = ref()
const currentStepTitle = ref('Welcome to Directus Extension SEO')
const currentStepText = ref('Click to button bellow to start')
const buttonText = ref('Start now')
const useLanguage = ref(1)
const languageCollection = ref<{
    collection?: string,
    field?: string
    direction?: string
    default_language?: string
}>({
    collection: 'languages',
    field: 'code',
    direction: 'direction',
    default_language: 'en-US'
})
const {
    steps,
    stepNames,
    index,
    current,
    next,
    previous,
    isFirst,
    isLast,
    goTo,
    goToNext,
    goToPrevious,
    goBackTo,
    isNext,
    isPrevious,
    isCurrent,
    isBefore,
    isAfter,
} = useStepper({
    createCollection: {
        label: 'Start',
        title: 'Welcome to Directus Extension SEO',
        description: 'Click to button bellow to start'
    },
    language: {
        label: 'Languages',
        title: 'Languages Support',
        description: 'SEO module supports multi-language by default, choose an existing language collection or let SEO module create a new one for you. If you don\'t need more than one language, just choose a language as default'
    },
    completed: {
        label: 'Complete',
        title: 'Setup completed',
        description: 'Now you can use SEO Module.'
    },
})

const currentStep = computed({
    get: () => [stepNames.value[index.value]],
    set: (val: any) => {
        console.log(val);
        
        goTo(val?.[0])
    }
})

const defaultLanguageFields = ref([
    {
        field: 'default_language',
        name: 'Choose a default language',
        type: 'string',
        meta: {
            interface: 'system-language',
            width: 'half',
            options: {
            },
        },
    },

])

const languageFields = ref([
    {
        field: 'collection',
        name: 'Choose a collection for multi-language',
        type: 'string',
        meta: {
            interface: 'system-collection',
            width: 'half',
            options: {
                includeSystem: false,
                includeSingleton: false,
            },
        },
    },
    {
        field: 'field',
        type: 'string',
        name: 'Choose code field:',
        meta: {
            interface: 'system-field',
            options: {
                collectionField: 'collection',
                allowPrimaryKey: true,
                allowNone: true,
            },
            width: 'half',
        },
    },
    {
        field: 'direction',
        type: 'string',
        name: 'Choose direction field:',
        meta: {
            interface: 'system-field',
            options: {
                collectionField: 'collection',
                allowPrimaryKey: true,
                allowNone: true,
            },
            width: 'half',
        },
    },
])

onMounted(() => {
    if(isCollectionExist(COLLECTION.seo_setting) && isCollectionExist(COLLECTION.seo_redirection)) {
        currentStepText.value = 'Go to next step for settings.'
        buttonText.value = 'Next step'
    }
})

async function updateSEOAdvancedField() {
    if( ! fieldsStore.getField(COLLECTION.seo_advanced, 'is_custom') ) {
        return
    }
    await api.get(`/items/${COLLECTION.seo_advanced}`, {
        params: {
            filter: {
                is_custom: {
                    _eq: true
                }
            },
            limit: -1,
            fields: ['collection']
        }
    }).then(async (response) => {
        let keys = response?.data?.data?.map((key) => key.collection)
        if( keys ) {
            await api.patch(`/items/${COLLECTION.seo_advanced}`, {
                keys,
                data: {
                    is_static: true
                }
            })
        }

        if (fieldsStore.getField(COLLECTION.seo_advanced, 'is_custom')) {
            await fieldsStore.deleteField(COLLECTION.seo_advanced, 'is_custom')
        }
    })
}

async function updateDB() {
    await api.get(`/items/${COLLECTION.seo_setting}/setup`).then(async (response) => {
        let setup = response?.data?.data?.value
        if( setup?.currentVersion && ltVersion(setup?.currentVersion, '1.5.3') ) {
            await updateSEOAdvancedField()
        }
    })
}

async function setup() {
    loading.value = true
    await collectionsStore.hydrate()
    // if( isCollectionExist(COLLECTION.seo_setting) && isCollectionExist(COLLECTION.seo_redirection) && isCollectionExist(COLLECTION.seo_detail) ) {
    //     goToNext()
    //     loading.value = false
    //     return
    // }
    
    console.log('exist', isCollectionExist(COLLECTION.seo_setting) && isCollectionExist(COLLECTION.seo_redirection) && isCollectionExist(COLLECTION.seo_detail))
    console.log('after check')

    if( ! isCollectionExist(COLLECTION.seo_setting) ) {
        currentStepTitle.value = 'Create settings'
        currentStepText.value = 'Creating collections for saving settings...'
        await api.post('/collections', {
            ...collectionModuleSettings,
            fields: collectionModuleSettings?.fields?.filter((field) => field?.schema?.is_primary_key===true)
        }).then((res) => {
            if( ! res.data.data ) {
                currentStepTitle.value = 'Error!'
                // currentStepText.value = res.data.errors.
            }
        })
        await collectionsStore.hydrate()
    }

    await createFields(COLLECTION.seo_setting, collectionModuleSettings?.fields)

    if( ! isCollectionExist(COLLECTION.seo_redirection) ) {
        
        await api.post('/collections', collectionRedirection).then((res) => {
            if( ! res.data.data ) {
            }
        })
        await collectionsStore.hydrate()
    }
    if( ! isCollectionExist(COLLECTION.seo_detail) ) {
        await api.post('/collections', {
            ...collectionSeoDetails,
            fields: collectionSeoDetails?.fields?.filter((field) => field?.schema?.is_primary_key===true)
        }).then((res) => {
            if( ! res.data.data ) {
            }
        })
        await collectionsStore.hydrate()
    }

    await createFields(COLLECTION.seo_detail, collectionSeoDetails?.fields)
    
    for await (const relation of relationsSeoDetails) {
        const existing = relationsStore.getRelationForField(relation.collection, relation.field)
        console.log('relation relationsSeoDetails', relation, existing)
        if( ! existing ) {
            await api.post('/relations', relation)
        }
    }

    await updateDB()

    loading.value = false
    goToNext()
    buttonText.value = 'Next step'
}

const createMultiLanguage = async() => {

    loading.value = true
    await collectionsStore.hydrate()

    const collectionSeoAdvancedOpition = getCollectionSeoAdvanced(languageCollection.value.default_language, languageCollection.value.direction, languageCollection.value.field)
    
    if( ! isCollectionExist(COLLECTION.seo_advanced) ) {
        await api.post('/collections', {
            ...collectionSeoAdvancedOpition,
            fields: collectionSeoAdvancedOpition?.fields?.filter((field) => field?.schema?.is_primary_key===true)
        })
        await collectionsStore.hydrate()
    }

    await createFields(COLLECTION.seo_advanced, collectionSeoAdvancedOpition?.fields)

    if( ! isCollectionExist(`${COLLECTION.seo_advanced}_translations`) ) {
        await api.post('/collections', collectionSeoAdvancedTrans)
        await collectionsStore.hydrate()
    }


    if( ! isCollectionExist(COLLECTION.language) && useLanguage.value === 1 ) {
        await api.post('/collections', collectionLanguages)
        await collectionsStore.hydrate()
    }

    const relationSeoAdvancedTranslation = getRelationSeoAdvancedTranslation(languageCollection.value.collection || 'languages', languageCollection.value.field || 'code')

    for await (const relation of relationSeoAdvancedTranslation) {
        const existing = relationsStore.getRelationForField(relation.collection, relation.field)
        console.log('relation relationSeoAdvancedTranslation', relation, existing)
        if( !existing ) {
            await api.post('/relations', relation)
        }
    }

    await createDefaultLanguage()
    
    await saveSetup()
    
    loading.value = false
    goToNext()
}

async function createFields(collection, fields) {
    await fieldsStore.hydrate()

    fields = fields?.filter((field) => !field?.schema?.is_primary_key)

    for await (const field of fields) {
        const existing = fieldsStore.getField(collection, field.field)
        if( !existing ) {
            await api.post(`fields/${collection}`, field)
        }
    }
}

async function createDefaultLanguage() {
    const language = getLanguageDetails(languageCollection.value.default_language)
    try {

        await api.post(`/items/${languageCollection.value.collection}`, {
            [languageCollection.value.field]: languageCollection.value.default_language,
            name: language.name,
            default: true,
            [languageCollection.value.direction]: language.direction
        })
    } catch {
        
        await api.patch(`/items/${languageCollection.value.collection}/${languageCollection.value.default_language}`, {
            default: true,
        })
    }

    await api.get(`/items/${languageCollection.value.collection}`, {
        params: {
            filter: {
                [languageCollection.value.field]: {
                    _neq: languageCollection.value.default_language
                }
            },
            limit: -1,
            fields: [languageCollection.value.field]
        }
    }).then(async (response) => {
        let keys = response?.data?.data?.map((key) => key[languageCollection.value.field])
        if( keys ) {
            await api.patch(`/items/${languageCollection.value.collection}`, {
                keys,
                data: {
                    default: false
                }
            })
        }
    })
}

async function saveSetup() {
    try {
        await api.post(`/items/${COLLECTION.seo_setting}`, {
            key: 'setup',
            value: {
                enabled: true,
                currentVersion: __EXTENSION_VERSION__
            }
        })
    } catch {
        await api.patch(`/items/${COLLECTION.seo_setting}/setup`, {
            value: {
                enabled: true,
                currentVersion: __EXTENSION_VERSION__
            }
        })
    }
}

async function complete() {
    router.push('/seo-settings/title-meta')
}

const isCollectionExist = (collection: string) => collectionsStore.getCollection(collection)

function getLanguageName(locale) {
    // Create a new Intl.DisplayNames object with the type 'language'
    const displayNames = new Intl.DisplayNames(['en'], { type: 'language' });

    // Extract the language code from the locale and get the language name
    return displayNames.of(locale.split('-')[0]);
}

function getLanguageDetails(locale) {
    const displayNames = new Intl.DisplayNames(['en'], { type: 'language' });
    const localeObj = new Intl.Locale(locale);
    
    return {
        name: displayNames.of(localeObj.language),
        direction: localeObj.textInfo.direction
    };
}
</script>

<style lang="scss" scoped>
.list-step {
    li {
        @apply relative flex-1;
        &:not(:last-child):before {
            content: '';
            @apply bg-gray-300;
            @apply w-0.5 h-full -bottom-11 left-4;
            @apply inline-block absolute;
            @screen lg {
                @apply left-5;
            }
        }
        &.active {
            &:before {
                background-color: var(--primary);
            }
        }
    }
}
</style>