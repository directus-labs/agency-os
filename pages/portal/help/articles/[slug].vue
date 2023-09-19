<script setup lang="ts"></script>
<template>
	<div>
		<AppPageHeader
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
		</AppPageHeader>
		<HelpArticleDetail base-url="/portal" />
	</div>
</template>
