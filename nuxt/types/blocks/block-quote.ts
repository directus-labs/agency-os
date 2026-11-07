import type { File } from '../system';

export interface BlockQuote {
	background_color?: string | null;
	content?: string | null;
	headline?: string | null;
	id?: string;
	image?: (string | File) | null;
	subtitle?: string | null;
	title?: string | null;
}
