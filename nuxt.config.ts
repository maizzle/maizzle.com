import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  devServer: {
    port: 8080,
  },
  runtimeConfig: {
    public: {
      docsearch: {
        appId: process.env.NUXT_PUBLIC_DOCSEARCH_APP_ID || '',
        apiKey: process.env.NUXT_PUBLIC_DOCSEARCH_API_KEY || '',
        indexName: process.env.NUXT_PUBLIC_DOCSEARCH_INDEX_NAME || '',
      },
    },
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo/mark-solid.svg' },
        {
          rel: 'preconnect',
          href: `https://${process.env.NUXT_PUBLIC_DOCSEARCH_APP_ID || ''}-dsn.algolia.net`,
          crossorigin: '',
        },
      ],
      script: [
        {
          innerHTML: `(()=>{try{const t=localStorage.theme;const d=t==='dark'||((t==='system'||!t)&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}})()`,
          tagPosition: 'head',
        },
        {
          src: 'https://scripts.withcabin.com/hello.js',
          async: true,
          defer: true,
          tagPosition: 'bodyClose',
        },
      ],
      style: [
        {
          // Critical inline background prevents iOS Safari from initialising
          // compositing layer backing stores with the system default gray
          // (#F2F2F7) before the external CSS file loads.
          innerHTML: 'html{background-color:#fff;color-scheme:light}html.dark{background-color:#09090b;color-scheme:dark}',
        },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    defaults: {
      nuxtLink: {
        prefetchOn: { visibility: false, interaction: true },
      },
    },
  },
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    'nuxt-og-image',
    'shadcn-nuxt',
  ],
  image: {
    quality: 80,
  },
  ogImage: {
    fonts: ['Inter:200', 'Inter:400', 'Inter:700'],
  },
  nitro: {
    preset: 'static',
    prerender: {
      autoSubfolderIndex: false,
      failOnError: false,
    },
  },
  components: [
    {
      path: '~/components/logos',
      prefix: 'Logo',
      global: true,
    },
    '~/components',
  ],
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@vueuse/core',
        'class-variance-authority',
        'clsx',
        'embla-carousel-auto-scroll',
        'embla-carousel-vue',
        'gsap',
        'lucide-vue-next',
        'reka-ui',
        'shiki',
        'tailwind-merge',
        'typeit',
      ]
    },
  },
  fonts: {
    families: [
      {
        name: 'Inter',
        provider: 'bunny',
        weights: [400, 500, 600, 700],
      },
    ],
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'laserwave',
          langs: ['php', 'json', 'css', 'postcss', 'xml', 'yaml', 'markdown', 'mdx', 'diff', 'shell', 'javascript', 'tsx', 'vue'],
        },
        remarkPlugins: {
          'remark-heading-id': {},
        },
        rehypePlugins: {
          'rehype-external-links': {
            options: {
              target: '_blank',
              rel: (node: any) => node.properties?.rel || ['nofollow'],
            },
          },
        },
      },
    },
  },
  site: {
    url: 'https://maizzle.com',
    name: 'Maizzle',
  },
})
