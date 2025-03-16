<template>
  <div class="bg-white px-6 pt-24 pb-8 lg:px-8">
    <PatternTemplates class="max-w-3xl mt-0 fixed bottom-72 lg:bottom-0 -left-44 lg:left-0 w-auto md:w-2/3 lg:w-1/2 z-0 pointer-events-none text-slate-300" />

    <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700">
      <ContentRenderer
        :value="page"
        tag="article"
        class="
          max-w-[75ch] 3xl:pl-4
          prose prose-slate
          prose-headings:text-slate-800 prose-h1:font-bold prose-p:text-slate-600
        prose-a:decoration-slate-200 prose-a:hover:decoration-slate-300 prose-a:underline-offset-[3px]
        "
      >
        <template #empty>
          <h1>Document not found</h1>
        </template>
      </ContentRenderer>

      <hr class="my-16 border-slate-200">

      <nav
        class="flex gap-8"
        :class="[{
          'justify-between': nav?.[0] && nav?.[1],
          'justify-end': !nav?.[0] && nav?.[1],
          'justify-start': nav?.[0] && !nav?.[1],
        }]"
      >
        <NuxtLink
          v-if="nav?.[0]"
          :to="nav[0].path"
          class="text-slate-600 hover:text-slate-950 text-sm max-w-xs truncate"
        >
          <span class="block uppercase text-xs text-indigo-700 font-semibold">Previous</span>
          {{ nav[0].title }}
        </NuxtLink>

        <NuxtLink
          v-if="nav?.[1]"
          :to="nav[1].path"
          class="text-slate-600 hover:text-slate-950 text-sm text-right max-w-xs truncate"
        >
          <span class="block uppercase text-xs text-indigo-700 font-semibold">Next</span>
          {{ nav[1].title }}
        </NuxtLink>
      </nav>
      <div class="max-w-[75ch] 3xl:pl-4 border-t border-slate-200 pt-16 mt-16">
        <div class="flex flex-wrap sm:items-center sm:justify-between space-y-6 sm:space-y-0 text-sm text-slate-500">
          <div class="flex gap-2">
            <span>Copyright &copy; {{ year }} Maizzle SRL</span>
            <NuxtLink to="/brand" class="border-l border-slate-200 pl-2 hover:text-slate-900">Brand policy</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('guides').path(route.path).first()
})

const { data: nav } = await useAsyncData('surround', () => {
  return queryCollectionItemSurroundings('guides', route.path).order('date', 'DESC')
})

defineOgImageComponent('OGImageGuides', {
  title: page.value.title,
  description: page.value.description,
})

const year = computed(() => {
  return new Date().getFullYear()
})

useHead({
  title: page.value.title + ' | Maizzle Guides',
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
      content: page.value.title + ' | Maizzle Guides',
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
