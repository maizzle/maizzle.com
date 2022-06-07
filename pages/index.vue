<template>
  <div class="flex-1 relative -mt-[88px]">
    <!-- Masthead -->
    <section class="max-w-7xl pt-16 pb-20 md:pt-[88px] md:pb-44 px-6 mx-auto relative overflow-hidden">
      <pattern-masthead class="absolute top-0 right-10 z-0 text-slate-300" />
      <div class="mt-[88px] relative z-10">

        <h1 class="mb-9 mx-auto text-4xl lg:text-5xl text-center font-bold text-slate-800">
          Quickly <span class="text-indigo-600">build HTML emails</span>
          <br>with utility-first CSS
        </h1>
        <p class="max-w-5xl mb-14 mx-auto text-lg md:text-xl text-center text-slate-500">Maizzle is a framework that helps you quickly build HTML emails with <br>Tailwind CSS and advanced, email-specific post-processing.</p>

        <!-- Cta -->
        <div class="w-full mb-20 md:mb-32 mx-auto flex flex-col md:flex-row items-center justify-center gap-5">
          <button
            class="w-72 pl-4 pr-2 py-2 flex items-center justify-between border rounded-xl border-slate-300 hover:border-slate-400/75 bg-white text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
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
            Get started
          </nuxt-link>
        </div>

        <!-- Features -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-14">
          <div>
            <div class="w-12 h-12 mb-6 flex items-center rounded-md bg-slate-100 text-slate-800">
              <svg class="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 class="mb-6 text-lg md:text-xl font-semibold text-slate-800">Command</h2>
            <p class="text-md text-slate-500">Use the <code class="py-1 px-2 rounded-md border border-slate-200 bg-slate-50">@maizzle/cli</code> tool to quickly scaffold a Maizzle project and start developing your email templates.</p>
          </div>
          <div>
            <div class="w-12 h-12 mb-6 flex items-center rounded-md bg-slate-100 text-slate-800">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h2 class="mb-6 text-lg md:text-xl font-semibold text-slate-800">Code</h2>
            <p class="text-md text-slate-500">Code emails in HTML and style them with Tailwind CSS. Maizzle takes care of all email optimizations, like CSS inlining.</p>
          </div>
          <div>
            <div class="w-12 h-12 mb-6 flex items-center rounded-md bg-slate-100 text-slate-800">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h2 class="mb-6 text-lg md:text-xl font-semibold text-slate-800">Customize</h2>
            <p class="text-md text-slate-500">Responsive or hybrid? Mobile first or desktop first? Stay in control and code your emails however you like.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 1 -->
    <section
      id="supercharge"
      class="pt-20 md:pt-44 pb-0 relative"
    >
      <div class="w-full h-96 absolute top-0 left-0 z-0 block bg-gradient-to-b from-slate-100"></div>
      <div class="max-w-7xl px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 relative z-10">
        <div class="relative">
          <div class="lg:sticky top-28">
            <div class="relative">
              <syntax-highlight
                title="tailwind.config.js"
                no-copy
              >
                <snippet-config />
              </syntax-highlight>
              <!--<email-template class="hidden sm:block absolute bottom-0 md:-bottom-12 right-0 md:right-28 lg:-right-16 z-10" />-->
            </div>
          </div>
        </div>
        <div>
          <h3 class="mb-7 text-3xl md:text-4xl font-bold text-slate-800">
            <span class="text-indigo-600">Supercharge</span> your email development workflow
          </h3>
          <p class="mb-12 text-lg md:text-xl text-slate-500">
            Maizzle empowers you with modern web development tools, enabling fast email prototyping while keeping your entire team on-brand.
          </p>
          <tailwind-logo class="mb-7" />
          <p class="mb-7 text-slate-500">
            Who said CSS frameworks should only be used for websites? Maizzle uses the Tailwind CSS framework,
            so you can rapidly prototype beautiful, on-brand HTML emails. Forget about writing inline styles.
          </p>
          <h4 class="mb-6 text-lg md:text-xl font-semibold text-slate-800">Utility-first CSS</h4>
          <p class="mb-8 text-md text-slate-500">
            Tailwind provides low-level utility classes that help you style emails much faster than writing inline CSS.
          </p>
          <h4 class="mb-6 text-lg md:text-xl font-semibold text-slate-800">Component-friendly</h4>
          <p class="mb-8 text-md text-slate-500">
            Need to use custom CSS classes? Extract component classes from repeated utility patterns.
          </p>
          <h4 class="mb-6 text-lg md:text-xl font-semibold text-slate-800">Make it your own</h4>
          <p class="text-md text-slate-500">
            Easily create or bring in your own email design system, keeping everyone in your team on-brand.
          </p>
        </div>
      </div>
    </section>

    <!-- Section 2 -->
    <section
      id="byohtml"
      class="pt-20 md:pt-44 pb-0 relative"
    >
      <pattern-code class="absolute top-0 mt-0 md:-mt-72 w-auto md:w-2/3 lg:w-1/2 left-0 z-0 text-slate-300" />
      <div class="max-w-7xl px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 relative z-10">
        <div class="lg:order-2">
          <div class="relative">
            <syntax-highlight
              title="template.html"
              bkg-frame-class="top-4 sm:top-8 right-4 sm:right-8"
              no-copy
            >
              <snippet-template />
            </syntax-highlight>
          </div>
        </div>
        <div class="lg:order-1">
          <h3 class="mb-7 text-3xl md:text-4xl font-bold text-indigo-600">
            BYOHTML&trade;
          </h3>
          <p class="mb-12 text-lg md:text-xl text-slate-500">Code with markup you already know.</p>
          <h4 class="mb-6 text-lg md:text-xl font-semibold text-slate-800">Bring Your Own HTML</h4>
          <p class="mb-8 text-md text-slate-500">No need to learn custom syntax or adapt your templates to it. Use your existing HTML, it'll just work.</p>
          <h4 class="mb-6 text-lg md:text-xl font-semibold text-slate-800">Supercharged by PostHTML</h4>
          <p class="mb-8 text-md text-slate-500">PostHTML gives your HTML superpowers, enabling you to write complex logic with simple, text editor-friendly markup.</p>
        </div>
      </div>
    </section>

    <!-- Section 3 -->
    <section
      id="environments"
      class="py-20 md:py-44 relative"
    >
      <div class="max-w-7xl px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 relative z-10">
        <div>
          <div class="lg:sticky top-28">
            <div class="relative">
              <syntax-highlight
                title="tailwind.config.js"
                no-copy
              >
                <snippet-environment />
              </syntax-highlight>
            </div>
          </div>
        </div>
        <div>
          <h3 class="mb-7 text-3xl md:text-4xl font-bold text-slate-800">
            Build
            <span class="text-indigo-600">Environments</span>
          </h3>
          <p class="mb-7 text-lg md:text-xl text-slate-500">Custom build scenarios, easily configured in JavaScript.</p>
          <p class="mb-12 text-slate-500">
            Using fake data locally, but fetching from an API in production? Prettified email markup for your colleagues? All possible.
          </p>
          <h4 class="mb-6 text-lg md:text-xl font-semibold text-slate-800">CLI Commands</h4>
          <p class="mb-8 text-md text-slate-500">
            Each environment config enables its own CLI build command, so you can build the same templates in as many ways as you need.
          </p>
          <h4 class="mb-6 text-lg md:text-xl font-semibold text-slate-800">Opt-in Transformers</h4>
          <p class="mb-8 text-md text-slate-500">
            Choose which post-processing transformations Maizzle applies to your HTML emails on a build environment-basis.
          </p>
          <h4 class="mb-6 text-lg md:text-xl font-semibold text-slate-800">Override from Template</h4>
          <p class="text-md text-slate-500">
            Define or override data for each template just before it's compiled, through YAML Front Matter variables.
          </p>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section
      id="features"
      class="py-20 md:py-44 relative"
    >
      <div class="w-full h-96 absolute top-0 left-0 z-0 block bg-gradient-to-b from-slate-100"></div>
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="px-6">
          <h3 class="mb-7 text-3xl md:text-4xl font-bold text-slate-800">
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
            <nuxt-link
              v-for="feature in features"
              :key="feature.path"
              :to="feature.path"
              class="grid-item relative rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors duration-300"
            >
              <div class="frame w-full h-full p-[1px] rounded-[9px] absolute z-0 bg-slate-300 transition-all duration-300">
                <div class="frame-inner w-full h-full rounded-lg absolute bg-white"></div>
              </div>
              <div class="px-6 py-5 rounded-lg relative z-1">
                <h4 class="mb-5 font-bold text-xl text-slate-700">{{ feature.title }}</h4>
                <p
                  class="text-base text-slate-500"
                  v-html="feature.description"
                />
              </div>
            </nuxt-link>
          </div>
        </div>
        <div
          class="w-full px-6 flex items-end bottom-0 left-0 z-10 bg-gradient-to-t from-white"
          :class="{'h-44 sticky -mt-36' : showAllFeatures, 'h-96 absolute' : !showAllFeatures}"
        >
          <button
            class="py-2.5 mb-16 mx-auto inline-flex text-base bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white duration-300"
            :class="{'px-2.5 rounded-full transform-all duration-300 hover:rotate-180' : showAllFeatures, 'px-6 rounded-xl transition-colors' : !showAllFeatures}"
            @click="showFeatures()"
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

    <!-- Mailviews -->
    <section
      id="mailviews"
      class="max-w-7xl px-6 mx-auto relative"
    >
      <mailviews />
    </section>

    <!-- Guides -->
    <section
      id="guides"
      class="py-20 md:py-44 relative"
    >
      <div class="max-w-7xl px-6 mx-auto relative z-10">
        <h3 class="mb-7 text-3xl md:text-4xl font-bold text-slate-800">
          Maizzle
          <span class="text-indigo-600">Guides</span>
        </h3>
        <div class="flex flex-col md:flex-row items-center md:justify-between">
          <p class="mr-auto md:mr-0 mb-6 md:mb-12 text-slate-500">
            Learn how to create HTML emails with Tailwind CSS in Maizzle.
          </p>
          <nuxt-link
            to="/guides"
            class="px-6 py-2.5 mr-auto md:mr-0 mb-6 md:mb-12 inline-flex rounded-xl text-base bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors duration-300"
          >
            View all guides
          </nuxt-link>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          <div
            v-for="guide in guides"
            :key="guide.title"
            class="grid-item relative"
          >
            <div class="frame w-full h-full p-[1px] rounded-[9px] absolute z-0 bg-slate-300 transition-all duration-300">
              <div class="frame-inner w-full h-full rounded-lg absolute bg-white"></div>
            </div>
            <div class="h-full px-6 py-5 rounded-lg flex flex-col md:flex-row md:flex-wrap flex-1 content-between relative z-1">
              <div>
                <span class="mb-5 block text-sm text-slate-400">
                  {{ formatDate(guide.date) }}
                </span>
                <h4 class="mb-5 font-bold text-xl">
                  <nuxt-link
                    class="grid-item relative text-slate-700 hover:text-indigo-600  rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors duration-300"
                    :to="guide.path"
                  >
                    {{ guide.title }}
                  </nuxt-link>
                </h4>
                <p class="mb-5 text-base text-slate-500">{{ guide.description }}</p>
              </div>
              <div class="w-full">
                <div class="mb-5 border-b border-slate-300"></div>
                <div class="text-right">
                  <nuxt-link
                    class="grid-item relative text-indigo-600 hover:underline  rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    :to="guide.path"
                  >
                    Read more
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section
      id="testimonials"
      class="max-w-7xl pt-0 pb-20 md:pb-44 px-6 mx-auto relative"
    >
      <div class="w-full p-12 relative grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 rounded-xl bg-slate-900 z-0">
        <blockquote
          v-for="testimonial in testimonials"
          :key="testimonial.user.name"
          class="relative"
        >
          <div
            class="mb-7"
            v-html="testimonial.user.company.logo.svg"
          />
          <p class="mb-6 text-lg text-slate-400">
            {{ testimonial.text }}
          </p>
          <footer class="text-slate-500">
            <a
              :href="testimonial.user.company.url"
              class="flex flex-col text-slate-500 hover:text-slate-400 transition-colors duration-300"
              rel="noopener noreferrer nofollow"
            >
              <strong>{{ testimonial.user.name }}</strong>
              <span>{{ testimonial.user.role }} @ {{ testimonial.user.company.name }}</span>
            </a>
          </footer>
        </blockquote>
      </div>
    </section>

    <!-- Templates by craftingemails -->
    <section
      id="ce-templates"
      class="relative"
    >
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
                class="px-6 py-2.5 mb-6 md:mb-12 inline-flex rounded-xl text-base bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors duration-300"
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
                :class="{'row-span-2 items-center' : index === 0}"
              >
                <a
                  :href="template.url"
                  class="grid-item relative focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  <div class="frame w-full h-full p-[1px] rounded-[9px] absolute z-0 bg-white transition-all duration-300">
                    <div class="frame-inner w-full h-full rounded-lg absolute bg-white"></div>
                  </div>
                  <lazy-img
                    class="rounded-lg bg-slate-100"
                    :width="384"
                    :height="287"
                    :url="template.image"
                    :alt="template.title"
                  />
                  <div class="py-4 flex items-end gap-2 rounded-lg relative z-10">
                    <h4 class="font-bold text-xl text-slate-700">{{ template.name }}</h4>
                    <p class="text-base text-slate-400">{{ template.purpose }}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import features from '~/data/features'
