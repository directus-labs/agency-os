import type { User } from '../system';

export interface Testimonial {
	company?: string | null;
	company_logo?: (string | File) | null;
	content?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	id?: string;
	image?: (string | File) | null;
	link?: string | null;
	sort?: number | null;
	status?: string;
	subtitle?: string | null;
	title?: string | null;
	user_created?: string | User | null;
	user_updated?: string | User | null;
	company_info?: string;
}
