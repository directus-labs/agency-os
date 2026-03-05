import type { User, File } from '../system';

export interface Team {
	bio?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	id?: string;
	image?: (string | File) | null;
	job_title?: string | null;
	name?: string | null;
	social_media?: { [key: string]: any } | null;
	sort?: number | null;
	status?: string;
	user_created?: string | User | null;
	user_updated?: string | User | null;
}
