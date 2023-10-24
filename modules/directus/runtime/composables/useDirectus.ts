import type { RestCommand, RestClient } from '@directus/sdk';
import type { Schema } from '~/types';
import { useNuxtApp } from '#imports';

export default async function useDirectus<Output extends object>(
	//@ts-ignore
	options: RestCommand<Output, DirectusSchema>,
): Promise<Output> {
	const nuxtApp = useNuxtApp();
	const $directus = nuxtApp.$directus as RestClient<Schema>;
	return await $directus.request<Output>(options);
}
