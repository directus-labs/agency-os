import type { User } from '../system';

export interface Conversation {
	date_created?: string | null;
	date_updated?: string | null;
	id?: string;
	status?: string;
	title?: string | null;
	visitor_id?: string | null;
	item?: string | null;
	collection?: string | null;
	messages?: (string | Message)[];
}

export interface Message {
	conversation?: (string | Conversation) | null;
	date_created?: string | null;
	date_updated?: string | null;
	id?: string;
	text?: string | null;
	user_created?: (string | User) | null;
	user_updated?: (string | User) | null;
	visitor_id?: string | null;
	contact_id?: string | null;
}
