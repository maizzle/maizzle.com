<script setup lang="ts">
type TocLink = { id: string, text: string, depth: number, children?: TocLink[] }

const props = defineProps<{ links: TocLink[] }>()

const flatIds = computed(() => {
  const ids: string[] = []
  const walk = (items: TocLink[]) => {
    for (const i of items) {
      ids.push(i.id)
      if (i.children?.length) walk(i.children)
    }
  }
  walk(props.links)
  return ids
})

const activeId = ref<string>('')

let observer: IntersectionObserver | null = null
let retryTimer: ReturnType<typeof setTimeout> | null = null

const observe = (retries = 20) => {
  if (!import.meta.client) return
  if (retryTimer) clearTimeout(retryTimer)
  observer?.disconnect()

  const ids = flatIds.value
  if (!ids.length) return

  const targets = ids
    .map(id => document.getElementById(id))
    .filter((el): el is HTMLElement => !!el)

  if (targets.length < ids.length && retries > 0) {
    retryTimer = setTimeout(() => observe(retries - 1), 50)
    return
  }

  if (!targets.length) return

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top)
      if (visible[0]) activeId.value = visible[0].target.id
    },
    { rootMargin: '0px 0px -70% 0px', threshold: 0 },
  )

  for (const el of targets) observer.observe(el)
  if (!activeId.value && targets[0]) activeId.value = targets[0].id
}

onMounted(() => nextTick(observe))
watch(flatIds, () => {
  activeId.value = ''
  nextTick(observe)
})
onBeforeUnmount(() => {
  if (retryTimer) clearTimeout(retryTimer)
  observer?.disconnect()
})
</script>

<template>
  <div class="sticky top-16 max-h-[calc(100vh-4rem)]">
    <ScrollArea class="h-full w-full **:data-[slot=scroll-area-viewport]:focus-visible:ring-0 **:data-[slot=scroll-area-viewport]:focus-visible:outline-none">
      <nav class="w-64 px-6 py-8 text-sm">
        <template v-if="links.length">
          <h4 class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">On this page</h4>
          <ul class="space-y-px">
            <template v-for="link in links" :key="link.id">
              <li>
                <a
                  :href="`#${link.id}`"
                  class="block truncate px-2 py-1 transition-colors"
                  :class="activeId === link.id
                    ? 'text-gray-900 dark:text-gray-100 font-medium'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'"
                >
                  {{ link.text }}
                </a>
                <ul v-if="link.children?.length" class="ml-2">
                  <li v-for="child in link.children" :key="child.id">
                    <a
                      :href="`#${child.id}`"
                      class="block truncate border-l px-3 py-1 transition-colors"
                      :class="activeId === child.id
                        ? 'border-l-indigo-500 text-gray-900 dark:text-gray-100 font-medium'
                        : 'border-l-gray-200 dark:border-l-gray-800 text-gray-500 dark:text-gray-400 hover:border-l-indigo-500 hover:text-gray-900 dark:hover:text-gray-100'"
                    >
                      {{ child.text }}
                    </a>
                  </li>
                </ul>
              </li>
            </template>
          </ul>
        </template>

        <a
          href="https://mailviews.com?ref=toc"
          target="_blank"
          rel="noopener"
          class="group block px-2"
          :class="links.length ? 'mt-8' : ''"
        >
          <p class="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">From the Maizzle creators</p>
          <NuxtPicture
            src="/images/mailviews-toc-light.png"
            alt="Mailviews"
            loading="lazy"
            class="mt-3 block w-full dark:hidden"
            :img-attrs="{ class: 'w-full h-auto rounded rotate-2 transition-transform duration-300 group-hover:rotate-0' }"
          />
          <NuxtPicture
            src="/images/mailviews-toc-dark.png"
            alt="Mailviews"
            loading="lazy"
            class="mt-3 hidden w-full dark:block"
            :img-attrs="{ class: 'w-full h-auto rounded rotate-2 transition-transform duration-300 group-hover:rotate-0' }"
          />
          <p class="mt-3 text-sm leading-snug text-gray-600 dark:text-gray-300 text-balance">
            Beautiful, production-ready email templates &amp; components.
          </p>
          <span class="mt-2 inline-flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-gray-100">
            Explore Mailviews
            <span class="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
          </span>
        </a>
      </nav>
    </ScrollArea>
  </div>
</template>
