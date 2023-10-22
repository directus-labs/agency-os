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

const directusUrl = process.env.DIRECTUS_URL as string;

const directusServer = createDirectus<Schema>(directusUrl)
	.with(rest())
	.with(staticToken(process.env.DIRECTUS_ADMIN_TOKEN as string));

export {
	directusServer,
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
