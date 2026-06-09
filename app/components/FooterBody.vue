<script setup lang="ts">
import { Sun, Moon, Monitor } from 'lucide-vue-next'

defineProps<{ tight?: boolean }>()

const { theme, set } = useTheme()
const router = useRouter()

function onLogoContext(e: MouseEvent) {
  e.preventDefault()
  router.push('/brand')
}

const themes = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'system', label: 'System', icon: Monitor },
  { value: 'dark', label: 'Dark', icon: Moon },
] as const

const cols = [
  {
    name: 'Maizzle',
    items: [
      { label: 'Documentation', to: '/docs/introduction' },
      { label: 'Brand', to: '/brand' },
      { label: 'Privacy', to: '/privacy' },
    ],
  },
  {
    name: 'Mailviews',
    items: [
      { label: 'Components', to: 'https://mailviews.com/#components' },
      { label: 'Templates', to: 'https://mailviews.com/templates' },
      { label: 'Builder', to: 'https://mailviews.com/builder' },
    ],
  },
  {
    name: 'Community',
    items: [
      { label: 'Discord', to: 'https://discord.gg/maizzle' },
      { label: 'GitHub', to: 'https://github.com/maizzle' },
      { label: 'X', to: 'https://x.com/cossssmin' },
    ],
  },
]

const year = new Date().getFullYear()
</script>

<template>
  <div class="grid grid-cols-2 gap-y-8" :class="tight ? 'gap-x-8 md:gap-x-24 md:grid-cols-[auto_auto_auto_auto] md:justify-start' : 'gap-x-8 md:grid-cols-4'">
    <div :class="tight && 'md:mr-12'">
      <NuxtLink to="/" aria-label="Maizzle home" class="inline-block" @contextmenu="onLogoContext">
        <img :src="'/logo/mark.svg'" alt="Maizzle" class="h-12 w-auto dark:hidden" />
        <img :src="'/logo/mark-gradient.svg'" alt="Maizzle" class="hidden h-12 w-auto dark:block" />
      </NuxtLink>
      <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">&copy; {{ year }} Maizzle OÜ</p>
      <ClientOnly>
        <div role="radiogroup" aria-label="Theme" class="mt-10 inline-flex rounded-full border border-border bg-muted p-0.5">
          <button
            v-for="t in themes"
            :key="t.value"
            role="radio"
            :aria-checked="theme === t.value"
            :aria-label="t.label"
            :title="t.label"
            class="inline-flex size-7 items-center justify-center rounded-full text-gray-500 dark:text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-gray-100 aria-checked:bg-background aria-checked:text-gray-900 dark:aria-checked:text-gray-100 aria-checked:border aria-checked:border-border"
            @click="set(t.value)"
          >
            <component :is="t.icon" class="size-3.5" />
          </button>
        </div>
      </ClientOnly>
    </div>
    <div v-for="col in cols" :key="col.name">
      <h4 class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">{{ col.name }}</h4>
      <ul class="space-y-2 text-sm">
        <li v-for="item in col.items" :key="item.label">
          <NuxtLink :to="item.to" class="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
