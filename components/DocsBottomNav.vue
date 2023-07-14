<template>
  <nav
    v-if="$route.path.startsWith('/docs') && (prev || next)"
    class="max-w-[75ch] 3xl:pl-4 pt-8 space-y-10"
  >
    <div class="flex justify-between">
      <div>
        <NuxtLink
          v-if="prev"
          :to="prev.path"
          class="group flex items-center gap-1 text-sm text-slate-800 font-medium"
        >
          <svg
            class="h-3 w-3 transition-colors text-slate-400 group-hover:text-slate-800"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span>
            {{ prev.title }}
          </span>
        </NuxtLink>
      </div>
      <div class="text-right">
        <NuxtLink
          v-if="next"
          :to="next.path"
          class="group flex items-center gap-1 text-sm text-slate-800 font-medium"
        >
          <span>
            {{ next.title }}
          </span>
          <svg
            class="h-3 w-3 transition-colors text-slate-400 group-hover:text-slate-800"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>
    </div>
    <hr>
  </nav>
  <hr v-else>
</template>

<script setup>
  const route = useRoute()

  const {public: {navigation}} = useRuntimeConfig()

  const navigationItems = navigation.reduce((acc, item) => {
    if (item.items) {
      return [...acc, ...item.items]
    }

    return [...acc, item]
  }, [])

  const current = computed(() => {
    return navigationItems.find(item => item.path === route.path)
  })

  const currentIndex = navigationItems.findIndex(item => item.path === route.path)

  const next = computed(() => {
    if (!current) {
      return null
    }

    return navigationItems[currentIndex + 1]
  })

  const prev = computed(() => {
    if (!current) {
      return null
    }

    return navigationItems[currentIndex - 1]
  })
</script>
