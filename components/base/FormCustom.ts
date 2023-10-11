import Form from '#ui/components/forms/Form.vue';
import FormGroup from '#ui/components/forms/FormGroup.vue';
import Input from '#ui/components/forms/Input.vue';
import Textarea from '#ui/components/forms/Textarea.vue';
import Checkbox from '#ui/components/forms/Checkbox.vue';

const widthClassMap = {
	'33': 'md:col-span-2',
	'50': 'md:col-span-3',
	'67': 'md:col-span-4',
	'100': 'md:col-span-6',
};

function renderInput(item, name, state) {
	const commonProps = {
		modelValue: state[name],
		'onUpdate:modelValue': (value) => (state[name] = value),
	};

	switch (item.type) {
		case 'textarea':
			return h(Textarea, { ...commonProps, placeholder: item.placeholder });
		case 'checkbox':
			return h(Checkbox, commonProps);
		default:
			return h(Input, { ...commonProps, placeholder: item.placeholder, type: item.type });
	}
}

export default defineComponent({
	props: {
		schema: {
			type: Array,
			default: () => [],
		},
		state: {
			type: Object,
			default: () => ({}),
		},
		validate: {
			type: Function,
		},
	},
	setup(props) {
		const groups = props.schema.map((item) => {
			const { name, label, placeholder, width } = item;

			const cssClass = widthClassMap[item.width] || 'md:col-span-6';

			return h(FormGroup, { name, label, class: cssClass }, () => [renderInput(item, name, props.state)]);
		});

		return () => h(Form, { state: props.state, validate: props.validate }, () => groups);
	},
});
