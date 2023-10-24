import {
	createDirectus,
	readItem,
	readItems,
	readSingleton,
	rest,
	createItem,
	updateItem,
	staticToken,
	withToken,
} from '@directus/sdk';
import type { Schema } from '~/types/schema';

const directusUrl = process.env.DIRECTUS_URL as string;

const directusServer = createDirectus<Schema>(directusUrl)
	.with(rest())
	.with(staticToken(process.env.DIRECTUS_SERVER_TOKEN as string));

export { directusServer, readItem, readItems, readSingleton, createItem, updateItem, withToken };
