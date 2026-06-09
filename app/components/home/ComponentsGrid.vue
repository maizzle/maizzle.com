<script setup lang="ts">
import AutoScroll from 'embla-carousel-auto-scroll'
import { ChevronDown } from 'lucide-vue-next'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

type Cell = { name: string }

const GLYPH_NAMES = new Set([
  'Button', 'Body', 'CodeBlock', 'CodeInline',
  'Column', 'Hr', 'Img', 'Heading', 'Text',
  'Section', 'Row', 'Container', 'Spacer', 'Link',
  'Font', 'Head', 'Html', 'Layout', 'Markdown',
  'NoWidows', 'Outlook',
  'Preheader', 'Raw', 'OutlookBg', 'WithUrl', 'Tailwind', 'QrCode', 'Plaintext',
])

const cells: Cell[] = [
  { name: 'Html' },
  { name: 'Head' },
  { name: 'Body' },
  { name: 'Layout' },
  { name: 'Container' },
  { name: 'Section' },
  { name: 'Row' },
  { name: 'Column' },
  { name: 'Heading' },
  { name: 'Text' },
  { name: 'Font' },
  { name: 'Link' },
  { name: 'Button' },
  { name: 'Img' },
  { name: 'Spacer' },
  { name: 'Hr' },
  { name: 'Preheader' },
  { name: 'CodeBlock' },
  { name: 'CodeInline' },
  { name: 'Markdown' },
  { name: 'Outlook' },
  { name: 'OutlookBg' },
  { name: 'NoWidows' },
  { name: 'WithUrl' },
  { name: 'Raw' },
  { name: 'Tailwind' },
  { name: 'QrCode' },
  { name: 'Plaintext' },
]

const row1Logos = [
  { name: 'Apple Mail',     src: '/logo/apple-mail.svg' },
  { name: 'Gmail',          src: '/logo/gmail.svg' },
  { name: 'Outlook',        src: '/logo/outlook-new.svg' },
  { name: 'Yahoo',          src: '/logo/yahoo.svg' },
]

const row2Logos = [
  { name: 'Outlook Legacy', src: '/logo/outlook-old.svg' },
  { name: 'HEY',            src: '/logo/hey.svg' },
  { name: 'Thunderbird',    src: '/logo/thunderbird.svg' },
]

const clientLogosRow1 = [...row1Logos, ...row1Logos, ...row1Logos]
const clientLogosRow2 = [...row2Logos, ...row2Logos, ...row2Logos, ...row2Logos]

const MOBILE_LIMIT = 9
const expanded = ref(false)

// Reduced-motion: never start the auto-scroll (logos stay, just static). The
// carousels render client-only, so this is evaluated in the browser; gating
// playOnInit also survives embla reInits (lazy logo loads) without restarting.
const prefersReduced = import.meta.client
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches
</script>

<style scoped>
:deep([data-traffic-light]) {
  transition: fill 0.2s ease, fill-opacity 0.2s ease;
}
.group:hover :deep([data-traffic-light="red"]) {
  fill: #FF5F57;
  fill-opacity: 1;
}
.group:hover :deep([data-traffic-light="yellow"]) {
  fill: #FEBC2E;
  fill-opacity: 1;
}
.group:hover :deep([data-traffic-light="green"]) {
  fill: #28C840;
  fill-opacity: 1;
}
</style>

