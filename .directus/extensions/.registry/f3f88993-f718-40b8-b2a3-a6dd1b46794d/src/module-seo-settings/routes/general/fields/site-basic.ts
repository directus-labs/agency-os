import { getSectionField } from "../../../../shared/utils/get-section-field";

const facebookConditions = [
    {
        name: "social_facebook",
        rule: {
            _and: [
                {
                    social_sharing_tab: {
                        _neq: "facebook",
                    },
                },
            ],
        },
        hidden: true,
        options: {
            font: "sans-serif",
            trim: false,
            masked: false,
            clear: false,
            slug: false,
        },
    },
]

const twitterConditions = [
    {
        name: "social_twitter",
        rule: {
            _and: [
                {
                    social_sharing_tab: {
                        _neq: "twitter",
                    },
                },
            ],
        },
        hidden: true,
        options: {
            font: "sans-serif",
            trim: false,
            masked: false,
            clear: false,
            slug: false,
        },
    },
]

export default [
    ...getSectionField(
        {
            title: 'Default Meta',
            field: 'default_meta'
        },
        [
            {
                field: "meta_title",
                type: "string",
                schema: {
                    name: "meta_title",
                },
                meta: {
                    field: "meta_title",
                    interface: "input",
                    note: "Default title tag for single all pages. This can be changed on a per-post basis on the content detail screen.",
                },
                name: "Meta Title",
            },
            {
                field: "meta_description",
                type: "text",
                meta: {
                    field: "meta_description",
                    interface: "input-multiline",
                    options: {
                        softLength: 255,
                    },
                    note: "Default meta title for single all pages. This can be changed on a per-post basis on the content detail screen.",
                },
                name: "Meta Description",
            },
        ]
    ),
    ...getSectionField(
        {
            field: 'meta_robots',
            title: 'Robots meta',
        },
        [
            {
                field: "meta_robots",
                name: "Index Options",
                type: "json",
                meta: {
                    width: "full",
                    interface: "select-multiple-checkbox",
                    options: {
                        "choices": [
                            {
                                "text": "Index",
                                "value": "index"
                            },
                            {
                                "text": "No Index",
                                "value": "noindex"
                            },
                            {
                                "text": "No follow",
                                "value": "nofollow"
                            },
                            {
                                "text": "No Archive",
                                "value": "noarchive"
                            },
                            {
                                "text": "No Image Index",
                                "value": "noimageindex"
                            },
                            {
                                "text": "No Snippet",
                                "value": "nosnippet"
                            }
                        ],
                        "itemsShown": 6
                    }
                }
            },
            {
                field: 'robots_txt',
                name: 'Edit robots.txt',
                meta: {
                    interface: 'input-code'
                }
            },
        ]
    ),
    ...getSectionField(
        {
            title: 'Social Sharing',
            field: 'social_sharing',
        },
        [
            {
                field: "social_sharing_tab",
                type: "string",
                schema: {
                    default_value: "facebook",
                },
                meta: {
                    field: "social_sharing_tab",
                    special: null,
                    interface: "radio-button",
                    options: {
                        choices: [
                            {
                                text: "Facebook",
                                value: "facebook",
                            },
                            {
                                text: "Twitter",
                                value: "twitter",
                            },
                        ],
                    },
                },
                name: "",
            },
            {
                field: "facebook_image",
                type: "uuid",
                meta: {
                    special: null,
                    interface: "social-preview",
                    options: null,
                    width: "full",
                    note: null,
                    conditions: facebookConditions,
                },
                name: "",
            },
            {
                field: "facebook_title",
                type: "string",
                schema: {
                    name: "facebook_title",
                },
                meta: {
                    field: "facebook_title",
                    special: null,
                    interface: "input",
                    conditions: facebookConditions,
                },
                name: "Facebook Title",
            },
            {
                field: "facebook_description",
                type: "string",
                schema: {
                    name: "facebook_description",
                },
                meta: {
                    field: "facebook_description",
                    interface: "input",
                    conditions: facebookConditions,
                },
                name: "Facebook Description",
            },
            {
                field: "facebook_page_url",
                type: "string",
                schema: {
                    name: "facebook_page_url",
                },
                meta: {
                    field: "facebook_page_url",
                    special: null,
                    interface: "input",
                    conditions: facebookConditions,
                },
                name: "Facebook Page URL",
            },
            {
                field: "facebook_authorship",
                type: "string",
                schema: {
                    name: "facebook_authorship",
                },
                meta: {
                    field: "facebook_authorship",
                    special: null,
                    interface: "input",
                    conditions: facebookConditions,
                },
                name: "Facebook Authorship",
            },
            {
                field: "facebook_admin",
                type: "string",
                schema: {
                    name: "facebook_admin",
                },
                meta: {
                    field: "facebook_admin",
                    special: null,
                    interface: "input",
                    conditions: facebookConditions,
                },
                name: "Facebook Admin",
            },
            {
                field: "facebook_app",
                type: "string",
                schema: {
                    name: "facebook_app",
                },
                meta: {
                    field: "facebook_app",
                    special: null,
                    interface: "input",
                    conditions: facebookConditions,
                },
                name: "Facebook App",
            },
            {
                field: "facebook_secret",
                type: "string",
                schema: {
                    name: "facebook_secret",
                },
                meta: {
                    field: "facebook_secret",
                    special: null,
                    interface: "input",
                    conditions: facebookConditions,
                },
                name: "Facebook Secret",
            },
            {
                field: "twitter_image",
                type: "uuid",
                meta: {
                    special: null,
                    interface: "social-preview",
                    options: {
                        provider: 'twitter'
                    },
                    conditions: twitterConditions,
                },
                name: "",
            },
            {
                field: "twitter_title",
                type: "string",
                schema: {
                    name: "twitter_title",
                },
                meta: {
                    field: "twitter_title",
                    special: null,
                    interface: "input",
                    conditions: twitterConditions,
                },
                name: "Twitter Title",
            },
            {
                field: "twitter_description",
                type: "string",
                meta: {
                    field: "twitter_description",
                    interface: "input",
                    conditions: twitterConditions,
                },
                name: "Twitter Description",
            },

        ]
    ),
    ...getSectionField(
        {
            title: 'Site Connection',
            field: 'site_connections',
        },
        [
            {
                field: "google_verification_code",
                type: "string",
                schema: {
                    name: "google_verification_code",
                },
                meta: {
                    field: "google_verification_code",
                    special: null,
                    interface: "input",
                    options: {
                        placeholder: "Add verification code",
                    },
                    note: "Get your verification code in [Google Search console](https://search.google.com/search-console/).",
                },
                name: "Google Verification Code",
            },
            {
                field: "bing_verification_code",
                type: "string",
                schema: {
                    name: "bing_verification_code",
                },
                meta: {
                    field: "bing_verification_code",
                    special: null,
                    interface: "input",
                    options: {
                        placeholder: "Add verification code",
                    },
                    note: "Get your verification code in [Bing Webmaster Tools](https://www.bing.com/webmasters/about).",
                },
                name: "Bing Verification Code",
            },
            {
                field: "pinterest_verification_code",
                type: "string",
                schema: {
                    name: "pinterest_verification_code",
                },
                meta: {
                    field: "pinterest_verification_code",
                    special: null,
                    interface: "input",
                    options: {
                        placeholder: "Add verification code",
                    },
                    note: "Claim your site over at Pinterest.",
                },
                name: "Pinterest Verification Code",
            },
            {
                field: "yandex_verification_code",
                type: "string",
                schema: {
                    name: "yandex_verification_code",
                },
                meta: {
                    field: "yandex_verification_code",
                    special: null,
                    interface: "input",
                    options: {
                        placeholder: "Add verification code",
                    },
                    note: "Get your verification code in [Yandex Webmaster tools](https://webmaster.yandex.com/).",
                },
                name: "Yandex Verification Code",
            },
            {
                field: "baidu_verification_code",
                type: "string",
                schema: {
                    name: "baidu_verification_code",
                },
                meta: {
                    field: "baidu_verification_code",
                    special: null,
                    interface: "input",
                    options: {
                        placeholder: "Add verification code",
                    },
                    note: "Get your verification code in [Baidu Webmaster tools](https://ziyuan.baidu.com/login/index?u=/site/siteadd).",
                },
                name: "Baidu Verification Code",
            },

        ]
    ),
];
