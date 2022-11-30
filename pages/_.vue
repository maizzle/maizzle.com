<template>
  <div class="col-span-12 lg:col-span-8 grid grid-cols-1 lg:grid-cols-12 max-w-[65ch] lg:max-w-full mx-auto lg:m-0">
    <article class="col-span-9 2xl:col-span-7 px-4 sm:px-8 pb-12 mt-4 xl:mt-8 space-y-8">
      <nuxt-content
        :document="page"
        class="
          max-w-[75ch]
          prose prose-slate
          prose-code:text-slate-600 prose-code:font-normal
          prose-code:before:content-none  prose-code:after:content-none
          prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          prose-headings:text-slate-800 prose-h1:font-bold prose-h2:mt-[1em] prose-p:text-slate-600
        "
      />
      <hr>
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-slate-500">
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

export default {
  layout: 'docs',
  async asyncData({ $content, params, error }) {
    const slug = `/${params.pathMatch || 'index'}`

    const [page] = await $content({ deep: true }).where({ path: slug }).fetch()

    if (!page) {
      return error({ statusCode: 404, message: 'page not found' })
    }

    return {
      page
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
  },
}
</script>
