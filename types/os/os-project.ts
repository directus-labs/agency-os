import type { User } from '../system';
import type { Organization, Contact, OsInvoice, OsTask, OsExpense } from '../os';

export interface OsProject {
	id?: string;
	status?: string;
	sort?: number | null;
	user_created?: (string | User) | null;
	date_created?: string | null;
	user_updated?: (string | User) | null;
	date_updated?: string | null;
	name?: string | null;
	organization?: (string | Organization) | null;
	description?: string | null;
	owner?: (string | User) | null;
	start_date?: string | null;
	due_date?: string | null;
	expenses?: (string | OsExpense)[];
	invoices?: (string | OsInvoice)[];
	contacts?: (string | OsProjectContact)[];
	billing?: string;
	tasks?: (string | OsTask)[];
}

export interface OsProjectContact {
	id?: string;
	os_projects_id?: (string | OsProject) | null;
	contacts_id?: (string | Contact) | null;
	sort?: number | null;
}

export interface OsProjectFile {
	id?: string;
}

export interface OsProjectTemplate {
	id?: string;
	status?: string;
	sort?: number | null;
	user_created?: (string | User) | null;
	date_created?: string | null;
	user_updated?: (string | User) | null;
	date_updated?: string | null;
	name?: string | null;
	tasks?: { [key: string]: any } | null;
	description?: string | null;
}
