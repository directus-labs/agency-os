/**
 * External dependencies
 */
import round from 'lodash/round'

/**
 * Get class by score.
 *
 * @param {number} score    Score.
 * @param {number} maxScore Maximum score.
 *
 * @return {string} Class.
 */
export default ( score, maxScore ) => {
	const percentage = round( ( score / maxScore ) * 100 )

	if ( 100 <= percentage ) {
		return
	}

	if ( 49 < percentage ) {
		return 'test-check-good'
	}

	if ( 30 < percentage ) {
		return 'test-check-ok'
	}

	return 'test-check-bad'
}


export const addQueryToPath = (path: string, query: Record<string, string>): string => {
    const queryParams = new URLSearchParams(path.split('?')[1] || '');

    for (const [key, value] of Object.entries(query)) {
        queryParams.set(key, value);
    }

    return path.split('?')[0] + '?' + queryParams;
}


export const addTokenToURL = (url: string, token: string): string => {
    if (!token) return url;
    return addQueryToPath(url, { access_token: token });
}

export const getPublicURL = (): string => {
    const path = window.location.href;
    const parts = path.split('/');
    const adminIndex = parts.indexOf('admin');
    return parts.slice(0, adminIndex).join('/') + '/';
}

let store: any;

export function notify(notification, inputStore: any = null): void {
	if (!store) store = inputStore;
	store.add(notification);
}