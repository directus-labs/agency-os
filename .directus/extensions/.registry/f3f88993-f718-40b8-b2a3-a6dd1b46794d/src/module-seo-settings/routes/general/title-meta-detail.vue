<template>
    <private-view smallHeader>
        <template #title>
            <div>
                <h1 class="font-semibold text-lg text-slate-900">{{ title }}</h1>
                <div class="text-sm">Setting per collection.</div>
            </div>
        </template>
        <template #title-outer:prepend>
            <v-button
                v-tooltip.bottom="t('back')"
                class="header-icon"
                rounded
                icon
                secondary
                exact
                :to="`/seo-settings/title-meta`"
            >
                <v-icon name="arrow_back" />
            </v-button>
        </template>
        <template #actions>
            <language-select
                v-if="languages"
                v-model="currentLanguage"
                :items="languages"
                @update:model-value="onSelectLanguage"
            />
            <div class="w-px h-9 my-auto bg-slate-200"></div>
            <v-button
                v-tooltip.bottom="`Save`"
                @click="onSave"
                rounded
				icon
                :loading="loading"
				:secondary="false"
				:disabled="loading"
            >
                <v-icon name="check"></v-icon>
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
            <template v-if="(isNew || customSettings?.includes(collection))">
                <v-form v-model="customSettingsModel" :fields="customSettingFields" :primary-key="0" :initial-values="item" :disabled="!isNew" class="seo-setting-form"></v-form>
            </template>
            <template v-else>
                <v-form v-model="mapFieldsSettings" :fields="mapFields" :primary-key="0" :initial-values="field?.meta?.options" class="seo-setting-form"></v-form>
            </template>
            <v-form
                v-model="settings"
                :collection="COLLECTION.seo_advanced"
                :primary-key="route.params.collection"
                :initial-values="item"
                class="seo-setting-form advanced-form">
            </v-form>
        </div>
    </private-view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useApi, useStores } from '@directus/extensions-sdk';
import { useResetStyle } from '../../../shared/composables/use-reset-style';
import { useCollectionsItems } from '../../../shared/composables/use-collections-items';
import useItem from '../../../shared/composables/use-item';
import { getSectionField } from "../../../shared/utils";
import { COLLECTION, FIELDS } from '../../../shared/constants';
import { getSeoDetailsField, getSeoDetailRelation } from '../setup/fields/seo-detail'
import useMapFields from '../../composables/use-map-fields'
import Navigator from '../../components/navigator/index.vue'
import CollectionItem from '../../components/collection-item.vue'
import getFields from './fields/title-meta-detail'
import LanguageSelect from '../../../shared/components/language-select.vue';
import merge from 'lodash/merge'
import formatTitle from '@directus/format-title';
import { notify } from '../../../interface-seo-analyzer/utils';

useResetStyle()
const { t } = useI18n()
const api = useApi()
const route = useRoute()
const router = useRouter()
const { useNotificationsStore } = useStores()
const notify = useNotificationsStore()

const collection = ref(route.params.collection)
const isNew = computed(() => collection.value === '+')
const title = computed(() => isNew.value ? 'Add static page title & meta' : `Title & Meta settings for: ${formatTitle(collection.value)}`)

const breadcrumbs = ref([
    {
        to: "/seo-settings",
        name: "Directus SEO",
        icon: "settings",
        disabled: true
    },
    {
        to: `/seo-settings/title-meta/${collection.value}`,
        name: "Title & Meta",
        icon: "",
        // disabled: true
    },
])

const { getTranslationCollection } = useCollectionsItems()
const targetCollection = ref(getTranslationCollection(collection.value))

const mapFieldsSettings = ref({})
const { mapFields } = useMapFields(targetCollection.value)
const field = ref()
onMounted(async () => {
    field.value = await api.get(`/fields/${targetCollection.value}/${FIELDS.seo_detail}`).then(({data}) => data?.data)
})

const fields = ref(getFields(collection.value))
const customSettingFields = ref([
    ...getSectionField(
        {
            field: 'collection',
            title: 'Static page',
        },
        [
            {
                name: "",
                field: "collection",
                type: "string",
                meta: {
                    interface: "input",
                    note: 'Using when setting is not belong to any collection!'
                },
            },
        ]
    ),
])

const customSettingsModel = ref({
    collection: isNew.value ? '' : collection.value
})

const {
    settings,
    item,
    currentLanguage,
    languages,
    loading,
    saving,
    save
} = useItem(COLLECTION.seo_advanced, collection.value, false)


const {
    item: customSettings,
    saveData,
    loading: loadingCustomSettings,
    saving: savingCustomSettings,
    save: saveCustomSettings
} = useItem(COLLECTION.seo_setting, 'enabled_custom_settings', false, [])


const saveAdvancedData = async() => {
    let customData = {
        is_custom: isNew.value,
        collection: customSettingsModel.value.collection
    }

    if( !isNew.value ) {
        customData.collection = collection.value
    }
    try {
        const savedData = await save(customData)
        if( isNew.value ) {
            if( savedData?.collection ) {
                customSettings.value?.push(savedData?.collection)
                console.log('savedData', customSettings.value)
            }
            
            await saveCustomSettings()
    
            router.push(`/seo-settings/title-meta/${savedData?.collection}`)
        }
        
    } catch (error) {
        console.log(error)
        notify.add({
            title: 'Failed',
            text: 'The static page already exists!',
            type: 'error',
            dialog: true,
        })
    }
}

const onSave = async() => {
    const saved = await saveAdvancedData()
    if( isNew.value ) {
        return
    }

    const field = await api.get(`/fields/${targetCollection.value}/${FIELDS.seo_detail}`)
    .then(({data}) => data?.data)
    .catch(async() => {
        await api.post(`/fields/${targetCollection.value}`, getSeoDetailsField(targetCollection.value))
        await api.post(`/relations/`, getSeoDetailRelation(targetCollection.value))
    })
    await api.patch(`/fields/${targetCollection.value}/${FIELDS.seo_detail}`, merge(field, {meta: {options: mapFieldsSettings.value}}))
}

const onSelectLanguage = (lang) => {
    document.querySelector('.advanced-form .language-select .toggle')?.click()
    setTimeout(() => {
        for (const listItem of document.querySelectorAll('#menu-outlet .v-list-item')) {
            console.log('a.textContent',listItem.textContent);
            if (listItem.textContent.includes(lang)) {
                
                listItem.click()
            }
        }
    }, 300);
}

onMounted(() =>setTimeout(() =>  onSelectLanguage(currentLanguage.value), 1000))
</script>

<style lang="scss" scoped>
@import '../../../styles/form.scss';
:deep() {
    #main-content.content {
        .header-bar {
            padding-left: 30px;
            @media (min-width: 600px) {
                margin-top: 0;
                padding-right: 30px;
                .title-container {
                    // margin-left: 0;
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
    .v-menu.language-select {
        display: none;
    }
    .language-select {
        min-width: 270px;
    }
}

.advanced-form {
    :deep() {
        > .first-visible-field > .v-menu {
            display: none;
        }
        .language-select + .v-form {
            grid-template-columns: [start] minmax(0, 1fr) [half] minmax(0, 1fr) [full] 1fr [fill] !important;
            > .field {
                grid-column: start/fill;
            }
            + .v-divider {
                display:none;
            }
        }
    }
}
</style>