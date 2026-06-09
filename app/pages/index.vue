<script setup lang="ts">
definePageMeta({ layout: 'site' })

useHead({
  title: 'Maizzle / The modern email development framework',
  meta: [
    { name: 'description', content: 'Develop, preview and build production-ready emails in a modern environment, with Vue and Tailwind CSS.' },
    { property: 'og:title', content: 'Maizzle / The modern email development framework' },
    { property: 'og:description', content: 'Develop, preview and build production-ready emails in a modern environment, with Vue and Tailwind CSS.' },
  ],
})

defineOgImageComponent('Home')
</script>

<template>
  <div>
    <HomeHero />
    <div class="relative z-50 h-px bg-border"></div>
    <LazyHomeWorkflows hydrate-on-visible />
    <HomeSeam />
    <LazyHomeComponentsGrid :hydrate-on-visible="{ rootMargin: '800px' }" />
    <HomeSeam />
    <LazyHomeDevUi hydrate-on-visible />
    <HomeSeam />
    <LazyHomeTestimonial
      hydrate-on-visible
      quote="Maizzle is amazing! I use it for building all our emails, and being able to combine Tailwind with Maizzle's component system feels so modern and powerful. I can't imagine building email templates any other way."
      author="Eric L. Barnes"
      role="Creator of <a href='https://laravel-news.com' target='_blank' rel='noopener' class='underline hover:text-gray-900 dark:hover:text-white'>Laravel News</a>"
    />
    <HomeSeam line-top />
    <LazyHomeTailwindSection hydrate-on-visible />
    <HomeSeam />
    <LazyHomeSendWith :hydrate-on-visible="{ rootMargin: '800px' }" />
    <HomeSeam />
    <LazyHomeBuiltWith hydrate-on-visible />
    <HomeSeam />
    <LazyHomeMailviewsPromo hydrate-on-visible />
  </div>
</template>
