import { joinURL } from 'ufo';

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();

	if (!config.public.directus.rest.baseUrl) {
		throw new Error('Missing `runtimeConfig.apiURL` configuration.');
	}

	const target = joinURL(config.public.directus.rest.baseUrl, event.path.replace(/^\/api\/proxy\//, ''));

	return proxyRequest(event, target, {
		cookieDomainRewrite: new URL(config.public.siteUrl).hostname,
		cookiePathRewrite: '/',
	});
});
