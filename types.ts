export interface Block {
  id: string
  collection: string
  item: Object
}

export interface Seo {
  id?: string
  title?: string
  meta_description?: string
  no_index?: boolean
  no_follow?: boolean
  canonical_url?: string
  site_map_priority?: number
  site_map_change_frequency?: string
  og_image?: string
  twitter_image?: string
}

export interface Page {
  id: string
  title: string
  slug: string
  image?: string
  blocks?: Block[]
  seo?: Seo
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

export interface Post {
  id: string
  title: string
  summary: string
  image: string
  slug: string
  category: {
    title: string
    slug: string
    color: string
  }
}

export interface Form {
  form: {
    id: string
    key?: string
    submit_label?: string
    schema: Array<{
      id: string
      interface: string
      label: string
      placeholder: string
      required: boolean
    }>
    on_success?: string
    redirect_url?: string
    success_message?: string
  }
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
