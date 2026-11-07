<script setup lang="ts">
const { params } = useRoute();
</script>
<template>
	<UCard class="mt-6">
		<template #header>
			<TypographyHeadline content="Billing" size="xs" />
			<TypographyProse size="sm" content="" />
		</template>
		<!-- <PortalTaskList :project-id="params.id" /> -->
	</UCard>
</template>
