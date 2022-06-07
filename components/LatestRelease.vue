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

<script>
export default {
  name: 'LatestRelease',
  props: {
    asLink: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      release: '',
    }
  },
  async fetch() {
    if (this.$config.latestRelease) {
      this.release = this.$config.latestRelease
    } else {
      const {tag_name} = await fetch('https://api.github.com/repos/maizzle/framework/releases/latest').then(res => res.json())
      this.release = tag_name
    }
  },
}
</script>
