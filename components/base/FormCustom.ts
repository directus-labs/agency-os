import type { Form as FormType } from '~/types';
import Form from '#ui/components/forms/Form.vue';
import FormGroup from '#ui/components/forms/FormGroup.vue';
import Input from '#ui/components/forms/Input.vue';
import Textarea from '#ui/components/forms/Textarea.vue';
import Checkbox from '#ui/components/forms/Checkbox.vue';
import Button from '#ui/components/elements/Button.vue';
import VUpload from '~/components/base/VUpload.vue';
import VSignature from '~/components/base/VSignature.vue';

const widthClassMap = {
	'33': 'md:col-span-2',
	'50': 'md:col-span-3',
	'67': 'md:col-span-4',
	'100': 'md:col-span-6',
};

function renderInput(item: { [key: string]: any }, name: string, state: any) {
	const commonProps = {
		modelValue: state[name],
		'onUpdate:modelValue': (value: any) => (state[name] = value),
	};

	switch (item.type) {
		case 'textarea':
			return h(Textarea, { ...commonProps, placeholder: item.placeholder });
		case 'file':
			return h(VUpload, { ...commonProps, placeholder: item.placeholder });
		case 'signature':
			return h(VSignature, { ...commonProps, placeholder: item.placeholder });
		case 'checkbox':
			return h(Checkbox, commonProps);
		default:
			return h(Input, { ...commonProps, placeholder: item.placeholder, type: item.type });
	}
}

export default defineComponent({
	props: {
		schema: {
			type: Array as PropType<FormType['schema']>,
			default: () => [],
		},
		state: {
			type: Object,
			default: () => ({}),
		},
		validate: {
			type: Function,
		},
		onSubmit: {
			type: Function,
		},
	},
	setup(props) {
		const groups = props?.schema?.map((item) => {
			const { name, label, placeholder, width, description } = item as { [key: string]: any };

			// @ts-ignore
			const cssClass = widthClassMap[item.width] || 'md:col-span-6';

			return h(FormGroup, { name, label, description, class: cssClass, size: 'lg' }, () => [
				// @ts-ignore
				renderInput(item, name, props.state),
			]);
		});

		if (!groups) {
			return;
		}

		// Add the submit button to the groups array
		groups.push(
			h(
				'div',
				{ class: 'md:col-span-6' },
				h(Button, {
					type: 'submit',
					size: 'lg',
					label: 'Submit',
					onClick: (event: Event) => {
						event.preventDefault();
						// @ts-ignore
						props.onSubmit();
					},
				}),
			),
		);

		// @ts-ignore
		return () => h(Form, { state: props.state, validate: props.validate }, () => groups);
	},
});
