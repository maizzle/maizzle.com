<template>
  <div id="docsearch" />
</template>

<script setup lang="ts">
import type { DocSearchInstance } from '@docsearch/js'

const { public: runtimeConfig } = useRuntimeConfig()
const router = useRouter()

const isSpecialClick = (event: MouseEvent) =>
  event.button === 1 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey

let instance: DocSearchInstance | null = null
let initPromise: Promise<DocSearchInstance | null> | null = null
let proxy: HTMLInputElement | null = null

// @docsearch/js (~500KB) is only pulled in when the user first opens search,
// keeping it out of the initial page bundle.
function ensureInstance() {
  if (initPromise) return initPromise
  initPromise = import('@docsearch/js').then(({ default: docSearch }) => {
    instance = docSearch({
      container: '#docsearch',
      appId: runtimeConfig.docsearch.appId,
      indexName: runtimeConfig.docsearch.indexName,
      apiKey: runtimeConfig.docsearch.apiKey,
      onOpen() {
        const input = document.querySelector<HTMLInputElement>('.DocSearch-Input')
        input?.focus()
        proxy?.remove()
        proxy = null
      },
      transformItems: items => items.map(item => {
        const url = new URL(item.url)
        const pathname = url.pathname.replace(/\/$/, '')
        return { ...item, url: `${pathname}${url.hash}` }
      }),
      hitComponent({ hit, children }) {
        return {
          type: 'a',
          ref: undefined,
          constructor: undefined,
          key: undefined,
          props: {
            href: hit.url,
            onClick: (event: MouseEvent) => {
              if (isSpecialClick(event)) return
              event.preventDefault()
              router.push(hit.url)
            },
            children,
          },
          __v: null,
        } as any
      },
      translations: {
        modal: {
          searchBox: {
            closeButtonText: 'Close',
            closeButtonAriaLabel: 'Close',
            placeholderText: 'Search documentation',
          },
          startScreen: {
            recentSearchesTitle: 'Recent',
            noRecentSearchesText: 'No recent searches',
            saveRecentSearchButtonTitle: 'Save this search',
            removeRecentSearchButtonTitle: 'Remove this search from history',
            favoriteSearchesTitle: 'Favorite',
            removeFavoriteSearchButtonTitle: 'Remove this search from favorites',
          },
          footer: {
            poweredByText: 'Search by',
          },
        },
      },
    })
    return instance
  })
  return initPromise
}

async function open() {
  // iOS Safari only raises the keyboard for a focus() call inside the user
  // gesture. The DocSearch modal mounts asynchronously, so we focus a throwaway
  // input synchronously to summon the keyboard, then hand focus to the real
  // input in onOpen — iOS keeps an already-open keyboard alive on transfer.
  proxy = document.createElement('input')
  proxy.setAttribute('type', 'text')
  proxy.setAttribute('aria-hidden', 'true')
  proxy.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;border:0;padding:0;font-size:16px;'
  document.body.appendChild(proxy)
  proxy.focus()

  const ready = await ensureInstance()
  if (!ready) {
    console.warn('[DocSearch] instance not ready — check appId/apiKey env vars')
    proxy?.remove()
    proxy = null
    return
  }
  ready.open()
}

defineExpose({ open })

// DocSearch's built-in ⌘K/Ctrl+K listener only registers once the instance is
// created. Since init is now lazy, register our own so the shortcut works
// before the user ever clicks the search button.
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault()
    open()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  instance?.destroy()
  instance = null
  initPromise = null
})
</script>
