import { useApi } from "@directus/composables";
import { COLLECTION } from "../constants";
import useItem from "./use-item";
import { useRouter } from 'vue-router'
import { onMounted } from "vue";

export default async function useCheckSetup() {
    const router = useRouter()
    const api = useApi()
    async function check() {
        await api.get(`/items/${COLLECTION.seo_setting}/setup`).then((response) => {
            if( response?.data?.data?.value?.enabled !== true ) {
                router.push('/seo-settings/setup')
            }
        }).catch(() => {
            router.push('/seo-settings/setup')
        })
    }
    onMounted(async () => await check())
}