import type { User } from '../system';
import type { SEO } from '../meta';
import type { Category } from '../content';

export interface Post {
	author?: (string | User) | null;
	category?: (string | Category) | null;
	content?: string | null;
	date_created?: string | null;
	date_published?: string | null;
	date_updated?: string | null;
	id?: string;
	image?: (string | File) | null;
	seo?: (string | SEO) | null;
	slug?: string | null;
	sort?: number | null;
	status?: string;
	summary?: string | null;
	title?: string | null;
	user_created?: string | null;
	user_updated?: string | null;
	links?: string;
	type?: PostType | null;
}

export type PostType = 'blog' | 'video' | 'project';
