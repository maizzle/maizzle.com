import tailwindcss from '@tailwindcss/vite'
import tailwindTheme from './assets/shiki/themes/tailwind.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  css: ['~/assets/css/tailwind.css'],
  modules: [
    './modules/routes-list',
    './modules/github-release',
    '@nuxt/content',
    'nuxt-og-image',
    '@nuxt/fonts'
  ],
  devtools: { enabled: true },
  nitro: {
    preset: 'static',
    trailingSlash: false,
  },
  spaLoadingTemplate: false,
  devServer: { port: 8080 },
  site: {
    url: 'https://maizzle.com',
  },
  components: {
    dirs: [
      {
        path: '~/components/Pattern',
        prefix: 'Pattern',
        global: true,
      },
      {
        path: '~/components/Site',
        prefix: 'Site',
        global: true,
      },
      '~/components',
    ],
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            light: tailwindTheme,
            dark: tailwindTheme,
          },
          langs: ['json', 'js', 'html', 'css', 'shell', 'mdx', 'md', 'yaml', 'hbs'],
        },
      },
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
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
