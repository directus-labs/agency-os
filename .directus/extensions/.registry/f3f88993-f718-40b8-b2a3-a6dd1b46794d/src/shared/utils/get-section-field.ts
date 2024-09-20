import { Field } from "@directus/types"

export const getSectionField = (sectionField = {title: '', field: ''}, fields: Field[] = []) => {
    const { title, field } = sectionField
    return [
        {
            "field": `${field}_section`,
            "meta": {
                "field": `${field}_section`,
                "special": [
                    "alias",
                    "no-data",
                    "group"
                ],
                "interface": "group-section",
            },
            "name": ""
        },
        {
            "field": `${field}_left`,
            "meta": {
                "field": `${field}_left`,
                "special": [
                    "alias",
                    "no-data",
                    "group"
                ],
                "interface": "group-column",
                "width": "full",
                "group": `${field}_section`,
            },
            "name": ""
        },
        {
            "field": `${field}_title`,
            "meta": {
                "field": `${field}_title`,
                "special": [
                    "alias",
                    "no-data"
                ],
                "interface": "presentation-info",
                "options": {
                    title
                },
                "width": "full",
                "group": `${field}_left`,
            },
            "name": ""
        },
        {
            "field": `${field}_right`,
            "meta": {
                "field": `${field}_right`,
                "special": [
                    "alias",
                    "no-data",
                    "group"
                ],
                "interface": "group-column",
                "group": `${field}_section`,
            },
            "name": ""
        },
        ...fields?.map((f: any) => ({...f, meta: {...f.meta, group: `${field}_right`}}))
    ]
}