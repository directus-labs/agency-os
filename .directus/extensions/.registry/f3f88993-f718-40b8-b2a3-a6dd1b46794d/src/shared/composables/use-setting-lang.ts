import { Ref, computed, onMounted, ref } from "vue"
import { useApi, useStores } from "@directus/composables"
import merge from 'lodash/merge'
import useLanguage from "./use-languages"
import { COLLECTION } from "../constants"
import { defu } from "defu";
import { get, mergeWith } from "lodash"

export default function useSettingLang() {
    const { useNotificationsStore } = useStores()
    const notify = useNotificationsStore()

    const settings = ref(defaultValue)
    const item = ref(defaultValue)
    const isNew = ref(false)
    const loading = ref(false)
    const saving = ref(false)
    const error = ref()
    
    console.log('defaultValue', defaultValue, item.value)
    
    const { currentLanguage, languages } = useLanguage()
    
    const itemLang = computed(() => {
        return (isMultilang && currentLanguage.value) ? item.value?.[currentLanguage.value] : item.value
    })

    const editData = computed({
        get: () => isMultilang ? settings.value?.[currentLanguage.value] : settings.value,
        set: (newValue) => {
            if (isMultilang) {
                
                settings.value[currentLanguage.value] = newValue
                return
            }

            settings.value = newValue
        },
    })

    async function getItem() {
        loading.value = true;
		error.value = null;

		try {
			const response = await api.get(`${endPoint}/${key}`, {params: {fields: ['*.*']}});

            if(response?.data?.data?.value) {
                item.value = response?.data?.data?.value;
            } else if(response?.data?.data) {
                item.value = response?.data?.data;
            }
		} catch (err: any) {
			error.value = err;
            isNew.value = true
		} finally {
			loading.value = false;
		}
    }

    return {
        getItem
    }
}