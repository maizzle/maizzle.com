<template>
  <div
    role="alert"
    class="flex gap-4 text-slate-600 text-sm mb-4"
  >
    <div
      class="w-1 h-auto rounded-full shrink-0"
      :class="classes"
    />
    <div class="py-2">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'info',
  },
})

const classes = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-500'
    case 'info':
      return 'bg-indigo-500'
    case 'warning':
      return 'bg-amber-300'
    case 'danger':
      return 'bg-rose-400'
    default:
      return 'bg-indigo-500'
  }
})
</script>
