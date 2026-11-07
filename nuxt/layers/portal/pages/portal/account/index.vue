<script setup lang="ts"></script>
<template>
	<div>
		<PortalPageHeader
			title="Account"
			:breadcrumbs="[
				{
					title: 'Portal',
					href: '/portal',
				},
				{
					title: 'Account',
				},
			]"
		>
			<template #actions></template>
		</PortalPageHeader>
	</div>
</template>
