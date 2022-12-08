<template>
  <footer class="relative">
    <pattern-templates class="max-w-3xl mt-0 absolute bottom-72 lg:bottom-0 -left-44 lg:left-0 w-auto md:w-2/3 lg:w-1/2 z-0 text-slate-300" />
    <div class="w-full max-w-7xl pt-36 pb-10 px-6 mx-auto relative overflow-hidden">
      <div class="h-[480px] absolute -bottom-4 md:-bottom-8 -right-96 md:-right-28 z-0 pointer-events-none overflow-hidden">
        <site-insignia
          class=" text-slate-200"
          width="1200"
          height="583"
          stroke-width="0.05"
        />
      </div>
      <div class="relative z-20">
        <div class="mb-16 sm:mb-36 flex">
          <nuxt-link
            class="w-11 h-7 mr-10 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors duration-300"
            to="/"
            aria-label="Homepage"
            @click.native.right.prevent="goToBrandPage"
          >
            <site-insignia class="text-indigo-600" />
          </nuxt-link>
          <div class="flex flex-wrap gap-8 sm:gap-16">
            <nav
              role="menu"
              aria-label="Footer Navigation"
              class="navigation text-base space-y-4"
            >
              <h4 class="text-sm uppercase text-slate-600 font-semibold">
                Documentation
              </h4>
              <ul role="none">
                <li class="mb-3">
                  <nuxt-link
                    to="/docs/introduction"
                    class="text-slate-500 hover:text-slate-800 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    Get Started
                  </nuxt-link>
                </li>
                <li class="mb-3">
                  <nuxt-link
                    to="/guides"
                    class="text-slate-500 hover:text-slate-800 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    Guides
                  </nuxt-link>
                </li>
                <li class="mb-3">
                  <nuxt-link
                    to="/brand"
                    class="text-slate-500 hover:text-slate-800 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    Brand
                  </nuxt-link>
                </li>
              </ul>
            </nav>
            <nav
              role="menu"
              aria-label="Footer Navigation (Community)"
              class="navigation text-base space-y-4"
            >
              <h4 class="text-sm uppercase text-slate-600 font-semibold">
                Community
              </h4>
              <ul role="none">
                <li class="mb-3">
                  <a
                    href="https://github.com/maizzle/framework/discussions"
                    class="text-slate-500 hover:text-slate-800 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    GitHub
                  </a>
                </li>
                <li class="mb-3">
                  <a
                    href="https://twitter.com/maizzlejs"
                    class="text-slate-500 hover:text-slate-800 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    Twitter
                  </a>
                </li>
                <li class="mb-3">
                  <a
                    href="https://maizzle.com/discord"
                    class="text-slate-500 hover:text-slate-800 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div class="md:flex flex-col md:flex-row items-center justify-start md:justify-between">
          <p class="mb-6 md:mb-0 text-sm text-slate-400">
            &copy; {{ year }} Maizzle SRL. All rights reserved.
            Made with <span class="text-rose-400">❤</span> for email, open sourced under the MIT license.</p>
          <div class="flex items-center gap-5">
            <a
              href="https://mailviews.com/"
              class="text-slate-400 hover:text-teal-500 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <span class="sr-only">Mailviews</span>
              <svg class="w-10 h-5" viewBox="0 0 45 24" fill="none">
                <g clip-path="url(#mv-path)" stroke="currentColor" stroke-miterlimit="10" stroke-width="1.5">
                  <path stroke="currentColor" d="M30.946 5.348a3 3 0 1 0-4.726-3.697L13.693 17.662a3 3 0 0 0 4.725 3.698L30.946 5.348Z" />
                  <path stroke="currentColor" d="M42.99 1.13a3.003 3.003 0 0 0-4.21.51l-7.19 9.2V3.5c0-1.65-1.35-3-3-3s-3 1.35-3 3v16c0 .74.29 1.42.74 1.95.12.14.24.26.38.38.02.02.03.04.05.05.01 0 .03.01.04.02.11.08.23.15.35.22.06.04.12.07.19.1.09.04.18.07.27.1.1.04.21.07.31.1l.18.03c.15.03.3.04.45.05h.08c.88 0 1.75-.39 2.34-1.13L43.5 5.35c1.02-1.3.79-3.19-.51-4.21v-.01ZM18.384 5.348a3 3 0 1 0-4.726-3.697L1.131 17.662a3 3 0 0 0 4.725 3.698L18.384 5.348Z" />
                </g>
                <defs>
                  <clipPath id="mv-path">
                    <path fill="#fff" d="M0 0h44.63v23.01H0z" />
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a
              href="https://twitter.com/maizzlejs"
              rel="noopener noreferrer nofollow"
              class="text-slate-400 hover:text-indigo-600 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <span class="sr-only">Twitter</span>
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                class="h-7 w-7"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
            <a
              href="https://github.com/maizzle"
              rel="noopener noreferrer nofollow"
              class="text-slate-400 hover:text-indigo-600 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <span class="sr-only">GitHub</span>
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                class="h-7 w-7"
              >
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
  computed: {
    year() {
      return new Date().getFullYear()
    }
  },
  methods: {
    goToBrandPage() {
      this.$router.push('/brand')
    },
  }
}
</script>
