<template>
  <div class="absolute inset-x-0 top-0 -translate-y-1/4 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-10 blur-3xl sm:pt-40 xl:justify-end" aria-hidden="true">
    <div class="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] xl:ml-0 xl:mr-[calc(50%-12rem)]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
  </div>
  <section class="max-w-7xl pt-16 pb-20 md:pt-[88px] md:pb-44 px-6 mx-auto relative overflow-hidden">
    <PatternMasthead class="absolute scale-[1.2] sm:scale-100 top-32 sm:top-0 right-20 sm:right-10 z-0 text-slate-300" />

    <div class="mt-[88px] relative z-10">
      <h1 class="mb-9 mx-auto text-4xl lg:text-5xl text-center font-bold text-slate-800">
        Quickly <span class="text-indigo-600">build HTML emails</span>
        <br>with Tailwind CSS
      </h1>

      <p class="max-w-5xl mb-14 mx-auto text-lg md:text-xl text-center text-slate-500">Maizzle is a framework that helps you quickly build HTML emails with <br>Tailwind CSS and advanced, email-specific post-processing.</p>

      <!-- Cta -->
      <div class="w-full mb-20 md:mb-32 mx-auto flex flex-col md:flex-row items-center justify-center gap-5">
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

        <span class="text-slate-500">or</span>

        <NuxtLink
        to="/docs/introduction"
        class="px-6 py-2.5 inline-flex rounded-xl text-base bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors"
        >Get started</NuxtLink>
      </div>

      <!-- Features -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-14">
        <div>
          <div class="w-12 h-12 mb-6 flex items-center rounded-md bg-slate-100 text-slate-800">
            <svg class="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 class="mb-6 text-xl font-semibold text-slate-800">
            Command
          </h2>
          <p class="text-base text-slate-500">
            Use the <code class="py-0.5 px-1.5 rounded-md border border-slate-200 bg-slate-50">@maizzle/cli</code> tool
            to quickly scaffold a Maizzle project and start developing your&nbsp;email&nbsp;templates.
          </p>
        </div>
        <div>
          <div class="w-12 h-12 mb-6 flex items-center rounded-md bg-slate-100 text-slate-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h2 class="mb-6 text-xl font-semibold text-slate-800">
            Code
          </h2>
          <p class="text-base text-slate-500">
            Code emails in HTML and style them with Tailwind CSS.
            Maizzle takes care of all email optimizations, like CSS inlining.
          </p>
        </div>
        <div>
          <div class="w-12 h-12 mb-6 flex items-center rounded-md bg-slate-100 text-slate-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h2 class="mb-6 text-xl font-semibold text-slate-800">
            Customize
          </h2>
          <p class="text-base text-slate-500">
            Responsive or hybrid? Mobile first or desktop first?
            Stay in control and code your emails however you like.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  const openDocsearch = () => {
    document.querySelector('#docsearch button').click()
  }
</script>
