<template>
  <div class="bg-white px-6 py-24 lg:px-8">
    <PatternTemplates class="max-w-3xl mt-0 fixed bottom-72 lg:bottom-0 -left-44 lg:left-0 w-auto md:w-2/3 lg:w-1/2 z-0 pointer-events-none text-slate-300" />

    <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700">
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

      <hr class="my-16">

      <nav
        class="flex gap-8"
        :class="[{
          'justify-between': prev && next,
          'justify-end': !prev && next,
          'justify-start': prev && !next,
        }]"
      >
        <NuxtLink
          v-if="prev"
          :to="prev._path"
          class="text-slate-600 hover:text-slate-950 text-sm max-w-xs truncate"
        >
          <span class="block uppercase text-xs text-indigo-700 font-semibold">Previous</span>
          {{ prev.title }}
        </NuxtLink>

        <NuxtLink
          v-if="next"
          :to="next._path"
          class="text-slate-600 hover:text-slate-950 text-sm text-right max-w-xs truncate"
        >
          <span class="block uppercase text-xs text-indigo-700 font-semibold">Next</span>
          {{ next.title }}
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

const page = await queryContent('guides').where({ _path: route.path }).findOne()
const [prev, next] = await queryContent('guides').only(['_path', 'title']).sort([{ date: -1 }]).findSurround(route.path)

defineOgImage({
  component: 'OGImageGuides',
  title: page.title,
  description: page.description,
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
