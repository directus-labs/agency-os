import type { User } from '../system';
import type { OrganizationContact, OsDealContact, OsActivityContact } from '../os';

export interface Contact {
	id?: string;
	/** Is this an active contact? */
	status?: string | null;
	user_created?: (string | User) | null;
	date_created?: string | null;
	user_updated?: (string | User) | null;
	date_updated?: string | null;
	first_name?: string | null;
	last_name?: string | null;
	user?: (string | User) | null;
	email?: string | null;
	phone?: string | null;
	job_title?: string | null;
	contact_notes?: string | null;
	organizations?: (string | OrganizationContact)[];
	os_deals?: (string | OsDealContact)[];
	activity?: string;
	activities?: (string | OsActivityContact)[];
}
