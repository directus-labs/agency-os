<script setup lang="ts"></script>
<template>
	<BlockContainer>
		<header class="pb-8 border-b border-gray-300 dark:border-gray-700">
			<GlobalSearch placeholder="Search for articles" :collections="['help_articles']" class="flex" />
		</header>
		<HelpCollectionsDetail base-url="" />
	</BlockContainer>
</template>
