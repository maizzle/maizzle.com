<template>
  <div class="font-inter">
    <DocsHeader />

    <main class="grid grid-cols-12 h-full">
      <DocsNavigation :navigation="navigation" />

      <NuxtPage />

      <InsigniaSvgBg class="w-[44rem] fixed z-[-1] -right-12 bottom-0 opacity-50 md:opacity-70 2xl:opacity-100" />
    </main>
  </div>
</template>

<script setup>
import scrollToElement from 'scroll-to-element'

const route = useRoute()

const { data: navigation } = await useAsyncData('docs-side-nav', () => {
  return queryCollection('navigation').first()
})

const scrollTo = anchor => {
  scrollToElement(anchor, {
    offset: -100,
    ease: 'out-expo',
    duration: 400
  })
}

onMounted(() => {
  if (route.hash) scrollTo(route.hash)
})

watch(() => route.hash, hash => {
  if (hash) scrollTo(hash)
})

useHead({
  htmlAttrs: {
    class: 'scroll-pt-[100px]',
  },
  titleTemplate: title => `${title} | Maizzle`,
})
</script>
