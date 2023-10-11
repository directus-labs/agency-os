export interface OsSubscription {
	id?: string;
	quantity?: number | null;
	cancel_at_period_end?: boolean | null;
	created?: string | null;
	ended_at?: string | null;
	status?: string | null;
	cancel_at?: string | null;
	canceled_at?: string | null;
	trial_start?: string | null;
	trial_end?: string | null;
}
