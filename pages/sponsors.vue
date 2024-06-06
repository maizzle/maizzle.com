<template>
  <div class="px-6 py-12 bg-white sm:py-24 lg:px-8">
    <PatternTemplates class="fixed z-0 w-auto max-w-3xl mt-0 pointer-events-none bottom-72 lg:bottom-0 -left-44 lg:left-0 md:w-2/3 lg:w-1/2 text-slate-300" />

    <div class="relative mx-auto text-base leading-7 text-gray-700 max-w-7xl xl:px-6">
      <div class="space-y-6">
        <h1 class="text-5xl font-bold text-slate-800">
          Maizzle Sponsors
        </h1>
        <div class="space-y-10">
          <p class="max-w-xl text-lg text-balance">
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

    <div class="mx-auto my-16 max-w-7xl xl:px-6">
      <hr>
    </div>

    <div class="relative space-y-16">
      <div class="grid mx-auto max-w-7xl gap-x-16 gap-y-12 lg:gap-y-20 lg:px-8 xl:grid-cols-3">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Individual++
            <span class="block text-base font-medium text-slate-600">$32/mo</span>
          </h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Maizzle has made your HTML email coding work easier or more enjoyable and you'd like to support its development.
          </p>
        </div>
        <ul role="list" class="grid max-w-2xl grid-cols-2 text-center gap-x-8 gap-y-16 sm:grid-cols-3 md:grid-cols-4 sm:mx-0 lg:max-w-none lg:grid-cols-5 xl:col-span-2">
          <li v-for="item in Array.from(Array(4))">
            <a href="https://github.com/sponsors/maizzle/sponsorships?tier_id=374199" target="_blank" class="group">
              <div class="w-24 h-24 mx-auto transition-all rounded-full bg-slate-200/75 group-hover:bg-slate-300"></div>
              <div class="mt-3.5 mx-auto w-28 h-4 bg-slate-200/75"></div>
              <div class="mt-3.5 mx-auto w-16 h-3 bg-slate-200/75"></div>
            </a>
          </li>
        </ul>
      </div>
      <div class="grid mx-auto max-w-7xl gap-x-16 gap-y-12 lg:gap-y-20 lg:px-8 xl:grid-cols-3">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Freelancer
            <span class="block text-base font-medium text-slate-600">$64/mo</span>
          </h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            You're a solo developer and Maizzle makes your email coding freelancing career easier.
          </p>
        </div>
        <ul role="list" class="grid max-w-2xl grid-cols-2 text-center gap-x-8 gap-y-16 sm:grid-cols-3 md:grid-cols-4 sm:mx-0 lg:max-w-none lg:grid-cols-5 xl:col-span-2">
          <li v-for="item in Array.from(Array(4))">
            <a href="https://github.com/sponsors/maizzle/sponsorships?tier_id=374194" target="_blank" class="group">
              <div class="w-24 h-24 mx-auto transition-all rounded-full bg-slate-200/75 group-hover:bg-slate-300"></div>
              <div class="mt-3.5 mx-auto w-28 h-4 bg-slate-200/75"></div>
              <div class="mt-3.5 mx-auto w-16 h-3 bg-slate-200/75"></div>
            </a>
          </li>
        </ul>
      </div>
      <div class="grid mx-auto max-w-7xl gap-x-16 gap-y-12 lg:gap-y-20 lg:px-8 xl:grid-cols-3">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Startup
            <span class="block text-base font-medium text-slate-600">$128/mo</span>
          </h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            You're working at a company that is benefiting from Maizzle and you'd like to contribute back.
          </p>
        </div>
        <ul role="list" class="grid max-w-2xl grid-cols-2 text-center gap-x-8 gap-y-16 sm:grid-cols-3 md:grid-cols-4 sm:mx-0 lg:max-w-none lg:grid-cols-5 xl:col-span-2">
          <li v-for="item in Array.from(Array(4))">
            <a href="https://github.com/sponsors/maizzle/sponsorships?tier_id=374200" target="_blank" class="group">
              <div class="w-24 h-24 mx-auto transition-all rounded-full bg-slate-200/75 group-hover:bg-slate-300"></div>
              <div class="mt-3.5 mx-auto w-28 h-4 bg-slate-200/75"></div>
              <div class="mt-3.5 mx-auto w-16 h-3 bg-slate-200/75"></div>
            </a>
          </li>
        </ul>
      </div>
      <div class="grid mx-auto max-w-7xl gap-x-16 gap-y-12 lg:gap-y-20 lg:px-8 xl:grid-cols-3">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Agency++
            <span class="block text-base font-medium text-slate-600">$512/mo</span>
          </h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            You run a successful company or agency that uses Maizzle and want to ensure its continued development 🤝
          </p>
        </div>
        <ul role="list" class="grid max-w-2xl grid-cols-2 text-center gap-x-8 gap-y-16 sm:grid-cols-3 md:grid-cols-4 sm:mx-0 lg:max-w-none lg:grid-cols-5 xl:col-span-2">
          <li v-for="item in Array.from(Array(4))">
            <a href="https://github.com/sponsors/maizzle/sponsorships?tier_id=374207" target="_blank" class="group">
              <div class="w-24 h-24 mx-auto transition-all rounded-full bg-slate-200/75 group-hover:bg-slate-300"></div>
              <div class="mt-3.5 mx-auto w-28 h-4 bg-slate-200/75"></div>
              <div class="mt-3.5 mx-auto w-16 h-3 bg-slate-200/75"></div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
  useHead({
    title: 'Sponsors | Maizzle',
    meta: [
      {
        name: 'description',
        content: 'Support Maizzle development through a monthly or one-time sponsorship and see your name or company logo here.'
      },
      // Open Graph
      {
        property: 'og:url',
        content: 'https://maizzle.com/sponsors'
      },
      {
        property: 'og:title',
        content: 'Sponsors'
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
        href: 'https://maizzle.com/sponsors',
      },
    ],
  })

  defineOgImageComponent('OGImageDocs', {
    title: 'Sponsors',
    description: 'Support Maizzle development through a monthly or one-time sponsorship.',
  })
</script>
