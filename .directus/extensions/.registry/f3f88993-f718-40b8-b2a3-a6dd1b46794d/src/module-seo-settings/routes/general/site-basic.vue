<template>
    <private-view smallHeader title="Site basics">
        <template #title>
            <div>
                <h1 class="font-semibold text-lg text-slate-900">{{ 'Site basics' }}</h1>
                <div class="text-sm">Add social account information to your website's Schema and Open Graph. Learn More.</div>
            </div>
        </template>
        <template #actions>
            <language-select v-if="languages" v-model="currentLanguage" :items="languages"></language-select>
            <div class="w-px h-9 my-auto bg-slate-200"></div>
            <v-button
                v-tooltip.bottom="saving ? 'Saving' :`Save`"
                @click="onSave"
                rounded
				icon
				:disabled="saving || loading || !Object.keys(settings).length"
				:loading="saving"
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
            <v-breadcrumb :items="breadcrumbs"></v-breadcrumb>
            <v-form
                v-model="editData"
                :fields="fields"
                :primary-key="0"
                :loading="loading"
                :initial-values="itemLang"
                class="seo-setting-form"
            />
        </div>
    </private-view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStores, useApi } from '@directus/extensions-sdk';
import { useResetStyle } from '../../composables/use-reset-style';
import useLanguage from '../../../shared/composables/use-languages';
import useItem from '../../../shared/composables/use-item';
import { COLLECTION } from "../../../shared/constants"
import rawFields from './fields/site-basic';
import Navigator from '../../components/navigator/index.vue'
import LanguageSelect from '../../../shared/components/language-select.vue';
import { indexOf } from 'lodash'

useResetStyle()
const { t } = useI18n()
const api = useApi()

const breadcrumbs = ref([
    {
        to: "/seo-settings",
        name: "Directus SEO",
        icon: "settings",
        disabled: true
    },
    {
        to: "/seo-settings",
        name: "Site basics",
        icon: "",
        disabled: false
    },
])

const fields = ref(rawFields)
const {
    settings,
    editData,
    // saveData,
    itemLang,
    currentLanguage,
    languages,
    loading,
    saving,
    save
} = useItem(COLLECTION.seo_setting, 'general')

const item = computed(() => {
    let data = itemLang.value
    if( data?.meta_robots?.length < 1 ) {
        data.meta_robots = ['index']
    }
    console.log('item data', data)
    return data
})

watch(editData, (newSettings, oldSettings) => {
    console.log('sett', newSettings, oldSettings, itemLang)

    if( !oldSettings ) {
        oldSettings = itemLang.value
    }

    let newIndex = indexOf(newSettings.meta_robots, 'index')
	let newNoIndex = indexOf(newSettings.meta_robots, 'noindex')
	let oldIndex = indexOf(oldSettings.meta_robots, 'index')
	let oldNoIndex = indexOf(oldSettings.meta_robots, 'noindex')
	console.log('index', newIndex, newNoIndex, oldIndex, oldNoIndex)
	if(  newIndex >= 0 &&  oldNoIndex >=0 ) {
		newSettings.meta_robots?.splice(oldNoIndex, 1)
	}
	if(  newNoIndex >=0 &&  oldIndex >=0 ) {
		newSettings.meta_robots?.splice(oldIndex, 1)
	}
})


async function onSave() {
    await save({key: 'general'})
}
</script>
<style lang="scss" scoped>
@import '../../../styles/form.scss';
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