import testimonials from '~/data/testimonials'
import scrollToElement from 'scroll-to-element'

export default {
  name: 'HomePage',
  layout: 'homepage',
  async asyncData({ $content }) {
    const templates = await $content('templates').sortBy('date', 'desc').limit(3).fetch()
    const guides = await $content('guides').sortBy('date', 'desc').limit(6).fetch()

    return {
      templates,
      guides,
    }
  },
  data() {
    return {
      showAllFeatures: false,
      windowPosition: 0,
      features,
      testimonials,
    }
  },
  watch: {
    '$route.hash'(newHash) {
      if (newHash) {
        this.scrollTo(newHash)
      }
    }
  },
  mounted() {
    if (this.$route.hash) {
      this.scrollTo(this.$route.hash)
    }
  },
  methods: {
    openDocsearch() {
      document.querySelector('.DocSearch-Button').click()
    },
    showFeatures() {
      if (!this.showAllFeatures) {
        this.windowPosition = this.getYPosition()
      } else {
        this.setYPosition(this.windowPosition)
      }

      this.showAllFeatures = !this.showAllFeatures
    },
    getYPosition() {
      return window.pageYOffset
    },
    setYPosition(amount) {
      window.scrollTo({left: 0, top: amount, behavior: 'smooth'})
    },
    scrollTo(anchor) {
      scrollToElement(anchor, {
        offset: -150,
        ease: 'out-expo',
        duration: 400
      })
    },
    formatDate(string) {
      const date = new Date(string)
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    },
  },
}
</script>
