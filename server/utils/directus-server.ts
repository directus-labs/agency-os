import {
	aggregate,
	createDirectus,
	readItem,
	readItems,
	readSingleton,
	rest,
	createItem,
	createItems,
	updateItem,
	updateItems,
	staticToken,
	withToken,
} from '@directus/sdk';
import type { Schema } from '~/types/schema';

const config = useRuntimeConfig();
const directusUrl = config.public.directusUrl as string;

const directus = createDirectus<Schema>(directusUrl)
	.with(rest())
	.with(staticToken(config.public.directusToken as string));

export {
	directus,
	readItem,
	readItems,
	readSingleton,
	aggregate,
	createItem,
	createItems,
	updateItem,
	updateItems,
	withToken,
};
