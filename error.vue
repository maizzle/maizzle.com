<template>
  <NuxtLayout>
    <div class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <InsigniaSvgBg class="fixed pointer-events-none opacity-40" />
        <div class="z-10 relative">
          <span class="text-base font-semibold text-indigo-600">
            {{ error.statusCode }}
          </span>
          <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {{ errorMessage }}
          </h1>
          <div class="mt-10 space-y-4 grid justify-center">
            <p class="text-base text-gray-500">
              Try searching?
            </p>
            <DocSearch class="hidden" />
            <button
              class="w-72 pl-4 pr-2 py-2 flex items-center justify-between border rounded-xl border-slate-300 hover:border-slate-400/75 bg-white text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              @click="openDocsearch"
            >
              <span class="flex items-center gap-2">
                <svg class="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search docs
              </span>
              <span class="px-2 py-1 border rounded-md text-xs border-slate-300">Ctrl K</span>
            </button>
          </div>
          <div class="mt-12">
            <NuxtLink
              to="/"
              class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const props = defineProps({
  error: Object
})

const errorMessage = props.error.statusCode === 404 ? 'Page not found' : 'Something went wrong'

const {public: runtimeConfig} = useRuntimeConfig()

useHead({
  htmlAttrs: {
    lang: 'en',
    class: 'h-full',
    style: 'scrollbar-gutter: stable',
  },
  bodyAttrs: {
    class: 'h-full',
  },
  title: `${errorMessage} | Maizzle`,
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon/favicon.png',
    },
    {
      rel: 'apple-touch-icon',
      href: '/favicon/apple-touch-icon.png',
    },
    {
      rel: 'preconnect',
      href: `https://${runtimeConfig.docsearch.appId}-dsn.algolia.net`,
      crossorigin: true,
    },
  ],
  script: [
    {
      src: 'https://scripts.withcabin.com/hello.js',
      async: true,
      defer: true,
      body: true,
    },
  ],
})

const openDocsearch = () => {
  document.querySelector('#docsearch button').click()
}
</script>
