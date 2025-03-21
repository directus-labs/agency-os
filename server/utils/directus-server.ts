import {
	createDirectus,
	createItem,
	readItem,
	readItems,
	readSingleton,
	rest,
	staticToken,
	updateItem,
	withToken,
} from '@directus/sdk';
import { joinURL } from 'ufo';
import type { Schema } from '~/types/schema';

const directusUrl = process.env.NUXT_PUBLIC_SITE_URL as string;

const directusServer = createDirectus<Schema>(joinURL(directusUrl, '/api/proxy'))
	.with(rest())
	.with(staticToken(process.env.DIRECTUS_SERVER_TOKEN as string));

export { createItem, directusServer, readItem, readItems, readSingleton, updateItem, withToken };
