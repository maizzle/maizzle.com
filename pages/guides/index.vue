<template>
  <div class="col-span-12 lg:col-span-8 grid grid-cols-1 lg:grid-cols-12 max-w-[65ch] lg:max-w-full mx-auto lg:m-0">
    <article class="col-span-9 2xl:col-span-7 3xl:col-span-6 px-4 sm:px-8 pb-12 mt-4 xl:mt-8 space-y-8">
      <div class="divide-y divide-slate-100">
        <div
          v-for="guide in guides"
          :key="guide._id"
          class="py-6 space-y-1"
        >
          <p class="text-sm text-gray-500">
            <time :datetime="guide.date">{{ formatDate(guide.date) }}</time>
          </p>
          <NuxtLink
            :to="guide._path"
            class="block"
          >
            <h2 class="text-xl font-bold text-gray-900" v-text="guide.title" />
            <p class="mt-3 text-base text-gray-500" v-text="guide.description" />
          </NuxtLink>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'documentation',
})

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
