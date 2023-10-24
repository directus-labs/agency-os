import type { Post, Page, HelpCollection, HelpArticle, PagesBlog, PagesProjects, SEO } from '~/types';

async function getPosts() {
	const posts = await directusServer.request(
		readItems('posts', {
			fields: [
				'id',
				'slug',
				'date_updated',
				{
					seo: ['canonical_url', 'sitemap_change_frequency', 'sitemap_priority'],
				},
			],
			// @ts-ignore
			filter: {
				status: {
					_eq: 'published',
				},
			},
			limit: -1,
		}),
	);

	const entries = posts.map((post) => {
		const seo = post.seo as SEO;

		return {
			loc: `/posts/${post.slug}`,
			lastmod: post.date_updated,
			changefreq: seo?.sitemap_change_frequency || 'monthly',
			priority: seo?.sitemap_priority || 0.5,
		};
	});

	return entries;
}

async function getPages() {
	const pages = await directusServer.request(
		readItems('pages', {
			fields: [
				'id',
				'permalink',
				'date_updated',
				{
					seo: ['canonical_url', 'sitemap_change_frequency', 'sitemap_priority'],
				},
			],
			// @ts-ignore
			filter: {
				status: {
					_eq: 'published',
				},
			},
			limit: -1,
		}),
	);

	const entries = pages.map((page) => {
		const seo = page.seo as SEO;

		return {
			loc: `${page.permalink}`,
			lastmod: page.date_updated,
			changefreq: seo?.sitemap_change_frequency || 'monthly',
			priority: seo?.sitemap_priority || 0.5,
		};
	});

	return entries;
}

async function getCategories() {
	const categories = await directusServer.request(
		readItems('categories', {
			fields: [
				'id',
				'slug',
				{
					seo: ['canonical_url', 'sitemap_change_frequency', 'sitemap_priority'],
				},
			],

			limit: -1,
		}),
	);

	const entries = categories.map((category) => {
		return {
			loc: `/posts/categories/${category.slug}`,
			changefreq: category.seo?.sitemap_change_frequency || 'monthly',
			priority: category.seo?.sitemap_priority || 0.5,
		};
	});

	return entries;
}

async function getHelpArticles() {
	const articles = await directusServer.request(
		readItems('help_articles', {
			fields: ['id', 'slug', 'date_updated'],
			// @ts-ignore
			filter: {
				status: {
					_eq: 'published',
				},
			},
			limit: -1,
		}),
	);

	const entries = articles.map((article) => {
		return {
			loc: `/help/articles/${article.slug}`,
			lastmod: article.date_updated,
			changefreq: 'daily',
			priority: 0.5,
		};
	});

	return entries;
}

async function getHelpCollections() {
	const collections = await directusServer.request(
		readItems('help_collections', {
			fields: ['id', 'slug'],
			// @ts-ignore
			filter: {
				articles: {
					_nnull: true,
				},
			},
			limit: -1,
		}),
	);

	const entries = collections.map((collection) => {
		return {
			loc: `/help/collections/${collection.slug}`,
			changefreq: 'daily',
			priority: 0.5,
		};
	});

	return entries;
}

async function getBlogAndProjctPages() {
	const blogPage = await directusServer.request(
		readSingleton('pages_blog', {
			fields: [
				{
					seo: ['canonical_url', 'sitemap_change_frequency', 'sitemap_priority'],
				},
			],
		}),
	);

	const projectPage = await directusServer.request(
		readSingleton('pages_projects', {
			fields: [
				{
					seo: ['canonical_url', 'sitemap_change_frequency', 'sitemap_priority'],
				},
			],
		}),
	);

	const entries = [
		{
			loc: `/posts`,
			changefreq: blogPage.seo?.sitemap_change_frequency || 'monthly',
			priority: blogPage.seo?.sitemap_priority || 0.5,
		},
		{
			loc: `/projects`,
			changefreq: projectPage.seo?.sitemap_change_frequency || 'monthly',
			priority: projectPage.seo?.sitemap_priority || 0.5,
		},
	];

	return entries;
}

export default defineEventHandler(async () => {
	const [posts, pages, categories, help_articles, help_collections, misc_pages] = await Promise.all([
		getPosts(),
		getPages(),
		getBlogAndProjctPages(),
		getCategories(),
		getHelpArticles(),
		getHelpCollections(),
	]);

	return [...posts, ...pages, ...misc_pages, ...categories, ...help_articles, ...help_collections];
});
