<template>
<div class="seo-collection-item flex flex-col rounded-t rounded-b border-px border-solid">
    <div class="flex gap-5 px-5 py-6">
        <div class="icon self-center">
            <v-icon large :name="item?.icon || 'label'" />
        </div>
        <div class="collection-content">
            <div class="text-md font-semibold">
                {{ item?.name || formatTitle(item?.collection) }}
            </div>
            <div class="text-sm mt-1 line-clamp-1" :title="item?.meta?.note || '...'">
                {{ item?.meta?.note || '...' }}
            </div>
            <div class="text-xs mt-1">
                Collection: {{ item?.collection }}
            </div>
            <div v-if="item?.translation_collection" class="text-xs mt-1">
                Translation: {{ item?.translation_collection }}
            </div>
        </div>
    </div>
    <div class="flex gap-5 px-5 py-4 justify-between action rounded-b mt-auto">
        <v-switch
            :model-value="modelValue"
            @update:model-value="updateValue($event, item?.collection)"
        />
        <v-button
            class="button-setting"
            :to="`/seo-settings/title-meta/${item?.collection}`"
            :disabled="!modelValue"
            :style="{
                '--v-button-background-color': '#fff',
                '--v-button-color': '#070A13',
                '--border-width': '1px',
                '--v-button-min-width': '0',
            }"
        >Setting</v-button>
    </div>
    <v-dialog v-model="showDialog">
        <v-card>
            <v-card-title>Enable SEO for collection</v-card-title>
            <v-card-text>
                <div>This collection has translation collection: <span class="font-bold">{{ item?.translation_collection }}</span></div>
                <div>So, SEO module uses <span class="font-bold">{{ item?.translation_collection }}</span> for saving data</div>
                <div>If you want to enabled for <span class="font-bold">{{ item?.collection }}</span> only, choose <span class="font-bold">Enabled for {{ item?.collection }} only</span></div>
            </v-card-text>
            <v-card-actions>
                <v-button secondary @click="enabledCollection(false)">
                    Enabled for {{ item?.collection }} only
                </v-button>
                <v-button @click="enabledCollection">
                    Enable for {{ item?.translation_collection }}
                </v-button>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import VSwitch from './v-switch.vue'
import formatTitle from '@directus/format-title';
import { toRefs } from '@vueuse/core';

const props = defineProps({
    item: {
        type: Object as PropType<{[key: string]: any}>,
        default: null
    },
    value: {
        type: Boolean,
        default: null,
    },
    modelValue: {
        type: Boolean,
        default: null
    }
})
const emit = defineEmits(['update:modelValue'])

const showDialog = ref(false)

const updateValue = ($event, collection) => {
    if( props.item?.is_new && props.item?.translation_collection && $event === true ) {
        showDialog.value = true
        return
    }
    emit('update:modelValue', $event, props.item);
}

function enabledCollection(is_translation: boolean = true) {
    showDialog.value = false
    emit('update:modelValue', true, props.item, is_translation);
}
</script>

<style lang="scss" scoped>
.icon {
    flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 56px;
	height: 56px;
	border-radius: 50%;
	color: var(--foreground-subdued);
	background-color: var(--background-normal);
}
.button-setting {
    :deep() {
        .button {
            border-color: #94A3B8!important
        }
    }
}
.seo-collection-item {
    color: var(--theme--foreground-accent, var(--foreground-normal));
    border-color: var(--theme--border-color-accent, var(--border-normal))
}
.action {
    background: var(--theme--background-normal, var(--background-normal))
}
</style>