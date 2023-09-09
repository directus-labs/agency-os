import type { File } from '../system';

export interface BlockVideo {
	headline?: string | null;
	id?: string;
	title?: string | null;
	type?: string | null;
	video_file?: (string | File) | null;
	video_url?: string | null;
}
