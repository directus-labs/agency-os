<script setup lang="ts">
const { params } = useRoute();
</script>
<template>
	<UCard class="mt-6">
		<template #header>
			<TypographyHeadline content="Tasks" size="xs" />
			<TypographyProse
				size="sm"
				content="Teamwork makes the dreamwork. These are the open tasks you'll need to complete for a successful project."
			/>
		</template>
		<PortalTaskList :project-id="params.id as string" />
	</UCard>
</template>
