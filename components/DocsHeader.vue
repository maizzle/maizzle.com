<template>
  <header class="sticky top-0 sm:h-20 items-center z-50">
    <!-- Desktop Header -->
    <div class="hidden lg:grid grid-cols-12 h-full">
      <div class="grid col-span-4 lg:col-span-3 2xl:col-span-4 h-full justify-end items-center space-y-2 bg-slate-50">
        <div class="w-60 flex items-end gap-4">
          <NuxtLink
            to="/" @click.native.right.prevent="goToBrandPage"
            aria-label="Maizzle"
          >
            <SiteLogo class="w-32" />
          </NuxtLink>
          <div class="relative inline-block text-left text-xs text-slate-600">
            <div>
              <button
                id="menu-button"
                v-on-click-outside="closeVersionDropdown"
                type="button"
                class="inline-flex items-center justify-center w-full rounded-md focus:outline-none"
                aria-expanded="true"
                aria-haspopup="true"
                @click="versionDropdownOpen = !versionDropdownOpen"
              >
                {{ latestRelease }}
                <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            <div
              v-show="versionDropdownOpen"
              class="origin-top-right absolute z-10 left-0 mt-2 w-[6.5rem] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <div class="py-1" role="none">
                <span class="block px-4 py-2 text-indigo-600 font-medium cursor-default" role="menuitem" tabindex="-1">
                  {{ latestRelease }}
                </span>
                <a href="https://v4.maizzle.com/" class="block px-4 py-2 hover:bg-slate-100" role="menuitem" tabindex="-1">
                  v4.8.9
                </a>
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
      <div class="grid grid-cols-12 col-span-8 lg:col-span-9 2xl:col-span-8 h-full border-b border-slate-100 backdrop-blur bg-white/90">
        <div class="grid col-span-12 xl:col-span-9 2xl:col-span-7 3xl:col-span-6 xl:py-4 px-8 3xl:pl-16 items-center">
          <div class="hidden sm:block max-w-[75ch] whitespace-nowrap overflow-auto">
            <NuxtLink
              to="/docs/upgrade-guide"
              class="hidden sm:inline-block px-3 py-1 rounded-full text-sm text-indigo-500 hover:text-indigo-600 border border-indigo-300 group"
            >
              Maizzle 5: 10x faster local dev, streamlined Tailwind CSS, modern CSS support, and more!
            </NuxtLink>
          </div>
        </div>
        <div class="hidden xl:grid col-span-3 2xl:col-span-5 items-end h-full">
          <div class="flex h-full items-center">
            <nav class="flex gap-8 font-medium text-sm text-slate-700">
              <div class="flex gap-6 items-center">
                <a href="https://mailviews.com" class="text-slate-400 hover:text-teal-500 -mr-1">
                  <svg class="w-8 h-4" viewBox="0 0 45 24" fill="none" aria-labelledby="mv-title" role="img">
                    <title id="mv-title">Mailviews</title>
                    <g clip-path="url(#mv-path)" stroke="currentColor" stroke-miterlimit="10" stroke-width="2">
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
    <div class="grid grid-cols-12 items-center lg:hidden bg-white/[0.85] backdrop-blur-sm p-4 mb-4">
      <div class="col-span-3 flex items-end">
        <button
          @click="openMobileMenu"
          aria-label="Open menu"
        >
          <svg class="h-6 w-6 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>
      </div>
      <div class="col-span-6 mx-auto flex gap-4 items-end justify-center">
        <NuxtLink to="/" aria-label="Maizzle">
          <SiteLogo class="w-32" />
        </NuxtLink>
        <div class="relative hidden sm:inline-block">
          <div>
            <button
              id="mobile-menu-button"
              v-on-click-outside="closeMobileVersionDropdown"
              type="button"
              class="inline-flex items-center justify-center w-full rounded-md focus:outline-none text-sm"
              aria-expanded="true"
              aria-haspopup="true"
              @click="mobileVersionDropdownOpen = !mobileVersionDropdownOpen"
            >
              {{ latestRelease }}
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
              <NuxtLink
                to="/docs/installation"
                class="block px-4 py-2 bg-slate-100" role="menuitem" tabindex="-1"
              >
                {{ latestRelease }}
              </NuxtLink>
              <a href="https://v4.maizzle.com/" class="block px-4 py-2 hover:bg-slate-100" role="menuitem" tabindex="-1">
                v4.8.9
              </a>
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
          aria-label="Open search"
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
      <div class="p-4 sm:p-8">
        <div class="flex gap-2 justify-between items-center relative z-10">
          <NuxtLink to="/" aria-label="Maizzle">
            <InsigniaSvg class="w-10" />
          </NuxtLink>
          <button
            @click="closeMobileMenu"
            aria-label="Close menu"
          >
            <svg class="h-5 w-5 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <!-- Top fade -->
        <div class="sticky top-0 bg-slate-5s00 h-10 w-full -mt-4 bg-gradient-to-b from-white pointer-events-none z-0"></div>
        <ul class="mb-4 -ml-4 text-sm sm:text-base sm:leading-7">
          <li>
            <a
              href="https://laracasts.com/series/build-html-emails-with-maizzle"
              class="flex gap-2 items-center px-4 py-2 text-sm text-slate-600"
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
              class="flex gap-2 items-center px-4 py-2 text-slate-600"
            >
              <svg class="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Documentation
            </NuxtLink>
          </li>
          <li>
            <a
              href="https://alter.email"
              class="flex gap-2 items-center px-4 py-2 text-sm text-slate-600"
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
            <NuxtLink
              to="/guides"
              class="flex gap-2 items-center px-4 py-2"
              :class="[$route.path.startsWith('/guides') ? 'text-indigo-700 font-medium' : 'text-slate-500']"
            >
              <svg
                class="h-6 w-6"
                :class="[$route.path.startsWith('/guides') ? 'text-indigo-500' : 'text-slate-400']"
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
              class="flex gap-2 items-center px-4 py-2"
              :class="[$route.path.startsWith('/starters') ? 'text-indigo-700 font-medium' : 'text-slate-500']"
            >
              <svg
                class="h-6 w-6"
                :class="[$route.path.startsWith('/starters') ? 'text-indigo-500' : 'text-slate-400']"
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
              class="flex gap-2 items-center px-4 py-2 text-slate-500"
            >
              <svg class="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
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
              <p class="text-sm sm:text-base uppercase text-slate-800 font-semibold">
                {{ group.name }}
              </p>
              <ul class="space-y-2 mb-4 mr-4 ml-2">
                <li
                  v-for="(item, i) in group.items"
                  :key="`nav-item-${i}`"
                >
                  <NuxtLink
                    :to="item.path"
                    class="block leading-5 sm:leading-7 pl-2 text-sm sm:text-base"
                    :class="[$route.path.startsWith(item.path) ? 'text-indigo-700 font-medium' : 'text-slate-500']"
                    v-text="item.title"
                  />
                </li>
              </ul>
            </li>
          </ul>
        </ContentRenderer>
      </div>
    </div>
    <!-- Mobile menu: Gradient menu items fade -->
    <div
      v-show="showMobileMenu"
      class="lg:hidden fixed left-0 bottom-0 w-64 h-10 bg-gradient-to-t from-white pointer-events-none z-[60]"
    />
    <!-- Mobile menu: Backdrop -->
    <div
      class="fixed lg:hidden inset-0 bg-white/80 opacity-0 transition-opacity pointer-events-none"
      :class="{ 'opacity-100 z-50 pointer-events-auto': showMobileMenu }"
      @click="closeMobileMenu"
    />

    <DocSearch class="hidden" />
  </header>
</template>

<script setup>
import { vOnClickOutside } from '@vueuse/components'

const nuxtApp = useNuxtApp()
const { public: { navigation, latestRelease } } = useRuntimeConfig()

const versionDropdownOpen = ref(false)
const mobileVersionDropdownOpen = ref(false)
const showMobileMenu = ref(false)

const router = useRouter()

const goToBrandPage = () => {
  router.push('/brand')
}

const openDocsearch = () => {
  document.querySelector('#docsearch button').click()
}

const closeVersionDropdown = () => {
  versionDropdownOpen.value = false
}

const openMobileMenu = () => {
  showMobileMenu.value = true
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const closeMobileVersionDropdown = () => {
  mobileVersionDropdownOpen.value = false
}

watch(showMobileMenu, value => {
  document.body.style.overflow = value ? 'hidden' : ''
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})

nuxtApp.hook('page:finish', () => {
  closeMobileMenu()
})
</script>
