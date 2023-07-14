<template>
  <h3
    :id="id"
    class="relative w-full inline-block mt-4 mb-6 break-words"
  >
    <a
      v-if="id && generate"
      :href="`#${id}`"
      class="
      no-underline font-bold
      before:content-['#']
      before:hidden before:sm:block before:absolute before:-ml-5 before:top-[3px]
      before:opacity-0 before:hover:opacity-100 before:transition-opacity
      before:text-lg before:font-semibold
      "
    >
      <slot />
    </a>
    <slot v-else />
  </h3>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
defineProps<{ id?: string }>()
const heading = 3
const { anchorLinks } = useRuntimeConfig().public.content
const generate = anchorLinks?.depth >= heading && !anchorLinks?.exclude.includes(heading)
</script>
