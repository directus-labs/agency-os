import type { SEO } from '../meta';

export interface ChatConfig {
	/** Would you like to enable the chat / messenger widget on the site? */
	enabled?: boolean | null;
	hours?: { [key: string]: any } | null;
	id?: string;
	modules?: { [key: string]: any } | null;
	require_email?: string | null;
}

export interface PageSettings {
	[key: string]: any;
}

export interface ProjectsSettings {
	headline?: string | null;
	id?: string;
	seo?: (string | SEO) | null;
	title?: string | null;
}
