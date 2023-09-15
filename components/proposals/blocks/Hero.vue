<script setup lang="ts">
import type { User } from '~/types';

interface HeroProps {
	name: string;
	organization: string;
	owner: User;
}

defineProps<HeroProps>();
</script>
<template>
	<div class="relative flex items-center justify-center w-full h-screen">
		<div
			class="absolute inset-0 bg-gradient-to-br from-white via-gray-300 to-accent dark:from-gray-800 dark:via-gray-900 dark:to-gray-600"
		/>
		<div class="absolute inset-0 grain-bg dark:opacity-10" />
		<!-- Full screen hero for proposal -->
		<div class="relative flex flex-col justify-center">
			<Logo class="h-6 dark:text-white text-gray" />
			<div class="mt-12 space-y-6">
				<p class="font-mono text-6xl font-bold text-center dark:text-white">{{ name }}</p>
				<div>
					<p class="font-mono text-xl font-bold text-center dark:text-white">For:</p>
					<TypographyHeadline :content="organization" class="flex w-full text-center truncate dark:text-white" />
				</div>
				<VDivider />
				<div class="flex flex-col items-center justify-center space-y-4">
					<p class="font-mono text-xl font-bold text-center dark:text-white">Prepared by:</p>
					<VAvatar :author="owner" />
				</div>
			</div>
			<NuxtLink to="#content" class="mx-auto">
				<Icon
					name="solar:arrow-down-broken"
					class="w-12 h-12 mx-auto mt-12 text-gray dark:text-white/50 animate-bounce"
				/>
			</NuxtLink>
		</div>
	</div>
</template>
