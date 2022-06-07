<template>
  <span class="lazyload-wrapper block relative z-1">
    <span class="lazyload w-full h-full block">
      <span>
        <img
          :src="`data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 ${width} ${height}'%2F%3E`"
          decoding="async"
          :class="imageClass"
          :data-src="url"
          :width="width"
          :height="height"
          :alt="alt"
        />
      </span>
      <span
        v-if="styledAlt"
        class="alt hidden capitalize"
        :class="altClass"
      >
        {{ alt.replaceAll('-', ' ') }}
      </span>
    </span>
  </span>
</template>

<script>
export default {
  name: 'LazyImg',
  props: {
    imageClass: {
      type: String,
      default: 'rounded-lg'
    },
    url: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 900
    },
    height: {
      type: Number,
      default: 496
    },
    alt: {
      type: String,
      default: 'Image alt description'
    },
    altClass: {
      type: String,
      default: ''
    },
    styledAlt: {
      type: Boolean,
      default: false
    },
  }
}
</script>