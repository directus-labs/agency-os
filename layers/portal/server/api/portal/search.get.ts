import { getQuery } from 'h3';
import { directus, readItems, updateItem, createItem, withToken } from '~~/server/utils/directus-server';

function mapEntity({
	title,
	entity,
	type,
	urlPattern,
	description = '',
	image = '',
}: {
	title?: string;
	entity: any;
	type: string;
	urlPattern: string;
	description?: string;
	image?: string;
}) {
	if (urlPattern.includes(':slug')) {
		urlPattern = urlPattern.replace(':slug', entity.slug);
	}
	if (urlPattern.includes(':project')) {
		urlPattern = urlPattern.replace(':project', entity.project);
	}
	if (urlPattern.includes(':id')) {
		urlPattern = urlPattern.replace(':id', entity.id);
	}
	return {
		title,
		type,
		description,
		image,
		url: urlPattern,
	};
}

function mapResults(collection: string, results: any[]) {
	const mapping = {
		help_articles: (article: any) =>
			mapEntity({
				entity: article,
				title: article.title,
				type: 'article',
				urlPattern: '/help/articles/:slug',
				description: '',
				image: '',
			}),

		os_projects: (project: any) =>
			mapEntity({
				entity: project,
				title: project.name,
				type: 'project',
				urlPattern: '/portal/projects/:id',
				description: project.description,
				image: project.image,
			}),

		os_tasks: (task: any) =>
			mapEntity({
				entity: task,
				title: task.name,
				type: 'task',
				urlPattern: '/portal/projects/:project/tasks',
				description: task.description,
				image: '',
			}),

		os_invoices: (invoice: any) =>
			mapEntity({
				entity: invoice,
				title: `INV#-${invoice.invoice_number}`,
				type: 'invoice',
				urlPattern: '/portal/billing/invoices/:id',
				description: invoice.reference,
				image: '',
			}),
	};

	return results.map(mapping[collection]);
}

// Caching this call because we don't want to give our Directus server a heart attack on every keystroke
export default cachedEventHandler(
	async (event) => {
		try {
			const config = useRuntimeConfig();

			const query = getQuery(event);

			const cookies = parseCookies(event);

			const directusData = JSON.parse(cookies['directus-data']);
			const access_token = directusData?.access_token;

			// console.log(access_token);

			let { collections, search, raw } = query;

			if (typeof collections === 'string') {
				collections = [collections];
			}

			if (
				!collections ||
				collections.every(
					(collection: string) => !['help_articles', 'os_projects', 'os_tasks', 'os_invoices'].includes(collection),
				)
			) {
				throw new Error('Invalid or missing collections param');
			}

			const data = await Promise.all(
				collections.map(async (collection) => {
					const data = await directus.request(withToken(access_token, readItems(collection, { search: search ?? '' })));

					if (raw) {
						return data;
					} else {
						return mapResults(collection, data);
					}
				}),
			);

			return {
				statusCode: 200,
				data: data.flat(),
			};
		} catch (error) {
			console.error(error);
			return error;
		}
	},
	{
		// Cache for 60 seconds
		maxAge: 60,
		// Normally cachedEventHandler drops all the headers from the original request. This ensures that the cookie header is passed through.
		varies: ['cookie'],
	},
);
