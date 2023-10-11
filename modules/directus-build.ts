import { defineNuxtModule, extendRouteRules, useLogger } from '@nuxt/kit';
import { createDirectus, readItems, rest } from '@directus/sdk';
import type { Schema } from '../types';

const log = useLogger();

export default defineNuxtModule({
	async setup(moduleOptions, nuxt) {
		log.start('Loading Directus Module');

		const directusUrl = nuxt.options.runtimeConfig.public.directusUrl as string | undefined;
		const directusToken = nuxt.options.runtimeConfig.directusToken;

		if (!directusUrl) {
			throw new Error('Missing directusUrl in runtimeConfig');
		}

		if (!directusToken) {
			throw new Error('Missing directusToken in runtimeConfig');
		}

		const directus = createDirectus<Schema>(directusUrl).with(rest());

		// ** Handle Redirects **
		const redirects = await directus.request(readItems('redirects'));

		for (const redirect of redirects) {
			let responseCode = redirect.response_code ? parseInt(redirect.response_code) : 301;

			if (responseCode !== 301 && responseCode !== 302) {
				responseCode = 301;
			}

			// Add the redirect to the route rules
			// https://nuxt.com/docs/guide/concepts/rendering#route-rules

			extendRouteRules(redirect.url_old, {
				redirect: {
					to: redirect.url_new,
					statusCode: responseCode as 301 | 302,
				},
			});
		}

		log.success(`${redirects.length} Redirects loaded`);
		for (const redirect of redirects) {
			console.log(`  • ${redirect.response_code}`, `From: ${redirect.url_old}`, `To: ${redirect.url_new}`);
		}

		// ** Add Globals **
		const globals = await directus.request(readItems('globals'));

		// Add the globals to the app config under the globals key
		nuxt.options.appConfig.globals = globals;

		log.success('Globals loaded into appConfig');

		// Add title template to the app head for use with useHead composable
		nuxt.options.app.head.titleTemplate = `%s - ${globals?.title ?? 'Agency OS'}`;
	},
});
