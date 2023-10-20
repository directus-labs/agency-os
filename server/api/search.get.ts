import { getQuery } from 'h3';
import { directus, readItems, updateItem, createItem } from '~~/server/utils/directus-server';

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
		posts: (post: any) =>
			mapEntity({
				entity: post,
				title: post.title,
				type: 'post',
				urlPattern: '/posts/:slug',
				description: post.summary,
				image: post.image,
			}),
		projects: (project: any) =>
			mapEntity({
				entity: project,
				title: project.title,
				type: 'project',
				urlPattern: '/projects/:slug',
				description: project.summary,
				image: project.image,
			}),
		pages: (page: any) =>
			mapEntity({
				entity: page,
				title: page.title,
				type: 'page',
				urlPattern: '/:slug',
			}),
		categories: (category: any) =>
			mapEntity({
				entity: category,
				title: category.title,
				type: 'category',
				urlPattern: '/posts/categories/:slug',
			}),
		help_articles: (article: any) =>
			mapEntity({
				entity: article,
				title: article.title,
				type: 'article',
				urlPattern: '/help/articles/:slug',
				description: '',
				image: '',
			}),
	};

	return results.map(mapping[collection]);
}

export default cachedEventHandler(
	async (event) => {
		try {
			const config = useRuntimeConfig();

			const query = getQuery(event);

			let { collections, search, raw } = query;

			if (typeof collections === 'string') {
				collections = [collections];
			}

			if (
				!collections ||
				collections.every(
					(collection: string) => !['posts', 'projects', 'pages', 'categories', 'help_articles'].includes(collection),
				)
			) {
				throw new Error('Invalid or missing collections param');
			}

			const data = await Promise.all(
				collections.map(async (collection) => {
					const data = await directus.request(readItems(collection, { search: search ?? '' }));

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
		maxAge: 60 * 5, // Cache the results for 5 minutes
	},
);
