<template>
  <div class="hidden lg:flex justify-end col-span-4 lg:col-span-3 xl:col-span-4 bg-slate-50">
    <nav class="grid w-60 sticky top-24 overflow-y-auto max-h-[calc(100vh-6rem)]">
      <div class="sticky top-0">
        <div class="pt-4 bg-slate-50">
          <button
            class="flex items-center justify-between w-48 px-4 h-9 border hover:border-slate-300 rounded-md bg-white cursor-pointer text-xs"
            tabindex="0"
            @click="openDocsearch"
          >
            <div class="flex items-center gap-2">
              <svg class="h-4 w-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span class="text-slate-700">Search docs...</span>
            </div>
            <span class="shadow-sm border rounded text-[11px] py-0.5 px-1 text-slate-500">Ctrl K</span>
          </button>
        </div>
        <div class="h-10 bg-gradient-to-b from-slate-50"></div>
      </div>
      <ul class="mb-8 -ml-4">
        <li>
          <nuxt-link
            to="/docs/introduction"
            class="flex gap-2 items-center px-4 py-2 text-sm text-slate-600 group hover:text-slate-900"
          >
            <svg class="h-6 w-6 transition-colors text-slate-400 group-hover:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Documentation
          </nuxt-link>
        </li>
        <li>
          <a
            href="https://mailviews.com"
            class="flex gap-2 items-center px-4 py-2 text-sm text-slate-500 hover:text-slate-900"
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
            class="flex gap-2 items-center px-4 py-2 text-sm text-slate-500 group hover:text-slate-900"
            :class="{ 'text-indigo-700 hover:text-indigo-700 font-medium': $route.path.startsWith('/guides') }"
          >
            <svg
              class="h-6 w-6 transition-colors text-slate-400 group-hover:text-slate-500"
              :class="{ 'text-indigo-500 group-hover:text-indigo-500': $route.path.startsWith('/guides') }"
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
            class="flex gap-2 items-center px-4 py-2 text-sm text-slate-500 group hover:text-slate-900"
            :class="{ 'text-indigo-700 hover:text-indigo-700 font-medium': $route.path.startsWith('/starters') }"
          >
            <svg
              class="h-6 w-6 transition-colors text-slate-400 group-hover:text-slate-500"
              :class="{ 'text-indigo-500 group-hover:text-indigo-500': $route.path.startsWith('/starters') }"
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
            class="flex gap-2 items-center px-4 py-2 text-sm text-slate-500 hover:text-slate-900 group"
            :class="{ 'text-indigo-700 hover:text-indigo-700 font-medium': '/resources' === $route.path }"
          >
            <svg
              class="h-6 w-6 transition-colors text-slate-400 group-hover:text-slate-500"
              :class="{ 'text-indigo-500 group-hover:text-indigo-500': '/resources' === $route.path }"
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
          <p class="text-sm uppercase text-slate-800 font-semibold">
            {{ group.name }}
          </p>
          <ul class="space-y-2 mb-4 mr-4 ml-2">
            <li
              v-for="(item, i) in group.items"
              :key="`nav-item-${i}`"
            >
              <nuxt-link
                :to="item.path"
                class="block leading-5 pl-2 text-sm text-slate-500 hover:text-slate-900"
                :class="{ 'text-indigo-700 hover:text-indigo-700 font-medium': item.path === $route.path }"
                v-text="item.title"
              />
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import navigation from '~/data/navigation.js'

export default {
  name: 'SidebarNavigation',
  data() {
    return {
      navigation,
    }
  },
  methods: {
    openDocsearch() {
      this.$emit('open-docsearch')
    }
  },
}
</script>
