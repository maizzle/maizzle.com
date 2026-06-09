<script setup>
import { computed, inject, provide } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
})

const ctx = inject('codeTabs', null)
const idx = ctx ? ctx.register({ label: props.label, code: '' }) : -1

provide('codeTabIdx', idx)

const isActive = computed(() => (ctx ? ctx.active.value === idx : true))
</script>

<template>
  <div v-show="isActive">
    <slot />
  </div>
</template>
