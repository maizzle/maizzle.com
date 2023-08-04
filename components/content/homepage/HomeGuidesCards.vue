<template>
  <section id="guides" class="pt-20 md:pt-44 relative">
    <div class="max-w-7xl px-6 mx-auto relative z-10">
      <header class="mx-auto max-w-xl text-center mb-6 sm:mb-12">
        <h3 class="text-lg font-semibold leading-8 tracking-tight text-indigo-600">Maizzle Guides</h3>
        <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Learn how to create HTML emails with Tailwind CSS in Maizzle.</p>
      </header>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        <div
          v-for="guide in guides"
          :key="guide.title"
          class="group relative"
        >
          <NuxtLink
            class="relative text-slate-700 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors"
            :to="guide._path"
          >
            <div class="h-full px-6 py-6 rounded-2xl ring-1 ring-slate-900/5 bg-white hover:ring-indigo-500 transition-all flex flex-col md:flex-row md:flex-wrap flex-1 content-between relative z-1">
              <div>
                <time
                  class="mb-5 block text-sm text-slate-500"
                  :datetime="formatDateToISO(guide.date)"
                >
                  {{ formatDate(guide.date) }}
                </time>
                <p class="mb-5 font-bold text-xl text-slate-700">
                  {{ guide.title }}
                </p>
                <p
                  class="text-base text-slate-500"
                  v-html="guide.description"
                />
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <footer class="text-center mt-12 sm:mt-16">
        <NuxtLink
          to="/guides"
          class="
            px-6 py-2.5 mr-auto md:mr-0 mb-6 md:mb-12 inline-flex rounded-xl text-base text-white bg-indigo-600 hover:bg-indigo-700
            focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white
            transition-colors
          "
        >
          View all guides
        </NuxtLink>
      </footer>
    </div>
  </section>
</template>

<script setup>
  const guides = await queryContent('guides')
    .only([
      '_id',
      '_path',
      'title',
      'description',
      'date',
    ])
    .sort({date: -1})
    .limit(6)
    .find()

  const formatDate = string => {
    const date = new Date(string)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // date to YYYY-MM-DD
  const formatDateToISO = string => {
    const date = new Date(string)
    return date.toISOString().split('T')[0]
  }
</script>
