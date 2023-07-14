<template>
  <h4
    :id="id"
    class="relative w-full inline-block mt-4 mb-4 break-words"
  >
    <a
      v-if="id && generate"
      :href="`#${id}`"
      class="
      no-underline font-bold
      before:content-['#']
      before:hidden before:sm:block before:absolute before:-ml-5
      before:opacity-0 before:hover:opacity-100 before:transition-opacity
      before:text-base before:font-semibold
      "
    >
      <slot />
    </a>
    <slot v-else />
  </h4>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
defineProps<{ id?: string }>()
const heading = 4
const { anchorLinks } = useRuntimeConfig().public.content
const generate = anchorLinks?.depth >= heading && !anchorLinks?.exclude.includes(heading)
</script>
