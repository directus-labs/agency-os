import type { SEO } from '../meta';
import type { File, User } from '../system';

export interface Project {
	built_with?: { [key: string]: any } | null;
	client?: string | null;
	content?: string | null;
	/** Use a range */
	cost?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	id?: string;
	image?: (string | File) | null;
	seo?: (string | SEO) | null;
	slug?: string | null;
	sort?: number | null;
	status?: string;
	/** Write a 2-3 sentence summary of this project. */
	summary?: string | null;
	title?: string | null;
	user_created?: string | User | null;
	user_updated?: string | User | null;
	details?: string;
	gallery?: (number | ProjectFile)[];
}

export interface ProjectFile {
	directus_files_id?: (string | File) | null;
	id?: number;
	project?: (string | Project) | null;
	sort?: number | null;
}
