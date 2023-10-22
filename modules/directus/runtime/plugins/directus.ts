import { createDirectus, rest, staticToken, authentication } from '@directus/sdk';
import type { Schema } from '~/types/schema';

export default defineNuxtPlugin(() => {
	const event = useRequestEvent();
	const config = useRuntimeConfig();
	const directusUrl = config.public.directusUrl as string;
	const directusToken = config.public.directusToken as string;

	const directus = createDirectus<Schema>(directusUrl, {
		globals: {
			// fetch: $fetch,
		},
	})
		.with(
			rest({
				onRequest: async (request) => {
					// console.log('request', request);
					return request;
				},
			}),
		)
		.with(staticToken(directusToken));
	// .with(authentication('cookie', { autoRefresh: true, credentials: 'include' }));

	// directus.login('ashley@example.com', 'password');

	return {
		provide: {
			directus /*: $directus */,
		},
	};
});
