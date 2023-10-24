import type { User } from '../system';

export interface Redirect {
	date_created?: string | null;
	date_updated?: string | null;
	id?: string;
	response_code?: number | null | string;
	url_new: string;
	url_old: string;
	user_created?: string | User | null;
	user_updated?: string | User | null;
	notice_redirects?: string;
}
