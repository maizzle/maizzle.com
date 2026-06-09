<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const props = defineProps<{ code: string; lang?: string }>()

const { highlight } = useShiki()
const html = ref('')

async function run() {
  if (!props.lang) return
  html.value = await highlight(props.code, props.lang)
}

onMounted(run)
watch(() => [props.code, props.lang], run)
</script>

<template>
  <!-- Shiki-highlighted, matching the docs prose code styling -->
  <div v-if="lang" class="cs-shiki selection:bg-gray-100! selection:text-black!">
    <div v-if="html" v-html="html" />
    <pre v-else class="font-mono text-sm leading-8 text-[#b4afbf] px-4 py-4 m-0 whitespace-pre">{{ code }}</pre>
  </div>
  <!-- Legacy pre-coloured HTML -->
  <pre v-else class="font-mono text-[13px] leading-7 text-[#b4afbf] p-5 overflow-x-auto selection:bg-gray-100! selection:text-black!"><code v-html="code" /></pre>
</template>

<style scoped>
.cs-shiki :deep(pre.shiki) {
  margin: 0;
  padding-block: 1rem;
  background: transparent !important;
}
</style>
