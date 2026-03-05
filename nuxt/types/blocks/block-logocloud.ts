import type { File } from '../system';

export interface BlockLogocloud {
	headline?: string | null;
	id?: string;
	title?: string | null;
	logos?: (string | BlockLogocloudFile)[];
}
export interface BlockLogocloudFile {
	id?: string;
	sort?: number | null;
	block_logocloud_id?: (string | BlockLogocloud) | null;
	directus_files_id?: (string | File) | null;
}
