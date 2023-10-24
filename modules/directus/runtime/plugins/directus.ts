import { createDirectus, rest, authentication } from '@directus/sdk';
import type { AuthenticationClient, RestClient, AuthenticationStorage, AuthenticationData } from '@directus/sdk';
import type { Schema } from '~/types/schema';

import {
	defineNuxtPlugin,
	addRouteMiddleware,
	useRuntimeConfig,
	useState,
	useDirectusAuth,
	useRoute,
	useNuxtApp,
} from '#imports';

export default defineNuxtPlugin((nuxtApp) => {
	const route = useRoute();
	const config = useRuntimeConfig();
	const directusUrl = config.public.directus.rest.baseUrl as string;

	const { isTokenExpired } = useDirectusAuth();

	// We're creating a custom storage class to use the Nuxt so we can use auth on the server and clien
	class CookieStorage {
		get() {
			const cookie = useCookie('directus-auth');
			return cookie.value;
		}

		set(value: AuthenticationData) {
			const cookie = useCookie('directus-auth');
			cookie.value = value as any;
		}
	}

	const directus: RestClient<Schema> & AuthenticationClient<Schema> = createDirectus<Schema>(directusUrl, {
		globals: {
			fetch: $fetch, // We're using the built-in Nuxt $fetch from ofetch
		},
	})
		.with(authentication('json', { storage: new CookieStorage() as AuthenticationStorage, credentials: 'include' }))
		.with(
			rest({
				onRequest: async (request) => {
					const userToken = await directus.getToken();

					return request;
				},
			}),
		);

	// ** Live Preview Bits **
	// Check if we are in preview mode
	const preview = route.query.preview && route.query.preview === 'true';
	const token = route.query.token as string | undefined;

	// If we are in preview mode, we need to use the token from the query string
	if (preview && token) {
		directus.setToken(token);

		nuxtApp.hook('page:finish', () => {
			refreshNuxtData();
		});
	}

	return {
		provide: {
			directus,
		},
	};
});
