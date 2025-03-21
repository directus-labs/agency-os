import type { RestCommand } from '@directus/sdk';

export default async function useDirectus<Output extends object>(
	//@ts-ignore
	options: RestCommand<Output, DirectusSchema>,
): Promise<Output> {
	return useNuxtApp().$directus.request<Output>(options);
}
