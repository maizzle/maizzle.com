<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})

const route = useRoute()
const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('docs').path(route.path).first(),
)

const tocLinks = computed(() => (page.value?.body as any)?.toc?.links ?? [])
const hasToc = computed(() => (page.value as any)?.toc !== false)

const site = useSiteConfig()

useSeoMeta({
  title: () => {
    if (!page.value?.title) return site.name
    return page.value.section
      ? `${page.value.title} - ${page.value.section} / ${site.name}`
      : `${page.value.title} / ${site.name}`
  },
  description: () => page.value?.description,
})

defineOgImage('Docs', {
  title: page.value?.title,
  section: page.value?.section,
  description: page.value?.description,
})
</script>

<template>
  <div class="max-w-5xl w-full mx-auto flex flex-1 min-w-0">
    <main class="min-w-0 flex-1 max-w-3xl mx-auto px-4 py-8 lg:px-8 lg:py-10">
      <template v-if="page">
        <ContentRenderer
          :value="page"
          class="prose max-w-none dark:prose-invert
                 prose-headings:prose-a:no-underline prose-headings:prose-a:font-bold
                 prose-headings:text-gray-900 dark:prose-headings:text-gray-100
                 prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                 prose-p:text-gray-700 dark:prose-p:text-gray-300
                 prose-li:text-gray-700 dark:prose-li:text-gray-300"
        />
        <DocsPager />
      </template>
      <div v-else class="py-24 text-center text-muted-foreground">Page not found.</div>
    </main>
    <DocsToc v-if="hasToc" :links="tocLinks" class="hidden xl:block w-64 shrink-0" />
    <div v-else class="hidden xl:block w-64 shrink-0" aria-hidden="true" />
  </div>
</template>
