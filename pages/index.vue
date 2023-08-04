<template>
  <div class="flex-1 relative -mt-[88px]">
    <!-- Masthead -->
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

    <!-- Section 1 -->
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
                <ContentDoc path="code/config" />
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

    <!-- Section 2 -->
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
            <ContentDoc path="code/template" />
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

    <!-- Section 3 -->
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
                <ContentDoc path="code/environment" />
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

    <!-- Features -->
    <section id="features" class="py-20 md:pt-44 relative">
      <div class="w-full h-96 absolute top-0 left-0 z-0 block bg-gradient-to-b from-slate-50"></div>
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="px-6">
          <h3
            id="features-heading"
            class="mb-7 text-3xl md:text-4xl font-bold text-slate-800"
          >
            Maizzle
            <span class="text-indigo-600">Features</span>
          </h3>
          <div class="w-full grid grid-cols-1 md:grid-cols-3">
            <p class="mb-8 md:col-span-2 lg:col-span-1 text-slate-500">
              Customizable tools, crafted for email development.
            </p>
          </div>
        </div>
        <div
          class="pt-4 px-6 overflow-y-hidden"
          :class="{'pb-36' : showAllFeatures}"
        >
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative"
            :class="{'h-[650px]' : !showAllFeatures}"
          >
            <NuxtLink
              v-for="feature in features"
              :key="feature.path"
              :to="feature.path"
              class="group relative rounded-2xl ring-1 ring-slate-900/5 bg-white hover:ring-indigo-500 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <div class="px-6 py-5 rounded-lg relative z-1">
                <p class="mb-5 font-bold text-xl text-slate-700">
                  {{ feature.title }}
                </p>
                <p
                  class="text-base text-slate-500"
                  v-html="feature.description"
                />
              </div>
            </NuxtLink>
          </div>
        </div>
        <div
          class="w-full px-6 flex items-end bottom-0 left-0 z-10 bg-gradient-to-t from-white"
          :class="{'h-44 sticky -mt-36' : showAllFeatures, 'h-96 absolute' : !showAllFeatures}"
        >
          <button
            type="button"
            class="py-2.5 mb-16 mx-auto inline-flex text-base bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white duration-300"
            :class="{'px-2.5 rounded-full duration-300 hover:rotate-180' : showAllFeatures, 'px-6 rounded-xl transition-colors' : !showAllFeatures}"
            @click="showFeatures"
          >
            <span v-show="!showAllFeatures">
              View all features
            </span>
            <span v-show="showAllFeatures">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <Testimonials />

    <!-- Mailviews -->
    <section id="mailviews" class="relative sm:mt-24">
      <div class="absolute inset-x-0 rotate-180 top-24 -z-10 flex scale-x-[-1] transform-gpu overflow-hidden pt-32 opacity-10 blur-3xl sm:pt-40 xl:justify-end" aria-hidden="true">
        <div class="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] xl:ml-0 xl:mr-[calc(50%-12rem)]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
      </div>
      <div class="max-w-7xl px-6 mx-auto relative">
        <Mailviews />
      </div>
    </section>

    <!-- Guides -->
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

    <!-- Templates by craftingemails -->
    <section id="ce-templates" class="relative mt-12 md:mt-24">
      <div class="max-w-7xl px-6 mx-auto relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          <div>
            <div class="lg:sticky top-28">
              <h3 class="mb-7 text-3xl md:text-4xl font-bold text-slate-800">
                <span class="text-indigo-600">Templates</span>
                by craftingemails
              </h3>
              <p class="mb-6 md:mb-12 text-slate-500">
                Kickstart your project with these email templates built by <em>craftingemails</em>.
              </p>
              <a
                href="https://craftingemails.com/email-templates"
                class="px-6 py-2.5 mb-6 md:mb-12 inline-flex rounded-xl text-base bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors"
              >
                View all templates
              </a>
            </div>
          </div>
          <div class="col-span-2">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                v-for="(template, index) in templates"
                :key="template.title"
                class="flex"
                :class="{'row-span-2 items-center': index === 0}"
              >
                <a
                  :href="template.url"
                  class="grid-item relative focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  <div class="frame w-full h-full p-[1px] rounded-[9px] absolute z-0 bg-white transition-all duration-300">
                    <div class="frame-inner w-full h-full rounded-lg absolute bg-white"></div>
                  </div>
                  <Image
                    class="rounded-2xl ring-1 ring-slate-900/5 bg-slate-100"
                    :width="384"
                    :height="287"
                    :url="template.image"
                    :alt="template.title"
                  />
                  <div class="py-4 flex items-end gap-2 rounded-lg relative z-10">
                    <h4 class="font-bold text-xl text-slate-700">{{ template.name }}</h4>
                    <p class="text-base text-slate-500">{{ template.purpose }}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <SiteFooter />
  </div>
</template>

<script setup>
  import features from '@/data/features'

  definePageMeta({
    layout: 'homepage',
  })

  defineOgImage({
    component: 'OGImageHome',
  })

  useContentHead({
    head: {
      titleTemplate: () => 'Maizzle - Quickly build HTML emails with Tailwind CSS',
    }
  })

  const templates = await queryContent('templates')
    .only([
      '_id',
      '_path',
      'date',
      'title',
      'name',
      'image',
      'url',
      'purpose',
    ])
    .sort({date: -1})
    .limit(3)
    .find()

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

  const showAllFeatures = ref(false)
  const windowPosition = ref(0)

  const showFeatures = () => {
    if (!showAllFeatures.value) {
      windowPosition.value = getYPosition()
    } else {
      setYPosition(windowPosition.value)
    }

    showAllFeatures.value = !showAllFeatures.value
  }

  const getYPosition = () => window.pageYOffset
  const setYPosition = amount => window.scrollTo({left: 0, top: amount, behavior: 'smooth'})

  const formatDate = string => {
    const date = new Date(string)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const openDocsearch = () => {
    document.querySelector('#docsearch button').click()
  }

  // date to YYYY-MM-DD
  const formatDateToISO = string => {
    const date = new Date(string)
    return date.toISOString().split('T')[0]
  }
</script>
