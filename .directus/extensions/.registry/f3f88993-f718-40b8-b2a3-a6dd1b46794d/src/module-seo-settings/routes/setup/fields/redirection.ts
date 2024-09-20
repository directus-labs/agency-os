import { COLLECTION } from "../../../../shared/constants";

export const collectionRedirection = {
    collection: COLLECTION.seo_redirection,
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
            field: "date_created",
            type: "timestamp",
            meta: {
                special: ["date-created"],
                interface: "datetime",
                readonly: true,
                hidden: true,
                width: "half",
                display: "datetime",
                display_options: {
                    relative: true,
                },
            },
            schema: {},
        },
        {
            field: "date_updated",
            type: "timestamp",
            meta: {
                special: ["date-updated"],
                interface: "datetime",
                readonly: true,
                hidden: true,
                width: "half",
                display: "datetime",
                display_options: {
                    relative: true,
                },
            },
            schema: {},
        },
        {
            field: "status",
            type: "string",
            schema: {},
            meta: {
                interface: "input",
                special: null,
            },
        },
        {
            field: "old_url",
            type: "string",
            schema: {},
            meta: {
                interface: "input",
                special: null,
            },
        },
        {
            field: "new_url",
            type: "string",
            schema: {},
            meta: {
                interface: "input",
                special: null,
            },
        },
    ],
    schema: {},
    meta: {
        singleton: false,
        sort: 1,
        group: COLLECTION.seo_setting,
    },
};
