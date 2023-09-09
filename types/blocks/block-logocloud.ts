import type { File } from '../system';

export interface BlockLogocloud {
	headline?: string | null;
	id?: string;
	title?: string | null;
	logos?: (number | BlockLogocloudFile)[];
}
export interface BlockLogocloudFile {
	block_logocloud_id?: (string | BlockLogocloud) | null;
	file?: (string | File) | null;
	id?: number;
	sort?: number | null;
}
