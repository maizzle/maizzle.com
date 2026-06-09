<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from '@/components/ui/context-menu'
import { Check } from 'lucide-vue-next'
import { useHeroSound, SOUND_OPTIONS } from '@/composables/useHeroSound'

const { heroSoundMode } = useHeroSound()

// Suppress double/triple-click text selection (fires when clicking repeatedly
// for grid ripples) while keeping click-and-drag selection intact.
function onMousedown(e: MouseEvent) {
  if (e.detail > 1) e.preventDefault()
}
</script>

<template>
  <ContextMenu :modal="false" :press-open-delay="100000">
    <ContextMenuTrigger as-child>
      <section class="relative z-10" @mousedown="onMousedown">
        <LazyHomeHeroGrid hydrate-on-idle />
    <div class="max-w-[1600px] mx-auto xl:border-x border-border box-content relative z-[1]">
      <div class="mr-6 sm:mx-10 pl-6 sm:px-10 border-r 2xl:border-l border-border">
        <div class="relative pt-10 sm:pt-16 pb-20 sm:pb-28">
          <div class="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-4 sm:px-6">
            <InsigniaAnimated class="w-[208px] sm:w-[256px] lg:w-[304px] h-auto mb-5 sm:mb-7" />

            <h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
              <span class="font-light">The</span> modern email <span class="font-light">development</span> framework.
            </h1>

            <p class="mt-6 sm:mt-8 text-lg sm:text-xl/8 text-muted-foreground text-balance max-w-2xl">
              Develop, preview and build production-ready emails in a modern environment, with Vue and Tailwind CSS.
            </p>

            <div class="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4">
              <NuxtLink
                to="/docs/introduction"
                class="inline-flex items-center justify-center h-11 px-6 text-sm/5 font-semibold text-background bg-foreground hover:bg-foreground/85 rounded-md transition-colors"
              >
                Get started
              </NuxtLink>
              <CopyInput value="npx maizzle new" />
            </div>
          </div>
        </div>
      </div>
    </div>
      </section>
    </ContextMenuTrigger>
    <ContextMenuContent class="min-w-36 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md dark:border-white/10 shadow-xs">
      <ContextMenuItem
        v-for="opt in SOUND_OPTIONS"
        :key="opt.value"
        class="text-xs font-medium text-gray-600 dark:text-gray-400 focus:text-gray-900 dark:focus:text-gray-200"
        @click="heroSoundMode = opt.value"
      >
        <Check v-if="heroSoundMode === opt.value" class="size-3 text-gray-900 dark:text-gray-200" />
        <span :class="[heroSoundMode === opt.value ? 'text-gray-900 dark:text-gray-200' : 'pl-5']">{{ opt.label }}</span>
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
