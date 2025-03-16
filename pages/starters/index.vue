<template>
  <div class="col-span-12 lg:col-span-8 grid grid-cols-1 lg:grid-cols-12 max-w-[65ch] lg:max-w-full mx-auto lg:m-0">
    <article class="col-span-9 2xl:col-span-7 3xl:col-span-6 px-4 sm:px-8 pb-12 mt-4 xl:mt-8 space-y-8">
      <div class="divide-y divide-slate-100">
        <div
          v-for="starter in starters"
          :key="starter.id"
          class="grid grid-cols-12 gap-4 sm:gap-8 py-8 first:pt-0"
        >
          <NuxtLink
            :to="starter.path"
            class="col-span-5 sm:col-span-3"
          >
            <Image
              class="rounded-lg"
              :width="172"
              :height="220"
              :url="starter.image"
              :alt="starter.title"
            />
          </NuxtLink>
          <div
            class="col-span-7 sm:col-span-9 grid py-4"
          >
            <NuxtLink
              :to="starter.path"
              class="text-2xl font-bold self-start"
            >{{ starter.title }}</NuxtLink>
            <p class="text-slate-600">
              {{ starter.description }}
            </p>
            <NuxtLink
              :to="starter.path"
              class="self-start text-sm text-slate-600 hover:text-indigo-500"
            >View Starter &rarr;</NuxtLink>
          </div>
        </div>
      </div>
      <div class="max-w-[75ch] 3xl:pl-4 border-t border-slate-200 pt-8 mt-8">
        <div class="flex flex-wrap sm:items-center sm:justify-between space-y-6 sm:space-y-0 text-sm text-slate-500">
          <div class="flex gap-2">
            <span>Copyright &copy; {{ year }} Maizzle SRL</span>
            <NuxtLink to="/brand" class="border-l border-slate-200 pl-2 hover:text-slate-900">Brand policy</NuxtLink>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'docs',
})

defineOgImageComponent('OGImageDocs', {
  title: 'Starters',
  description: 'Scaffold a Maizzle project quickly by using one of our starters.',
})

const route = useRoute()

const { data: starters } = await useAsyncData('starters-index-collection', () => {
  return queryCollection('starters')
    .order('date', 'DESC')
    .all()
})

useHead({
  title: 'Starters',
  meta: [
    {
      name: 'description',
      content: 'Scaffold a Maizzle project quickly by using one of our starters.',
    },
    {
      property: 'og:title',
      content: 'Starters | Maizzle',
    },
    {
      property: 'og:description',
      content: 'Scaffold a Maizzle project quickly by using one of our starters.'
    },
    {
      property: 'og:url',
      content: `https://maizzle.com${route.path}`
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://maizzle.com${route.path}`,
    },
  ],
})
</script>
