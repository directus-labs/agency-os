import {
	aggregate,
	createDirectus,
	readItem,
	createItem,
	readItems,
	readSingleton,
	uploadFiles,
	rest,
	realtime,
	staticToken,
} from '@directus/sdk';
import type { Schema } from '~/types/schema';

export default defineNuxtPlugin(() => {
	const config = useRuntimeConfig();
	const directusUrl = config.public.directusUrl as string;
	const directusWsUrl = config.public.directusWsUrl as string;

	const directus = createDirectus<Schema>(directusUrl).with(rest());

	const ws = createDirectus<Schema>(directusWsUrl)
		.with(staticToken('c2f6b_Zbz4NPEZqO4ikfUg352PRkoqdm'))
		.with(
			realtime({
				authMode: 'public',
			}),
		);

	return { provide: { directus, ws, readItem, createItem, readItems, uploadFiles, readSingleton, aggregate } };
});
