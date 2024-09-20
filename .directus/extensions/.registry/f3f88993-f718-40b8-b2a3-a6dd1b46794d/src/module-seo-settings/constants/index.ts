export const navigatorItems = [
    {
        icon: 'public',
        name: "General",
        to: `/seo-settings/title-meta`,
        childrens: [
            {
                icon: 'public',
                name: "Site basics",
                to: `/seo-settings/site-basic`,
            },
            {
                icon: 'public',
                name: "Title & Meta",
                to: `/seo-settings/title-meta`,
            },
            {
                icon: 'public',
                name: "Local SEO",
                to: `/seo-settings/local-seo`,
                // hidden: true,
            },
        ]
    },
    {
        icon: 'manage_accounts',
        name: "Advanced",
        to: `/seo-settings/advanced/scripts`,
        childrens: [
            {
                icon: 'public',
                name: "Sitemap",
                to: `/seo-settings/advanced/sitemap`,
                hidden: true,
            },
            {
                icon: 'public',
                name: "Scripts",
                to: `/seo-settings/advanced/scripts`,
            },

        ]
    },
    {
        icon: 'start',
        name: "Redirection",
        to: `/seo-settings/redirection`,
        hidden: true
    },
    {
        icon: 'construction',
        name: "Setup wizard",
        to: `/seo-settings/setup`,
    }
]