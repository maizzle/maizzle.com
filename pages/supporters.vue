<template>
  <div class="bg-white px-6 py-24 lg:px-8">
    <PatternTemplates class="max-w-3xl mt-0 fixed bottom-72 lg:bottom-0 -left-44 lg:left-0 w-auto md:w-2/3 lg:w-1/2 z-0 pointer-events-none text-slate-300" />

    <div class="mx-auto max-w-5xl text-base leading-7 text-gray-700">
      <div class="text-center space-y-4">
        <h1 class="text-3xl font-bold text-slate-800">
          Maizzle Supporters
        </h1>
        <p>
          <a href="https://github.com/sponsors/maizzle" class="underline">Sponsor Maizzle development</a> and see your name or company logo here.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Supporters',
  meta: [
    {
      name: 'description',
      content: 'Support Maizzle development through a monthly or one-time sponsorship and see your name or company logo here.'
    },
    // Open Graph
    {
      property: 'og:url',
      content: 'https://maizzle.com/supporters'
    },
    {
      property: 'og:title',
      content: 'Supporters'
    },
    {
      property: 'og:description',
      content: 'Support Maizzle development through a monthly or one-time sponsorship and see your name or company logo here.'
    },
    {
      property: 'og:type',
      content: 'article',
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://maizzle.com/supporters',
    },
  ],
})
</script>
