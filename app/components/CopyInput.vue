<script setup lang="ts">
import { ref } from 'vue'
import { Check, Copy } from 'lucide-vue-next'

const props = defineProps<{ value: string }>()
const copied = ref(false)

async function copy() {
  try {
    await navigator.clipboard.writeText(props.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {}
}
</script>

<template>
  <div class="inline-flex items-center gap-2 h-11 pl-4 pr-2 bg-foreground/5 dark:bg-foreground/10 border border-border rounded-md font-mono text-sm">
    <span class="text-muted-foreground">$</span>
    <code class="text-foreground select-all">{{ value }}</code>
    <button
      type="button"
      class="ml-2 inline-flex items-center justify-center size-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
      :aria-label="copied ? 'Copied' : 'Copy'"
      @click="copy"
    >
      <Check v-if="copied" class="size-4 text-gray-900 dark:text-gray-200" />
      <Copy v-else class="size-4" />
    </button>
  </div>
</template>
