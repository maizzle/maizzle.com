<template>
  <h3
    :id="props.id"
    class="relative w-full inline-block mt-4 mb-6 break-words"
  >
    <a
      v-if="props.id && generate"
      :href="`#${props.id}`"
      class="
        no-underline font-bold
        before:content-['#']
        before:hidden before:sm:block before:absolute before:-ml-5 before:top-[3px]
        before:opacity-0 hover:before:opacity-100 before:transition-opacity
        before:text-lg before:font-semibold
      "
    >
      <slot />
    </a>
    <slot v-else />
  </h3>
</template>

<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && ((typeof headings?.anchorLinks === 'boolean' && headings?.anchorLinks === true) || (typeof headings?.anchorLinks === 'object' && headings?.anchorLinks?.h3)))
</script>
