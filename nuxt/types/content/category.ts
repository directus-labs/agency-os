import type { SEO } from '../meta';

export interface Category {
	color?: string | null;
	content?: string | null;
	id?: string;
	seo?: (string | SEO) | null;
	slug?: string | null;
	sort?: number | null;
	title?: string | null;
}
