<template>
    <div>
        <div class="field full">
            <div class="custom-upload">
                <div class="content wrap-view space-y-6">
                    <div class="space-y-4">
                        <img class="w-full min-h-50" :src="addTokenToURL(value)" alt="">
                        <v-upload from-library from-url @input="uploaded"></v-upload>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import useDirectusToken from "../../shared/composables/use-directus-token";

const { addTokenToURL } = useDirectusToken()

const emit = defineEmits(["update:value"])
const props = defineProps({
    title: {
        type: String
    },
    value: {
        type: String
    }
});

const uploaded = (data) => {
    emit("update:value", data.id)
}
</script>
