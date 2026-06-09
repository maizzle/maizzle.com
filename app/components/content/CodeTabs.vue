<script setup>
import { provide, ref } from 'vue'
import { Check, Copy } from 'lucide-vue-next'

const tabs = ref([])
const active = ref(0)

function register(tab) {
  const idx = tabs.value.length
  tabs.value.push({ ...tab })
  return idx
}

function setCode(idx, code) {
  if (tabs.value[idx]) tabs.value[idx].code = code
}

provide('codeTabs', { tabs, active, register, setCode })

const copied = ref(false)
async function copy() {
  const code = tabs.value[active.value]?.code
  if (!code) return
  try {
    await navigator.clipboard.writeText(code)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {}
}
</script>

<template>
  <div class="mb-6 max-w-3xl overflow-hidden rounded-lg border border-white/10 bg-gray-900">
    <div class="flex items-center justify-between border-b border-white/10 bg-white/5 pr-2">
      <div role="tablist" class="flex gap-1 pl-2 pr-1 py-1.5">
        <button
          v-for="(t, i) in tabs"
          :key="i"
          type="button"
          role="tab"
          :aria-selected="active === i"
          class="px-2 py-0.5 rounded-full font-sans text-xs transition-colors outline-none focus:outline-none"
          :class="active === i
            ? 'text-white bg-white/20'
            : 'text-white/50 hover:text-white/80'"
          @click="active = i"
        >{{ t.label }}</button>
      </div>
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
    <slot />
  </div>
</template>
