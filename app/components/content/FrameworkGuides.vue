<script setup lang="ts">
const props = defineProps<{
  exclude?: string | string[]
}>()

const frameworks = [
  { slug: 'laravel', name: 'Laravel', icon: 'LogoLaravel' },
  { slug: 'nuxt', name: 'Nuxt', icon: 'LogoNuxt' },
  { slug: 'nextjs', name: 'Next.js', icon: 'LogoNextjs' },
  { slug: 'astro', name: 'Astro', icon: 'LogoAstro' },
  { slug: 'sveltekit', name: 'SvelteKit', icon: 'LogoSvelteKit' },
  { slug: 'solid', name: 'Solid', img: '/logo/solid.svg' },
  { slug: 'tanstack', name: 'TanStack', icon: 'LogoTanStack' },
  { slug: 'adonisjs', name: 'AdonisJS', icon: 'LogoAdonisjs' },
  { slug: 'qwik', name: 'Qwik', icon: 'LogoQwik' },
]

const excluded = computed(() => {
  if (!props.exclude) return new Set<string>()
  const list = Array.isArray(props.exclude)
    ? props.exclude
    : props.exclude.split(',').map(s => s.trim())
  return new Set(list)
})

const visible = computed(() => frameworks.filter(f => !excluded.value.has(f.slug)))

const colsClass = computed(() => {
  const n = visible.value.length
  if (n % 4 === 0) return 'sm:grid-cols-4'
  if (n % 3 === 0) return 'sm:grid-cols-3'
  return 'sm:grid-cols-4'
})
</script>

<template>
  <div class="not-prose grid grid-cols-2 gap-4" :class="colsClass">
    <NuxtLink
      v-for="f in visible"
      :key="f.slug"
      :to="`/docs/installation/frameworks/${f.slug}`"
      class="flex flex-col items-center gap-3 rounded-lg border border-border p-6 transition-colors hover:border-foreground/20 hover:bg-muted/50"
    >
      <component :is="f.icon" v-if="f.icon" class="size-10" />
      <img v-else-if="f.img" :src="f.img" class="size-10" :alt="`${f.name} logo`">
      <span class="text-sm font-medium">{{ f.name }}</span>
    </NuxtLink>
  </div>
</template>
