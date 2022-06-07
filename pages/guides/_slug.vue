<template>
  <div class="h-full">
    <docs-header
      @open-docsearch="openDocsearch"
    />
    <main class="grid grid-cols-12 h-full">
      <docs-navigation
        @open-docsearch="openDocsearch"
      />
      <div class="col-span-12 lg:col-span-8 grid grid-cols-1 lg:grid-cols-12 max-w-[65ch] lg:max-w-full mx-auto lg:m-0">
        <article class="col-span-9 2xl:col-span-7 px-4 sm:px-8 pb-12 mt-4 xl:mt-8 space-y-8">
          <nuxt-content
            :document="guide"
            class="prose max-w-[75ch] prose-slate prose-h2:mt-[1em] prose-headings:text-slate-800 prose-h1:font-bold prose-p:text-slate-600"
          />
          <hr>
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 text-sm text-slate-500">
            <span class="">Copyright &copy; {{ year }} Maizzle</span>
            <a
              :href="`https://github.com/maizzle/maizzle.com/edit/main/content${$route.path}.md`"
              class="flex gap-2 items-center hover:text-slate-900"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit this page on GitHub
            </a>
          </div>
        </article>
        <aside class="hidden lg:block col-span-3 2xl:col-span-5 mt-4">
          <table-of-contents
            :toc="guide.toc"
          />
        </aside>
      </div>
      <insignia-svg-bg class="w-[44rem] fixed z-[-1] -right-12 bottom-0 opacity-50 md:opacity-70 2xl:opacity-100" />
    </main>
  </div>
</template>

<script>
import scrollToElement from 'scroll-to-element'

export default {
  async asyncData({ $content, params, error }) {
    const [guide] = await $content({ deep: true }).where({ path: `/guides/${params.slug}` }).fetch()

    const [prev, next] = await $content('guides')
    .only(['title', 'slug'])
    .sortBy('createdAt', 'asc')
    .surround(`/guides/${params.slug}`)
    .fetch()

    if (!guide) {
      return error({ statusCode: 404, message: 'Article not found' })
    }

    return {
      guide,
      prev,
      next,
    }
  },
  head() {
    return {
      title: this.guide.title + ' | Maizzle',
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.guide.title + ' | Maizzle',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.guide.title + ' | Maizzle',
        },
        {
          hid: 'description',
          name: 'description',
          content: this.guide.description
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.guide.description
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.guide.description
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://maizzle.com' + this.$route.path
        },
      ]
    }
  },
  computed: {
    year() {
      return new Date().getFullYear()
    },
    layout() {
      return this.page.layout || 'default'
    }
  },
  watch: {
    '$route.hash'(newHash) {
      if (newHash) {
        this.scrollTo(newHash)
      }
    }
  },
  mounted () {
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
