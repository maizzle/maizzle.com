// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  content: {
    highlight: false,
  },
  css: ['~/assets/css/tailwind.css'],
  experimental: {
    payloadExtraction: false,
  },
  modules: [
    './modules/routes-list',
    './modules/docs-navigation',
    './modules/github-release',
    './modules/shiki/shiki-custom',
    '@nuxt/content',
    'nuxt-og-image',
  ],
  ogImage: {
    defaults: {
      extension: 'jpeg',
    }
  },
  postcss: {
    plugins: {
      'tailwindcss/nesting': 'postcss-nesting',
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: [
        '/index.html',
        '/starters',
        '/guides',
      ],
      ignore: [
        '/code',
      ],
    },
  },
  runtimeConfig: {
    public: {
      docsearch: {
        appId: process.env.DOCSEARCH_APP_ID,
        apiKey: process.env.DOCSEARCH_API_KEY,
        indexName: process.env.DOCSEARCH_INDEX_NAME,
      }
    },
  },
  site: {
    url: 'https://maizzle.com',
  },
  spaLoadingTemplate: false,
  typescript: {
    shim: false,
  },
  devtools: {
    enabled: true,
  },
  devServer: {
    port: 8080,
  },
})
