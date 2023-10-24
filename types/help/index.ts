import type { User } from '../system';
import type { Form } from '../content';

export interface HelpArticle {
	content?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	help_collection?: (string | HelpCollection) | null;
	id?: string;
	owner?: string | User | null;
	slug?: string | null;
	sort?: number | null;
	status?: string;
	summary?: string | null;
	title?: string | null;
	user_created?: string | User | null;
	user_updated?: string | User | null;
}

export interface HelpCollection {
	description?: string | null;
	icon?: string | null;
	id?: string;
	slug?: string | null;
	sort?: number | null;
	title?: string | null;
	articles?: (string | HelpArticle)[];
}

export interface HelpFeedback {
	comments?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	id?: string;
	rating?: number | null;
	title?: string | null;
	url?: string | null;
	user_created?: string | User | null;
	user_updated?: string | User | null;
	visitor_id?: string | null;
}

export interface Inbox {
	data?: { [key: string]: any } | null;
	date_created?: string | null;
	date_updated?: string | null;
	form?: (string | Form) | null;
	id?: string;
	sort?: number | null;
	status?: string;
	user_created?: string | User | null;
	user_updated?: string | User | null;
}
