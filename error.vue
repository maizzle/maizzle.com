<template>
  <div class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <InsigniaSvgBg class="fixed pointer-events-none opacity-40" />
      <div class="z-10 relative">
        <span class="text-base font-semibold text-indigo-600">
          {{ error.statusCode }}
        </span>
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {{ errorMessage }}
        </h1>
        <div class="mt-10 space-y-4 grid justify-center">
          <p class="text-base text-gray-500">
            Try searching?
          </p>
          <DocSearch />
        </div>
        <div class="mt-12">
          <NuxtLink
            to="/"
            class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    error: Object
  })

  const errorMessage = props.error.statusCode === 404 ? 'Page not found' : 'Something went wrong'

  useHead({
    htmlAttrs: {
      lang: 'en',
      class: 'scroll-smooth h-full',
    },
    bodyAttrs: {
      class: 'h-full',
    },
    title: `${errorMessage} | UnlimitDesign`,
  })
</script>
