<template>
  <div class="bg-white py-12 sm:py-24">
    <PatternTemplates class="max-w-3xl mt-0 fixed bottom-72 lg:bottom-0 -left-44 lg:left-0 w-auto md:w-2/3 lg:w-1/2 z-0 text-slate-300" />

    <div class="mx-auto max-w-7xl px-6 lg:px-8 relative">
      <div class="mx-auto max-w-2xl">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Guides
        </h1>
        <p class="mt-2 text-lg leading-8 text-gray-600">
          Learn how to create HTML emails with Tailwind CSS in Maizzle.
        </p>
        <div class="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
          <article
            v-for="guide in guides"
            :key="guide.id"
            class="flex flex-col items-start justify-between"
          >
            <div class="flex items-center gap-x-4 text-xs">
              <time :datetime="guide.date" class="text-gray-500">
                {{ formatDate(guide.date) }}
              </time>
            </div>
            <div class="group relative">
              <h2 class="mt-2 text-2xl font-semibold text-gray-900 group-hover:text-gray-600">
                <NuxtLink :to="guide.path">
                  <span class="absolute inset-0"></span>
                  {{ guide.title }}
                </NuxtLink>
              </h2>
              <p class="mt-5 line-clamp-3 text-base text-gray-600">
                {{ guide.description }}
              </p>
            </div>
          </article>
        </div>

        <div class="max-w-[75ch] 3xl:pl-4 border-t border-slate-200 pt-12 mt-12">
          <div class="flex flex-wrap sm:items-center sm:justify-between space-y-6 sm:space-y-0 text-sm text-slate-500">
            <div class="flex gap-2">
              <span>Copyright &copy; {{ year }} Maizzle SRL</span>
              <NuxtLink to="/brand" class="border-l border-slate-200 pl-2 hover:text-slate-900">Brand policy</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

defineOgImageComponent('OGImageDocs', {
  title: 'Guides',
  description: 'Learn how to create HTML emails with Tailwind CSS in Maizzle.',
})

const { data: guides } = await useAsyncData('guides-index-collection', () => {
  return queryCollection('guides')
    .order('date', 'DESC')
    .all()
})

useHead({
  title: 'Guides | Maizzle',
  meta: [
    {
      name: 'description',
      content: 'Learn how to create HTML emails with Tailwind CSS in Maizzle.',
    },
    {
      property: 'og:title',
      content: 'Guides | Maizzle',
    },
    {
      property: 'og:description',
      content: 'Learn how to create HTML emails with Tailwind CSS in Maizzle.'
    },
    {
      property: 'og:url',
      content: `https://maizzle.com${route.path}`
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://maizzle.com${route.path}`,
    },
  ],
})

const formatDate = string => {
  const date = new Date(string)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>
