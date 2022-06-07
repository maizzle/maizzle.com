<template>
  <div class="font-sans">
    <docs-header
      @open-docsearch="openDocsearch"
    />
    <main class="grid grid-cols-12 h-full">
      <docs-navigation
        @open-docsearch="openDocsearch"
      />
      <Nuxt />
      <insignia-svg-bg class="w-[44rem] fixed z-[-1] -right-12 bottom-0 opacity-50 md:opacity-70 2xl:opacity-100" />
    </main>
    <doc-search hidden />
  </div>
</template>

<script>
export default {
  name: 'DocsLayout',
  methods: {
    openDocsearch() {
      document.querySelector('.DocSearch-Button').click()
    },
  },
}
</script>
