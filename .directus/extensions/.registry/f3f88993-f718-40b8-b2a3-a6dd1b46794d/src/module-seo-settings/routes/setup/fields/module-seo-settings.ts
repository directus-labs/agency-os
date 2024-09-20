import { COLLECTION } from "../../../../shared/constants";

export const collectionModuleSettings = {
    collection: COLLECTION.seo_setting,
    fields: [
        {
            field: "key",
            type: "string",
            meta: {
                interface: "input",
                readonly: false,
                hidden: true,
            },
            schema: {
                is_primary_key: true,
                length: 255,
                has_auto_increment: false,
            },
        },
        {
            field: "value",
            type: "json",
            schema: {},
            meta: {
                interface: "input-code",
                special: ["cast-json"],
                options: {
                    lineWrapping: true,
                },
            },
            //"collection": "module_seo_settings"
        },
    ],
    schema: {},
    meta: {
        singleton: false,
    },
};
