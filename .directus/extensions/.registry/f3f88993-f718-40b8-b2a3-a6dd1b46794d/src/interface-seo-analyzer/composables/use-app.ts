import {useApi} from "@directus/extensions-sdk";

export default function useApp() {

    const api = useApi();
    let access_token = api.defaults.headers.common['Authorization']?.toString().split(' ')[1] || null;

    return {
        access_token
    }
}