<template>
  <ContainerAlt :bottom-border="false">
    <div class="bg-background sm:-mx-10">
      <div class="grid lg:grid-cols-12 border-b border-border">
        <!-- title (left) -->
        <div class="lg:col-span-6 lg:border-r lg:border-border pt-20 sm:pt-28 pb-0 lg:pb-28 px-4 sm:px-10 lg:pr-12">
          <p class="text-xs font-medium uppercase tracking-wider text-muted-foreground">Components</p>
          <h2 class="mt-3 text-3xl sm:text-4xl/[1.15] font-bold text-foreground tracking-tight">
            <span class="font-light">Build</span> beautiful <span class="font-light">emails</span><br class="hidden lg:block"> <span class="font-light">with reusable</span> components.
          </h2>
          <p class="mt-5 text-lg/7 text-muted-foreground text-balance">
            Render-tested email components that look great across major email clients, with a developer experience to match.
          </p>
        </div>

        <!-- logos carousel (right) -->
        <div class="lg:col-span-6 flex flex-col justify-center gap-4 pt-4 pb-14 sm:pb-28 lg:py-0 overflow-hidden">
          <div class="w-full overflow-hidden">
            <ClientOnly>
              <Carousel
                class="w-full"
                :opts="{ loop: true, align: 'start', dragFree: true }"
                :plugins="[AutoScroll({ playOnInit: !prefersReduced, speed: 1, stopOnInteraction: false, stopOnMouseEnter: false, stopOnPointerDown: false })]"
              >
                <CarouselContent :class="prefersReduced ? '-ml-12' : '-ml-0'">
                  <CarouselItem
                    v-for="(logo, i) in clientLogosRow1"
                    :key="`r1-${i}-${logo.name}`"
                    class="pl-0 basis-auto"
                  >
                    <div class="flex items-center justify-center h-24 sm:h-28 w-36 sm:w-44 px-4">
                      <img
                        :src="logo.src"
                        :alt="logo.name"
                        class="max-h-12 sm:max-h-[54px] max-w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </ClientOnly>
          </div>

          <div class="w-full overflow-hidden">
            <ClientOnly>
              <Carousel
                class="w-full"
                :opts="{ loop: true, align: 'start', dragFree: true }"
                :plugins="[AutoScroll({ playOnInit: !prefersReduced, speed: 0.5, direction: 'backward', stopOnInteraction: false, stopOnMouseEnter: false, stopOnPointerDown: false })]"
              >
                <CarouselContent :class="prefersReduced ? '-ml-36' : '-ml-0'">
                  <CarouselItem
                    v-for="(logo, i) in clientLogosRow2"
                    :key="`r2-${i}-${logo.name}`"
                    class="pl-0 basis-auto"
                  >
                    <div class="flex items-center justify-center h-24 sm:h-28 w-36 sm:w-44 px-4">
                      <img
                        :src="logo.src"
                        :alt="logo.name"
                        class="max-h-12 sm:max-h-[54px] max-w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>

    <div class="relative pt-20 sm:pt-12 pb-8 px-4 sm:px-0 bg-background">
      <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-7">
        <NuxtLink
          v-for="(cell, i) in cells"
          :key="cell.name"
          :to="`/docs/components/${cell.name.toLowerCase()}`"
          class="group"
          :class="i >= MOBILE_LIMIT && !expanded ? 'hidden sm:block' : 'block'"
        >
          <div class="relative aspect-[4/3] border border-border rounded-md bg-background overflow-hidden flex items-center justify-center p-2">
            <ComponentGlyph
              v-if="GLYPH_NAMES.has(cell.name)"
              :name="cell.name"
              class="w-full max-w-[280px] h-auto"
            />
          </div>
          <h3 class="mt-3 text-sm font-semibold text-foreground">
            {{ cell.name }}
          </h3>
        </NuxtLink>
      </div>

      <!-- mobile-only expand control with fade -->
      <div
        v-if="!expanded && cells.length > MOBILE_LIMIT"
        class="sm:hidden absolute inset-x-0 bottom-0 flex flex-col items-center justify-end pointer-events-none"
      >
        <div class="h-32 w-full bg-gradient-to-t from-background to-transparent" />
        <div class="w-full pb-8 px-4 bg-background flex justify-center">
          <button
            type="button"
            class="pointer-events-auto inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-foreground/[0.03] hover:text-foreground"
            @click="expanded = true"
          >
            See all components
            <ChevronDown class="size-4" />
          </button>
        </div>
      </div>
    </div>
  </ContainerAlt>
</template>
