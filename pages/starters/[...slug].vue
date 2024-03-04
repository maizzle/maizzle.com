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

const page = await queryContent('starters').where({ _path: route.path }).findOne()
const toc = page.body.toc

defineOgImageComponent('OGImageDocs', {
  title: page.title + ' Starter',
  description: page.description,
})

useHead({
  title: page.title + ' Starter',
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
