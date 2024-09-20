<template>
    <div class="navigator h-full flex flex-col">
        <v-list v-model="openDetail">
            <v-list-group
                v-for="item, index in items"
                :class="{'hidden': item?.hidden }"
            >
                <template #activator>
                    <div class="flex items-center text-slate-700 mr-auto" @click="router.push(item?.to)">
                        <v-list-item-icon>
                            <v-icon :name="item.icon" />
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-text-overflow :text="item.name" />
                        </v-list-item-content>
                    </div>
                </template>
                <v-list-item
                    v-for="child, childIndex in item?.childrens"
                    :key="child.to" :to="child.to"
                    :class="{'!hidden': child?.hidden }"
                >
                    <v-list-item-icon>
                        <v-icon :name="child?.icon" />
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-text-overflow :text="child.name" />
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
        <div class="text-xs mt-auto py-1 px-3">Directus SEO Extensions {{__EXTENSION_VERSION__}}</div>
    </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router'
import type { NavigatorItem } from './types'
import { navigatorItems } from '../../constants'
import { __EXTENSION_VERSION__ } from '../../../shared/constants';

const props = defineProps({
    // items: {
    //     type: Array as PropType<NavigatorItem[]>,
    //     default: []
    // },
    activeItem: {
        type: Number || String,
        default: 0
    }
})

const route = useRoute()
const router = useRouter()

const openDetail = ref<string[]>([]);
const items = ref(navigatorItems)

</script>
<style lang="scss" scoped>
.private-view #navigation .module-nav-content {
    background-color: #F8FAFC
}
.navigator {
    --v-list-padding: 0;
    --v-list-item-margin: 0;

    :deep() {
        .v-list-group {
            margin-bottom: 0;
            border-bottom: 1px solid;
            @apply border-slate-200;
            .items {
                .v-list-item {
                    padding: 8px 10px 8px 34px;
                }
            }
            .items:not(:empty) {
                padding: 8px;
                border-top: 1px solid;
                @apply border-slate-200;
            }
            .v-list-item-icon {
                margin-top: 0;
                margin-bottom: 0;
            }
        }
        li.v-list-item.activator {
            padding: 20px 16px;
            background-color: #fff;
            
            > a {
                padding-left: 0;
                .v-list-item-icon {
                    margin-right: 6px;
                }
            }
        }
    }
}
</style>