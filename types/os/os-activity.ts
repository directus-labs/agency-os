import type { User } from '../system';
import type { Organization, Contact, OsDeal } from './';

export interface OsActivity {
	id?: string;
	status?: string;
	sort?: number | null;
	user_created?: (string | User) | null;
	date_created?: string | null;
	user_updated?: (string | User) | null;
	date_updated?: string | null;
	deal?: (string | OsDeal) | null;
	activity_type?: string | null;
	activity_notes?: string | null;
	name?: string | null;
	organization?: (string | Organization) | null;
	start_time?: string | null;
	end_time?: string | null;
	due_date?: string | null;
	assigned_to?: (string | User) | null;
	contacts?: (string | OsActivityContact)[];
}

export interface OsActivityContact {
	id?: string;
	os_activities_id?: (string | OsActivity) | null;
	contacts_id?: (string | Contact) | null;
}
