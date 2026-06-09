<script setup lang="ts">
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'

const route = useRoute()
const { flat } = useDocsNav()

const isFrameworkGuide = computed(() => route.path.startsWith('/docs/installation/frameworks/'))

const idx = computed(() => flat.value.findIndex(d => d.path === route.path))
const prev = computed(() => idx.value > 0 ? flat.value[idx.value - 1] : null)
const next = computed(() => idx.value >= 0 && idx.value < flat.value.length - 1 ? flat.value[idx.value + 1] : null)
</script>

<template>
  <nav v-if="prev || next" class="not-prose mt-12 grid grid-cols-2 gap-4 border-t border-border pt-12">
    <NuxtLink
      v-if="prev"
      :to="prev.path"
      class="group flex flex-col items-start gap-1 rounded-lg border border-border p-4 transition-colors hover:border-foreground/20 hover:bg-muted/40"
    >
      <span class="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
        <ArrowLeft class="size-3.5" />
        Previous
      </span>
      <span class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ prev.title }}</span>
    </NuxtLink>
    <span v-else />
    <NuxtLink
      v-if="next"
      :to="next.path"
      class="group flex flex-col items-end gap-1 rounded-lg border border-border p-4 text-right transition-colors hover:border-foreground/20 hover:bg-muted/40 col-start-2"
    >
      <span class="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
        Next
        <ArrowRight class="size-3.5" />
      </span>
      <span class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ next.title }}</span>
    </NuxtLink>
  </nav>
</template>
