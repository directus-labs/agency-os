import { getSectionField } from "../../../../shared/utils";

export default [
    ...getSectionField(
        {
            title: 'Custom code',
            field: 'custom_code'
        },
        [
            {
                field: 'header_code',
                name: 'Header code',
                meta: {
                    interface: 'input-code',
                    note: 'Code add to **`<head></head>`** tag'
                }
            },
            {
                field: 'footer_code',
                name: 'Footer code',
                meta: {
                    interface: 'input-code',
                    note: 'Code add to **`<body></body>`** tag'
                }
            },
        ]
    ),
]