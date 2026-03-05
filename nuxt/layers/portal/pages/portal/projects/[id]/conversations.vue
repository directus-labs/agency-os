<script setup lang="ts">
const { params } = useRoute();
</script>
<template>
	<UCard class="mt-6">
		<template #header>
			<TypographyHeadline content="Conversations" size="xs" />
			<TypographyProse
				content="Let's talk about it. Here you'll find all the conversations with our team regarding your project."
				size="sm"
			/>
		</template>
		<PortalMessageList :project-id="params.id as string" />
	</UCard>
</template>
