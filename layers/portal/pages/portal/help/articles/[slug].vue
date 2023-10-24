<script setup lang="ts"></script>
<template>
	<div>
		<PortalPageHeader
			title="Help Center"
			:breadcrumbs="[
				{
					title: 'Portal',
					href: '/portal',
				},
				{
					title: 'Help Center',
				},
			]"
		>
			<template #actions></template>
		</PortalPageHeader>
		<HelpArticleDetail base-url="/portal" />
	</div>
</template>
