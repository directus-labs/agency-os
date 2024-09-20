import { getSectionField } from "../../../../shared/utils";
import businessType from "../../../configs/business-type";


export default [
    ...getSectionField(
        {
            title: 'Person or Company',
            field: 'person_or_company',
        },
        [
            {
                field: "local_type",
                type: "string",
                schema: {
                    default_value: "organization",
                },
                meta: {
                    field: "local_type",
                    special: null,
                    interface: "radio-button",
                    options: {
                        choices: [
                            {
                                text: "Person",
                                value: "person",
                                iconOn: null,
                                iconOff: null,
                            },
                            {
                                text: "Organization",
                                value: "organization",
                                iconOn: null,
                                iconOff: null,
                            },
                        ],
                    },
                    note: "Choose whether the site represents a person or an organization.",
                },
                name: "",
            },
        ]
    ),
    ...getSectionField(
        {
            title: 'Website Name',
            field: 'website_name',
        },
        [
            {
                field: "website_name",
                type: "string",
                meta: {
                    field: "website_name",
                    special: null,
                    interface: "input",
                    translations: [
                        {
                            language: "en-US",
                            translation: "",
                        },
                    ],
                    note: "Enter the name of your site to appear in search results.",
                },
                name: "",
            },
        ]
    ),
    ...getSectionField(
        {
            title: 'Website Alternate Name',
            field: 'website_alternate_name'
        },
        [

            {
                field: "website_alternate_name",
                type: "string",
                meta: {
                    field: "website_alternate_name",
                    special: null,
                    interface: "input",
                    note: "An alternate version of your site name (for example, an acronym or shorter name).",
                },
                name: "",
            },
        ]
    ),
    ...getSectionField(
        {
            title: 'Name',
            field: 'name'
        },
        [
            {
                field: "name",
                type: "string",
                meta: {
                    field: "name",
                    special: null,
                    interface: "input",
                },
                name: "",
            },
        ]
    ),
    ...getSectionField(
        {
            title: 'Logo',
            field: 'logo'
        },
        [
            {
                field: "logo",
                type: "uuid",
                meta: {
                    special: null,
                    interface: "image-upload",
                },
                name: "",
            },

        ]
    ),
    ...getSectionField(
        {
            title: 'URL',
            field: 'url'
        },
        [
            {
                field: "url",
                type: "string",
                schema: {
                    max_length: 255,
                },
                meta: {
                    special: null,
                    interface: "input",
                },
                name: "",
            },

        ]
    ),
    ...getSectionField(
        {
            title: 'Email',
            field: 'email'
        },
        [
            {
                field: "email",
                type: "string",
                schema: null,
                meta: {
                    special: null,
                    interface: "input",
                    validation: {
                        _and: [
                            {
                                email: {
                                    _regex: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
                                },
                            },
                        ],
                    },
                    validation_message: "Invalid email format!",
                },
                name: "",
            },

        ]
    ),
    ...getSectionField(
        {
            title: 'Phone Number',
            field: 'phone_number',
        },
        [

        ]
    ),
    ...getSectionField(
        {
            title: 'Address',
            field: 'address',
        },
        [
            {
                field: "street_address",
                type: "string",
                schema: {
                    max_length: 255,
                },
                meta: {
                    field: "street_address",
                    special: null,
                    interface: "input",
                    options: {
                        placeholder: "Street address",
                    },
                },
                name: "",
            },
            {
                field: "locality",
                type: "string",
                schema: {
                    max_length: 255,
                },
                meta: {
                    field: "locality",
                    special: null,
                    interface: "input",
                    options: {
                        placeholder: "Locality",
                    },
                },
                name: "",
            },
            {
                field: "region",
                type: "string",
                schema: {
                    default_value: null,
                    max_length: 255,
                },
                meta: {
                    special: null,
                    interface: "input",
                    options: {
                        placeholder: "Region",
                    },
                },
                name: "",
            },
            {
                field: "postal_code",
                type: "string",
                schema: {
                    default_value: null,
                    max_length: 255,
                },
                meta: {
                    field: "postal_code",
                    special: null,
                    interface: "input",
                    options: {
                        placeholder: "Postal code",
                    },
                },
                name: "",
            },
            {
                field: "country",
                type: "string",
                schema: {
                    default_value: null,
                    max_length: 255,
                },
                meta: {
                    special: null,
                    interface: "input",
                    options: {
                        placeholder: "Country",
                    },
                },
                name: "",
            },

        ]
    ),
    ...getSectionField(
        {
            title: 'Business Type',
            field: 'business_type',
        },
        [
            {
                field: "business_type",
                type: "string",
                meta: {
                    field: "business_type",
                    special: null,
                    interface: "select-dropdown",
                    options: {
                        choices: businessType,
                    },
                },
                schema: {
                    default_value: "Organization",
                },
            },
        ]
    ),
];
