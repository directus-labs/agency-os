import { createDirectus, rest, authentication } from '@directus/sdk';
import type { Schema } from '~/types/schema';

import { defineNuxtPlugin, useRuntimeConfig, useRoute } from '#imports';

export default defineNuxtPlugin((nuxtApp) => {
	const route = useRoute();
	const config = useRuntimeConfig();
	const directusURL = config.public.directus.rest.baseUrl as string;

	const directus = createDirectus<Schema>(directusURL, { globals: { fetch: $fetch } })
		.with(authentication('cookie', { credentials: 'include' }))
		.with(rest({ credentials: 'include' }));

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
