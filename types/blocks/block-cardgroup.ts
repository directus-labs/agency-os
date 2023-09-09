import type { Post } from '../content';

export interface BlockCardgroup {
	group_type?: string | null;
	headline?: string | null;
	id?: string;
	title?: string | null;
	cards?: (string | BlockCardgroupCard)[];
	posts?: (number | BlockCardgroupPost)[];
}

export interface BlockCardgroupCard {
	block_cardgroup_id?: (string | BlockCardgroup) | null;
	href?: string | null;
	id?: string;
	image?: (string | File) | null;
	sort?: number | null;
	summary?: string | null;
	title?: string | null;
}

export interface BlockCardgroupPost {
	block_cardgroup_id?: (string | BlockCardgroup) | null;
	id?: number;
	posts_id?: (string | Post) | null;
}
