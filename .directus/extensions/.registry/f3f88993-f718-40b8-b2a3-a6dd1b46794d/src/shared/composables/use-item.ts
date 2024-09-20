import { Ref, computed, onMounted, ref } from "vue"
import { useApi, useStores } from "@directus/composables"
import merge from 'lodash/merge'
import useLanguage from "./use-languages"
import { COLLECTION } from "../constants"
import { defu } from "defu";
import { get, mergeWith } from "lodash"

export default function useItem(collection: string = '', key: string = '', isMultilang: boolean = true, defaultValue: any = {}) {
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
                
                settings.value[currentLanguage.value] = mergeWith({}, itemLang.value, newValue, function (_from: any, to: any) {
                    if (typeof to !== 'undefined') {
                        return to;
                    }
                })
                return
            }

            settings.value = mergeWith({}, item.value, newValue, function (_from: any, to: any) {
                if (typeof to !== 'undefined') {
                    return to;
                }
            })
        },
    })

    const api = useApi()
    const endPoint = `/items/${collection}`

    function getSaveValue() {
        let value = defaultValue
        if(isMultilang) {
            languages.value.map(({value: lang}) => {
                let itemValue = get(item.value, lang) || defaultValue
                let settingsValue = get(settings.value, lang) || defaultValue
                value[lang] =  mergeWith(itemValue, settingsValue, function (_from: any, to: any) {
                    if (typeof to !== 'undefined') {
                        return to;
                    }
                })
                // if(Object.keys(itemValue) || Object.keys(settingsValue)) {
                // }
            })
        } else {
            value = mergeWith(defaultValue, item.value, settings.value, function (_from: any, to: any) {
                if (typeof to !== 'undefined') {
                    return to;
                }
            },)
        }



        return value
    }

    // const saveData = computed(() => (collection === COLLECTION.seo_setting ? {
    //     value: getSaveValue()
    // } : mergeWith(defaultValue, item.value, settings.value, function (_from: any, to: any) {
    //     if (typeof to !== 'undefined') {
    //         return to;
    //     }
    // },)))

    async function getItem() {
        if( key === '+' ) {
            return
        }
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

    async function save(data: any = {}) {
        saving.value = true;

        try {
			let response;

            let requestData = isMultilang ? {
                value: {
                    ...item.value,
                    ...settings.value
                }
            } : settings.value
            
			if (isNew.value === true) {
                response = await api.post(endPoint, {...requestData, ...data});
                
			} else {
                response = await api.patch(`${endPoint}/${key}`, {...requestData, ...data});
                isNew.value = false
			}
            notify.add({
                type: 'success',
                title: 'Saved Successfully!'
            })

			if(response?.data?.data?.value) {
                item.value = response?.data?.data?.value;
            } else if(response?.data?.data) {
                item.value = response?.data?.data;
            }
            isNew.value = false
			return response.data.data;
		} catch (err: any) {
			// saveErrorHandler(err);
            console.log(err)
            notify.add({
                type: 'error',
                title: 'Save Error'
            })
		} finally {
			saving.value = false;
		}
    }

    onMounted(async () => {
        await getItem()
    })

    return {
        settings,
        item,
        itemLang,
        editData,
        // saveData,
        currentLanguage,
        languages,
        saving,
        loading,
        error,
        getItem,
        save,
    }
}