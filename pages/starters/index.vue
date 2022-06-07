<template>
  <div>
    <docs-header
      @open-docsearch="openDocsearch"
    />
    <main class="grid grid-cols-12">
      <docs-navigation
        @open-docsearch="openDocsearch"
      />
      <div class="col-span-12 lg:col-span-8 grid grid-cols-1 lg:grid-cols-12 max-w-[65ch] lg:max-w-full mx-auto lg:m-0">
        <article class="col-span-9 2xl:col-span-7 px-4 sm:px-8 pb-12 mt-4 xl:mt-8 divide-y divide-slate-100">
          <div
            v-for="starter in starters"
            :key="starter.slug"
            class="grid grid-cols-12 gap-4 sm:gap-8 py-8 first:pt-0"
          >
            <nuxt-link
              :to="starter.path"
              class="col-span-5 sm:col-span-3"
            >
              <lazy-img
                class="rounded-lg"
                :width="145"
                :height="185"
                :url="starter.image"
                :alt="starter.title"
              />
            </nuxt-link>
            <div
              class="col-span-7 sm:col-span-9 grid py-4"
            >
              <nuxt-link
                :to="starter.path"
                class="text-2xl font-bold self-start"
              >{{ starter.title }}</nuxt-link>
              <p class="text-slate-600">
                {{ starter.description }}
              </p>
              <nuxt-link
                :to="starter.path"
                class="self-start text-sm text-slate-600 hover:text-indigo-500"
              >View Starter &rarr;</nuxt-link>
            </div>
          </div>
          <hr>
          <div class="pt-6 text-sm text-slate-500">
            Copyright &copy; {{ year }} Maizzle
          </div>
        </article>
      </div>
      <insignia-svg-bg class="w-[44rem] fixed z-[-1] -right-12 bottom-0 opacity-50 md:opacity-70 2xl:opacity-100" />
    </main>
  </div>
</template>

<script>
import scrollToElement from 'scroll-to-element'
import stickyHeader from '~/assets/js/header'
import lazyLoad from '~/assets/js/lazyload'

export default {
  async asyncData({ $content, error }) {
    const starters = await $content('starters').sortBy('date', 'desc').fetch()

    if (!starters) {
      return error({ statusCode: 404, message: 'page not found' })
    }
    return {
      starters
    }
  },
  head() {
    return {
      title: 'Starters | Maizzle',
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'Starters | Maizzle',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Starters | Maizzle',
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Scaffold a Maizzle project quickly by using one of our starters.'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: 'Scaffold a Maizzle project quickly by using one of our starters.'
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'Scaffold a Maizzle project quickly by using one of our starters.'
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://maizzle.com/starters'
        },
      ]
    }
  },
  computed: {
    year() {
      return new Date().getFullYear()
    },
  },
  watch: {
    '$route.hash'(newHash) {
      if (newHash) {
        this.scrollTo(newHash)
      }
    }
  },
  mounted() {
    stickyHeader()
    lazyLoad()

    if (this.$route.hash) {
      this.scrollTo(this.$route.hash)
    }
  },
  methods: {
    scrollTo(anchor) {
      scrollToElement(anchor, {
        offset: -100,
        ease: 'out-expo',
        duration: 400
      })
    },
    openDocsearch() {
      document.querySelector('.DocSearch-Button').click()
    }
  },
}
</script>
