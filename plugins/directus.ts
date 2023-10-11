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
	staticToken,
} from '@directus/sdk';
import type { Schema } from '~/types/schema';

export default defineNuxtPlugin(() => {
	const config = useRuntimeConfig();
	const directusUrl = config.public.directusUrl as string;

	const directus = createDirectus<Schema>(directusUrl).with(rest());

	return {
		provide: {
			directus,
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
