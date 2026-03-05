<script setup lang="ts">
import { transformSchema } from '~/utils/formkit';
import type { OsProposalApproval } from '~/types';
import type { LocationQuery } from 'vue-router';

// Get query params to allow prefilling of form fields
const { query, params } = useRoute();

if (query && query.approver) {
	const approver = await useDirectus(
		readItem('contacts', query.approver as string, { fields: ['first_name', 'last_name', 'email'] }),
	);

	query.first_name = approver.first_name;
	query.last_name = approver.last_name;
	query.email = approver.email;
}

export interface AcceptanceForm {
	first_name: string;
	last_name: string;
	email: string;
	organization: string;
	signature: {
		type: string;
		text: string;
		image: File;
	};
	esignature_agreement: boolean;
}

// You can use `prefill_` prefix to prefill form fields in the query params
// e.g. `prefill_first_name=John`
function getPrefillData(query: LocationQuery) {
	const prefillData: { [key: string]: string } = {};

	Object.keys(query).forEach((key) => {
		if (key.startsWith('prefill_')) {
			const fieldName = key.replace('prefill_', '');
			prefillData[fieldName] = query[key] as string;
		}
	});

	return prefillData;
}

const formData: AcceptanceForm | Partial<AcceptanceForm> = reactive({ ...getPrefillData(query) });

const error = ref(null);
const success = ref(false);

const form = {
	submit_label: 'Accept Proposal',
	success_message: 'Success! Your form has been submitted.',
	size: 'lg',
	schema: [
		{
			name: 'first_name',
			type: 'text',
			label: 'First Name',
			placeholder: 'John',
			description: null,
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
			description: `What's the name of your company / organization?`,
			width: '100',
		},
		{
			name: 'signature',
			type: 'signature',
			label: 'Signature',
			description: `Please sign your name.`,
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
	],
};

function uploadTheFiles(files: File[]) {
	// Upload a file to Directus
	const formData = new FormData();

	files.forEach((file, idx) => {
		formData.append('file', file);
	});

	return useDirectus(uploadFiles(formData));
}

async function submitForm() {
	try {
		const { signature, ...data } = formData;
		let approval: Partial<OsProposalApproval> = {};

		const signatureImage = formData.signature?.image;

		if (signatureImage) {
			const signatureFile = await uploadTheFiles([signatureImage]);
			approval.signature_image = signatureFile.id;
		}

		approval.signature_type = formData.signature?.type;
		approval.signature_text = formData.signature?.text;

		approval = {
			...approval,
			...data,
			contact: (query?.approver as string) ?? undefined,
			proposal: (params.id as string) ?? undefined,
		};

		await useDirectus(createItem('os_proposal_approvals', approval));

		success.value = true;
	} catch (err) {
		// console.log(err);
	}
}
</script>
<template>
	<BlockContainer>
		<div
			class="relative max-w-3xl p-8 mx-auto overflow-hidden text-gray-900 bg-transparent bg-gray-100 border-2 dark:bg-gray-800 border-primary rounded-xl"
		>
			<div class="space-y-2 text-center">
				<span class="px-3 py-4 rounded-lg bg-primary">
					<Icon name="solar:check-read-outline" class="w-12 h-12 text-white" />
				</span>
				<TypographyHeadline content="Accept Proposal" />
				<p class="dark:text-gray-200">To accept this document, fill out the form and click the button below.</p>
			</div>
			<div class="mt-8">
				<div v-auto-animate>
					<div class="mb-4">
						<VAlert v-if="error" type="error">Oops! {{ error }}</VAlert>
						<VAlert v-if="success" type="success">
							{{ form.success_message || 'Success! Your form has been submitted.' }}
						</VAlert>
					</div>
					<UForm
						v-if="!success"
						v-model="formData"
						:form="{
							schema: form.schema,
						}"
						type="form"
						:on-submit="submitForm"
						:submit-label="form.submit_label"
					></UForm>
				</div>
			</div>
		</div>
	</BlockContainer>
</template>
