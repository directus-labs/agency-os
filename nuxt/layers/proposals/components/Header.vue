<script setup lang="ts">
interface HeaderProps {
	title: string;
	organization: string;
}

defineProps<HeaderProps>();

const { showSidebar, toggleSidebar } = useProposals();
</script>
<template>
	<header class="w-full space-y-4 md:flex md:items-center md:space-x-6 md:space-y-0">
		<div class="flex items-center bg-gray-800 rounded-lg md:justify-between md:flex-1">
			<div class="px-4 py-3">
				<Logo class="h-6 text-white" />
			</div>

			<TypographyHeadline size="xs" :content="`Proposal for ${organization}`" class="text-white" />

			<div class="flex items-center justify-end flex-shrink-0 p-2 space-x-2">
				<DarkModeToggle class="hidden text-gray-200 md:block hover:text-gray-400" />
			</div>
		</div>

		<div class="hidden gap-2 md:flex">
			<UButton color="primary" size="lg" @click="navigateTo('#accept')">Accept Proposal</UButton>
			<!-- @TODO - Add Chat -->
			<UButton
				variant="outline"
				class="uppercase"
				icon="i-heroicons-chat-bubble-bottom-center-text"
				@click="toggleSidebar"
			/>
		</div>
	</header>
</template>
