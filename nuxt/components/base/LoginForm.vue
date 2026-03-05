<template>
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
		/>

		<form class="grid gap-4" @submit.prevent="attemptLogin">
			<UFormGroup label="Email" required>
				<UInput
					v-model="credentials.email"
					type="email"
					:disabled="loading"
					size="lg"
					name="email"
					label="Work Email"
					placeholder="john@example.com"
				/>
			</UFormGroup>
			<UFormGroup label="Password" required>
				<UInput
					v-model="credentials.password"
					type="password"
					:disabled="loading"
					size="lg"
					name="password"
					label="Password"
					placeholder="Your Password"
				/>
			</UFormGroup>
			<UButton
				type="submit"
				:loading="loading"
				:disabled="!credentials.email"
				size="lg"
				label="Sign In"
				trailing-icon="material-symbols:arrow-forward"
				block
			/>
		</form>

		<!-- @TODO Remove password once magic link authentication is added -->
		<!-- <div class="mt-6">
			<VText>
				<UIcon name="material-symbols:info-rounded" class="mr-2" />
				<span>What about a password?</span>
			</VText>
			<VText text-color="light" size="xs" class="mt-2">
				Not needed 😃. Just enter your email above and we'll send you a magic link to login to your dashboard.
			</VText>
		</div> -->
	</div>
</template>

<script setup>
const { login } = useDirectusAuth();
const loading = ref(false);
const error = ref(null);

// You'll want to remove these preset credentials before you deploy your site
const credentials = reactive({
	email: 'ashley@example.com',
	password: 'password',
});

async function attemptLogin() {
	const { email, password } = unref(credentials);
	loading.value = true;
	error.value = null;

	try {
		// Be careful when using the login function because you have to pass the email and password as separate arguments instead of an object.
		await login(email, password);
	} catch (err) {
		error.value = err.message;
	}

	loading.value = false;
}
</script>
