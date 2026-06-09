<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const features = [
  {
    title: 'Live preview',
    description: 'See your changes in real-time as you code, with no need to refresh.',
    video: '/video/1-preview.mp4',
    aspect: '16 / 9',
  },
  {
    title: 'Device sizes',
    description: 'Drag to resize or pick a device from the list to see how your email looks on different screen sizes.',
    video: '/video/2-devices.mp4',
  },
  {
    title: 'Debugging tools',
    description: 'Inspect the HTML and plaintext output, check compatibility, view linting errors and even send yourself a test email.',
    video: '/video/3-debugging.mp4',
  },
  {
    title: 'Commands',
    description: 'Use the command palette to quickly find an email, emulate dark mode, or check the documentation.',
    video: '/video/4-commands.mp4',
  },
]

const active = ref(0)

// Defer video loading until the section nears the viewport, and only mount the
// video for the active breakpoint so the clip downloads once, not in both the
// mobile and desktop blocks.
const rootRef = ref<HTMLElement>()
const visible = ref(false)
const isLg = ref(false)
const reduceMotion = ref(false)
let observer: IntersectionObserver | null = null
let mql: MediaQueryList | null = null

function onMqlChange(e: MediaQueryListEvent) {
  isLg.value = e.matches
}

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  mql = window.matchMedia('(min-width: 1024px)')
  isLg.value = mql.matches
  mql.addEventListener('change', onMqlChange)

  observer = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) {
      visible.value = true
      observer?.disconnect()
    }
  }, { rootMargin: '200px 0px' })
  if (rootRef.value) observer.observe(rootRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  mql?.removeEventListener('change', onMqlChange)
})
</script>

<template>
  <ContainerAlt :bottom-border="false">
    <div class="pt-20 sm:pt-28 pb-10 px-4 sm:px-0 bg-background">
      <div class="max-w-2xl">
        <p class="text-xs font-medium uppercase tracking-wider text-muted-foreground">Dev UI</p>
        <h2 class="mt-3 text-3xl sm:text-4xl/[1.15] font-bold text-foreground tracking-tight">
          <span class="font-light">The</span> best email <span class="font-light">development</span><br>experience <span class="font-light">around.</span>
        </h2>
        <p class="mt-5 text-lg/7 text-muted-foreground text-balance">
          Preview your emails in real-time as you code, in a beautiful interface purposely built for email development.
        </p>
      </div>
    </div>

    <div ref="rootRef" class="pb-8 bg-background">
      <!-- Mobile: scrollable tabs above, content pane below -->
      <div class="lg:hidden">
        <div class="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul class="flex gap-2 pl-4 pb-1">
            <li
              v-for="(f, i) in features"
              :key="`tab-${f.title}`"
            >
              <button
                type="button"
                class="shrink-0 flex items-center gap-2.5 whitespace-nowrap px-4 py-2.5 text-sm font-semibold rounded-lg border transition-colors"
                :class="active === i
                  ? 'bg-foreground/[0.03] border-indigo-600 text-foreground'
                  : 'border-border text-muted-foreground'"
                @click="active = i"
              >
                <span
                  class="size-2 rounded-full shrink-0 transition-colors"
                  :class="active === i ? 'bg-indigo-600' : 'bg-muted-foreground/40'"
                />
                {{ f.title }}
              </button>
            </li>
            <!-- trailing spacer so the last tab clears the right border (gap-2 + w-2 = 16px, matches the card's mx-4) -->
            <li aria-hidden="true" class="w-2 shrink-0" />
          </ul>
        </div>

        <div class="mt-4 mx-4 border border-border bg-background rounded-xl overflow-hidden">
          <div class="relative bg-muted/30 border-b border-border overflow-hidden rounded-b-lg" :style="{ aspectRatio: features[active]?.aspect ?? '5 / 3' }">
            <Transition
              enter-active-class="transition duration-200"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition duration-150 absolute inset-0"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
              mode="out-in"
            >
              <video
                v-if="!isLg && visible && features[active]?.video"
                :key="`video-${active}`"
                :src="features[active]?.video"
                class="absolute -inset-px object-cover"
                :autoplay="!reduceMotion"
                :controls="reduceMotion"
                loop
                muted
                playsinline
              />
              <div v-else :key="active" class="absolute inset-0 flex items-center justify-center">
                <div class="text-center px-6">
                  <div class="mx-auto mb-3 inline-flex items-center justify-center size-12 bg-foreground/5 text-foreground rounded-full">
                    <span class="text-lg font-mono font-semibold">{{ active + 1 }}</span>
                  </div>
                  <p class="text-xs text-muted-foreground/60 font-mono">screenshot placeholder</p>
                </div>
              </div>
            </Transition>
          </div>
          <div class="p-5">
            <p class="text-base font-semibold text-foreground">{{ features[active].title }}</p>
            <p class="mt-1.5 text-sm/6 text-muted-foreground">{{ features[active].description }}</p>
          </div>
        </div>
      </div>

      <div class="hidden lg:grid grid-cols-12 gap-8 bg-background">
        <ul class="col-span-4 flex flex-col gap-2">
          <li v-for="(f, i) in features" :key="f.title">
            <button
              type="button"
              class="w-full text-left p-5 rounded-lg border transition-colors cursor-pointer"
              :class="active === i
                ? 'bg-foreground/[0.03] border-indigo-600'
                : 'border-transparent hover:bg-muted/50'"
              @click="active = i"
            >
              <p class="flex items-center gap-3 text-base font-semibold text-foreground">
                <span
                  class="size-2 rounded-full shrink-0 transition-colors"
                  :class="active === i ? 'bg-indigo-600' : 'bg-muted-foreground/40'"
                />
                {{ f.title }}
              </p>
              <p class="mt-1 pl-5 text-sm/6 text-muted-foreground">
                {{ f.description }}
              </p>
            </button>
          </li>
        </ul>

        <div class="col-span-8 relative border border-border bg-muted/30 overflow-hidden rounded-xl" :style="{ aspectRatio: features[active]?.aspect ?? '5 / 3' }">
          <Transition
            enter-active-class="transition duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-200 absolute inset-0"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
            mode="out-in"
          >
            <video
              v-if="isLg && visible && features[active]?.video"
              :key="`video-${active}`"
              :src="features[active]?.video"
              class="absolute -inset-px object-cover"
              :autoplay="!reduceMotion"
              :controls="reduceMotion"
              loop
              muted
              playsinline
            />
            <div v-else :key="active" class="absolute inset-0 flex items-center justify-center">
              <div class="text-center px-6">
                <div class="mx-auto mb-4 inline-flex items-center justify-center size-14 bg-foreground/5 text-foreground rounded-full">
                  <span class="text-xl font-mono font-semibold">{{ active + 1 }}</span>
                </div>
                <p class="text-sm font-medium text-muted-foreground">{{ features[active]?.title }}</p>
                <p class="mt-2 text-xs text-muted-foreground/60 font-mono">screenshot placeholder</p>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </ContainerAlt>
</template>
