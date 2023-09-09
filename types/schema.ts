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
} from './blocks';
import type {
	Globals,
	Navigation,
	Redirect,
	SEO,
	ProjectsSettings,
	PageSettings,
	ChatConfig,
	Event,
	Metric,
} from './meta';
import type { Page, PageBlock, Category, Form, Post, Project, Team, Testimonial } from './content';
import type { Conversation, Message, Inbox, HelpArticle, HelpCollection, HelpFeedback } from './help';
import type { File, User } from './system';

/** Directus Schema for SDK */
export interface Schema {
	// Routes
	pages: Page[];
	pages_blocks: PageBlock[];

	// Content
	categories: Category[];
	forms: Form[];
	posts: Post[];
	projects: Project[];
	team: Team[];
	testimonials: Testimonial[];

	// Blocks
	block_cardgroup: BlockCardgroup;
	block_column: BlockColumn;
	block_cta: BlockCta;
	block_faq: BlockFaq;
	block_form: BlockForm;
	block_gallery: BlockGallery;
	block_hero: BlockHero;
	block_html: BlockHtml;
	block_logocloud: BlockLogocloud;
	block_quote: BlockQuote;
	block_richtext: BlockRichtext;
	block_steps: BlockStep;
	block_team: BlockTeam;
	block_testimonial: BlockTestimonial;
	block_video: BlockVideo;

	// Help
	help_collections: HelpCollection[];
	help_articles: HelpArticle[];
	help_feedback: HelpFeedback[];
	inbox: Inbox[];
	conversations: Conversation[];
	messages: Message[];

	// Meta
	globals: Globals;
	navigation: Navigation[];
	redirects: Redirect[];
	seo: SEO[];
	projects_settings: ProjectsSettings;
	page_settings: PageSettings;
	chat_config: ChatConfig;

	// Data
	metrics: Metric[];
	events: Event[];

	// System
	directus_files: File[];
	directus_users: User[];
}
