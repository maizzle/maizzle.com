<script setup lang="ts">
import { computed, ref } from 'vue'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'
import { ScrollAreaCorner, ScrollAreaRoot, ScrollAreaViewport } from 'reka-ui'
import ScrollBar from '@/components/ui/scroll-area/ScrollBar.vue'

const props = withDefaults(defineProps<{
  maxHeight?: string | number
  toggle?: boolean
}>(), {
  maxHeight: undefined,
  toggle: false,
})

const expanded = ref(false)

const maxH = computed(() => {
  if (props.toggle && expanded.value) return null
  const raw = props.maxHeight ?? (props.toggle ? 300 : undefined)
  if (raw == null || raw === '') return null
  if (typeof raw === 'number') return `${raw}px`
  return /^\d+$/.test(raw) ? `${raw}px` : raw
})

const clipStyle = computed(() => maxH.value ? { maxHeight: maxH.value } : {})

const showFade = computed(() => props.toggle && !expanded.value)
</script>

<template>
  <div class="my-6 relative">
    <div class="relative overflow-hidden rounded-lg border border-border">
      <template v-if="toggle">
        <div :style="clipStyle" class="overflow-hidden">
          <div class="px-4 py-2 *:my-2!">
            <slot />
          </div>
        </div>
      </template>
      <template v-else>
        <ScrollAreaRoot type="always" class="relative">
          <ScrollAreaViewport
            :style="clipStyle"
            class="w-full rounded-[inherit] outline-none"
          >
            <div class="pl-4 pr-6 py-2 *:my-0!">
              <slot />
            </div>
          </ScrollAreaViewport>
          <ScrollBar class="data-vertical:py-2 data-vertical:mr-1 data-horizontal:px-2 data-horizontal:mb-1" />
          <ScrollAreaCorner />
        </ScrollAreaRoot>
      </template>
      <div
        v-if="showFade"
        class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent via-background/90 to-background mask-[linear-gradient(to_top,black_40%,transparent_100%)]"
      />
    </div>
    <button
      v-if="toggle"
      type="button"
      class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground shadow-xs hover:text-foreground hover:bg-muted"
      :aria-expanded="expanded"
      @click="expanded = !expanded"
    >
      {{ expanded ? 'Collapse' : 'See more' }}
      <component :is="expanded ? ChevronUp : ChevronDown" class="size-3.5" />
    </button>
  </div>
</template>
