<template>
  <NuxtLayout>
    <NuxtLoadingIndicator
      color="repeating-linear-gradient(to right,#FF99DD
    0%,#94a3b8 100%)"
    />
    <NuxtPage />
    <DevOnly>
      <DevToolbar />
    </DevOnly>
    <ChatWidget />
  </NuxtLayout>
</template>
