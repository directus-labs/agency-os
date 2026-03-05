export interface Event {
	id?: string;
	key?: string | null;
	metadata?: { [key: string]: any } | null;
	service?: string | null;
	session?: string | null;
	timestamp?: string | null;
	user?: string | null;
}

export interface Metric {
	id?: string;
	key?: string | null;
	metadata?: { [key: string]: any } | null;
	service?: string | null;
	timestamp?: string | null;
	value?: number | null;
}
