import { fileURLToPath } from 'url';
import {
	defineNuxtModule,
	addPlugin,
	createResolver,
	addImportsDir,
	addImports,
	extendRouteRules,
	useLogger,
} from '@nuxt/kit';
import { defu } from 'defu';
import { createDirectus, rest, readItems, readSingleton } from '@directus/sdk';

import type { Schema, Globals } from '../../types';

const log = useLogger();

export default defineNuxtModule({
	meta: {
		name: 'agencyos-nuxt-directus',
		configKey: 'directus',
		compatibility: {
			nuxt: '^3.0.0',
		},

		defaults: {
			rest: {
				baseUrl: 'http://localhost:8055',
				nuxtBaseUrl: 'http://localhost:3000',
			},
			auth: {
				enabled: true,
				enableGlobalAuthMiddleware: false,
				redirect: {
					home: '/home',
					login: '/auth/login',
					logout: '/auth/login',
					resetPassword: '/auth/reset-password',
					callback: '/auth/callback',
				},
			},
		},
	},

	async setup(moduleOptions, nuxt) {
		log.start('Loading Directus Module');

		if (!moduleOptions.rest.baseUrl) {
			log.warn(`Please make sure to set Directus baseUrl`);
		}

		// ** Runtime Logic **
		const { resolve } = createResolver(import.meta.url);
		const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url));

		// Auto-import Directus SDK rest commands
		const commands = [
			'createComment',
			'updateComment',
			'deleteComment',

			'createField',
			'deleteField',

			'readActivities',
			'readActivity',

			'readCollection',
			'readCollections',
			'createCollection',
			'updateCollection',
			'deleteCollection',

			'readField',
			'readFieldsByCollection',
			'readFields',
			'updateField',

			'aggregate',

			// Users
			'createUser',
			'createUsers',
			'readUser',
			'readUsers',
			'updateUser',
			'updateUsers',
			'deleteUser',
			'deleteUsers',

			// Auth
			'withToken',
			// We're not autoimporting these because we're using the authentication composable
			// 'login',
			// 'logout',
			'passwordReset',
			'resetPassword',
			'readProviders',

			// Current User
			'readMe',
			'updateMe',

			// Items
			'createItem',
			'createItems',
			'readItem',
			'readItems',
			'updateItem',
			'updateItems',
			'deleteItem',
			'deleteItems',
			'readSingleton',
			'updateSingleton',

			// Files
			'importFile',
			'uploadFiles',
			'readFile',
			'readFiles',
			'updateFile',
			'updateFiles',
			'deleteFile',
			'deleteFiles',

			// Folders
			'readFolder',
			'readFolders',
			'updateFolder',
			'updateFolders',

			// Utils
		];

		commands.forEach((name) => {
			addImports({
				name,
				as: name,
				from: '@directus/sdk',
			});
		});

		// Transpile the runtime directory
		nuxt.options.build.transpile.push(runtimeDir);

		// Initialize the module options
		nuxt.options.runtimeConfig.public.directus = defu(nuxt.options.runtimeConfig.public.directus, moduleOptions);

		// Add plugins
		const restPlugin = resolve(runtimeDir, './plugins/directus');
		const authPlugin = resolve(runtimeDir, './plugins/auth');
		addPlugin(restPlugin, { append: true });
		addPlugin(authPlugin, { append: true });

		// Add composables directory
		const composables = resolve(runtimeDir, 'composables');
		addImportsDir(composables);

		// ** Build Logic **
		const directus = createDirectus<Schema>(moduleOptions.rest.baseUrl).with(rest());

		// Handle Redirects
		const redirects = await directus.request(readItems('redirects'));

		for (const redirect of redirects) {
			let responseCode = redirect.response_code ? parseInt(redirect.response_code as any) : 301;

			if (responseCode !== 301 && responseCode !== 302) {
				responseCode = 301;
			}

			// Add the redirect to the route rules
			// https://nuxt.com/docs/guide/concepts/rendering#route-rules
			extendRouteRules(redirect.url_old as string, {
				redirect: {
					to: redirect.url_new,
					statusCode: responseCode as 301 | 302,
				},
			});
		}

		log.success(`${redirects.length} Redirects loaded`);

		for (const redirect of redirects) {
			log.info(`  • ${redirect.response_code}`, `From: ${redirect.url_old}`, `To: ${redirect.url_new}`);
		}

		// Add Globals
		const globals = await directus.request<Omit<Globals, 'id' | 'url'>>(readSingleton('globals'));
		nuxt.options.appConfig.globals = defu(nuxt.options.appConfig.globals, globals);
		log.success('Globals loaded into appConfig');

		// Add title template to the app head for use with useHead composable
		nuxt.options.app.head.titleTemplate = `%s - ${globals?.title ?? 'Agency OS'}`;

		log.success(`Directus Module Loaded`);
	},
});
