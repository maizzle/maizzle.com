<template>
  <div class="col-span-12 lg:col-span-8 grid grid-cols-1 lg:grid-cols-12 max-w-[65ch] lg:max-w-full mx-auto lg:m-0">
    <article class="col-span-9 2xl:col-span-7 3xl:col-span-6 px-4 sm:px-8 pb-12 mt-4 xl:mt-8 space-y-8">
      <nuxt-content
        :document="page"
        class="
          max-w-[75ch] 3xl:pl-4
          prose prose-slate
          prose-code:text-slate-600 prose-code:font-normal
          prose-code:before:content-none prose-code:after:content-none
          prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          prose-headings:text-slate-800 prose-h1:font-bold prose-h2:mt-[1em] prose-p:text-slate-600
        "
      />

      <nav class="max-w-[75ch] 3xl:pl-4 pt-8 space-y-10">
        <div class="flex justify-between">
          <div>
            <nuxt-link
              v-if="prev"
              :to="prev.path"
              class="group flex items-center gap-1 text-sm text-slate-800 font-medium"
            >
              <svg
                class="h-3 w-3 transition-colors text-slate-400 group-hover:text-slate-800"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span>
                {{ prev.title }}
              </span>
            </nuxt-link>
          </div>
          <div class="text-right">
            <nuxt-link
              v-if="next"
              :to="next.path"
              class="group flex items-center gap-1 text-sm text-slate-800 font-medium"
            >
              <span>
                {{ next.title }}
              </span>
              <svg
                class="h-3 w-3 transition-colors text-slate-400 group-hover:text-slate-800"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </nuxt-link>
          </div>
        </div>
        <hr>
      </nav>


      <div class="max-w-[75ch] 3xl:pl-4">
        <div class="flex flex-wrap sm:items-center sm:justify-between space-y-6 sm:space-y-0 text-sm text-slate-500">
          <div class="flex gap-2">
            <span>Copyright &copy; {{ year }} Maizzle SRL</span>
            <nuxt-link to="/brand" class="border-l border-slate-200 pl-2 hover:text-slate-900">Brand policy</nuxt-link>
          </div>
          <a
            :href="`https://github.com/maizzle/maizzle.com/edit/main/content${$route.path}.md`"
            class="flex gap-2 items-center hover:text-slate-900"
            target="_blank"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit this page on GitHub
          </a>
        </div>
      </div>
    </article>
    <aside class="hidden lg:block col-span-3 2xl:col-span-5 mt-4">
      <table-of-contents
        :toc="page.toc"
      />
    </aside>
  </div>
</template>

<script>
import scrollToElement from 'scroll-to-element'
import navigation from '~/data/navigation.js'

export default {
  layout: 'docs',
  async asyncData({ $content, params, error }) {
    const slug = `/${params.pathMatch || 'index'}`

    const [page] = await $content({ deep: true }).where({ path: slug }).fetch()

    if (!page) {
      return error({ statusCode: 404, message: 'page not found' })
    }

    const navigationItems = navigation.reduce((acc, item) => {
      if (item.items) {
        return [...acc, ...item.items]
      }

      return [...acc, item]
    }, [])

    return {
      page,
      navigationItems,
    }
  },
  head() {
    return {
      title: this.page.title + ' | Maizzle',
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.page.title + ' | Maizzle',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.page.title + ' | Maizzle',
        },
        {
          hid: 'description',
          name: 'description',
          content: this.page.description
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.page.description
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.page.description
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
    current() {
      return this.navigationItems.find(item => item.path === this.$route.path)
    },
    next() {
      if (!this.current) {
        return null
      }

      const index = this.navigationItems.indexOf(this.current)

      return this.navigationItems[index + 1]
    },
    prev() {
      if (!this.current) {
        return null
      }

      const index = this.navigationItems.indexOf(this.current)

      return this.navigationItems[index - 1]
    }
  },
  watch: {
    '$route.hash'(newHash) {
      if (newHash) {
        try {
          this.scrollTo(newHash)
        } catch {} // eslint-disable-line no-empty
      }
    }
  },
  mounted () {
    if (this.$route.hash) {
      try {
        this.scrollTo(this.$route.hash)
      } catch {} // eslint-disable-line no-empty
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
  },
}
</script>
