<template>
  <a
    v-if="asLink"
    href="https://github.com/maizzle/framework/releases"
    v-text="release"
  />
  <span
    v-else
    v-text="release"
  />
</template>

<script setup>
defineProps({
  asLink: {
    type: String,
    default: undefined,
  },
})

const {public: runtimeConfig} = useRuntimeConfig()

const release = runtimeConfig.latestRelease
</script>
