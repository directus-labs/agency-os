import { COLLECTION } from "../../../../shared/constants";

export const schemaTypes = [
    {
        text: "None",
        value: "",
    },
    {
        text: "Article",
        value: "article",
    },
    {
        text: "Book",
        value: "book",
    },
    {
        text: "Course",
        value: "course",
    },
    {
        text: "Event",
        value: "event",
    },
    {
        text: "Job Posting",
        value: "jobposting",
    },
    {
        text: "Music",
        value: "music",
    },
    {
        text: "Product",
        value: "product",
    },
    {
        text: "Recipe",
        value: "recipe",
    },
    {
        text: "Restaurant",
        value: "restaurant",
    },
    {
        text: "Video",
        value: "video",
    },
    {
        text: "Person",
        value: "person",
    },
    {
        text: "Service",
        value: "service",
    },
    {
        text: "Software Application",
        value: "software",
    },
];

export const collectionSeoDetails = {
    collection: "seo_detail",
    fields: [
        {
            field: "id",
            type: "integer",
            meta: {
                hidden: true,
                interface: "input",
                readonly: true,
            },
            schema: {
                is_primary_key: true,
                has_auto_increment: true,
            },
        },
        {
            field: "meta_title",
            type: "string",
            schema: {},
            meta: {
                interface: "input",
                special: null,
            },
        },
        {
            field: "meta_description",
            type: "string",
            schema: {},
            meta: {
                interface: "input",
                special: null,
            },
        },
        {
            field: "meta_keywords",
            type: "string",
            schema: {},
            meta: {
                interface: "input",
                special: null,
            },
        },
        {
            field: "schema_type",
            type: "string",
            schema: {},
            meta: {
                interface: "select-dropdown",
                special: null,
                options: {
                    choices: schemaTypes,
                },
            },
        },
        {
            field: "meta_robots",
            type: "json",
            meta: {
                interface: "select-multiple-checkbox",
                options: {
                    choices: [
                        {
                            text: "No Index",
                            value: "noindex",
                        },
                        {
                            text: "No follow",
                            value: "nofollow",
                        },
                        {
                            text: "No Archive",
                            value: "noarchive",
                        },
                        {
                            text: "No Image Index",
                            value: "noimageindex",
                        },
                        {
                            text: "No Snippet",
                            value: "nosnippet",
                        },
                    ],
                },
            },
        },
        {
            field: "meta_social",
            type: "string",
            schema: {},
            meta: {
                interface: "input-code",
                special: null,
                options: {
                    lineWrapping: true,
                },
            },
        },
        {
            field: "facebook_image",
            type: "uuid",
            schema: {},
            meta: {
                interface: "file-image",
                special: ["file"],
                hidden: true,
            },
        },
        {
            field: "twitter_image",
            type: "uuid",
            schema: {},
            meta: {
                interface: "file-image",
                special: ["file"],
                hidden: true,
            },
        },
    ],
    schema: {},
    meta: {
        singleton: false,
        sort: 3,
        group: COLLECTION.seo_setting,
    },
};

export const relationsSeoDetails = [
    {
        collection: COLLECTION.seo_detail,
        field: "facebook_image",
        related_collection: "directus_files",
        meta: {
            sort_field: null,
        },
        schema: {
            on_delete: "SET NULL",
        },
    },
    {
        collection: COLLECTION.seo_detail,
        field: "twitter_image",
        related_collection: "directus_files",
        meta: {
            sort_field: null,
        },
        schema: {
            on_delete: "SET NULL",
        },
    },
];

export const getSeoDetailsField = (
    collection: string,
    options: Object = {}
) => ({
    collection: collection,
    field: COLLECTION.seo_detail,
    type: "integer",
    schema: {
        name: COLLECTION.seo_detail,
        table: collection,
        data_type: "integer",
        is_generated: false,
        is_nullable: true,
        foreign_key_column: "id",
        foreign_key_table: COLLECTION.seo_detail,
    },
    meta: {
        collection: collection,
        field: COLLECTION.seo_detail,
        special: ["m2o"],
        interface: "seo_analyzer",
        options: {
            isSEOAdvanced: false,
            ...options,
        },
    },
});

export const getSeoDetailRelation = (collection: string) => {
    return {
        collection: collection,
        field: COLLECTION.seo_detail,
        related_collection: COLLECTION.seo_detail,
        schema: {
            table: collection,
            column: COLLECTION.seo_detail,
            foreign_key_table: COLLECTION.seo_detail,
            foreign_key_column: "id",
            on_delete: "SET NULL",
        },
        meta: {
            many_collection: collection,
            many_field: COLLECTION.seo_detail,
            one_collection: COLLECTION.seo_detail,
            one_deselect_action: "nullify",
        },
    };
};
