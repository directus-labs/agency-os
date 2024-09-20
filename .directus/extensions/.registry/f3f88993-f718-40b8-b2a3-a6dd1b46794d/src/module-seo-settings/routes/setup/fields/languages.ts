import { Field } from "@directus/types";
import { COLLECTION } from "../../../../shared/constants";

export const collectionLanguages = {
    collection: COLLECTION.language,
    meta: {},
    schema: {
        name: COLLECTION.language,
    },
    fields: [
        {
            field: "code",
            type: "string",
            schema: {
                is_primary_key: true,
            },
            meta: {
                // "hidden": true
            },
        },
        {
            field: "name",
            type: "string",
            schema: {},
            meta: {},
        },
        {
            field: "default",
            type: "boolean",
            schema: {
                default_value: false,
            },
            meta: {
                interface: "boolean",
                special: ["cast-boolean"],
            },
        },
        {
            field: "direction",
            type: "string",
            meta: {
                interface: "select-dropdown",
                options: {
                    choices: [
                        {
                            text: "LTR",
                            value: "ltr"
                        },
                        {
                            text: "RTL",
                            value: "rtl"
                        }
                    ]
                },
            },
            schema: {
                default_value: "ltr",
            }
        }
    ],
};

export const translationsField: Field = (defaultLanguage = 'en-US', languageDirectionField = 'direction', languageField = 'code') => ({
    field: "translations",
    type: "alias",
    meta: {
        interface: "translations",
        special: ["translations"],
        options: {
            defaultLanguage,
            languageDirectionField,
            languageField
        }
    },
    schema: null,
});
