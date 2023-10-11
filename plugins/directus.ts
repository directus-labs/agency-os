import {
	aggregate,
	createDirectus,
	readItem,
	createItem,
	readItems,
	readSingleton,
	updateItem,
	updateItems,
	readFile,
	readFiles,
	uploadFiles,
	readFolder,
	readFolders,
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
		.with(staticToken(config.public.directusToken as string))
		.with(
			realtime({
				authMode: 'public',
			}),
		);

	return {
		provide: {
			directus,
			ws,
			readItem,
			createItem,
			updateItem,
			updateItems,
			readItems,
			readFolder,
			readFolders,
			readFile,
			readFiles,
			uploadFiles,
			readSingleton,
			aggregate,
		},
	};
});
