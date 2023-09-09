import type { SEO } from '../meta';
import type { User } from '../system';

export interface Page {
	date_created?: string | null;
	date_updated?: string | null;
	id?: string;
	seo?: (string | SEO) | null;
	slug?: string | null;
	sort?: number | null;
	status?: string;
	title?: string | null;
	user_created?: string | null;
	user_updated?: string | null;
	blocks?: (number | PageBlock)[];
}

export interface PageBlock {
	collection?: string | null;
	id?: number;
	item?:
		| (
				| string
				| BlockCardgroup
				| BlockColumns
				| BlockCTA
				| BlockFaqs
				| BlockForm
				| BlockGallery
				| BlockHero
				| BlockHTML
				| BlockLogocloud
				| BlockQuote
				| BlockRichtext
				| BlockSteps
				| BlockTeam
				| BlockTestimonials
				| BlockVideo
		  )[]
		| null;
	pages_id?: (string | Page) | null;
	sort?: number | null;
}
