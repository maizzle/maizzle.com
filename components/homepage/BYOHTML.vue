<template>
  <section id="byohtml" class="pt-20 md:pt-44 pb-0 relative">
    <PatternCode class="absolute top-0 mt-0 md:-mt-72 w-auto md:w-2/3 lg:w-1/2 left-0 z-0 text-slate-300" />
    <div class="absolute inset-x-0 top-24 -z-10 flex scale-x-[-1] transform-gpu overflow-hidden pt-32 opacity-10 blur-3xl sm:pt-40 xl:justify-end" aria-hidden="true">
      <div class="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] xl:ml-0 xl:mr-[calc(50%-12rem)]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
    </div>

    <div class="max-w-7xl px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 relative z-10">
      <div class="lg:order-2">
        <div class="relative">
          <HomeCodeFrame
            title="src/templates/example.html"
            bg-frame-class="top-4 sm:top-8 right-4 sm:right-8 bg-white/30 backdrop-blur-[2px]"
            no-copy
          >
            <ContentRenderer :value="page" />
          </HomeCodeFrame>
        </div>
      </div>
      <div class="lg:order-1">
        <h3 class="mb-7 text-3xl md:text-4xl font-bold text-indigo-600">
          BYOHTML&trade;
        </h3>
        <p class="mb-12 text-lg md:text-xl text-slate-500">
          Code with markup you already know.
        </p>
        <h4 class="mb-6 text-lg md:text-xl font-semibold text-slate-800">
          Bring Your Own HTML
        </h4>
        <p class="mb-8 text-base text-slate-500">
          No need to learn custom syntax or adapt your templates to it.
          Use your existing HTML if you like, it'll just work.</p>
        <h3 class="mb-6 text-lg md:text-xl font-semibold text-slate-800">
          Supercharged with PostHTML
        </h3>
        <p class="mb-8 text-base text-slate-500">
          Maizzle uses PostHTML to enhance your email code with powerful components that reduce duplication and help you move faster.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
  const page = await queryContent('code/template').findOne()
</script>
