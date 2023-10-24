import type { User, File } from '../system';
import type {
	BlockDivider,
	BlockFaq,
	BlockLogocloud,
	BlockQuote,
	BlockRichtext,
	BlockStep,
	BlockTeam,
	BlockVideo,
} from '../blocks';
import type { Organization, Contact, OsDeal } from '../os';

export interface OsProposal {
	id?: string;
	sort?: number | null;
	user_created?: (string | User) | null;
	date_created?: string | null;
	user_updated?: (string | User) | null;
	date_updated?: string | null;
	name?: string | null;
	organization?: (string | Organization) | null;
	deal?: (string | OsDeal) | null;
	owner?: (string | User) | null;
	status?: string;
	contacts?: (string | OsProposalContact)[];
	activity?: string;
	approvals?: (string | OsProposalApproval)[];
	/** This is the content of your proposal */
	blocks?: (string | OsProposalBlock)[];
}

export interface OsProposalApproval {
	id?: string;
	status?: string;
	sort?: number | null;
	user_created?: (string | User) | null;
	date_created?: string | null;
	user_updated?: (string | User) | null;
	date_updated?: string | null;
	signature_text?: string | null;
	signature_image?: (string | File) | null;
	signature_type?: string | null;
	first_name?: string | null;
	last_name?: string | null;
	organization?: string | null;
	proposal?: (string | OsProposal) | null;
	email?: string | null;
	metadata?: { [key: string]: any } | null;
	ip_address?: string | null;
	esignature_agreement?: boolean | null;
	contact?: (string | Contact) | null;
}

export interface OsProposalBlock {
	id?: string;
	sort?: number | null;
	user_created?: (string | User) | null;
	date_created?: string | null;
	user_updated?: (string | User) | null;
	date_updated?: string | null;
	os_proposals_id?: (string | OsProposal) | null;
	item?:
		| (
				| string
				| BlockDivider
				| BlockFaq
				| BlockLogocloud
				| BlockQuote
				| BlockRichtext
				| BlockStep
				| BlockTeam
				| BlockVideo
		  )[]
		| null;
	collection?: string | null;
}

export interface OsProposalContact {
	id?: string;
	os_proposals_id?: (string | OsProposal) | null;
	contacts_id?: (string | Contact) | null;
	sort?: number | null;
}
