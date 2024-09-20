<template>
    <private-view smallHeader title="Title & Meta">
        <template #title>
            <div>
                <h1 class="font-semibold text-lg text-slate-900">{{ 'Title & Meta' }}</h1>
                <div class="text-sm">Choose a collection to setup.</div>
            </div>
        </template>
        <template #actions>
            <!-- <v-checkbox v-model="showTranslationColelctions" label="Show Translation Collections" /> -->
            <div class="w-px h-9 my-auto !ml-2 !mr-4 bg-slate-200"></div>
            <v-button
                v-tooltip.bottom="`Add Static Page Setting`"
                rounded
				icon
				:disabled="false"
                to="/seo-settings/title-meta/+"
            >
                <v-icon name="add"></v-icon>
            </v-button>
        </template>
        <template #navigation>
            <navigator/>
        </template>
        <template #sidebar>
            <sidebar-detail icon="info" :title="'Information'" close>
                <div class="page-description px-3">
                    <!-- Information -->
                </div>
            </sidebar-detail>
        </template>
        <div class="py-6 px-7.5">
            <div class="flex gap-4 items-center justify-between mb-5">
                <v-breadcrumb :items="breadcrumbs"></v-breadcrumb>
            </div>
            <div class="mt-10">
                <h2 class="text-lg mb-6">Static page</h2>
                <div class="grid grid-cols-1 gap-x6 gap-y-8 lg:grid-cols-3 2xl:grid-cols-4">
                    <template v-for="(collection, index) in settings" :key="collection.collection">
                        <collection-item
                            v-if="collection.is_static"
                            :item="collection"
                            v-model="collection.enabled"
                            @update:model-value="onChangeCustomSetting"
                        />
                    </template>
                </div>
            </div>
            <div class="mt-10">
                <h2 class="text-lg mb-6">Collections</h2>
                <div class="grid grid-cols-1 gap-x6 gap-y-8 lg:grid-cols-3 2xl:grid-cols-4">
                    <collection-item
                        v-for="(collection, index) in collections" :key="collection.collection"
                        :item="collection"
                        v-model="collectionsSettings[index].enabled"
                        @update:model-value="onSelectCollection"
                    />
                </div>
            </div>
            <!-- <template v-if="showTranslationColelctions">
                <div class="mt-10">
                    <h2 class="text-lg mb-6">Translation Collections</h2>
                    <div class="grid grid-cols-1 gap-x6 gap-y-8 lg:grid-cols-3 2xl:grid-cols-4">
                        <collection-item
                            v-for="(collection, index) in translations" :key="collection.collection"
                            :item="collection"
                            v-model="translationsSettings[index].enabled"
                            @update:model-value="onSelectCollection($event, collection)"
                        />
                    </div>
                </div>
            </template> -->
            
        </div>
    </private-view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useStores, useApi, useItems} from '@directus/extensions-sdk';
import formatTitle from '@directus/format-title';
import { useResetStyle } from '../../../shared/composables/use-reset-style';
import { useCollectionsItems } from '../../../shared/composables/use-collections-items';
import useLanguage from '../../../shared/composables/use-languages';
import useItem from '../../../shared/composables/use-item';
import useSetting from '../../../shared/composables/use-setting';
import { COLLECTION } from '../../../shared/constants';
import { getSeoDetailsField, getSeoDetailRelation } from '../setup/fields/seo-detail'
import Navigator from '../../components/navigator/index.vue'
import CollectionItem from '../../components/collection-item.vue'
import LanguageSelect from '../../../shared/components/language-select.vue';
import useCheckSetup from '../../../shared/composables/use-check-setup';

useCheckSetup()
useResetStyle()
const { t } = useI18n()
const route = useRoute()
const api = useApi()
const { useNotificationsStore, useFieldsStore } = useStores()
const notify = useNotificationsStore()
const fieldsStore = useFieldsStore()

const breadcrumbs = ref([
    {
        to: "/seo-settings",
        name: "Directus SEO",
        icon: "settings",
        disabled: true
    },
    {
        to: `/seo-settings/title-meta/`,
        name: "Title & Meta",
        icon: "",
        // disabled: true
    },
])

