<template>
  <span
    class="lazyload-wrapper block relative z-0 overflow-hidden"
  >
    <span
      class="loader-wrapper mx-auto block"
      :class="{'h-full' : wrapperHeightFull}"
    >
      <span
        class="lazyload mx-auto block relative"
        :class="{'h-full' : wrapperHeightFull}"
      >
        <span :class="{'h-full block' : wrapperHeightFull}">
          <img
            :src="`data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 ${width} ${height}'%2F%3E`"
            decoding="async"
            :class="`!my-0 ${imageClass}`"
            :data-src="url"
            :width="width"
            :height="height"
            :alt="alt"
          />
        </span>
        <span
          v-if="overlay"
          class="overlay w-full h-full block absolute top-0 left-0 transition-color duration-300"
          :class="overlayClass"
        />
      </span>
    </span>
  </span>
</template>

<script setup>
  import lazyload from '~/assets/js/lazyload'

  onMounted(() => {
    lazyload()
  })

  defineProps({
    backgroundImage:{
      type: Boolean,
      default: false,
    },
    imageClass: {
      type: String,
      default: ''
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
      default: ''
    },
    overlay: {
      type: Boolean,
      default: false
    },
    overlayClass: {
      type: String,
      default: ''
    },
    styledAlt: {
      type: Boolean,
      default: false
    },
    wrapperHeightFull: {
      type: Boolean,
      default: false
    },
  })
</script>
