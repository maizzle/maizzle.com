<script setup>
defineOptions({ inheritAttrs: false })
</script>

<template>
  <div class="my-6 overflow-x-auto">
    <table v-bind="$attrs" class="mt-0 mb-0">
      <slot />
    </table>
  </div>
</template>
