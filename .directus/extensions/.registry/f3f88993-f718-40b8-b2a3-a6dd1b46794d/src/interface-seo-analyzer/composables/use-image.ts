import { addTokenToURL, getPublicURL } from "../utils";
import useApp from "./use-app";

export default function useImage() {
    const app = useApp();
    const idToUrl = (id: string) => {
        return addTokenToURL(getPublicURL() + `assets/${id}`, app.access_token || '');
    }

    return {
        idToUrl
    }
}