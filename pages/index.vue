<template>
  <div class="flex-1 relative -mt-[88px]">
    <!-- Masthead -->
    <div class="absolute inset-x-0 top-0 -translate-y-1/4 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-5 blur-3xl sm:pt-40 xl:justify-end" aria-hidden="true">
      <div class="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] xl:ml-0 xl:mr-[calc(50%-12rem)]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
    </div>
    <section class="max-w-7xl pt-16 pb-20 md:pt-[88px] md:pb-44 px-6 mx-auto relative overflow-hidden">
      <PatternMasthead class="absolute scale-[1.2] sm:scale-100 top-32 sm:top-0 right-20 sm:right-10 z-0 text-slate-300" />

      <div class="mt-[88px] relative z-10">
        <!-- <a
          href="https://mailviews.com"
          target="_blank"
          class="px-6 py-2 rounded-full bg-slate-900 hover:bg-slate-800 flex justify-center items-center text-center gap-2 max-w-max mx-auto mb-12 group transition-colors"
        >
          <span class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-28 -mt-1" viewBox="0 0 165 24" fill="none">
                <path stroke="#2DD4BF" stroke-miterlimit="10" d="M31.768 6.09a3.018 3.018 0 0 0-.516-4.232 3.007 3.007 0 0 0-4.225.516l-12.57 16.09a3.018 3.018 0 0 0 .517 4.233 3.006 3.006 0 0 0 4.225-.517L31.768 6.09Z"/>
                <path stroke="#2DD4BF" stroke-miterlimit="10" d="M43.85 1.864a3.01 3.01 0 0 0-4.225.513l-7.213 9.245V4.236a3.021 3.021 0 0 0-3.01-3.015 3.021 3.021 0 0 0-3.01 3.015v16.079c0 .744.291 1.427.742 1.96.12.14.241.26.382.381.02.02.03.04.05.05.01 0 .03.01.04.02.11.081.23.152.351.222.06.04.12.07.19.1.091.04.181.07.272.1.1.041.21.071.31.101l.181.03c.15.03.301.04.452.05h.08c.883 0 1.756-.391 2.348-1.135L44.36 6.105a3.022 3.022 0 0 0-.512-4.23v-.01ZM19.164 6.09a3.018 3.018 0 0 0-.516-4.232 3.007 3.007 0 0 0-4.225.517L1.854 18.465a3.018 3.018 0 0 0 .516 4.233 3.007 3.007 0 0 0 4.225-.517l12.57-16.09Z"/>
                <path fill="#fff" d="M88.307 5.218a1.63 1.63 0 0 0-1.163.476 1.469 1.469 0 0 0-.474 1.09c0 .425.154.802.474 1.119.33.297.72.455 1.163.455.443 0 .824-.148 1.133-.455.33-.317.495-.694.495-1.12 0-.426-.165-.792-.495-1.09a1.527 1.527 0 0 0-1.133-.475ZM88.307 10.478c-.36 0-.67.11-.916.337-.227.218-.35.515-.35.882v10.579c0 .346.113.643.35.881.247.218.556.337.916.337s.68-.109.917-.337c.226-.238.35-.535.35-.881v-10.59c0-.366-.113-.653-.35-.881-.237-.228-.536-.337-.917-.337v.01ZM95.887 5.248a1.237 1.237 0 0 0-.886-.337c-.36 0-.659.11-.885.337-.227.228-.35.505-.35.852v16.185c0 .347.113.634.35.852.237.218.525.337.885.337s.66-.109.886-.337c.227-.227.35-.505.35-.852V6.1c0-.347-.113-.634-.35-.852ZM65.31 12.707a4.058 4.058 0 0 0-1.678-1.764c-.72-.396-1.555-.594-2.492-.594-1.071 0-2.03.218-2.863.664a4.927 4.927 0 0 0-1.473 1.208l-.33.436-.329-.436a4.929 4.929 0 0 0-1.473-1.208c-.844-.446-1.792-.664-2.863-.664-.937 0-1.771.198-2.492.595-.72.396-1.287.98-1.679 1.763-.411.762-.617 1.684-.617 2.783v6.795c0 .347.113.644.35.882.226.218.535.337.916.337s.67-.11.917-.337c.226-.238.35-.535.35-.882V15.49c0-1 .257-1.733.762-2.209.515-.495 1.174-.733 1.998-.733.824 0 1.565.287 2.121.852.546.575.814 1.298.814 2.19v6.705c0 .347.113.644.35.882.216.208.515.317.865.327h.041c.35-.02.65-.12.865-.337.227-.238.35-.535.35-.882V15.58c0-.891.268-1.614.814-2.189.556-.574 1.267-.852 2.122-.852s1.493.248 1.998.733c.514.476.762 1.209.762 2.21v6.794c0 .347.113.644.35.882.247.218.556.337.916.337s.68-.11.917-.337c.227-.238.35-.535.35-.882V15.48c0-1.09-.206-2.02-.618-2.783l-.02.01ZM79.708 11.26c-1.02-.584-2.173-.881-3.46-.881-1.288 0-2.451.297-3.481.882a6.696 6.696 0 0 0-2.451 2.357c-.597 1-.886 2.12-.886 3.378s.268 2.377.814 3.378a6.528 6.528 0 0 0 2.276 2.357c.958.575 2.039.852 3.233.852 1.195 0 2.287-.287 3.234-.852a6.274 6.274 0 0 0 1.535-1.327v.901c0 .347.113.644.35.882.247.218.556.336.916.336s.66-.108.886-.336a1.18 1.18 0 0 0 .37-.882v-5.3c0-1.247-.308-2.377-.916-3.377-.597-1-1.4-1.783-2.42-2.358v-.01Zm.35 8.014a4.36 4.36 0 0 1-1.555 1.595 4.46 4.46 0 0 1-2.245.574c-.834 0-1.576-.188-2.245-.574a4.615 4.615 0 0 1-1.586-1.595c-.381-.683-.566-1.446-.566-2.278 0-.832.185-1.615.566-2.278a4.298 4.298 0 0 1 1.586-1.595 4.36 4.36 0 0 1 2.245-.595c.824 0 1.586.198 2.245.595.66.376 1.174.911 1.555 1.595.381.663.567 1.426.567 2.278 0 .852-.186 1.605-.567 2.278ZM115.969 5.218a1.63 1.63 0 0 0-1.164.476 1.468 1.468 0 0 0-.473 1.09c0 .425.154.802.473 1.119.33.297.721.455 1.164.455.443 0 .824-.148 1.133-.455.329-.317.494-.694.494-1.12 0-.426-.165-.792-.494-1.09a1.527 1.527 0 0 0-1.133-.475ZM131.211 11.211c-.927-.555-2.029-.832-3.316-.832-1.288 0-2.451.287-3.461.852a6.03 6.03 0 0 0-2.368 2.328c-.556.98-.845 2.12-.845 3.427s.299 2.427.886 3.427a6.505 6.505 0 0 0 2.492 2.328c1.071.555 2.286.832 3.656.832.762 0 1.545-.139 2.369-.406.844-.268 1.544-.614 2.101-1.05.278-.208.412-.456.391-.733-.021-.287-.165-.545-.443-.783a1.048 1.048 0 0 0-.762-.237c-.278 0-.546.089-.793.257-.33.238-.762.456-1.308.644a4.827 4.827 0 0 1-1.555.258c-.937 0-1.771-.198-2.492-.595a4.458 4.458 0 0 1-1.71-1.614 4.243 4.243 0 0 1-.546-1.496h9.393c.329 0 .597-.1.813-.287.217-.208.32-.456.32-.763 0-1.248-.248-2.357-.742-3.309a5.164 5.164 0 0 0-2.101-2.258l.021.01Zm-5.737 1.803c.68-.396 1.483-.595 2.421-.595.823 0 1.524.179 2.1.545.577.367 1.02.862 1.339 1.496.217.436.34.931.412 1.446h-8.197c.082-.446.216-.872.412-1.258a3.94 3.94 0 0 1 1.503-1.644l.01.01ZM164.537 18.006c-.309-.495-.834-.92-1.555-1.287-.711-.367-1.679-.664-2.915-.902-.885-.178-1.565-.347-2.029-.525-.463-.188-.772-.396-.937-.614a1.482 1.482 0 0 1-.226-.783c0-.455.247-.812.741-1.05.515-.237 1.133-.356 1.854-.356.628 0 1.174.07 1.658.218s.927.406 1.339.782c.247.218.556.367.916.426.361.06.68 0 .938-.168.267-.188.401-.416.422-.694.02-.287-.093-.554-.32-.812-.494-.584-1.163-1.05-1.997-1.377-.845-.336-1.803-.495-2.894-.495-.845 0-1.648.139-2.42.406-.773.258-1.411.654-1.906 1.189-.494.525-.741 1.189-.741 2 0 .922.371 1.695 1.112 2.329.762.634 1.967 1.11 3.635 1.426 1.288.218 2.163.505 2.647.852.494.347.731.763.721 1.238-.021.476-.278.862-.793 1.169-.494.297-1.215.456-2.173.456a5.612 5.612 0 0 1-2.08-.377c-.608-.267-1.051-.554-1.339-.852a1.306 1.306 0 0 0-.844-.406c-.309-.05-.639.06-.969.307a1.207 1.207 0 0 0-.494.813c-.031.316.072.604.319.851.546.525 1.298.961 2.276 1.308.989.337 2.06.495 3.213.495 1.154 0 2.143-.178 2.915-.525.793-.346 1.38-.812 1.782-1.406a3.354 3.354 0 0 0 .618-1.972c0-.634-.155-1.188-.474-1.664ZM115.969 10.478c-.361 0-.67.11-.917.337-.226.218-.35.515-.35.882v10.579c0 .346.113.643.35.881.247.218.556.337.917.337.36 0 .68-.109.916-.337.227-.238.351-.535.351-.881v-10.59c0-.366-.114-.653-.351-.881-.236-.228-.535-.337-.916-.337v.01ZM151.149 10.478c-.629 0-1.051.367-1.288 1.09l-2.708 8.172-2.235-8.37a1.083 1.083 0 0 0-.422-.644c-.196-.179-.464-.258-.793-.258-.35 0-.618.09-.814.258-.196.158-.34.376-.422.644l-2.523 8.201-2.668-8.013c-.133-.396-.308-.674-.514-.832-.196-.179-.454-.258-.763-.258-.473 0-.792.159-.937.476-.134.297-.134.693 0 1.188l3.656 10.56c.083.218.227.416.443.574.227.139.474.218.742.218.278 0 .525-.07.741-.218.227-.158.381-.346.443-.574l2.544-8.628 2.42 8.628c.062.218.216.416.443.574a1.4 1.4 0 0 0 .741.218c.278 0 .525-.07.742-.218.216-.158.35-.346.422-.574l3.656-10.56c.185-.495.185-.891.02-1.188-.164-.317-.473-.476-.937-.476l.011.01ZM111.324 10.636a1.286 1.286 0 0 0-.937-.069c-.298.1-.515.277-.669.545l-4.253 8.915-4.295-8.915a1.098 1.098 0 0 0-.669-.545c-.278-.099-.556-.07-.845.07-.309.138-.525.346-.638.614-.103.257-.083.515.051.782l5.242 10.629c.278.525.68.782 1.185.782.504 0 .885-.257 1.132-.782l5.242-10.629c.134-.267.144-.535.052-.812-.103-.268-.299-.466-.598-.595v.01Z"/>
            </svg>
            <span class="text-white text-sm mt-px">is here</span>
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 -rotate-45 group-hover:translate-x-1 hidden transition-transform">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </a> -->

        <h1 class="mb-9 mx-auto text-4xl lg:text-5xl text-center font-bold text-slate-800">
          Quickly <span class="text-indigo-600">build HTML emails</span>
          <br>with Tailwind CSS
        </h1>

        <p class="max-w-5xl mb-14 mx-auto text-lg md:text-xl text-center text-slate-500">Maizzle is a framework that helps you quickly build HTML emails with <br>Tailwind CSS and advanced email optimizations.</p>

        <!-- Cta -->
        <div class="w-full mb-20 md:mb-32 mx-auto flex flex-col md:flex-row items-center justify-center gap-5">
          <AlgoliaDocSearch class="hidden" />
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
      <div class="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-5 blur-3xl sm:pt-40 xl:justify-end" aria-hidden="true">
        <div class="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] xl:ml-0 xl:mr-[calc(50%-12rem)]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
      </div>
      <div class="max-w-7xl px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 relative z-10">
        <div class="relative">
          <div class="lg:sticky top-28">
            <div class="relative leading-7">
              <HomeCodeFrame
                no-copy
                title="tailwind.config.js"
                bg-frame-class="top-4 sm:top-8 right-4 sm:right-8 backdrop-blur-[2px]"
              >
                <ContentRenderer v-if="codeConfig" :value="codeConfig" :prose="false" />
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
            Use modifiers like <code class="bg-slate-50 px-1.5 py-0.5 border border-slate-200 rounded-md text-sm">hover:bg-blue-500</code> or <code class="bg-slate-50 px-1.5 py-0.5 border border-slate-200 rounded-md text-sm">sm:w-full</code> to easily
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
      <div class="absolute inset-x-0 top-24 -z-10 flex scale-x-[-1] transform-gpu overflow-hidden pt-32 opacity-5 blur-3xl sm:pt-40 xl:justify-end" aria-hidden="true">
        <div class="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] xl:ml-0 xl:mr-[calc(50%-12rem)]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
      </div>

      <div class="max-w-7xl px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 relative z-10">
        <div class="lg:order-2">
          <div class="relative leading-7">
            <HomeCodeFrame
              title="src/templates/example.html"
              bg-frame-class="top-4 sm:top-8 right-4 sm:right-8 bg-white/30 backdrop-blur-[2px]"
              no-copy
            >
              <ContentRenderer v-if="codeTemplate" :value="codeTemplate" :prose="false" />
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
      <div class="absolute inset-x-0 top-24 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-5 blur-3xl sm:pt-40 xl:justify-end" aria-hidden="true">
        <div class="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] xl:ml-0 xl:mr-[calc(50%-12rem)]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
      </div>
      <div class="max-w-7xl px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 relative z-10">
        <div>
          <div class="lg:sticky top-28">
            <div class="relative leading-7">
              <HomeCodeFrame
                title="config.production.js"
                bg-frame-class="top-4 sm:top-8 right-4 sm:right-8 bg-white/30 backdrop-blur-[1px]"
                no-copy
              >
                <ContentRenderer v-if="codeEnvironment" :value="codeEnvironment" :prose="false" />
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
          :class="{ 'pb-36': showAllFeatures }"
        >
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative"
            :class="{ 'h-[650px]': !showAllFeatures }"
          >
            <NuxtLink
              v-for="feature in features[0].items"
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
          :class="{ 'h-44 sticky -mt-36': showAllFeatures, 'h-96 absolute': !showAllFeatures }"
        >
          <button
            type="button"
            class="py-2.5 mb-16 mx-auto inline-flex text-base bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white duration-300 cursor-pointer"
            :class="{ 'px-2.5 rounded-full duration-300 hover:rotate-180': showAllFeatures, 'px-6 rounded-xl transition-colors': !showAllFeatures }"
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
      <div class="absolute inset-x-0 rotate-180 top-24 -z-10 flex scale-x-[-1] transform-gpu overflow-hidden pt-32 opacity-5 blur-3xl sm:pt-40 xl:justify-end" aria-hidden="true">
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
              :to="guide.path"
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

    <SiteFooter />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'home'
})

defineOgImageComponent('OGImageHome')

const { data: features } = await useAsyncData('features-collection', () => {
  return queryCollection('features').all()
})

const { data: guides } = await useAsyncData('guides-collection', () => {
  return queryCollection('guides')
    .order('date', 'DESC')
    .limit(6)
    .all()
})

const { data: codeConfig } = await useAsyncData('code-config', () => {
  return queryCollection('code').path('/code/config').first()
})

const { data: codeEnvironment } = await useAsyncData('code-environment', () => {
  return queryCollection('code').path('/code/environment').first()
})

const { data: codeTemplate } = await useAsyncData('code-template', () => {
  return queryCollection('code').path('/code/template').first()
})

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
const setYPosition = amount => window.scrollTo({ left: 0, top: amount, behavior: 'smooth' })

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
