<template>
  <main class="min-h-screen flex flex-col">
    <site-header
      class="w-full max-w-7xl px-6 py-6 mx-auto rounded-br-2xl rounded-bl-2xl"
      :class="$route.path === '/' ? 'header-transparent' : 'header-default'"
    />

    <section class="max-w-7xl pt-32 px-6 mx-auto relative z-10">
      <div class="grid gap-y-12 items-center h-full">
        <div class="flex items-center gap-4 justify-center">
          <p class="text-4xl font-bold text-slate-900 tracking-tighter">
            {{ error.statusCode }}
          </p>
          <p class="text-lg text-slate-500 first-letter:uppercase">
            {{ error.message }}
          </p>
        </div>
        <div class="w-full mb-20 md:mb-32 mx-auto flex flex-col md:flex-row items-center justify-center gap-5">
          <button
            class="w-64 sm:w-72 pl-4 pr-2 py-2 flex items-center justify-between border rounded-xl border-slate-300 hover:border-slate-400/75 bg-white text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            @click="openDocsearch"
          >
            <span class="flex items-center gap-2">
              <svg class="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search docs
            </span>
            <span class="px-2 py-1 border rounded-md text-xs border-slate-300">Ctrl K</span>
          </button>
          <span class="text-slate-500">or</span>
          <nuxt-link
            to="/docs/introduction"
            class="px-6 py-2.5 inline-flex rounded-xl text-base bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors duration-300"
          >
            Go to homepage
          </nuxt-link>
        </div>
      </div>
    </section>

    <site-footer />

    <doc-search hidden />
  </main>
</template>

<script>
export default {
  name: 'ErrorLayout',
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openDocsearch() {
      document.querySelector('.DocSearch-Button').click()
    },
  },
}
</script>
