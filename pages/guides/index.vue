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
        <article class="col-span-9 2xl:col-span-7 px-4 sm:px-8 pb-12 mt-4 xl:mt-8 space-y-8">
          <div class="divide-y divide-slate-100">
            <div
              v-for="guide in guides"
              :key="guide.slug"
              class="py-6"
            >
              <p class="text-sm text-gray-500">
                <time :datetime="guide.date">{{ formatDate(guide.date) }}</time>
              </p>
              <nuxt-link
                :to="guide.path"
                class="mt-2 block"
              >
                <p class="text-xl font-bold text-gray-900">{{ guide.title }}</p>
                <p class="mt-3 text-base text-gray-500">{{ guide.description }}</p>
              </nuxt-link>
            </div>
          </div>

          <hr>
          <div class="text-sm text-slate-500">
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

export default {
  async asyncData({ $content, error }) {
    const guides = await $content('guides').sortBy('date', 'desc').fetch()

    if (!guides) {
      return error({ statusCode: 404, message: 'page not found' })
    }

    return {
      guides
    }
  },
  head() {
    return {
      title: 'Guides | Maizzle',
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'Guides | Maizzle',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Guides | Maizzle',
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Learn how to create HTML emails with Tailwind CSS in Maizzle.'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: 'Learn how to create HTML emails with Tailwind CSS in Maizzle.'
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'Learn how to create HTML emails with Tailwind CSS in Maizzle.'
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://maizzle.com/guides'
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
    openDocsearch() {
      document.querySelector('.DocSearch-Button').click()
    },
    formatDate(string) {
      const date = new Date(string)
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    },
  },
}
</script>
