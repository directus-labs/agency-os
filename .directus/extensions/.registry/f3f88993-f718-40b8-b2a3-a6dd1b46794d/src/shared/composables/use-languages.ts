import { Ref, onMounted, ref } from "vue"
import { useApi } from "@directus/composables"
import { COLLECTION } from "../constants"

export default function useLanguage() {
    const languages = ref([])
    const currentLanguage = ref('en-US')
    const api = useApi()

    onMounted(async() => {
        await api.get(`/items/${COLLECTION.language}?limit=-1`).then((res) => {
            languages.value = res?.data?.data?.map((item: any) => {

                if( !!item?.default ) {
                    currentLanguage.value = item.code
                }


                return {
                    text: item.name,
                    direction: undefined,
                    value: item.code,
                    edited: undefined,
                    progress: 100,
                    max: 100,
                    current: 100,
                }
            }) || []
        })
    })

    return {
        languages,
        currentLanguage
    }
}