<template>
  <div class="col-span-12 lg:col-span-8 grid grid-cols-1 lg:grid-cols-12 max-w-[65ch] lg:max-w-full mx-auto lg:m-0">
    <div class="col-span-9 2xl:col-span-7 3xl:col-span-6 px-4 sm:px-8 pb-12 mt-4 xl:mt-8 space-y-8">
      <ContentRenderer
        :value="page"
        tag="article"
        class="
          max-w-[75ch] 3xl:pl-4
          prose prose-slate
          prose-headings:text-slate-800 prose-h1:font-bold prose-p:text-slate-600
        "
      >
        <template #empty>
          <h1>Document not found</h1>
        </template>
      </ContentRenderer>

      <DocsBottomNav />

      <div class="max-w-[75ch] 3xl:pl-4">
        <div class="flex flex-wrap sm:items-center sm:justify-between space-y-6 sm:space-y-0 text-sm text-slate-500">
          <div class="flex gap-2">
            <span>Copyright &copy; {{ year }} Maizzle SRL</span>
            <nuxt-link to="/brand" class="border-l border-slate-200 pl-2 hover:text-slate-900">Brand policy</nuxt-link>
          </div>
          <a
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
    <aside class="hidden lg:block col-span-3 2xl:col-span-5 mt-4">
      <TableOfContents :toc="toc" />
    </aside>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'documentation',
})

const route = useRoute()

// Page content
const page = await queryContent(route.path).findOne()
const toc = page.body.toc

defineOgImage({
  component: 'OGImageDocs',
  title: page.title,
  description: page.description,
})

const year = computed(() => {
  return new Date().getFullYear()
})

useHead({
  title: page.title,
  meta: [
    {
      name: 'description',
      content: page.description,
    },
    // Open Graph
    {
      property: 'og:url',
      content: `https://maizzle.com${page._path}`
    },
    {
      property: 'og:title',
      content: page.title,
    },
    {
      property: 'og:description',
      content: page.description,
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
  ],
})
</script>
