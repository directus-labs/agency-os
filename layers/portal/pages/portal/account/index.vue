<script setup lang="ts">
import { reactive, ref, unref } from 'vue';
import type { User } from '~~/types';

useHead({
	title: 'Account',
});

const toast = useToast();
const { user } = useDirectusAuth() as { user: Partial<User> };
const reactiveUser = reactive(user);

// Function to update user information
const updateUserInfo = async (firstName: string, lastName: string, title: string, location: string) => {
	// Display a toast for update in progress
	toast.add({
		id: 'user_updating',
		title: 'Uploading...',
		description: 'Updating ' + unref(reactiveUser).email + '...',
		icon: 'material-symbols:hourglass-top-rounded',
		color: 'blue',
		timeout: 0,
	});

	// Prepare and execute the update command
	const updateCommand = updateMe({ first_name: firstName, last_name: lastName, title, location });

	try {
		const updatedUser = await useDirectus(updateCommand);
		toast.remove('user_updating');

		toast.add({
			id: 'user_updated',
			title: 'Account Updated',
			description: updatedUser.email + ' has been successfully updated.',
			icon: 'material-symbols:check-circle-rounded',
			color: 'primary',
		});
	} catch (error) {
		toast.remove('user_updating');

		toast.add({
			id: 'update_error',
			title: 'Update Error',
			description: 'An error occurred: ' + error,
			icon: 'material-symbols:warning-rounded',
			color: 'red',
		});
	}
};

const loading = ref(false);
const error = ref(null);

const formState = reactive({
	title: unref(reactiveUser).title ?? '',
	firstname: unref(reactiveUser).first_name ?? '',
	lastname: unref(reactiveUser).last_name ?? '',
	location: unref(reactiveUser).location ?? '',
});

// Function to handle form submission
async function attemptUserInfoUpdate() {
	const { firstname, lastname, title, location } = formState;
	loading.value = true;
	error.value = null;

	try {
		await updateUserInfo(firstname, lastname, title, location);
	} catch (err: any) {
		error.value = err.message;
	} finally {
		loading.value = false;
	}
}

const resetPassword = () => {
	toast.add({
		id: 'reset_password',
		title: 'Reset Password',
		description: 'This feature will be available soon...',
		icon: 'material-symbols:hourglass-top-rounded',
		color: 'blue',
	});
	// TODO: Add logic for reset password here
};
</script>


<template>
	<div>
		<PortalPageHeader title="Account" :breadcrumbs="[{ title: 'Portal', href: '/portal' }, { title: 'Account' }]">
			<template #actions></template>
		</PortalPageHeader>

		<div v-auto-animate>
			<UAlert
				v-if="error"
				type="error"
				class="mb-4"
				title="Oops! Something went wrong."
				:description="error"
				color="rose"
				variant="outline"
				icon="material-symbols:warning-rounded"
			>
				Error: {{ error }}
			</UAlert>

			<form class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3" @submit.prevent="attemptUserInfoUpdate">
				<UFormGroup v-slot="{ errorFirstName }" label="First Name"  required :error="!formState.firstname && 'Please enter your first name'">
					<UInput
						v-model="formState.firstname"
						:disabled="loading"
						size="lg"
						name="firstname"
						label="First Name"
						placeholder="John"
						icon="material-symbols:person-book"
						:trailing-icon="errorFirstName ? 'i-heroicons-exclamation-triangle-20-solid' : undefined"
					/>
				</UFormGroup>
				<UFormGroup  v-slot="{ errorLastName }" label="Last Name" required :error="!formState.lastname && 'Please enter your last name'">
					<UInput
						v-model="formState.lastname"
						:disabled="loading"
						size="lg"
						name="lastname"
						label="Last Name"
						placeholder="Doe"
						icon="material-symbols:person-book"
						:trailing-icon="errorLastName ? 'i-heroicons-exclamation-triangle-20-solid' : undefined"
					/>
				</UFormGroup>
				<UFormGroup label="Title" hint="Optional">
					<UInput
						v-model="formState.title"
						:disabled="loading"
						size="lg"
						name="title"
						label="Title"
						placeholder="Dr. / Prof. / etc."
						icon="material-symbols:badge"
					/>
				</UFormGroup>
				<UFormGroup label="Location" hint="Optional">
					<UInput
						v-model="formState.location"
						:disabled="loading"
						size="lg"
						name="location"
						label="Location"
						placeholder="City or Region"
						icon="material-symbols:location-on-outline"
					/>
				</UFormGroup>
				<UFormGroup
					label="Email"
					class="md:col-span-2"
					hint="Only View"
					help="If you want to change your email, please contact any Administrators."
				>
					<UInput
						v-model="reactiveUser.email"
						disabled
						size="lg"
						name="email"
						label="Email"
						placeholder="email@example.com"
						icon="i-heroicons-envelope"
					/>
				</UFormGroup>

				<div class="md:col-span-2 flex flex-col md:flex-row gap-4">
					<div class="flex w-full md:w-1/2 justify-center">
						<UButton
							type="submit"
							:loading="loading"
							:disabled="!formState.firstname || !formState.lastname"
							size="lg"
							:color="loading ? 'gray' : 'primary'"
							label="Save"
							trailing-icon="material-symbols:save"
							class="w-full justify-center"
						/>
					</div>
					<div class="flex w-full md:w-1/2 justify-center">
						<UButton
							size="lg"
							label="Reset Password"
							:color="loading ? 'gray' : 'orange'"
							trailing-icon="material-symbols:passkey"
							class="w-full justify-center"
							@click="resetPassword"
						/>
					</div>
				</div>
			</form>
		</div>

		<UNotifications />
	</div>
</template>
