<template>
    <sidebar-detail-edit title="SEO Analyzer" icon="analytics">
        <content-analyzer v-model="keywords"/>
    </sidebar-detail-edit>
</template>

<script setup lang="ts">
import SidebarDetailEdit from './sidebar-detail-edit.vue'
import ContentAnalyzer from './content-analyzer.vue'
import { ref, watch} from 'vue'

interface Props {
    modelValue: string[]
}

const props = withDefaults(defineProps<Props>(), {
});

const emit = defineEmits(['update:modelValue'])

const keywords = ref(props.modelValue)

watch(keywords, (value) => {
    emit('update:modelValue', value)
})
</script>