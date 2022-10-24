<template>
  <header class="sticky top-0 sm:h-20 items-center z-50">
    <!-- Desktop Header -->
    <div class="hidden lg:grid grid-cols-12 h-full">
      <div class="grid col-span-4 lg:col-span-3 xl:col-span-4 justify-end items-center space-y-2 bg-slate-50 h-full">
        <div class="w-60 flex items-end gap-4">
          <nuxt-link to="/" @click.native.right.prevent="goToBrandPage">
            <site-logo class="w-32" />
          </nuxt-link>
          <div class="relative inline-block text-left text-xs text-slate-600">
            <div>
              <button
                id="menu-button"
                v-on-clickaway="closeVersionDropdown"
                type="button"
                class="inline-flex items-center justify-center w-full rounded-md focus:outline-none"
                aria-expanded="true"
                aria-haspopup="true"
                @click="versionDropdownOpen = !versionDropdownOpen"
              >
                {{ $config.latestRelease }}
                <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            <div
              v-show="versionDropdownOpen"
              class="origin-top-right absolute left-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <div class="py-1" role="none">
                <span
                  class="block px-4 py-2 text-indigo-600 font-medium cursor-default" role="menuitem" tabindex="-1"
                >
                  {{ $config.latestRelease }}
                </span>
                <a href="https://v3.maizzle.com/" class="block px-4 py-2 hover:bg-slate-100" role="menuitem" tabindex="-1">
                  v3.7.3
                </a>
                <a href="https://v1.maizzle.com/" class="block px-4 py-2 hover:bg-slate-100" role="menuitem" tabindex="-1">
                  v1.4.3
                </a>
                <a href="https://v0.maizzle.com/" class="block px-4 py-2 hover:bg-slate-100" role="menuitem" tabindex="-1">
                  v0.9.1
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-8 lg:col-span-9 xl:col-span-8 grid grid-cols-12 h-full bg-white border-b border-slate-100">
        <div class="grid col-span-12 xl:col-span-9 2xl:col-span-7 xl:py-4 px-8 items-center">
          <div class="hidden sm:block max-w-[75ch] whitespace-nowrap overflow-auto">
            <a
              href="https://github.com/maizzle/framework/releases"
              class="hidden sm:table px-3 py-1 rounded-full text-indigo-500 hover:text-indigo-600 text-sm group bg-indigo-50 hover:bg-indigo-100"
            >
              🚀 Maizzle v4.3: now with Tailwind CSS v3.2 support
            </a>
          </div>
        </div>
        <div class="hidden xl:grid col-span-3 2xl:col-span-5 items-end h-full">
          <div class="flex h-full items-center">
            <nav class="flex gap-8 font-medium text-sm text-slate-700">
              <div class="flex gap-6 items-center">
                <a href="https://mailviews.com" class="text-slate-400 hover:text-slate-500 -mr-1">
                  <svg class="w-8 h-4" viewBox="0 0 45 24" fill="none" aria-labelledby="mv-title" role="img">
                    <title id="mv-title">Mailviews</title>
                    <g clip-path="url(#a)" stroke="currentColor" stroke-miterlimit="10" stroke-width="2">
                      <path stroke="currentColor" d="M30.946 5.348a3 3 0 1 0-4.726-3.697L13.693 17.662a3 3 0 0 0 4.725 3.698L30.946 5.348Z" />
                      <path stroke="currentColor" d="M42.99 1.13a3.003 3.003 0 0 0-4.21.51l-7.19 9.2V3.5c0-1.65-1.35-3-3-3s-3 1.35-3 3v16c0 .74.29 1.42.74 1.95.12.14.24.26.38.38.02.02.03.04.05.05.01 0 .03.01.04.02.11.08.23.15.35.22.06.04.12.07.19.1.09.04.18.07.27.1.1.04.21.07.31.1l.18.03c.15.03.3.04.45.05h.08c.88 0 1.75-.39 2.34-1.13L43.5 5.35c1.02-1.3.79-3.19-.51-4.21v-.01ZM18.384 5.348a3 3 0 1 0-4.726-3.697L1.131 17.662a3 3 0 0 0 4.725 3.698L18.384 5.348Z" />
                    </g>
                    <defs>
                      <clipPath id="a">
                        <path fill="#fff" d="M0 0h44.63v23.01H0z" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
                <a href="https://github.com/maizzle" class="text-slate-400 hover:text-slate-500" rel="nofollow">
                  <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-labelledby="gh-title" role="img">
                    <title id="gh-title">GitHub</title>
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                  </svg>
                </a>
                <a href="https://twitter.com/maizzlejs" class="text-slate-400 hover:text-slate-500" rel="nofollow">
                  <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-labelledby="tw-title" role="img">
                    <title id="tw-title">Twitter</title>
                    <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path>
                  </svg>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <!-- Mobile Header -->
    <div class="grid grid-cols-12 items-center lg:hidden bg-white border-b p-4 mb-4">
      <div class="col-span-3 flex items-end">
        <button
          @click="openMobileMenu"
        >
          <svg class="h-6 w-6 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>
      </div>
      <div class="col-span-6 mx-auto flex gap-4 items-end justify-center">
        <site-logo class="w-32" />
        <div class="relative hidden sm:inline-block">
          <div>
            <button
              id="mobile-menu-button"
              v-on-clickaway="closeMobileVersionDropdown"
              type="button"
              class="inline-flex items-center justify-center w-full rounded-md focus:outline-none text-sm"
              aria-expanded="true"
              aria-haspopup="true"
              @click="mobileVersionDropdownOpen = !mobileVersionDropdownOpen"
            >
              {{ $config.latestRelease }}
              <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <div
            v-show="mobileVersionDropdownOpen"
            class="origin-top-right absolute left-5 mt-2 w-24 rounded-md shadow-lg bg-white text-sm ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="mobile-menu-button"
            tabindex="-1"
          >
            <div class="py-1" role="none">
              <nuxt-link
                to="/docs/installation"
                class="block px-4 py-2 bg-slate-100" role="menuitem" tabindex="-1"
              >
                {{ $config.latestRelease }}
              </nuxt-link>
              <a href="https://v3.maizzle.com/" class="block px-4 py-2 hover:bg-slate-100" role="menuitem" tabindex="-1">
                v3.7.3
              </a>
              <a href="https://v1.maizzle.com/" class="block px-4 py-2 hover:bg-slate-100" role="menuitem" tabindex="-1">
                v1.4.3
              </a>
              <a href="https://v0.maizzle.com/" class="block px-4 py-2 hover:bg-slate-100" role="menuitem" tabindex="-1">
                v0.9.1
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-3 flex justify-end">
        <button
          @click="openDocsearch"
        >
          <svg class="h-6 w-6 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>
    <!-- Mobile Off-Screen Menu -->
    <div
      class="fixed lg:hidden top-0 w-64 sm:w-96 h-full bg-white z-[60] overflow-auto transition-transform"
      :class="[showMobileMenu ? 'translate-x-0 shadow-2xl' : '-translate-x-full']"
    >
      <div class="p-4 space-y-6">
        <div class="flex gap-2 justify-between items-center">
          <insignia-svg class="w-10" />
          <button
            @click="closeMobileMenu"
          >
            <svg class="h-5 w-5 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul class="mb-4 -ml-4 text-sm sm:text-base sm:leading-7">
          <li>
            <nuxt-link
              to="/docs/introduction"
              class="flex gap-2 items-center px-4 py-2 text-slate-600"
            >
              <svg class="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Documentation
            </nuxt-link>
          </li>
          <li>
            <a
              href="https://mailviews.com"
              class="flex gap-2 items-center px-4 py-2 text-slate-600"
            >
              <svg class="w-6" fill="none" viewBox="0 0 132 73">
                <path fill="#64748b" d="M128.624 5.915c-3.826-3.001-9.388-2.324-12.39 1.501l-21.16 27.076V12.86c0-4.856-3.973-8.829-8.829-8.829-4.856 0-8.829 3.973-8.829 8.829v47.088c0 2.177.854 4.179 2.178 5.739.353.412.706.765 1.118 1.118.06.059.089.118.147.147.03 0 .089.03.118.059.324.235.677.441 1.03.647.177.118.353.206.56.295.264.117.53.206.794.294.294.118.618.206.912.294l.53.088c.442.089.883.118 1.325.148h.235c2.59 0 5.15-1.148 6.886-3.326l36.876-47.117c3.002-3.826 2.325-9.388-1.501-12.39v-.03Z" />
                <path fill="#94a3b8" d="M93.186 18.29A8.829 8.829 0 1 0 79.279 7.409L42.41 54.53a8.829 8.829 0 0 0 13.907 10.881L93.186 18.29ZM56.216 18.291a8.829 8.829 0 0 0-13.907-10.88L5.441 54.53a8.829 8.829 0 0 0 13.907 10.882L56.216 18.29Z" />
              </svg>
              Components
            </a>
          </li>
          <li>
            <nuxt-link
              to="/guides"
              class="flex gap-2 items-center px-4 py-2 text-slate-500"
              :class="{ 'text-indigo-700 font-medium': $route.path.startsWith('/guides') }"
            >
              <svg
                class="h-6 w-6 text-slate-400"
                :class="{ 'text-indigo-500': $route.path.startsWith('/guides') }"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
              Guides
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/starters"
              class="flex gap-2 items-center px-4 py-2 text-slate-500"
              :class="{ 'text-indigo-700 font-medium': $route.path.startsWith('/starters') }"
            >
              <svg
                class="h-6 w-6 text-slate-400"
                :class="{ 'text-indigo-500': $route.path.startsWith('/starters') }"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Starters
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/resources"
              class="flex gap-2 items-center px-4 py-2 text-slate-500"
              :class="{ 'text-indigo-700 font-medium': $route.path.startsWith('/resources') }"
            >
              <svg
                class="h-6 w-6 text-slate-400"
                :class="{ 'text-indigo-500': $route.path.startsWith('/resources') }"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              Resources
            </nuxt-link>
          </li>
        </ul>
        <ul class="space-y-8 pb-8">
          <li
            v-for="(group, index) in navigation"
            :key="`nav-group-${index}`"
            class="space-y-4"
          >
            <p class="text-sm sm:text-base uppercase text-slate-800 font-semibold">
              {{ group.name }}
            </p>
            <ul class="space-y-2 mb-4 mr-4 ml-2">
              <li
                v-for="(item, i) in group.items"
                :key="`nav-item-${i}`"
              >
                <nuxt-link
                  :to="item.path"
                  class="block leading-5 sm:leading-7 pl-2 text-sm sm:text-base text-slate-500"
                  :class="{ 'text-indigo-700 font-medium': $route.path.startsWith(item.path) }"
                  v-text="item.title"
                />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- Mobile menu: Gradient menu items fade -->
    <div
      v-show="showMobileMenu"
      class="lg:hidden fixed left-0 bottom-0 w-64 h-10 bg-gradient-to-t from-white pointer-events-none z-[60]"
    ></div>
    <!-- Mobile menu: Backdrop -->
    <div
      class="fixed lg:hidden inset-0 bg-white/80 opacity-0 transition-opacity pointer-events-none"
      :class="{'opacity-100 z-50 pointer-events-auto': showMobileMenu}"
      @click="closeMobileMenu"
    ></div>
  </header>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
import navigation from '~/data/navigation.js'

export default {
  name: 'DocsHeader',
  mixins: [ clickaway ],
  data() {
    return {
      navigation,
      versionDropdownOpen: false,
      mobileVersionDropdownOpen: false,
      showMobileMenu: false,
    }
  },
  watch: {
    showMobileMenu(value) {
      document.body.style.overflow = value ? 'hidden' : ''
    },
    '$route.path'() {
      this.closeMobileMenu()
    },
  },
  beforeDestroy() {
    document.body.style.overflow = ''
  },
  methods: {
    goToBrandPage() {
      this.$router.push('/brand')
    },
    openDocsearch() {
      this.$emit('open-docsearch')
    },
    closeVersionDropdown() {
      this.versionDropdownOpen = false
    },
    openMobileMenu() {
      this.showMobileMenu = true
    },
    closeMobileMenu() {
      this.showMobileMenu = false
    },
    closeMobileVersionDropdown() {
      this.mobileVersionDropdownOpen = false
    },
  },
}
</script>
