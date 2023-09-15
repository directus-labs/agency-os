import { unref } from 'vue';

export function transformSchema(schema: Array<{}>) {
	// Loop through the form schema from Directus
	// This is required for FormKit to work
	const items = unref(schema);
	return items.map((item: any) => {
		const { conditionalIf, name, children, ...props } = item;

		const cmpSchema = {
			$cmp: item.$el ? item.$el : 'FormKit',
			if: conditionalIf ?? 'true',
			children: children,

			props: {
				id: name,
				...props,
			},
		};

		// Switch statement to handle item widths
		switch (item.width) {
			case '33':
				cmpSchema.props.outerClass = 'md:col-span-2';
				break;
			case '50':
				cmpSchema.props.outerClass = 'md:col-span-3';
				break;
			case '67':
				cmpSchema.props.outerClass = 'md:col-span-4';
				break;
			case '100':
				cmpSchema.props.outerClass = 'md:col-span-6';
				break;
			default:
				cmpSchema.props.outerClass = 'md:col-span-6';
		}
		return cmpSchema;
	});
}
