<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 col-span-12 lg:col-span-9 2xl:col-span-8 max-w-[65ch] lg:max-w-full mx-auto lg:m-0">
    <div class="col-span-9 2xl:col-span-7 3xl:col-span-6 px-4 sm:px-8 pb-12 mt-4 xl:mt-8 space-y-8">
      <div v-if="page" class="max-w-[80ch] mx-auto flex items-center justify-between gap-4">
        <h1 class="text-2xl sm:text-3xl font-bold text-slate-800">{{ page.title }}</h1>
        <a
          :href="`https://maizzle.com/raw${route.path}.md`"
          target="_blank"
          class="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-500 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-md transition-colors"
          title="View as Markdown"
        >
          <svg class="size-3.5" viewBox="0 0 16 16" fill="currentColor"><path d="M14.85 3c.63 0 1.15.52 1.14 1.15v7.7c0 .63-.51 1.15-1.15 1.15H1.15C.52 13 0 12.48 0 11.84V4.15C0 3.52.52 3 1.15 3ZM9 11V5H7.5v3.63L6 7.13 4.5 8.63V5H3v6h1.5l1.5-1.5L7.5 11Zm4-3-2.25 2.75h1.5V5h1.5v5.75h1.5Z"/></svg>
          Markdown
        </a>
      </div>
      <ContentRenderer
        v-if="page"
        :value="page"
        tag="article"
        class="
          max-w-[80ch] mx-auto
          prose prose-slate
          prose-headings:text-slate-800 prose-h1:font-bold prose-h1:hidden
          prose-p:text-slate-600
          prose-a:decoration-slate-200 prose-a:hover:decoration-slate-300 prose-a:underline-offset-[3px]
        "
      >
        <template #empty>
          <h1>Document not found</h1>
        </template>
      </ContentRenderer>

      <DocsBottomNav />

      <div class="max-w-[80ch] mx-auto 3xl:pl-4">
        <div class="flex flex-wrap sm:items-center sm:justify-between space-y-6 sm:space-y-0 text-sm text-slate-500">
          <div class="flex gap-2">
            <span>Copyright &copy; {{ year }} Maizzle OÜ</span>
            <NuxtLink to="/brand" class="border-l border-slate-200 pl-2 hover:text-slate-900">Brand policy</NuxtLink>
          </div>
          <a
            v-if="!nonEditablePaths.includes($route.path)"
            :href="`https://github.com/maizzle/maizzle.com/edit/main/content${$route.path}.md`"
            class="flex gap-2 items-center hover:text-slate-900"
            target="_blank"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit this page on GitHub
          </a>
        </div>
      </div>
    </div>
    <aside class="col-span-3 2xl:col-span-5 lg:mt-4">
      <TableOfContents :toc="toc" />
    </aside>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'docs',
})

const route = useRoute()

// Page content
const { data: page } = await useAsyncData(route.path, async () => {
  return await queryCollection('docs').path(route.path).first() ?? false
})

const toc = page.value?.body?.toc

const nonEditablePaths = [
  '/brand',
  '/404',
]

defineOgImageComponent('OGImageDocs', {
  title: page.value?.title,
  description: page.value?.description,
})

const year = computed(() => {
  return new Date().getFullYear()
})

useHead({
  title: page.value?.title,
  meta: [
    {
      name: 'description',
      content: page.value?.description,
    },
    // Open Graph
    {
      property: 'og:url',
      content: `https://maizzle.com${route.path}`
    },
    {
      property: 'og:title',
      content: (page.value?.title || '') + ' | Maizzle',
    },
    {
      property: 'og:description',
      content: page.value?.description,
    },
    {
      property: 'og:type',
      content: 'article',
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://maizzle.com${route.path}`,
    },
    {
      rel: 'alternate',
      type: 'text/markdown',
      href: `https://maizzle.com/raw${route.path}.md`,
    },
  ],
})
</script>
