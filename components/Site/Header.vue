<template>
  <header class="header flex items-center md:justify-between sticky top-0 z-30 transition duration-300 bg-white/95 backdrop-blur-sm">
    <NuxtLink
      class="w-40 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      to="/"
      aria-label="Homepage"
      @click.native.right.prevent="$router.push('/brand')"
    >
      <SiteLogo />
    </NuxtLink>
    <nav
      role="menu"
      aria-label="Main Navigation"
      class="navigation lg:w-full ml-auto lg:ml-0 mr-6 lg:mr-0 flex items-center gap-7 text-base"
    >
      <!-- Main menu -->
      <ul
        class="ml-auto hidden lg:flex gap-10 items-center"
        role="none"
      >
        <li>
          <NuxtLink
            to="/docs/introduction"
            role="menuitem"
            class="text-slate-600 hover:text-slate-800 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Documentation
          </NuxtLink>
        </li>
        <li>
          <a
            href="https://mailviews.com"
            role="menuitem"
            class="text-slate-600 hover:text-slate-800 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Components
          </a>
        </li>
        <li>
          <NuxtLink
            to="/guides"
            role="menuitem"
            class="text-slate-600 hover:text-slate-800 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Guides
          </NuxtLink>
        </li>
        <li>
          <a
            href="https://laracasts.com/series/build-html-emails-with-maizzle"
            role="menuitem"
            class="text-slate-600 hover:text-slate-800 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Videos
          </a>
        </li>
        <li>
          <a
            href="https://github.com/maizzle"
            class="text-slate-400 hover:text-slate-500"
            rel="nofollow"
            role="menuitem"
          >
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-labelledby="gh-title" role="img">
              <title id="gh-title">GitHub</title>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
    <!-- Mobile menu -->
    <div
      class="relative lg:hidden"
      v-on-click-outside="closeMenu"
    >
      <button
        class="w-10 h-10 flex items-center justify-end rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors duration-300"
        @click="toggleMenu"
      >
        <span class="sr-only">Open menu</span>
        <svg v-show="!showMenu" class="w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
        <svg v-show="showMenu" class="h-7 w-7 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div
        v-show="showMenu"
        class="navigation absolute right-0 mt-3.5 w-60 rounded-lg shadow-lg border border-slate-200 bg-white"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="avatar-button"
        tabindex="-1"
      >
        <div class="py-1" role="none">
          <a
            href="https://laracasts.com/series/build-html-emails-with-maizzle"
            role="menuitem"
            class="mobile-menu-item text-gray-700 hover:bg-slate-50 block px-4 py-2 text-sm"
            tabindex="-1"
          >
            Laracasts Series
          </a>
          <NuxtLink
            to="/docs/introduction"
            role="menuitem"
            class="mobile-menu-item text-gray-700 hover:bg-slate-50 block px-4 py-2 text-sm"
            tabindex="-1"
          >
            Documentation
          </NuxtLink>
          <a
            href="https://mailviews.com"
            target="_blank"
            role="menuitem"
            class="mobile-menu-item text-gray-700 hover:bg-slate-50 block px-4 py-2 text-sm"
            tabindex="-1"
          >
            Components
          </a>
          <NuxtLink
            to="/guides"
            role="menuitem"
            class="mobile-menu-item text-gray-700 hover:bg-slate-50 block px-4 py-2 text-sm"
            tabindex="-1"
          >
            Guides
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { vOnClickOutside } from '@vueuse/components'

const headerTransparent = ref(false)
const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
const closeMenu = () => {
  showMenu.value = false
}
</script>
