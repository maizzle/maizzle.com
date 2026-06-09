<script setup lang="ts">
import { Search, ChevronDown, Ellipsis } from 'lucide-vue-next'
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'reka-ui'

const nav = [
  { label: 'Documentation', href: '/docs/introduction' },
]

const versions = [
  { label: 'v5.5.0', href: 'https://v5.maizzle.com' },
  { label: 'v4.8.9', href: 'https://v4.maizzle.com' },
  { label: 'v3.7.3', href: 'https://v3.maizzle.com' },
  { label: 'v1.4.3', href: 'https://v1.maizzle.com' },
  { label: 'v0.9.1', href: 'https://v0.maizzle.com' },
]

const props = defineProps<{ fullWidth?: boolean }>()
const emit = defineEmits<{ 'open-search': [] }>()

const router = useRouter()

function onLogoContext(e: MouseEvent) {
  e.preventDefault()
  router.push('/brand')
}
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full h-16 z-50 border-b border-border"
  >
    <div v-if="!props.fullWidth" class="relative z-50 h-full">
      <div class="max-w-[1600px] h-full mx-auto xl:border-x border-border box-content">
        <div class="h-full mr-6 sm:mx-10 pl-6 sm:px-10 border-r 2xl:border-l border-border sm:bg-background">
      <nav class="flex size-full items-center justify-between px-4 sm:px-0 bg-background">
        <div class="flex items-center gap-3">
          <NuxtLink to="/" class="-m-1.5 p-1.5 flex items-center" aria-label="Maizzle home" @contextmenu="onLogoContext">
            <LogoMaizzle class="h-6 dark:hidden" />
            <LogoMaizzleDark class="h-6 hidden dark:block" />
          </NuxtLink>
          <DropdownMenuRoot :modal="false">
            <DropdownMenuTrigger
              class="hidden sm:inline-flex items-center gap-1 text-xs/none font-medium text-foreground bg-muted rounded-full pl-2 pr-1.5 py-1 hover:bg-gray-200/60 dark:hover:bg-gray-700/40 focus:outline-none"
            >
              v6.x
              <ChevronDown class="size-3" />
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent
                align="start"
                :side-offset="6"
                class="z-50 min-w-[7rem] rounded-md border border-border bg-background p-1"
              >
                <DropdownMenuItem
                  v-for="v in versions"
                  :key="v.label"
                  as-child
                >
                  <a
                    :href="v.href"
                    class="block px-2 py-1 text-xs font-medium text-muted-foreground rounded-sm hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground focus:outline-none cursor-pointer"
                  >
                    {{ v.label }}
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenuRoot>
        </div>

        <div class="hidden md:flex items-center gap-x-8">
          <button
            type="button"
            class="inline-flex items-center gap-1.5 h-7 pl-1.5 pr-2 text-xs text-muted-foreground bg-background border border-border rounded-md hover:border-foreground/30 transition-none"
            @click="emit('open-search')"
          >
            <Search class="size-4 inline-block text-muted-foreground/70" :stroke-width="1" />
            <span class="text-muted-foreground">⌘K</span>
          </button>
          <NuxtLink
            v-for="item in nav"
            :key="item.label"
            :to="item.href"
            class="text-sm/5 font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {{ item.label }}
          </NuxtLink>
          <a
            href="https://mailviews.com"
            target="_blank"
            rel="noopener"
            class="text-sm/5 font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Components
          </a>
          <a
            href="https://github.com/maizzle"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
            class="text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogoGithub class="size-5" />
          </a>
        </div>

        <div class="md:hidden flex items-center gap-4">
          <button
            type="button"
            class="-m-2 p-2 text-muted-foreground"
            aria-label="Search"
            @click="emit('open-search')"
          >
            <Search class="size-5" stroke-width="1.75" />
          </button>
          <DropdownMenuRoot :modal="false">
            <DropdownMenuTrigger
              class="-m-2 p-2 text-muted-foreground focus:outline-none"
              aria-label="Open menu"
            >
              <Ellipsis class="size-6" />
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent
                align="end"
                :side-offset="6"
                class="z-[100] min-w-[10rem] rounded-md border border-border bg-background p-1"
              >
                <DropdownMenuItem v-for="item in nav" :key="item.label" as-child>
                  <NuxtLink
                    :to="item.href"
                    class="block px-2 py-1.5 text-sm font-medium text-muted-foreground rounded-sm hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground focus:outline-none cursor-pointer"
                  >
                    {{ item.label }}
                  </NuxtLink>
                </DropdownMenuItem>
                <DropdownMenuItem as-child>
                  <a
                    href="https://mailviews.com"
                    target="_blank"
                    class="block px-2 py-1.5 text-sm font-medium text-muted-foreground rounded-sm hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground focus:outline-none cursor-pointer"
                  >
                    Components
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem as-child>
                  <a
                    href="https://github.com/maizzle"
                    target="_blank"
                    class="block px-2 py-1.5 text-sm font-medium text-muted-foreground rounded-sm hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground focus:outline-none cursor-pointer"
                  >
                    GitHub
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenuRoot>
        </div>
      </nav>
        </div>
      </div>
    </div>

    <div v-else class="relative z-50 h-full flex">
      <div class="hidden sm:block w-10 shrink-0" />
      <nav class="flex-1 flex items-center justify-between px-4 sm:px-6 bg-background">
        <div class="flex items-center gap-3">
          <NuxtLink to="/" class="-m-1.5 p-1.5 flex items-center" aria-label="Maizzle home" @contextmenu="onLogoContext">
            <LogoMaizzle class="h-6 dark:hidden" />
            <LogoMaizzleDark class="h-6 hidden dark:block" />
          </NuxtLink>
          <DropdownMenuRoot :modal="false">
            <DropdownMenuTrigger
              class="hidden sm:inline-flex items-center gap-1 text-xs/none font-medium text-foreground bg-muted rounded-full pl-2 pr-1.5 py-1 hover:bg-gray-200/60 dark:hover:bg-gray-700/40 focus:outline-none"
            >
              v6.x
              <ChevronDown class="size-3" />
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent
                align="start"
                :side-offset="6"
                class="z-50 min-w-[7rem] rounded-md border border-border bg-background p-1"
              >
                <DropdownMenuItem
                  v-for="v in versions"
                  :key="v.label"
                  as-child
                >
                  <a
                    :href="v.href"
                    class="block px-2 py-1 text-xs font-medium text-muted-foreground rounded-sm hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground focus:outline-none cursor-pointer"
                  >
                    {{ v.label }}
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenuRoot>
        </div>

        <div class="hidden md:flex items-center gap-x-8">
          <button
            type="button"
            class="inline-flex items-center gap-1.5 h-7 pl-1.5 pr-2 text-xs text-muted-foreground bg-background border border-border rounded-md hover:border-foreground/30 transition-none"
            @click="emit('open-search')"
          >
            <Search class="size-4 inline-block text-muted-foreground/70" :stroke-width="1" />
            <span class="text-muted-foreground">⌘K</span>
          </button>
          <NuxtLink
            v-for="item in nav"
            :key="item.label"
            :to="item.href"
            class="text-sm/5 font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {{ item.label }}
          </NuxtLink>
          <a
            href="https://mailviews.com"
            target="_blank"
            rel="noopener"
            class="text-sm/5 font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Components
          </a>
          <a
            href="https://github.com/maizzle"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
            class="text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogoGithub class="size-5" />
          </a>
        </div>

        <div class="md:hidden flex items-center gap-4">
          <button
            type="button"
            class="-m-2 p-2 text-muted-foreground"
            aria-label="Search"
            @click="emit('open-search')"
          >
            <Search class="size-5" stroke-width="1.75" />
          </button>
          <DropdownMenuRoot :modal="false">
            <DropdownMenuTrigger
              class="-m-2 p-2 text-muted-foreground focus:outline-none"
              aria-label="Open menu"
            >
              <Ellipsis class="size-6" />
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent
                align="end"
                :side-offset="6"
                class="z-[100] min-w-[10rem] rounded-md border border-border bg-background p-1"
              >
                <DropdownMenuItem v-for="item in nav" :key="item.label" as-child>
                  <NuxtLink
                    :to="item.href"
                    class="block px-2 py-1.5 text-sm font-medium text-muted-foreground rounded-sm hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground focus:outline-none cursor-pointer"
                  >
                    {{ item.label }}
                  </NuxtLink>
                </DropdownMenuItem>
                <DropdownMenuItem as-child>
                  <a
                    href="https://mailviews.com"
                    target="_blank"
                    class="block px-2 py-1.5 text-sm font-medium text-muted-foreground rounded-sm hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground focus:outline-none cursor-pointer"
                  >
                    Components
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem as-child>
                  <a
                    href="https://github.com/maizzle"
                    target="_blank"
                    class="block px-2 py-1.5 text-sm font-medium text-muted-foreground rounded-sm hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground focus:outline-none cursor-pointer"
                  >
                    GitHub
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenuRoot>
        </div>
      </nav>
    </div>
  </header>
</template>
