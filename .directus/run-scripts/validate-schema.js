function validateSchemaNames(schema, fieldsArray) {
	const fieldNames = fieldsArray.map((field) => field.field);
	const invalidNames = [];

	schema.forEach((item) => {
		if (item.name && !fieldNames.includes(item.name)) {
			invalidNames.push(item.name);
		}
		if (item.children && Array.isArray(item.children)) {
			item.children.forEach((child) => {
				if (child.name && !fieldNames.includes(child.name)) {
					invalidNames.push(child.name);
				}
			});
		}
	});

	if (invalidNames.length > 0) {
		throw new Error(`Form schema field names don't match collection field names: ${invalidNames.join(', ')}`);
	}
}

const form_schema = [
	{
		name: 'first_name',
		type: 'text',
		label: 'First Name',
		placeholder: 'John',
		help: null,
		validation: 'required',
		width: '50',
	},
	{
		name: 'last_name',
		type: 'text',
		label: 'Last Name',
		validation: 'required',
		width: '50',
	},
	{
		name: 'email',
		type: 'text',
		label: 'Email',
		placeholder: 'john@example.com',
		validation: 'required',
		width: '100',
	},
	{
		name: 'organization',
		type: 'text',
		label: 'Company',
		help: `What's the name of your company / organization?`,
		width: '100',
		conditionalIf: '$get(first_name).value',
	},
	{
		name: 'signature',
		type: 'signature',
		label: 'Signature',
		help: `Please sign your name above.`,
		width: '100',
		validation: 'required',
		options: ['type', 'draw', 'upload'],
	},
	{
		name: 'esignature_agreement',
		type: 'checkbox',
		label: 'I agree that my electronic signature is as valid and legally binding as a handwritten signature.',
		validation: 'required',
		width: '100',
	},
];

module.exports = async function (data) {
	validateSchemaNames(form_schema, data.get_fields);

	return;
};
