import axios from 'axios'
import { getHighlighter } from 'shiki'
import githubLight from './data/shiki/github-light.json'

export default async () => {
  const highlighter = await getHighlighter({
    theme: githubLight,
  })

  const {data: {tag_name}} = await axios('https://api.github.com/repos/maizzle/framework/releases/latest')

  return {
    target: 'static',
    build: {
      html: {
        // https://github.com/tailwindlabs/tailwindcss/discussions/7000
        minify: {
          minifyCSS: false,
        }
      },
      loaders: {
        // Fix HMR with Tailwind
        css: {
          modules: false,
        },
      },
      postcss: {
        plugins: {
          'postcss-import': true,
          'tailwindcss/nesting': {},
          tailwindcss: {},
          autoprefixer: {},
        }
      },
      transpile: [
        'typeit',
      ]
    },
    buildModules: [
      'nuxt-vite',
      '@nuxt/postcss8',
    ],
    components: true,
    content: {
      liveEdit: false,
      markdown: {
        remarkExternalLinks: {
          target: '_self',
          rel: 'nofollow',
        },
        async highlighter() {
          return (code, lang) => {
            lang = lang === 'null' ? 'xml' : lang
            return highlighter.codeToHtml(code.trim(), {lang})
          }
        }
      }
    },
    css: [
      '@/assets/css/tailwind.css',
    ],
    generate: {
      routes: [
        '/brand',
      ],
    },
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Maizzle - Quickly build HTML emails with utility-first CSS',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Maizzle is a framework that helps you quickly build HTML emails with Tailwind CSS and advanced, email-specific post-processing.'
        },
        // Twitter
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@maizzlejs'
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Maizzle - Quickly build HTML emails with utility-first CSS'
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'Maizzle is a framework that helps you quickly build HTML emails with Tailwind CSS and advanced, email-specific post-processing.'
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://maizzle.com/images/maizzle-twitter-large.png'
        },
        // Open Graph
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'Maizzle'
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://maizzle.com'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Maizzle - Quickly build HTML emails with utility-first CSS'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Maizzle is a framework that helps you quickly build HTML emails with Tailwind CSS and advanced, email-specific post-processing.'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://maizzle.com/maizzle-og-card.png'
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: 'https://maizzle.com/maizzle-og-card.png'
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: 'Maizzle - Quickly build HTML emails with utility-first CSS'
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon/favicon.png'
        },
        {
          rel: 'apple-touch-icon',
          href: '/favicon/apple-touch-icon.png'
        },
      ],
    },
    loading: {
      color: '#4f46e5',
      failedColor: '#fb7185',
      height: '1px',
    },
    modules: [
      '@nuxt/content',
      '@nuxtjs/proxy',
    ],
    proxy: {
      '/.netlify': {
        target: 'http://localhost:9000',
        pathRewrite: { '^/.netlify/functions': '' }
      }
    },
    publicRuntimeConfig: {
      latestRelease: tag_name,
    },
    vite: {
      experimentWarning: false,
    }
  }
}
