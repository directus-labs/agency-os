// ** Content Types **

export interface Page {
  id: string
  title: string
  slug: string
  image?: string
  blocks?: PageBlock[]
  seo?: Seo
}

export interface PageBlock {
  id: string
  collection:
    | 'block_hero'
    | 'block_faqs'
    | 'block_richtext'
    | 'block_testimonials'
    | 'block_quote'
    | 'block_cta'
    | 'block_form'
    | 'block_logocloud'
    | 'block_team'
    | 'block_html'
    | 'block_video'
    | 'block_gallery'
    | 'block_steps'
    | 'block_columns'
    | 'block_cardgroup'
  item: Object
}

export interface Post {
  id: string
  title: string
  summary: string
  image: string
  slug: string
  category?: {
    title: string
    slug: string
    color: string
  }
  author: Partial<User>
  seo?: Seo
}

export interface Project {
  id: string
  status: string
  sort: number
  title: string
  slug: string
  summary: string
  image: string
  content: string
  gallery?: any // TODO: add gallery type
  client?: string
  cost?: string
  built_with?: Array<string>
  date_created?: string
  date_updated?: string
  user_created?: string
  user_updated?: string
  seo?: Seo
}

export interface Category {
  id: string
  sort: number
  title: string
  color: string
  slug: string
  content: string
  seo?: Seo
}

export interface Seo {
  id?: string
  title?: string
  meta_description?: string
  no_index?: boolean
  no_follow?: boolean
  og_image?: string
  canonical_url?: string
  sitemap_priority?: number
  sitemap_change_frequency?: string
}

export interface Avatar {
  id: string
}

export interface Role {
  id: string
  name?: string
  description?: string
}

export interface User {
  id: string
  first_name?: string
  last_name?: string
  email: string
  token?: string
  last_login?: string
  last_page?: string
  theme?: 'auto' | 'dark' | 'light'
  role: Role
  timezone?: string
  language?: string
  avatar?: null | Avatar
}

export interface Form {
  id: string
  key?: string
  submit_label?: string
  schema: Array<{
    name: string
    type: string
    label: string
    placeholder: string
    help: string
    validation: string
    width: string | number
  }>
  on_success?: string
  redirect_url?: string
  success_message?: string
}

export interface NavigationItem {
  id: string
  title: string
  interface: string
  url: string
  open_in_new_tab: boolean
  has_children: boolean
  children: NavigationItem[]
  parent: string
  page: {
    slug: string
  }
}

export interface Navigation {
  id: string
  status: string
  title: string
  items: NavigationItem[]
}

export interface Redirect {
  id: string
  url_old: string
  url_new: string
  response_code: string | number
  date_created?: string
  date_updated?: string
  user_created?: string
  user_updated?: string
}

export interface Globals {
  id: string
  // SEO
  url?: string
  title?: string
  tagline?: string
  description?: string
  // Social
  og_image?: string
  social_links?: Array<{
    service?: string
    url?: string
  }>
  // Contact
  street_address?: string
  address_locality?: string
  address_region?: string
  postal_code?: string
  email?: string
  phone?: string
  // Deployment
  notice_deployment?: string
  build_hook_url?: string
  routes?: Array<{
    collection?: string
    route?: string
  }>
}

// ** Help Center Types **

export interface HelpCollection {
  id: string
  sort: number
  title?: string
  slug?: string
  icon?: string
  description?: string
  articles?: HelpArticle[]
}

export interface HelpArticle {
  id: string
  sort: number
  title?: string
  slug?: string
  summary?: string
  owner?: User
  content?: string
  help_collection?: HelpCollection | string
  user_created?: string
  user_updated?: string
  date_created?: string
  date_updated?: string
}

export interface HelpFeedback {
  id?: string
  title?: string
  url?: string
  rating: number
  visitor_id?: string
  comments?: string
  user_created?: string
  user_updated?: string
  date_created?: string
  date_updated?: string
}

// ** Realtime Types **

export interface Conversation {
  id: string
  status: string
  date_created: string
  date_updated: string
  title?: string
  messages?: Message[]
  visitor_id?: string
}

export interface Message {
  id: string
  text: string
  conversation: Conversation | string
  user_created?: string
  user_updated?: string
  date_created?: string
  date_updated?: string
}

// ** Directus SDK Types **
// This is not required, but it makes it easier to use the SDK

export interface DirectusCollections {
  pages: Page[]
  posts: Post[]
  projects: Project[]
  categories: Category[]
  directus_users: User[]
  forms: Form[]
  navigation: Navigation[]
  navigation_items: NavigationItem[]
  redirects: Redirect[]
  globals: Globals
  // Help Center
  help_collections: HelpCollection[]
  help_articles: HelpArticle[]
  help_feedback: HelpFeedback[]
  // Realtime
  conversations: Conversation[]
  messages: Message[]
}
