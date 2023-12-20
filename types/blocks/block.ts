import type { BlockColumn } from './block-column';
import type { BlockCta } from './block-cta';
import type { BlockFaq } from './block-faq';
import type { BlockForm } from './block-form';
import type { BlockGallery } from './block-gallery';
import type { BlockHero } from './block-hero';
import type { BlockHtml } from './block-html';
import type { BlockLogocloud } from './block-logocloud';
import type { BlockQuote } from './block-quote';
import type { BlockRichtext } from './block-richtext';
import type { BlockStep } from './block-steps';
import type { BlockTeam } from './block-team';
import type { BlockTestimonial } from './block-testimonial';
import type { BlockVideo } from './block-video';
import type { BlockDivider } from './block-divider';

export type BlockType =
	| 'block_columns'
	| 'block_cta'
	| 'block_faqs'
	| 'block_form'
	| 'block_gallery'
	| 'block_hero'
	| 'block_html'
	| 'block_logocloud'
	| 'block_quote'
	| 'block_richtext'
	| 'block_steps'
	| 'block_team'
	| 'block_testimonials'
	| 'block_video'
	| 'block_divider';

export type Block =
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
	| BlockDivider;
