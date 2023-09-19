<script setup lang="ts"></script>
<template>
	<div>
		<AppPageHeader
			title="File Library"
			:breadcrumbs="[
				{
					title: 'Portal',
					href: '/portal',
				},
				{
					title: 'Files',
				},
			]"
		>
			<template #actions></template>
		</AppPageHeader>
	</div>
</template>
