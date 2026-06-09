<script setup lang="ts">
import { ref, watch } from 'vue'
import { Menu, X, ChevronRight } from 'lucide-vue-next'

const route = useRoute()
const { docs } = useDocsNav()
const current = computed(() => docs.value?.find((d: any) => d.path === route.path))
const sectionName = computed(() => (current.value as any)?.section ?? '')
const pageTitle = computed(() => (current.value as any)?.title ?? '')

const searchRef = ref<{ open: () => void } | null>(null)
function openSearch() { searchRef.value?.open() }

const mobileNavOpen = ref(false)
watch(() => route.path, () => { mobileNavOpen.value = false })
</script>

<template>
  <main class="min-h-screen sm:bg-[url('/stripes.svg')] sm:bg-repeat selection:bg-foreground selection:text-background">
    <SiteHeader full-width @open-search="openSearch" />

    <DocsSidebar class="hidden lg:block fixed top-16 left-10 w-64 h-[calc(100vh-4rem)] bg-background border-r border-border z-30" />

    <div class="pt-16 min-h-screen sm:pl-10">
      <div class="bg-background min-h-[calc(100vh-4rem)] lg:ml-64 flex flex-col min-w-0">
        <div class="lg:hidden sticky top-16 z-40 border-b border-border sm:-ml-10">
          <div class="bg-background sm:ml-10">
            <button
              type="button"
              class="flex w-full items-center gap-2 h-12 pl-2 pr-4 text-left text-sm"
              :aria-expanded="mobileNavOpen"
              aria-controls="mobile-docs-nav"
              @click="mobileNavOpen = !mobileNavOpen"
            >
              <span class="grid place-items-center size-10 shrink-0 -ml-1 text-gray-500 dark:text-gray-400">
                <component :is="mobileNavOpen ? X : Menu" class="size-4" />
              </span>
              <span class="flex min-w-0 items-center gap-1.5">
                <span v-if="sectionName" class="text-gray-500 dark:text-gray-400 truncate">{{ sectionName }}</span>
                <ChevronRight v-if="sectionName && pageTitle" class="size-3.5 shrink-0 text-gray-500 dark:text-gray-400" />
                <span class="text-gray-900 dark:text-gray-100 font-medium truncate">{{ pageTitle }}</span>
              </span>
            </button>
            <div
              v-if="mobileNavOpen"
              id="mobile-docs-nav"
              class="bg-background border-t border-border max-h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain"
            >
              <DocsSidebar class="w-full" />
            </div>
          </div>
        </div>

        <slot />
        <DocsFooter />
      </div>
    </div>

    <AlgoliaDocSearch ref="searchRef" />
  </main>
</template>
