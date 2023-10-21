import type { SEO } from '../meta';
import type { User } from '../system';
import type {
	BlockCardgroup,
	BlockColumn,
	BlockCta,
	BlockFaq,
	BlockForm,
	BlockGallery,
	BlockHero,
	BlockHtml,
	BlockLogocloud,
	BlockQuote,
	BlockRichtext,
	BlockStep,
	BlockTeam,
	BlockTestimonial,
	BlockVideo,
} from '../blocks';

export interface Page {
	id?: string;
	permalink: string;
	date_created?: string | null;
	date_updated?: string | null;
	seo?: (string | SEO) | null;
	sort?: number | null;
	status?: string;
	title?: string | null;
	user_created?: (string | User) | null;
	user_updated?: (string | User) | null;
	blocks?: (number | PageBlock)[];
}

export interface PageBlock {
	collection?: string | null;
	id?: string;
	item?:
		| (
				| string
				| BlockCardgroup
				| BlockColumn
				| BlockCta
				| BlockFaq
				| BlockForm
				| BlockGallery
				| BlockHero
				| BlockHtml
				| BlockLogocloud
				| BlockQuote
				| BlockRichtext
				| BlockStep
				| BlockTeam
				| BlockTestimonial
				| BlockVideo
		  )[]
		| null;
	pages_id?: (string | Page) | null;
	sort?: number | null;
}
