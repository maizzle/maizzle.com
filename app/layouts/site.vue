<script setup lang="ts">
import { ref } from 'vue'

const searchRef = ref<{ open: () => void } | null>(null)
function openSearch() { searchRef.value?.open() }
</script>

<template>
  <main class="relative min-h-screen bg-background selection:bg-foreground selection:text-background">
    <div class="pointer-events-none absolute inset-y-0 left-0 z-40 w-6 sm:w-10 bg-background bg-[url('/stripes.svg')] bg-repeat border-r border-border" />
    <div class="pointer-events-none absolute inset-y-0 right-0 z-40 w-6 sm:w-10" />
    <SiteHeader @open-search="openSearch" />
    <div class="pt-16">
      <slot />
    </div>
    <SiteFooter />
    <AlgoliaDocSearch ref="searchRef" />
  </main>
</template>
