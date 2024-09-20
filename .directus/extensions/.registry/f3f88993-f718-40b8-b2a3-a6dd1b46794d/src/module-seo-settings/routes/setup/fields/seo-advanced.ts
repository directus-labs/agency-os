import { COLLECTION } from "../../../../shared/constants";
import { translationsField } from "./languages";
import { getSeoDetailsField, getSeoDetailRelation } from "./seo-detail";

const seoAdvancedTranslationCollectionName = `${COLLECTION.seo_advanced}_translations`;

export const collectionSeoAdvanced = {
    collection: COLLECTION.seo_advanced,
    fields: [
        {
            field: "collection",
            type: "string",
            meta: {
                interface: "input",
                readonly: false,
                hidden: true,
            },
            schema: {
                is_primary_key: true,
                has_auto_increment: false,
            },
        },
        {
            field: "enabled",
            type: "boolean",
            schema: {},
            meta: {
                interface: "boolean",
                special: ["cast-boolean"],
                hidden: true,
            },
            collection: COLLECTION.seo_advanced,
        },
        {
            field: "is_static",
            type: "boolean",
            schema: {},
            meta: {
                interface: "boolean",
                special: ["cast-boolean"],
                hidden: true,
            },
            collection: COLLECTION.seo_advanced,
        },
    ],
    schema: {},
    meta: {
        singleton: false,
        sort: 2,
        group: COLLECTION.seo_setting,
    },
};

export const collectionSeoAdvancedTrans = {
    collection: seoAdvancedTranslationCollectionName,
    meta: {
        hidden: true,
        icon: "import_export",
        sort: 1,
        group: COLLECTION.seo_advanced,
    },
    schema: {
        name: seoAdvancedTranslationCollectionName,
    },
    fields: [
        {
            field: "id",
            type: "integer",
            schema: {
                has_auto_increment: true,
            },
            meta: {
                hidden: true,
            },
        },
        {
            //"collection": "seo_details_translations",
            field: `${COLLECTION.seo_advanced}_collection`,
            type: "string",
            schema: {},
            meta: {
                hidden: true,
            },
        },
        {
            //"collection": "seo_details_translations",
            field: "languages_code",
            type: "string",
            schema: {},
            meta: {
                hidden: true,
            },
        },
        getSeoDetailsField(seoAdvancedTranslationCollectionName, {
            isSEOAdvanced: true,
        }),
    ],
};

export const getRelationSeoAdvancedTranslation = (
    languageCollection = "languages",
    codeField = "code"
) => [
    {
        collection: seoAdvancedTranslationCollectionName,
        field: "languages_code",
        related_collection: languageCollection,
        meta: {
            one_field: null,
            sort_field: null,
            one_deselect_action: "nullify",
            junction_field: `${COLLECTION.seo_advanced}_collection`,
        },
        schema: {
            on_delete: "SET NULL",
            foreign_key_column: codeField,
        },
    },
    {
        collection: seoAdvancedTranslationCollectionName,
        field: `${COLLECTION.seo_advanced}_collection`,
        related_collection: COLLECTION.seo_advanced,
        meta: {
            one_field: "translations",
            junction_field: "languages_code",
        },
        schema: {
            on_delete: "SET NULL",
        },
    },
    getSeoDetailRelation(seoAdvancedTranslationCollectionName),
];

export const getCollectionSeoAdvanced = (defaultLanguage, languageDirectionField, languageField) => {
    // const field = getSeoDetailsField(COLLECTION.seo_advanced, {
    //     isSEOAdvanced: true,
    // });
    collectionSeoAdvanced.fields.push(translationsField(defaultLanguage, languageDirectionField, languageField));
    return collectionSeoAdvanced;
};
