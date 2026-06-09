<script setup lang="ts">
const route = useRoute()

const standalonePaths = ['/docs/installation', '/docs/installation/manual', '/docs/installation/monorepo']
const isStandalone = computed(() => standalonePaths.includes(route.path))

const topTabs = [
  { label: 'Standalone', to: '/docs/installation' },
  { label: 'Vite', to: '/docs/installation/vite' },
  { label: 'Frameworks', to: '/docs/installation/frameworks' },
]

const standaloneTabs = [
  { label: 'CLI', to: '/docs/installation' },
  { label: 'Manual', to: '/docs/installation/manual' },
  { label: 'Monorepo', to: '/docs/installation/monorepo' },
]
</script>

<template>
  <div class="not-prose my-6">
    <div role="tablist" class="flex items-center gap-1 border-b border-border">
      <NuxtLink
        v-for="tab in topTabs"
        :key="tab.to"
        :to="tab.to"
        role="tab"
        :aria-selected="(tab.to === '/docs/installation' ? isStandalone : route.path === tab.to)"
        class="cursor-default px-3 py-2.5 text-sm font-medium transition-colors outline-none relative border-b -mb-px"
        :class="(tab.to === '/docs/installation' ? isStandalone : route.path === tab.to)
          ? 'text-foreground border-foreground'
          : 'text-muted-foreground border-transparent hover:text-foreground'"
      >
        {{ tab.label }}
      </NuxtLink>
    </div>
    <div v-if="isStandalone" role="tablist" class="flex items-center gap-2 border-b border-border">
      <NuxtLink
        v-for="tab in standaloneTabs"
        :key="tab.to"
        :to="tab.to"
        role="tab"
        :aria-selected="route.path === tab.to"
        class="cursor-default px-3 py-2.5 text-xs font-medium transition-colors outline-none relative border-b -mb-px"
        :class="route.path === tab.to
          ? 'text-foreground border-foreground'
          : 'text-muted-foreground border-transparent hover:text-foreground'"
      >
        {{ tab.label }}
      </NuxtLink>
    </div>
  </div>
</template>
