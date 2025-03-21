import { readMe } from '@directus/sdk';
import type { User } from '~/types';

export default function useDirectusAuth() {
	const { $directus } = useNuxtApp();

	const user: Ref<User | null | undefined> = useState('user');

	const config = useRuntimeConfig();

	const _loggedIn = {
		get: () => process.client && localStorage.getItem('authenticated'),
		set: (value: boolean) => process.client && localStorage.setItem('authenticated', value.toString()),
	};

	async function login(email: string, password: string) {
		const route = useRoute();

		await $directus.login(email, password);

		const returnPath = route.query.redirect?.toString();
		const redirect = returnPath ? returnPath : '/portal';

		_loggedIn.set(true);

		setTimeout(async () => {
			await fetchUser({ fields: ['*', { contacts: ['*'] }] });
			await navigateTo(redirect);
		}, 100);
	}

	async function logout() {
		await $directus.logout();

		user.value = null;

		await clearNuxtData();
		await navigateTo(config.public?.directus?.auth?.redirect?.login || '/auth/login');
	}

	async function fetchUser(params?: object) {
		const fields = config.public?.directus?.auth?.userFields || ['*'];

		const response = await $directus.request(
			readMe({
				// @ts-ignore
				fields,
				...params,
			}),
		);

		user.value = response as User;
	}

	return {
		user,
		login,
		logout,
		fetchUser,
		_loggedIn,
	};
}
