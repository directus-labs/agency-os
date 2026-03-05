import { generateId } from '~~/utils/strings';

export interface Session {
	id: string;
	date_created: string;
}

export default defineNuxtRouteMiddleware(() => {
	// Create a unique session ID for each visitor to track feedback through Help Articles
	const session = useCookie('session');

	if (!session.value) {
		const newSession: Session = {
			id: generateId(),
			date_created: new Date().toISOString(),
		};

		session.value = JSON.stringify(newSession);
	}
});
