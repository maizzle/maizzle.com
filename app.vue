<template>
  <NuxtLayout />
</template>

<script setup>
const {public: runtimeConfig} = useRuntimeConfig()

useHead({
  htmlAttrs: {
    lang: 'en',
    style: 'scrollbar-gutter: stable',
  },
  title: 'Maizzle - Quickly build HTML emails with Tailwind CSS',
  meta: [
    { charset: 'utf-8' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      name: 'description',
      content: 'Maizzle is a framework that helps you quickly build HTML emails with Tailwind CSS and advanced, email-specific post-processing.',
    },
    // Open Graph
    {
      property: 'og:site_name',
      content: 'Maizzle'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'https://maizzle.com'
    },
    {
      property: 'og:title',
      content: 'Maizzle - Quickly build HTML emails with Tailwind CSS',
    },
    {
      property: 'og:description',
      content: 'Maizzle is a framework that helps you quickly build HTML emails with Tailwind CSS and advanced, email-specific post-processing.',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon/favicon.png',
    },
    {
      rel: 'apple-touch-icon',
      href: '/favicon/apple-touch-icon.png',
    },
    {
      rel: 'preconnect',
      href: `https://${runtimeConfig.docsearch.appId}-dsn.algolia.net`,
      crossorigin: true,
    },
  ],
  script: [
    {
      src: 'https://scripts.withcabin.com/hello.js',
      async: true,
      defer: true,
      body: true,
    },
  ],
})
</script>
