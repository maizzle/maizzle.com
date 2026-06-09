<script setup lang="ts">
import { computed } from 'vue'
import { ScrollArea } from '@/components/ui/scroll-area'

const props = defineProps<{
  files: { name: string; path?: string; lang?: string }[]
  modelValue: string
  showStatusBar?: boolean
  branch?: string
  fileSize?: string
  unified?: boolean
  dirtyFiles?: string[]
  heightClass?: string
}>()

defineEmits<{ 'update:modelValue': [value: string] }>()

const activeTitle = computed(() => {
  const f = props.files.find(file => file.name === props.modelValue)
  return f?.path ?? f?.name ?? ''
})
</script>

<template>
  <div :class="['flex flex-col', heightClass, unified ? 'bg-[oklch(0.17_0.031_263)] text-[#b4afbf]' : 'rounded-lg overflow-hidden border border-foreground/10 bg-[oklch(0.17_0.031_263)] text-[#b4afbf]']">
    <div class="shrink-0 flex items-center h-9 pl-3 pr-2 bg-[oklch(0.13_0.031_263)] border-b border-white/5">
      <div class="flex items-center gap-1.5">
        <span class="size-3 rounded-full bg-white/45" />
        <span class="size-3 rounded-full bg-white/32" />
        <span class="size-3 rounded-full bg-white/20" />
      </div>
      <div class="flex-1 flex items-center justify-center">
        <span class="text-xs text-[#91889b]">{{ activeTitle }}</span>
      </div>
      <div class="w-12" />
    </div>

    <div class="shrink-0 flex items-stretch bg-[oklch(0.13_0.031_263)] border-b border-white/5 overflow-x-auto">
      <button
        v-for="file in files"
        :key="file.name"
        type="button"
        class="flex items-center gap-2 px-4 py-2 text-xs font-mono whitespace-nowrap border-r border-white/5 transition-colors"
        :class="modelValue === file.name
          ? 'bg-[oklch(0.17_0.031_263)] text-[#e7e4ef]'
          : 'text-[#91889b] hover:text-[#b4afbf]'"
        @click="$emit('update:modelValue', file.name)"
      >
        {{ file.name }}
        <span
          v-if="dirtyFiles?.includes(file.name)"
          class="size-2 rounded-full bg-orange-400"
          aria-label="Unsaved changes"
        />
      </button>
    </div>

    <div class="relative w-full h-[420px] lg:h-auto lg:flex-1 min-h-0">
      <ScrollArea type="hover" class="h-full w-full">
        <slot />
      </ScrollArea>
    </div>

    <div v-if="$slots.terminal" class="border-t border-white/5">
      <div class="flex items-center h-7 px-3 bg-[oklch(0.13_0.031_263)] border-b border-white/5">
        <span class="text-[10px] uppercase tracking-wider text-[#91889b] font-mono">Terminal</span>
      </div>
      <slot name="terminal" />
    </div>

    <div v-if="showStatusBar" class="flex items-center justify-between h-6 px-3 bg-[#0CB39E] text-white text-[11px] font-mono">
      <div class="flex items-center gap-3">
        <span class="flex items-center gap-1">
          <svg class="size-3" viewBox="0 0 16 16" fill="currentColor"><path d="M11.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm-2.25.75a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v.628a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.49 2.49 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM3.5 3.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Z" /></svg>
          {{ branch || 'main' }}
        </span>
      </div>
      <span v-if="fileSize">{{ fileSize }}</span>
    </div>
  </div>
</template>
