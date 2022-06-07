<template>
  <div id="docsearch"></div>
</template>

<script>
import docsearch from '@docsearch/js'

const isSpecialClick = event => {
  return event.button === 1 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey
}

export default {
  name: 'DocSearch',
  mounted() {
    this.initialize()
  },
  methods: {
    initialize() {
      const vm = this

      docsearch({
        container: '#docsearch',
        appId: 'O3Q5HJSV88',
        indexName: 'maizzle',
        apiKey: 'c219dd150c753f261239c1e3087ce60f',
        placeholder: 'Search documentation',
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
                vm.$router.push(hit.url)
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
    },
  },
}
</script>
