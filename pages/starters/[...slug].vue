<template>
  <div class="col-span-12 lg:col-span-8 grid grid-cols-1 lg:grid-cols-12 max-w-[65ch] lg:max-w-full mx-auto lg:m-0">
    <div class="col-span-9 2xl:col-span-7 3xl:col-span-6 px-4 sm:px-8 pb-12 mt-4 xl:mt-8 space-y-8">
      <ContentRenderer
        :value="page"
        tag="article"
        class="
          max-w-[75ch] 3xl:pl-4
          prose prose-slate
          prose-headings:text-slate-800 prose-h1:font-bold
          prose-p:text-slate-600
        prose-a:decoration-slate-200 prose-a:hover:decoration-slate-300 prose-a:underline-offset-[3px]
        "
      >
        <template #empty>
          <h1>Document not found</h1>
        </template>
      </ContentRenderer>

      <div class="max-w-[75ch] 3xl:pl-4 border-t border-slate-200 pt-8 mt-8">
        <div class="flex flex-wrap sm:items-center sm:justify-between space-y-6 sm:space-y-0 text-sm text-slate-500">
          <div class="flex gap-2">
            <span>Copyright &copy; {{ year }} Maizzle SRL</span>
            <NuxtLink to="/brand" class="border-l border-slate-200 pl-2 hover:text-slate-900">Brand policy</NuxtLink>
          </div>
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
  layout: 'docs',
})

const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('starters').path(route.path).first()
})

const toc = page.value.body.toc

defineOgImageComponent('OGImageDocs', {
  title: page.value.title + ' Starter',
  description: page.value.description,
})

const year = computed(() => {
  return new Date().getFullYear()
})

useHead({
  title: page.value.title + ' Starter',
  meta: [
    {
      name: 'description',
      content: page.value.description,
    },
    // Open Graph
    {
      property: 'og:url',
      content: `https://maizzle.com${route.path}`
    },
    {
      property: 'og:title',
      content: page.value.title,
    },
    {
      property: 'og:description',
      content: page.value.description,
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
