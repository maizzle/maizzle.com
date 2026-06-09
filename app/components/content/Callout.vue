<script setup lang="ts">
import { computed } from 'vue'
import { Info, CircleCheck, TriangleAlert, OctagonAlert } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  type?: 'info' | 'success' | 'warning' | 'danger'
}>(), {
  type: 'info',
})

const meta = computed(() => {
  switch (props.type) {
    case 'success':
      return { icon: CircleCheck, color: 'text-emerald-500' }
    case 'warning':
      return { icon: TriangleAlert, color: 'text-amber-500' }
    case 'danger':
      return { icon: OctagonAlert, color: 'text-rose-500' }
    default:
      return { icon: Info, color: 'text-indigo-500' }
  }
})
</script>

<template>
  <div
    role="alert"
    class="my-6 flex gap-3 rounded-lg border border-border bg-muted/50 p-4 text-sm text-foreground"
  >
    <component :is="meta.icon" class="mt-0.5 size-4 shrink-0" :class="meta.color" />
    <div class="min-w-0 flex-1 leading-relaxed [&>:first-child]:mt-0 [&>:last-child]:mb-0 [&_p]:my-1">
      <slot />
    </div>
  </div>
</template>
