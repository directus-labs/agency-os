import { getSectionField } from "../../../../shared/utils";
import { schemaTypes } from '../../setup/fields/seo-detail'

export default function getFields(collectionName: string) {
    return [
        ...getSectionField(
            {
                field: 'single_title',
                title: 'Single title',
            },
            [
                {
                    field: 'single_title',
                    name: '',
                    meta: {
                        interface: 'meta-template',
                        options: {
                            collectionName,
                            inject: {
                                fields: [
                                    {
                                        field: 'sep',
                                        name: 'Seperator',
                                        collection: collectionName,
                                        type: 'string'
                                    }
                                ]
                            }
                        },
                        width: 'half',
                        note: ''
                    },
                },
            ]
        ),
        ...getSectionField(
            {
                field: 'single_description',
                title: 'Single description',
            },
            []
        ),
        ...getSectionField(
            {
                field: 'schema_type',
                title: 'Schema Type',
            },
            [
                {
                    field: 'schema_type',
                    name: '',
                    meta: {
                        interface: 'select-dropdown',
                        options: {
                            choices: schemaTypes,
                        },
                        width: 'half',
                        note: ''
                    },
                },
            ]
        ),
    ]
}