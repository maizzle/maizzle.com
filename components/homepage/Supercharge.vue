<template>
  <section id="supercharge" class="pt-20 md:pt-44 pb-0 relative">
    <div class="w-full h-[32rem] absolute top-0 left-0 z-0 block bg-gradient-to-b from-slate-50/75"></div>
    <div class="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-10 blur-3xl sm:pt-40 xl:justify-end" aria-hidden="true">
      <div class="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] xl:ml-0 xl:mr-[calc(50%-12rem)]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
    </div>
    <div class="max-w-7xl px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 relative z-10">
      <div class="relative">
        <div class="lg:sticky top-28">
          <div class="relative">
            <HomeCodeFrame
              no-copy
              title="tailwind.config.js"
              bg-frame-class="top-4 sm:top-8 right-4 sm:right-8 backdrop-blur-[2px]"
            >
              <ContentRenderer :value="page" />
            </HomeCodeFrame>
          </div>
        </div>
      </div>
      <div>
        <h3 class="mb-7 text-3xl md:text-4xl font-bold text-slate-800">
          <span class="text-indigo-600">Supercharge</span> your email development workflow
        </h3>
        <p class="mb-12 text-lg md:text-xl text-slate-500">
          Maizzle empowers you with modern web development tools, enabling fast HTML email coding while keeping your&nbsp;entire team on-brand.
        </p>
        <a href="https://tailwindcss.com" class="inline-block mb-7" aria-label="Tailwind CSS">
          <TailwindLogo />
        </a>
        <p class="mb-7 text-slate-500">
          Who said CSS frameworks are just for websites? Maizzle uses Tailwind&nbsp;CSS,
          so you can quickly code beautiful HTML emails.
        </p>
        <h3 class="mb-6 text-lg md:text-xl font-semibold text-slate-800">Utility-first CSS</h3>
        <p class="mb-8 text-base text-slate-500">
          Tailwind CSS provides low-level utility classes that help you style HTML emails much faster and with better control than writing inline CSS.
        </p>
        <h4 class="mb-6 text-lg md:text-xl font-semibold text-slate-800">Powerful modifiers</h4>
        <p class="mb-8 text-base text-slate-500">
          Use modifiers like <code class="bg-slate-50 px-1.5 py-0.5 border rounded-md text-sm">hover:bg-blue-500</code> or <code class="bg-slate-50 px-1.5 py-0.5 border rounded-md text-sm">sm:w-full</code> to easily
          add hover effects or style responsive emails - no more context switching.
        </p>
        <h4 class="mb-6 text-lg md:text-xl font-semibold text-slate-800">Make it your own</h4>
        <p class="text-base text-slate-500">
          Easily create or bring in your own Email Design System, keeping everyone in your email team on-brand.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
  const page = await queryContent('code/config').findOne()
</script>
