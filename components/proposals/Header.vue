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
		<div class="flex items-center bg-gray-800 md:justify-between rounded-tl-xl rounded-br-xl md:flex-1">
			<div class="px-4 py-3">
				<Logo class="h-6 text-white" />
			</div>

			<TypographyHeadline size="xs" :content="`Proposal for ${organization}`" class="text-white" />

			<div class="flex items-center justify-end flex-shrink-0 p-2 space-x-2">
				<DarkModeToggle class="hidden text-gray-200 md:block hover:text-gray-400" />
			</div>
		</div>

		<div class="hidden gap-2 md:flex">
			<VButton @click="navigateTo('#accept')" variant="primary" size="lg" class="uppercase">Accept Proposal</VButton>
			<!-- @TODO - Add Chat -->
			<!-- <VButton @click="toggleSidebar" variant="outline" class="uppercase">
				<Icon name="solar:chat-dots-bold" class="w-6 h-6" />
			</VButton> -->
		</div>
	</header>
</template>
