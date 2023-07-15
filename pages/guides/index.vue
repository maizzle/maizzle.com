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
            :key="guide._id"
            class="flex max-w-xl flex-col items-start justify-between"
          >
            <div class="flex items-center gap-x-4 text-xs">
              <time :datetime="guide.date" class="text-gray-500">
                {{ formatDate(guide.date) }}
              </time>
            </div>
            <div class="group relative">
              <h2 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <NuxtLink :to="guide._path">
                  <span class="absolute inset-0"></span>
                  {{ guide.title }}
                </NuxtLink>
              </h2>
              <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                {{ guide.description }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

const guides = await queryContent('guides')
  .only([
    '_id',
    '_path',
    'title',
    'description',
    'image',
    'date',
  ])
  .sort([{ date: -1 }])
  .find()

useHead({
  title: 'Guides',
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
