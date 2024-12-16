<template>
  <div class="hidden lg:flex justify-end items-start col-span-4 lg:col-span-3 2xl:col-span-4 bg-slate-50">
    <nav class="custom-scrollbar grid w-60 sticky top-24 overflow-y-auto max-h-[calc(100vh-6rem)] [scrollbar-gutter:stable]">
      <div class="sticky top-0">
        <div class="pt-4 bg-slate-50">
          <DocSearch class="hidden" />

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
          <a
            href="https://laracasts.com/series/build-html-emails-with-maizzle"
            class="flex gap-2 items-center px-4 py-2 text-sm text-slate-500 hover:text-slate-900"
          >
            <svg class="w-5 mx-0.5 h-auto" viewBox="0 0 71 62" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="#475569" d="M16.5361 25.1503L31.0642 2.84357e-06L39.6977 0L70.9999 54.2169L66.9364 61.255L19.5094 61.2547L27.1208 48.0713L52.2291 48.0723L35.3921 18.9072L31.7697 25.1503L16.5361 25.1503Z"/>
              <path fill="#94a3b8" d="M12.258 32.5835L12.2614 32.5835L27.4929 32.5835L10.8776 61.3039L4.34502 61.3038L0 53.778L12.258 32.5835Z"/>
            </svg>
            Laracasts Series
          </a>
        </li>
        <li>
          <NuxtLink
            to="/docs/introduction"
            class="flex gap-2 items-center px-4 py-2 text-sm text-slate-500 group hover:text-slate-900"
          >
            <svg class="h-6 w-6 transition-colors text-slate-400 group-hover:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Documentation
          </NuxtLink>
        </li>
        <li>
          <a
            href="https://alter.email"
            class="flex gap-2 items-center px-4 py-2 text-sm text-slate-500 hover:text-slate-900"
          >
            <svg class="w-6 text-slate-400" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M35.2857 28.4286V29.4286L35.2904 29.4286L35.2857 28.4286ZM39.5388 28.4085L39.5435 29.4085L40.5388 29.4037V28.4085H39.5388ZM39.5388 21.6116H40.5388V20.6211L39.5482 20.6117L39.5388 21.6116ZM35.2857 21.5714L35.2952 20.5714H35.2857V21.5714ZM42.1429 14.7143V15.7143H43.188L43.1419 14.6702L42.1429 14.7143ZM35.2857 14.7143V13.7143H34.2857V14.7143H35.2857ZM35.2857 20.4855H34.2857V21.4855H35.2857V20.4855ZM49 20.4855V21.4855H50V20.4855H49ZM49 14.664H50V14.6488L49.9995 14.6337L49 14.664ZM14.7143 28.4286V29.4286L14.719 29.4286L14.7143 28.4286ZM18.9673 28.4085L18.9721 29.4085L19.9673 29.4037V28.4085H18.9673ZM18.9673 21.6116H19.9673V20.6211L18.9768 20.6117L18.9673 21.6116ZM14.7143 21.5714L14.7237 20.5714H14.7143V21.5714ZM28.4286 14.664H29.4286V14.6488L29.4281 14.6337L28.4286 14.664ZM35.2857 0C27.1624 0 20.5714 6.59099 20.5714 14.7143H22.5714C22.5714 7.69556 28.267 2 35.2857 2V0ZM20.5714 14.7143C20.5714 22.8376 27.1624 29.4286 35.2857 29.4286V27.4286C28.267 27.4286 22.5714 21.733 22.5714 14.7143H20.5714ZM35.2904 29.4286L39.5435 29.4085L39.534 27.4085L35.281 27.4286L35.2904 29.4286ZM40.5388 28.4085V21.6116H38.5388V28.4085H40.5388ZM39.5482 20.6117L35.2952 20.5715L35.2763 22.5714L39.5293 22.6116L39.5482 20.6117ZM35.2857 20.5714C32.0475 20.5714 29.4286 17.9525 29.4286 14.7143H27.4286C27.4286 19.0571 30.9429 22.5714 35.2857 22.5714V20.5714ZM29.4286 14.7143C29.4286 11.476 32.0475 8.85714 35.2857 8.85714V6.85714C30.9429 6.85714 27.4286 10.3715 27.4286 14.7143H29.4286ZM35.2857 8.85714C38.4926 8.85714 40.9943 11.3722 41.1438 14.7584L43.1419 14.6702C42.9496 10.3145 39.6599 6.85714 35.2857 6.85714V8.85714ZM42.1429 13.7143H35.2857V15.7143H42.1429V13.7143ZM34.2857 14.7143V20.4855H36.2857V14.7143H34.2857ZM35.2857 21.4855H49V19.4855H35.2857V21.4855ZM50 20.4855V14.664H48V20.4855H50ZM49.9995 14.6337C49.7528 6.50104 43.3552 0 35.2857 0V2C42.2174 2 47.7847 7.58443 48.0005 14.6943L49.9995 14.6337ZM14.7143 0C6.59099 0 0 6.59099 0 14.7143H2C2 7.69556 7.69556 2 14.7143 2V0ZM0 14.7143C0 22.8376 6.59099 29.4286 14.7143 29.4286V27.4286C7.69556 27.4286 2 21.733 2 14.7143H0ZM14.719 29.4286L18.9721 29.4085L18.9626 27.4085L14.7096 27.4286L14.719 29.4286ZM19.9673 28.4085V21.6116H17.9673V28.4085H19.9673ZM18.9768 20.6117L14.7237 20.5715L14.7048 22.5714L18.9579 22.6116L18.9768 20.6117ZM14.7143 20.5714C11.476 20.5714 8.85714 17.9525 8.85714 14.7143H6.85714C6.85714 19.0571 10.3715 22.5714 14.7143 22.5714V20.5714ZM8.85714 14.7143C8.85714 11.476 11.476 8.85714 14.7143 8.85714V6.85714C10.3715 6.85714 6.85714 10.3715 6.85714 14.7143H8.85714ZM29.4281 14.6337C29.1813 6.50104 22.7838 0 14.7143 0V2C21.646 2 27.2133 7.58443 27.429 14.6943L29.4281 14.6337ZM14.7143 8.85714C17.7459 8.85714 20.1374 11.0992 20.5249 14.195L22.5094 13.9466C22.0074 9.93537 18.838 6.85714 14.7143 6.85714V8.85714ZM29.4286 26.6389V14.664H27.4286V26.6389H29.4286Z"/>
            </svg>
            AlterEmail
          </a>
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
            Mailviews
          </a>
        </li>
        <li>
          <NuxtLink
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
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
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
          </NuxtLink>
        </li>
        <li>
          <a
            href="https://maizzle.com/discord"
            class="flex gap-2 items-center px-4 py-2 text-sm text-slate-500 hover:text-slate-900 group"
          >
            <svg
              class="h-6 w-6 transition-colors text-slate-400 group-hover:text-slate-500"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            Community
          </a>
        </li>
      </ul>
      <ContentRenderer :value="navigation">
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
                <NuxtLink
                  :to="item.path"
                  class="block leading-5 pl-2 text-sm text-slate-500 hover:text-slate-900"
                  :class="{ '!text-indigo-500 hover:!text-indigo-500': $route.path.endsWith(item.path) }"
                  v-text="item.title"
                />
              </li>
            </ul>
          </li>
        </ul>
      </ContentRenderer>
      <div class="h-10 w-56 fixed bottom-0 bg-gradient-to-b from-transparent to-slate-50"></div>
    </nav>
  </div>
</template>

<script setup>
const {public: {navigation}} = useRuntimeConfig()

const openDocsearch = () => {
  document.querySelector('#docsearch button').click()
}
</script>
