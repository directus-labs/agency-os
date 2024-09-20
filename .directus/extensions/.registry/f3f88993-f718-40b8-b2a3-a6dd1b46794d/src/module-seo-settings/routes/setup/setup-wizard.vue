<template>
<private-view smallHeader title="Setup Wizard">

</private-view>
</template>

<script setup lang="ts">
import { useApi, useStores } from '@directus/extensions-sdk'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n';
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
import { COLLECTION } from '../../../shared/constants';

const api = useApi()
const { useCollectionsStore } = useStores();
const collectionsStore = useCollectionsStore();
const { t } = useI18n()

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
    welcome: {
        label: 'Start',
        title: 'Welcome to Directus Extension SEO!',
        description: 'Click to button bellow to start setup'
    },
    createCollection: {
        label: 'Start',
        title: 'Welcome to Directus Extension SEO!',
        description: 'Click to button bellow to start setup.',
        
    },
    language: {
        label: 'Languages',
        title: 'Languages Support',
        description: 'If you want SEO module support multi-language, choose an existing language collection or let SEO module create a new one for you.'
    },
    completed: {
        label: 'Complete',
        title: 'Setup completed',
        description: 'Now you can use SEO Module.'
    },
})
</script>

<style scoped>

</style>