const showTranslationColelctions = ref(false)

const {
    items,
    // collections,
    listTranslationCollections,
    translationCollections,
    collectionsWithoutTranslation,
} = useCollectionsItems()

const {
    items: settings,
    loading: loadingSettings,
    getItems,
} = useItems(ref(COLLECTION.seo_advanced), {
    limit: ref(-1),
    fields: ref(['collection', 'enabled', 'is_static'])
})

const collectionsSettings = ref()

const collections = computed(() => {
    collectionsSettings.value = collectionsWithoutTranslation.value?.map((collection) => {
        console.log('collection::', collection)
        let setting = settings.value?.find((setting) => !setting.is_static && collection.collection === setting.collection)
        return {
            ...collection,
            ...setting,
            is_new: !setting
        }
    })
    return collectionsSettings.value
})

const translationsSettings = ref()

const translations = computed(() => {
    translationsSettings.value = translationCollections.value?.map((collection) => {
        let setting = settings.value?.find((setting) => !setting.is_static && collection.collection === setting.collection)

        return {
            ...collection,
            ...setting,
            is_new: !setting
        }
    })
    return translationsSettings.value
})

async function createColllectionSetting(collection: string) {
    return await api.post(`/items/${COLLECTION.seo_advanced}/`, {collection, enabled: true, is_static: false})
}
async function createSEODetail(collection: string) {
    return await api.post(`/fields/${collection}`, getSeoDetailsField(collection))
}
async function toggleSEODetailInterface(collection: string, enabled: boolean) {
    const existing = fieldsStore.getField(collection, COLLECTION.seo_detail)
    let rawField = {
        ...existing,
        meta: {
            ...existing?.meta,
            hidden: !enabled
        }
    }
    return await fieldsStore.updateField(collection, COLLECTION.seo_detail, rawField)
}
async function createSEODetailRelation(collection: string) {
    return await api.post(`/relations/`, getSeoDetailRelation(collection))
}


async function onSelectCollection(enabled: boolean, collection:any, save_to_translation: boolean = true) {
    console.log('collection', collection)

    let targetCollection = collection?.collection

    if( save_to_translation && collection?.translation_collection ) {
        targetCollection = collection?.translation_collection
    }

    if( collection?.is_new ) {
        await createColllectionSetting(collection?.collection)
        .then(() => {
            notify.add({
                title: 'Saved!'
            })
        })
        .finally(async () => {
    
            await createSEODetail(targetCollection)
            // console.log('run seo');
            await createSEODetailRelation(targetCollection)
        })
    } else {
        await save(collection?.collection, enabled, false)
    }
    
    getItems()
}

async function onChangeCustomSetting(enabled: boolean, collection) {
    await save(collection?.collection, enabled)
}

async function save(collection:string, enabled: boolean = true, is_static: boolean = true) {
    await api.patch(`/items/${COLLECTION.seo_advanced}/${collection}`, {enabled, is_static}).then(() => {
        notify.add({
            title: 'Saved!'
        })
    }).catch(() => {
        notify.add({
            title: 'Error!',
            type: 'error'
        })
    })

    if( !is_static ) {
        await toggleSEODetailInterface(collection, enabled)
    }
}

</script>

<style lang="scss" scoped>
@import '../../../styles/style.scss';
@import '../../../styles/form.scss';

:deep() {
    #main-content.content {
        .header-bar {
            padding-left: 30px;
            @media (min-width: 600px) {
                margin-top: 0;
                padding-right: 30px;
                .title-container {
                    margin-left: 0;
                }
            }
        }
    }
}

.language-switcher {
    --v-input-background-color: var(--primary-25);
    --background-input: var(--primary-25);
    --v-input-color: var(--primary);
    --arrow-color: var(--primary);
    --input-height: 48px;
    --border-width: 0px;
    --border-radius: 4px;
    width: 270px;
}

:deep() {
    .v-breadcrumb {
        a {
            --v-breadcrumb-color: var(--primary);
            color: var(--primary)
        }
    }
    .language-select {
        min-width: 270px;
    }
}


</style>