import { directus, updateItem, createItem } from '~~/server/utils/directus-server';

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event);
		const { id, title, url, rating, visitor_id, comments } = body;

		let response;

		if (id) {
			response = await directus.request(
				updateItem('help_feedback', id, {
					title,
					url,
					rating,
					visitor_id,
					comments,
				}),
			);
		} else {
			response = await directus.request(
				createItem('help_feedback', {
					title,
					url,
					rating,
					visitor_id,
					comments,
				}),
			);
		}

		return response;
	} catch (error) {
		console.error(error);
		return error;
	}
});
