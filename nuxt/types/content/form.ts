import type { User } from '../system';

export interface Form {
	date_created?: string | null;
	date_updated?: string | null;
	id?: string;
	key?: string | null;
	on_success?: string | null;
	redirect_url?: string | null;
	/** The fields for the form. */
	schema?: { [key: string]: any }[] | null;
	sort?: number | null;
	status?: string;
	/** The text for the submit button label. */
	submit_label?: string | null;
	success_message?: string | null;
	title?: string | null;
	user_created?: string | User | null;
	user_updated?: string | User | null;
}
