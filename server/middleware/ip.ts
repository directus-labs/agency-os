import { getRequestIP } from 'h3';

export default defineEventHandler((event) => {
	// Add the IP to the context
	// event.context.ip = getRequestIP(event, { xForwardedFor: true });
});
