<script setup lang="ts">
defineProps<{ lines: { content: string; tone?: 'dim' | 'accent' | 'success' | 'default' }[] }>()
</script>

<template>
  <div class="font-mono text-[12px] leading-6 p-4 bg-[#1a1620]">
    <p v-for="(line, i) in lines" :key="i" :class="{
      'text-[#91889b]': line.tone === 'dim',
      'text-[#5EFAE6]': line.tone === 'accent',
      'text-emerald-400': line.tone === 'success',
      'text-[#b4afbf]': !line.tone || line.tone === 'default',
    }" v-html="line.content" />
  </div>
</template>
