<template>
  <section id="environments" class="pt-5 pb-20 md:py-44 relative">
    <div class="absolute inset-x-0 top-24 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-10 blur-3xl sm:pt-40 xl:justify-end" aria-hidden="true">
      <div class="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] xl:ml-0 xl:mr-[calc(50%-12rem)]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
    </div>
    <div class="max-w-7xl px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 relative z-10">
      <div>
        <div class="lg:sticky top-28">
          <div class="relative">
            <HomeCodeFrame
              title="config.production.js"
              bg-frame-class="top-4 sm:top-8 right-4 sm:right-8 bg-white/30 backdrop-blur-[1px]"
              no-copy
            >
              <ContentRenderer :value="page" />
            </HomeCodeFrame>
          </div>
        </div>
      </div>
      <div>
        <h3 class="mb-7 text-3xl md:text-4xl font-bold text-slate-800">
          Build
          <span class="text-indigo-600">Environments</span>
        </h3>
        <p class="mb-7 text-lg md:text-xl text-slate-500">
          Custom build scenarios, easily configured in JavaScript.
        </p>
        <p class="mb-12 text-slate-500">
          Using fake data locally, but need to fetch content from an API in production?
          Prettified email markup for your colleagues? All possible.
        </p>
        <h3 class="mb-6 text-lg md:text-xl font-semibold text-slate-800">
          CLI Commands
        </h3>
        <p class="mb-8 text-base text-slate-500">
          Each build environment config enables its own CLI build command,
          so you can build the same templates in as many ways as you need.
        </p>
        <h4 class="mb-6 text-lg md:text-xl font-semibold text-slate-800">
          Transformers
        </h4>
        <p class="mb-8 text-base text-slate-500">
          Choose which post-processing transformations Maizzle applies to your HTML emails, on a build environment-basis.
        </p>
        <h4 class="mb-6 text-lg md:text-xl font-semibold text-slate-800">
          Front Matter
        </h4>
        <p class="text-base text-slate-500">
          Define or override data for each template just before it's compiled, through YAML Front Matter variables.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
  const page = await queryContent('code/environment').findOne()
</script>
