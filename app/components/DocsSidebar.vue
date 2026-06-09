<script setup lang="ts">
import { onMounted, nextTick, useTemplateRef } from 'vue'
import { BookText, PanelsTopLeft, Component, MessagesSquare } from 'lucide-vue-next'

const { groups } = useDocsNav()

const route = useRoute()
const navRef = useTemplateRef<HTMLElement>('navRef')

const staticLinks = [
  { label: 'Documentation', to: '/docs/introduction', icon: BookText, external: false, matchPrefix: '/docs' },
  { label: 'Components', to: 'https://mailviews.com/#components', icon: Component, external: true },
  { label: 'Templates', to: 'https://mailviews.com/templates', icon: PanelsTopLeft, external: true },
  { label: 'Community', to: 'https://maizzle.com/discord', icon: MessagesSquare, external: true },
] as const

function isActive(docPath: string) {
  if (route.path === docPath) return true
  if (docPath === '/docs/installation' && route.path.startsWith('/docs/installation/')) return true
  return false
}

function scrollActiveIntoView() {
  const nav = navRef.value
  if (!nav) return
  const viewport = nav.closest<HTMLElement>('[data-reka-scroll-area-viewport]')
  const el = nav.querySelector<HTMLElement>('[data-docs-active="true"]')
  if (!viewport || !el) return
  if (viewport.scrollHeight <= viewport.clientHeight) return
  const elRect = el.getBoundingClientRect()
  const vpRect = viewport.getBoundingClientRect()
  viewport.scrollTop += (elRect.top - vpRect.top) - viewport.clientHeight / 2 + el.clientHeight / 2
}

onMounted(() => nextTick(() => requestAnimationFrame(scrollActiveIntoView)))
</script>

<template>
  <div>
    <ScrollArea class="h-full w-full">
      <nav ref="navRef" class="px-4 lg:px-6 py-8 text-sm">
        <ul class="mb-8 space-y-0.5">
          <li v-for="link in staticLinks" :key="link.label">
            <NuxtLink
              :to="link.to"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noopener noreferrer' : undefined"
              class="flex items-center gap-2.5 py-1.5 transition-colors group"
              :class="link.matchPrefix && route.path.startsWith(link.matchPrefix)
                ? 'text-gray-900 dark:text-gray-100 font-medium *:fill-gray-100 dark:*:fill-gray-900'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'"
            >
              <component :is="link.icon" class="size-4 shrink-0 stroke-[1.5] group-hover:fill-gray-100! dark:group-hover:fill-none!" />
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
        <div v-for="group in groups" :key="group.label" class="mb-8">
          <h4 class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">{{ group.label }}</h4>
          <ul>
            <li v-for="doc in group.items" :key="doc.path">
              <NuxtLink
                :to="doc.path"
                :data-docs-active="isActive(doc.path) ? 'true' : 'false'"
                class="block pl-3 pr-2 py-1 border-l transition-colors"
                :class="isActive(doc.path)
                  ? 'border-l-indigo-500 text-gray-900 dark:text-gray-100 font-medium'
                  : 'border-l-gray-200 dark:border-l-gray-800 text-gray-500 dark:text-gray-400 hover:border-l-indigo-500 hover:text-gray-900 dark:hover:text-gray-100'"
              >
                {{ doc.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
    </ScrollArea>
  </div>
</template>
