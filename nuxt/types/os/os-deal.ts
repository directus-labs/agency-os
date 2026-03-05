import type { User } from '../system';
import type { Organization, Contact, OsProposal, OsActivity } from '../os';

export interface OsDeal {
	id?: string;
	status?: string;
	sort?: number | null;
	user_created?: (string | User) | null;
	date_created?: string | null;
	user_updated?: (string | User) | null;
	date_updated?: string | null;
	name?: string | null;
	owner?: (string | User) | null;
	organization?: (string | Organization) | null;
	close_date?: string | null;
	deal_stage?: (string | OsDealStage) | null;
	next_contact_date?: string | null;
	deal_value?: number | null;
	deal_notes?: string | null;
	comments?: string;
	proposals?: (string | OsProposal)[];
	contacts?: (string | OsDealContact)[];
	activity?: string;
	activities?: (string | OsActivity)[];
}

export interface OsDealContact {
	id?: string;
	primary?: boolean | null;
	os_deals_id?: (string | OsDeal) | null;
	contacts_id?: (string | Contact) | null;
	sort?: number | null;
}

export interface OsDealStage {
	id?: string;
	status?: string;
	sort?: number | null;
	user_created?: (string | User) | null;
	date_created?: string | null;
	user_updated?: (string | User) | null;
	date_updated?: string | null;
	name?: string | null;
	color?: string | null;
}
