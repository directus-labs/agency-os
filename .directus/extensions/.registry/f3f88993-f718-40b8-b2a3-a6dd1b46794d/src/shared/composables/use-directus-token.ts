import { useApi } from "@directus/composables";
export default function useDirectusToken() {
    const api = useApi()

	return {
		addQueryToPath,
		getToken,
		addTokenToURL,
	};

	function addQueryToPath(path: string, query: {[key: string]: any}) {
		const queryParams = [];

		for (const [key, value] of Object.entries(query)) {
			queryParams.push(`${key}=${value}`);
		}

		return path.includes('?') ? `${path}&${queryParams.join('&')}` : `${path}?${queryParams.join('&')}`;
	}

	function getToken() {
		return (
			api.defaults?.headers?.['Authorization']?.split(' ')[1] ||
			api.defaults?.headers?.common?.['Authorization']?.split(' ')[1] ||
			null
		);
	}

	function addTokenToURL(url: string) {
		const accessToken = getToken();
		if (!accessToken) return url;
		return addQueryToPath(url, {
			access_token: accessToken,
		});
	}
}