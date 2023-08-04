<template>
  <main class="font-inter min-h-screen flex flex-col">
    <SiteHeader
      class="w-full max-w-7xl px-6 py-6 mx-auto rounded-br-2xl rounded-bl-2xl"
      :class="$route.path && 'header-default'"
    />

    <NuxtPage />
  </main>
</template>

<script setup>
useHead({
  htmlAttrs: {
    class: 'scroll-smooth',
  },
})

defineOgImage({
  component: 'OGImageHome',
})
</script>
