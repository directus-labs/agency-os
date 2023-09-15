<script setup lang="ts">
definePageMeta({
	layout: 'app',
});
</script>
<template>
	<div>
		<div class="px-4 py-3 bg-gray-200 rounded-tr-lg rounded-bl-lg md:flex md:items-center md:justify-between">
			<div class="flex-1 min-w-0">
				<TypographyHeadline content="Account" />
			</div>
			<div class="flex mt-4 md:ml-4 md:mt-0">
				<VButton variant="primary">Action</VButton>
			</div>
		</div>
	</div>
</template>
