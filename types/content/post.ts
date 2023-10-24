import type { User, File } from '../system';
import type { SEO } from '../meta';
import type { Category, Team } from '../content';

export interface Post {
	author?: (string | Team) | null;
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
	status?: 'draft' | 'published' | 'scheduled' | 'in_review' | 'archived';
	summary?: string | null;
	title?: string | null;
	user_created?: string | null;
	user_updated?: string | null;
	links?: string;
	type?: PostType;
	details?: string;
	gallery?: (number | ProjectFile)[];
	built_with?: { [key: string]: any } | null;
	client?: string | null;
	cost?: string | null;
	video_url?: string | null;
}

export type PostType = 'blog' | 'video' | 'project';

export interface ProjectFile {
	directus_files_id?: (string | File) | null;
	id?: number;
	project?: (string | File) | null;
	sort?: number | null;
}
