<template>
    <label for="">Focus Keywords</label>
    <component :is="modelValue.join('').length > 17 ? 'v-textarea' : 'v-input'" :value="seoStore.selectedKeyWord" @keydown.enter="onChange">
        <template #prepend>
            <div class="keywords-chip">
                <v-chip
                    v-for="key, index in modelValue.filter((k) => k!== '')"
                    active
                    close
                    :class="[getScoreClass(seoStore.resultManager.getScore(key)), {'selected': seoStore.selectedKeyWord == key}]"
                    @close="removeKeyword(key)"
                    @click="changeKeyword(key)"
                >{{key}}</v-chip>
            </div>
        </template>
    </component>
    <div class="seo-groups">
        <seo-group v-for="item, index in seoGroups" :title="seoStore.getGroupTitle(item.name)" :errors="item.errors" icon="analytics" :is-active="index==0">
            <ul v-if="results" class="checklist">
                <li v-for="list in item.list" :key="list.text" :class="list.classes">
                    <v-icon :name="list.hasScore ? 'check_circle' : 'cancel'" :class="list.hasScore ? 'success' : 'error'"></v-icon>
                    <span v-html="list.text"></span>
                </li>
            </ul>
        </seo-group>
    </div>
</template>
<script setup lang="ts">
import debounce from 'lodash/debounce';
import isUndefined from 'lodash/isUndefined';
import { computed, onMounted, ref, watch } from 'vue';
import { useSEOStore } from '../stores/useSEOStore'
import seoGroup from './seo-group.vue'

interface Props {
    modelValue: string[]
}

const props = withDefaults(defineProps<Props>(), {
});

const emit = defineEmits(['update:modelValue'])
const seoStore = useSEOStore()

const keyword = ref('')
const selected = ref()
const results = computed(() => seoStore.resultManager.getResult(seoStore.selectedKeyWord))

const changeKeyword = (key) => {
    seoStore.selectedKeyWord = key
}

const removeKeyword = (key) => {
    let value = [...props.modelValue].filter((k) => k !== key)
    value = value.length < 1  ? [''] : value
    
    seoStore.selectedKeyWord = value[0]
    emit('update:modelValue', value)
    console.log('remove', value, results);
}

const onChange = (event) => {
    if( ! event.target.value ) return
    const value = [...props.modelValue, event.target.value].filter((k) => k !== '')

    if( value.length === 1 )  {
        changeKeyword(event.target.value)
    }

    emit('update:modelValue', value)
    keyword.value = ''
}

onMounted(() => {
    changeKeyword(props.modelValue[0] || '')
    if( props.modelValue?.length ) {
    }
})

const seoGroups = computed(() => {
    return Object.keys(seoStore.getGroups()).map((group: any) => {
        let { list, errors } = checkList(group)
        return {
            name: group,
            list,
            errors,
        }
    })
})

const checkList = (group) => {
    const groupResults = seoStore.resultManager.getResult(seoStore.selectedKeyWord)?.results
    const groupItems = seoStore.getGroupItems(group)
    let errors = 0;
    return {
        list: Object.keys( groupItems ).map( ( id ) => {
            if (
				!groupResults?.[id] ||
				( ! results.value.isPrimary && groupItems[ id ] )
			) {
				return false
			}
            const result = groupResults[ id ]
            
            let classes = {
                'test-ok': result.hasScore(),
                'test-fail': ! result.hasScore(),
            }
            if ( false === result.hasScore() ) {
                errors += 1
            }
            return {
                text: result.getText(),
                hasScore: result.hasScore(),
                classes
            }
        }).filter(item => item),
        errors,
    }
}

function getScoreClass( score ) {
    if ( 80 < score ) {
        return 'good-fk'
    }

    if ( 50 < score ) {
        return 'ok-fk'
    }

    return 'bad-fk'
}

</script>

<style lang="scss" scoped>
.v-textarea {
    padding: 10px;
    overflow: auto;
}
.keywords-chip {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    .v-chip {
        cursor: pointer;
        &.bad-fk {
            --v-chip-color: var(--danger);
            --v-chip-background-color: var(--danger-25);
            &.selected, &:hover {
                --v-chip-background-color: var(--danger-50);
            }
        }
        &.ok-fk {
            --v-chip-color: var(--warning);
            --v-chip-background-color: var(--warning-25);
            &.selected, &:hover {
                --v-chip-background-color: var(--warning-50);
            }
        }
        &.good-fk {
            --v-chip-color: var(--success);
            --v-chip-background-color: var(--success-25);
            &.selected, &:hover {
                --v-chip-background-color: var(--success-50);
            }
        }
    }
}

.seo-groups {
    margin-top: 10px;
}

.sidebar-detail {
    .v-chip {
        padding: 0 4px;
    }
}
.checklist {
    list-style: none;
    padding-left: 0;
    li {
        margin-bottom: 6px;
        line-height: 1.4;
    }
    .v-icon {
        margin-right: 4px;
        &.error {
            --v-icon-color: var(--red-50);
            --v-icon-color-hover: var(--red)
        }
        &.success {
            --v-icon-color: var(--success-50);
            --v-icon-color-hover: var(--success)
        }
    }
}
</style>