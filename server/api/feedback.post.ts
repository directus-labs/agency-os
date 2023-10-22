export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event);
		const { id, title, url, rating, visitor_id, comments } = body;

		let response;

		if (id) {
			response = await directusServer.request(
				updateItem('help_feedback', id, {
					title,
					url,
					rating,
					visitor_id,
					comments,
				}),
			);
		} else {
			response = await directusServer.request(
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
	} catch (err: any) {
		throw createError({
			statusCode: 500,
			statusMessage: err.message,
		});
	}
});
