import type { AuthenticationClient, RestClient } from '@directus/sdk';
import type { Schema } from '~/types/schema';

import auth from '../middleware/auth';
import common from '../middleware/common';
import guest from '../middleware/guest';

import {
	addRouteMiddleware,
	defineNuxtPlugin,
	useDirectusAuth,
	useNuxtApp,
	useRuntimeConfig,
	useState,
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

		const { _loggedIn, fetchUser } = useDirectusAuth();

		if (initialized.value === false) {
			await $directus.refresh();

			await fetchUser({});
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
