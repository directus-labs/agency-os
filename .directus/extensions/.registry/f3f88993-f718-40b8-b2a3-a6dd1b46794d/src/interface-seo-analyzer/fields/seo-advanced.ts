import { getSectionField } from "../../shared/utils";
import { schemaTypes } from "../../module-seo-settings/routes/setup/fields/seo-detail";

export default function getFields(collectionName: string) {
    return [
        ...getSectionField(
            {
                field: "meta_title",
                title: "Meta title",
            },
            [
                {
                    field: "meta_title",
                    name: "",
                    meta: {
                        interface: "meta-template",
                        options: {
                            collectionName,
                            inject: {
                                fields: [
                                    {
                                        field: "sep",
                                        name: "Seperator",
                                        collection: collectionName,
                                        type: "string",
                                    },
                                ],
                            },
                        },
                        width: "half",
                        note: "",
                    },
                },
            ]
        ),
        ...getSectionField(
            {
                field: "meta_description",
                title: "Meta description",
            },
            [
                {
                    field: "meta_description",
                    name: "",
                    meta: {
                        interface: "meta-template",
                        options: {
                            collectionName,
                            inject: {
                                fields: [
                                    {
                                        field: "sep",
                                        name: "Seperator",
                                        collection: collectionName,
                                        type: "string",
                                    },
                                ],
                            },
                        },
                        width: "half",
                        note: "",
                    },
                },
            ]
        ),
        ...getSectionField(
            {
                field: "schema_type",
                title: "Schema Type",
            },
            [
                {
                    field: "schema_type",
                    name: "",
                    meta: {
                        interface: "select-dropdown",
                        options: {
                            choices: schemaTypes,
                        },
                        width: "half",
                        note: "",
                    },
                },
            ]
        ),
        ...getSectionField(
            {
                field: "headline",
                title: "Headline",
            },
            [
                {
                    field: "headline",
                    name: "",
                    meta: {
                        interface: "meta-template",
                        options: {
                            collectionName,
                            inject: {
                                fields: [
                                    {
                                        field: "sep",
                                        name: "Seperator",
                                        collection: collectionName,
                                        type: "string",
                                    },
                                ],
                            },
                        },
                        width: "half",
                        note: "",
                    },
                },
            ]
        ),
        ...getSectionField(
            {
                field: "article_type",
                title: "Article Type",
            },
            [
                {
                    field: "article_type",
                    name: "",
                    schema: {
                        default_value: "organization",
                    },
                    meta: {
                        field: "article_type",
                        special: null,
                        interface: "radio-button",
                        options: {
                            choices: [
                                {
                                    text: "Article",
                                    value: "article",
                                    iconOn: null,
                                    iconOff: null,
                                },
                                {
                                    text: "Blog",
                                    value: "blog",
                                    iconOn: null,
                                    iconOff: null,
                                },
                                {
                                    text: "News Article",
                                    value: "news_article",
                                    iconOn: null,
                                    iconOff: null,
                                },
                            ],
                        },
                    },
                },
            ]
        ),
        ...getSectionField(
            {
                field: "meta_robots",
                title: "Robots meta",
            },
            [
                {
                    field: "meta_robots",
                    name: "Index Options",
                    type: "json",
                    meta: {
                        interface: "select-multiple-checkbox",
                        note: 'Custom values for robots meta tag',
                        options: {
                            "choices": [
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
            ]
        ),
    ];
}
