<template>
  <main class="min-h-screen flex flex-col">
    <site-header
      class="w-full max-w-7xl px-6 py-6 mx-auto rounded-br-2xl rounded-bl-2xl"
      :class="$route.path === '/' ? 'header-transparent' : 'header-default'"
    />

    <Nuxt />

    <site-footer />

    <doc-search hidden />
  </main>
</template>

<script>
import stickyheader from '~/assets/js/header'
import lazyload from '~/assets/js/lazyload'

export default {
  name: 'HomepageLayout',
  mounted() {
    this.stickyHeader()
    this.lazyloadMedia()
  },
  methods: {
    stickyHeader: () => stickyheader(),
    lazyloadMedia: () => lazyload(),
  }
}
</script>
