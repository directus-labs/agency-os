import type { File } from '../system';

export interface BlockHero {
	buttons?: { [key: string]: any } | null;
	content?: string | null;
	headline?: string | null;
	id?: string;
	image?: (string | File) | null;
}
