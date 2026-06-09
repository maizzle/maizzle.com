<script setup>
import { computed, inject, ref, watchEffect } from 'vue'
import { Check, Copy } from 'lucide-vue-next'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  code: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array,
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
})

const tabsCtx = inject('codeTabs', null)
const tabIdx = inject('codeTabIdx', null)
const inTabs = computed(() => tabsCtx !== null && tabIdx !== null && tabIdx >= 0)

if (inTabs.value) {
  watchEffect(() => tabsCtx.setCode(tabIdx, props.code))
}

const title = computed(() => {
  if (props.filename) return props.filename
  if (props.language && props.language !== 'text') return props.language
  return ''
})

const copied = ref(false)
async function copy() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch { }
}
</script>

<template>
  <pre v-if="inTabs" v-bind="$attrs" :class="[$props.class, 'bg-transparent! rounded-none border-0 py-2! my-0! [&_code]:block [&_code]:w-fit [&_code]:min-w-full [&_code_.line]:block selection:bg-gray-100! selection:text-black!']"><slot /></pre>
  <div v-else class="mb-6 max-w-3xl overflow-hidden rounded-lg border border-white/10 bg-[oklch(0.17_0.031_263)]">
    <div class="flex items-center justify-between border-b border-white/10 bg-white/5 pl-4 pr-2 py-0.5">
      <span v-if="title" class="font-sans text-xs text-white/60">{{ title }}</span>
      <span v-else></span>
      <button
        type="button"
        class="inline-flex items-center justify-center size-7 rounded-md text-white/50 hover:text-white transition-colors outline-none focus:outline-none focus-visible:outline-none focus:ring-0"
        :aria-label="copied ? 'Copied' : 'Copy code'"
        @click="copy"
      >
        <Check v-if="copied" class="size-3.5 text-emerald-400" />
        <Copy v-else class="size-3.5" />
      </button>
    </div>
    <pre v-bind="$attrs" :class="[$props.class, 'bg-transparent! rounded-none border-0 py-2! my-0! [&_code]:block [&_code]:w-fit [&_code]:min-w-full [&_code_.line]:block selection:bg-gray-100! selection:text-black!']"><slot /></pre>
  </div>
</template>
