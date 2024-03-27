<template>
  <div class="bg-white px-6 py-12 sm:py-24 lg:px-8">
    <PatternTemplates class="max-w-3xl mt-0 fixed bottom-72 lg:bottom-0 -left-44 lg:left-0 w-auto md:w-2/3 lg:w-1/2 z-0 pointer-events-none text-slate-300" />

    <div class="mx-auto max-w-7xl xl:px-6 text-base leading-7 text-gray-700 relative">
      <div class="space-y-6">
        <h1 class="text-5xl font-bold text-slate-800">
          Maizzle Sponsors
        </h1>
        <div class="space-y-10">
          <p class="max-w-xl text-balance text-lg">
            If you use Maizzle at work and feel that it has made your life easier, please consider supporting
            development through a monthly or one-time sponsorship and see your name or company logo here.
          </p>
          <a
            href="https://github.com/sponsors/maizzle"
            class="px-6 py-2.5 inline-flex items-center gap-3 rounded-xl text-base bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors"
          >
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-labelledby="gh-title" role="img" data-v-inspector="components/SiteHeader.vue:60:13"><title id="gh-title" data-v-inspector="components/SiteHeader.vue:61:15">GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" data-v-inspector="components/SiteHeader.vue:62:15"></path></svg>
            <span>Become a sponsor</span>
          </a>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto xl:px-6 my-16">
      <hr>
    </div>

    <div class="mx-auto grid max-w-7xl gap-x-16 gap-y-12 lg:gap-y-20 lg:px-8 xl:grid-cols-3">
      <div class="max-w-2xl">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Individual++</h2>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          Maizzle has made your HTML email coding work easier or more enjoyable and you'd like to support its development.
        </p>
      </div>
      <ul role="list" class="grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 sm:mx-0 lg:max-w-none lg:grid-cols-5 xl:col-span-2">
        <li>
          <a href="https://joeyfigaro.com" rel="noopener noreferrer" target="_blank">
            <img class="mx-auto h-24 w-24 rounded-full" src="https://avatars.githubusercontent.com/u/1386477?v=4" alt>
            <h3 class="mt-2 text-base font-semibold leading-7 tracking-tight text-gray-900">Joey Figaro</h3>
            <p class="text-sm leading-6 text-gray-600">joeyfigaro.com</p>
          </a>
        </li>
        <li v-for="item in Array.from(Array(3))">
          <div class="mx-auto h-24 w-24 rounded-full bg-slate-200/75"></div>
          <div class="mt-3.5 mx-auto w-28 h-4 bg-slate-200/75"></div>
          <div class="mt-3.5 mx-auto w-16 h-3 bg-slate-200/75"></div>
        </li>
      </ul>
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
