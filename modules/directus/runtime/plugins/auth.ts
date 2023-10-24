import type { RestClient, AuthenticationClient } from '@directus/sdk';
import type { Schema } from '~/types/schema';

import auth from '../middleware/auth';
import guest from '../middleware/guest';
import common from '../middleware/common';

import {
	defineNuxtPlugin,
	addRouteMiddleware,
	useRuntimeConfig,
	useState,
	useDirectusAuth,
	useRoute,
	useNuxtApp,
} from '#imports';

export default defineNuxtPlugin(async () => {
	const nuxtApp = useNuxtApp();
	const $directus = nuxtApp.$directus as RestClient<Schema> & AuthenticationClient<Schema>;

	try {
		const config = useRuntimeConfig().public.directus;

		addRouteMiddleware('common', common, { global: true });

		addRouteMiddleware('auth', auth, {
			global: config.auth.enableGlobalAuthMiddleware,
		});

		addRouteMiddleware('guest', guest);

		const initialized = useState('directus-auth-initialized', () => false);

		const { _loggedIn } = useDirectusAuth();

		if (initialized.value === false) {
			const { path } = useRoute();

			const { fetchUser, _loggedIn } = useDirectusAuth();
			const token = await $directus.getToken();

			if (token) {
				await fetchUser({});
			} else {
				const isCallback = path === '/auth/callback';
				const isLoggedIn = _loggedIn.get() === 'true';

				if (isCallback || isLoggedIn) {
					if (token) {
						await fetchUser({});
					}
				}
			}
		}

		initialized.value = true;

		const { user } = useDirectusAuth();

		if (user.value) {
			_loggedIn.set(true);
		} else {
			_loggedIn.set(false);
		}
	} catch (err: any) {
		// console.error(e)
	}
});
