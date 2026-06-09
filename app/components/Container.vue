<script setup lang="ts">
defineProps<{ bottomBorder?: boolean }>()
</script>

<template>
  <section
    class="relative z-10 border-border"
    :class="bottomBorder !== false ? 'border-b' : ''"
  >
    <div class="max-w-[1600px] h-full mx-auto xl:border-x border-border box-content relative z-10 bg-background">
      <div class="h-full mr-6 sm:mx-10 pl-6 sm:px-10 border-r 2xl:border-l border-border">
        <slot />
      </div>
    </div>
  </section>
</template>
