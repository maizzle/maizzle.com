<script setup lang="ts">
defineProps<{ lineTop?: boolean }>()
</script>

<template>
  <section class="relative z-10 border-border" :class="lineTop ? 'border-t' : 'border-b'">
    <div class="max-w-[1600px] h-12 sm:h-20 mx-auto xl:border-x border-border box-content relative z-10 bg-background">
      <div class="h-full mr-6 sm:mx-10 pl-6 sm:px-10 border-r 2xl:border-l border-border">
        <div class="h-full bg-background" />
      </div>
    </div>
  </section>
</template>
