import type { User } from '../system';
import type { Form } from '../content';
import type { OsProject } from '../os';

export interface OsTaskFile {
	id?: string;
	os_tasks_id?: (string | OsTask) | null;
	directus_files_id?: (string | File) | null;
	sort?: number | null;
}

export interface OsTask {
	id?: string;
	status?: string;
	sort?: number | null;
	user_created?: (string | User) | null;
	date_created?: string | null;
	user_updated?: (string | User) | null;
	date_updated?: string | null;
	project?: (string | OsProject) | null;
	name?: string | null;
	description?: string | null;
	assigned_to?: (string | User) | null;
	due_date?: string | null;
	is_visible_to_client?: boolean;
	type?: string;
	date_completed?: string | null;
	responsibility?: string | null;
	start_date?: string | null;
	embed_url?: string | null;
	form?: (string | Form) | null;
	files?: (string | OsTaskFile)[];
	client_task_details?: string;
}
