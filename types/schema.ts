import type {
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
import type { Page, PageBlock, Category, Form, Post, Team, Testimonial, PagesProjects, PagesBlog } from './content';
import type { Inbox, HelpArticle, HelpCollection, HelpFeedback } from './help';
import type { File, User } from './system';
import type {
	Conversation,
	Message,
	Contact,
	Organization,
	OrganizationAddress,
	OrganizationContact,
	OsActivity,
	OsActivityContact,
	OsDealContact,
	OsDeal,
	OsDealStage,
	OsEmailTemplate,
	OsExpense,
	OsInvoiceItem,
	OsInvoice,
	OsItem,
	OsPayment,
	OsPaymentTerm,
	OsProjectContact,
	OsProjectFile,
	OsProject,
	OsProjectTemplate,
	OsProposalApproval,
	OsProposalBlock,
	OsProposalContact,
	OsProposal,
	OsSettings,
	OsSubscription,
	OsTaskFile,
	OsTask,
	OsTaxRate,
} from './os';

/** Directus Schema for SDK */
export interface Schema {
	// Routes
	pages: Page[];
	pages_blocks: PageBlock[];

	// Content
	categories: Category[];
	forms: Form[];
	posts: Post[];
	team: Team[];
	testimonials: Testimonial[];
	pages_projects: PagesProjects;
	pages_blog: PagesBlog;

	// Blocks
	block_columns: BlockColumn[];
	block_cta: BlockCta[];
	block_faq: BlockFaq[];
	block_form: BlockForm[];
	block_gallery: BlockGallery[];
	block_hero: BlockHero[];
	block_html: BlockHtml[];
	block_logocloud: BlockLogocloud[];
	block_quote: BlockQuote[];
	block_richtext: BlockRichtext[];
	block_steps: BlockStep[];
	block_team: BlockTeam[];
	block_testimonial: BlockTestimonial[];
	block_video: BlockVideo[];

	// OS
	contacts: Contact[];
	organizations: Organization[];
	organization_addresses: OrganizationAddress[];
	organizations_contacts: OrganizationContact[];
	os_activities: OsActivity[];
	os_activity_contacts: OsActivityContact[];
	os_deal_contacts: OsDealContact[];
	os_deals: OsDeal[];
	os_deal_stages: OsDealStage[];
	os_email_templates: OsEmailTemplate[];
	os_expenses: OsExpense[];
	os_invoice_items: OsInvoiceItem[];
	os_invoices: OsInvoice[];
	os_items: OsItem[];
	os_payments: OsPayment[];
	os_payment_terms: OsPaymentTerm[];
	os_project_contacts: OsProjectContact[];
	os_project_files: OsProjectFile[];
	os_projects: OsProject[];
	os_project_templates: OsProjectTemplate[];
	os_proposal_approvals: OsProposalApproval[];
	os_proposal_blocks: OsProposalBlock[];
	os_proposal_contacts: OsProposalContact[];
	os_proposals: OsProposal[];
	os_settings: OsSettings;
	os_subscriptions: OsSubscription[];
	os_task_files: OsTaskFile[];
	os_tasks: OsTask[];
	os_tax_rates: OsTaxRate[];

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
