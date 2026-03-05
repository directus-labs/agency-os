import { defineNuxtRouteMiddleware, useRuntimeConfig, navigateTo, useDirectusAuth } from '#imports';

export default defineNuxtRouteMiddleware((to) => {
	const config = useRuntimeConfig().public.directus;

	if (to.path === config.auth.redirect.login || to.path === config.auth.redirect.callback) {
		return;
	}

	const { user } = useDirectusAuth();

	if (user.value) {
		return navigateTo(config.auth.redirect.home);
	}
});
