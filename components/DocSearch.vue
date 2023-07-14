<template>
  <div id="docsearch"></div>
</template>

<script setup>
import docSearch from '@docsearch/js'

const isSpecialClick = event => {
  return event.button === 1 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey
}

const {public: runtimeConfig} = useRuntimeConfig()

const router = useRouter()

onMounted(() => {
  docSearch({
    container: '#docsearch',
    appId: runtimeConfig.docsearch.appId,
    indexName: runtimeConfig.docsearch.indexName,
    apiKey: runtimeConfig.docsearch.apiKey,
    // Make search results URLs relative, so we can use the router
    transformItems: items => items.map(item => {
      const url = new URL(item.url)
      const pathname = url.pathname.replace(/\/$/, '')

      return {
        ...item,
        url: `${pathname}${url.hash}`,
      }
    }),
    // When a search result is clicked, use the router to navigate to the page
    hitComponent({ hit, children}) {
      return {
        type: 'a',
        ref: undefined,
        constructor: undefined,
        key: undefined,
        props: {
          href: hit.url,
          onClick: event => {
            if (isSpecialClick(event)) {
              return
            }

            event.preventDefault()
            router.push(hit.url)
          },
          children
        },
        __v: null
      }
    },
    translations: {
      modal: {
        searchBox: {
          cancelButtonText: 'Close',
          cancelButtonAriaLabel: 'Close',
        }
      },
    },
  })
})
</script>
