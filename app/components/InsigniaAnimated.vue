<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const path1 = ref<SVGPathElement | null>(null)
const path2 = ref<SVGPathElement | null>(null)
const path3 = ref<SVGPathElement | null>(null)
const path4 = ref<SVGPathElement | null>(null)
const initialized = ref(false)

const STROKE_DURATION = 1.8

const isDark = ref(false)
let darkObserver: MutationObserver | null = null

onMounted(() => {
  const update = () => { isDark.value = document.documentElement.classList.contains('dark') }
  update()
  darkObserver = new MutationObserver(update)
  darkObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

onUnmounted(() => {
  darkObserver?.disconnect()
})

onMounted(() => {
  const paths = [path1.value, path2.value, path3.value, path4.value]
    .filter(Boolean) as SVGPathElement[]

  // Respect reduced-motion: skip the stroke-draw and reveal the final logo at
  // once (paths render full-stroke by default, so nothing else is needed).
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    initialized.value = true
    return
  }

  const startFracs = [0, 0.3, 0.6, 0.85]

  paths.forEach((p, i) => {
    const len = p.getTotalLength()
    const f = startFracs[i] ?? 0

    p.setAttribute('stroke-dashoffset', String(-f * len))
    p.setAttribute('stroke-dasharray', `0 ${len}`)
    // round linecap renders a 1px dot at dasharray="0 len" — start fully transparent
    p.setAttribute('stroke-opacity', '0')

    const tween = { dash: 0, so: 0 }
    gsap.to(tween, {
      dash: len,
      so: 1,
      duration: STROKE_DURATION,
      ease: 'power3.inOut',
      onUpdate: () => {
        const d = Math.min(tween.dash, len)
        p.setAttribute('stroke-dasharray', `${d} ${Math.max(len - d, 0)}`)
        p.setAttribute('stroke-opacity', String(tween.so))
      },
      onComplete: () => {
        p.removeAttribute('stroke-dasharray')
        p.removeAttribute('stroke-dashoffset')
        p.removeAttribute('stroke-opacity')
      },
    })
  })

  initialized.value = true
})
</script>

<template>
  <div class="insignia-wrap" :style="initialized ? undefined : { opacity: 0 }">
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 25" class="block w-full h-auto">
      <defs>
        <linearGradient id="ia-grad-0" x1="29.3" y1="1.2" x2="29.3" y2="23.2" gradientUnits="userSpaceOnUse">
          <stop stop-color="#4F46E5" />
          <stop offset="1" stop-color="#9C96FF" />
        </linearGradient>
        <linearGradient id="ia-grad-1" x1="16.75" y1="1.2" x2="16.75" y2="23.2" gradientUnits="userSpaceOnUse">
          <stop stop-color="#4F46E5" />
          <stop offset="1" stop-color="#9C96FF" />
        </linearGradient>
        <linearGradient id="ia-grad-2" x1="31.1435" y1="1.84827" x2="14.9218" y2="22.5812" gradientUnits="userSpaceOnUse">
          <stop stop-color="#4F46E5" />
          <stop offset="1" stop-color="#9C96FF" />
        </linearGradient>
        <linearGradient id="ia-grad-3" x1="18.584" y1="1.84876" x2="2.36227" y2="22.5817" gradientUnits="userSpaceOnUse">
          <stop stop-color="#4F46E5" />
          <stop offset="1" stop-color="#9C96FF" />
        </linearGradient>
      </defs>
      <path
        ref="path1"
        d="M32.3 4.215a3 3 0 1 0-6 0v16a3 3 0 0 0 6 0v-16Z"
        :stroke="isDark ? 'url(#ia-grad-0)' : '#4F46E5'"
        stroke-width="0.2"
        stroke-miterlimit="10"
      />
      <path
        ref="path2"
        d="M19.75 4.215a3 3 0 1 0-6 0v16a3 3 0 0 0 6 0v-16Z"
        :stroke="isDark ? 'url(#ia-grad-1)' : '#4F46E5'"
        stroke-width="0.2"
        stroke-miterlimit="10"
      />
      <path
        ref="path3"
        d="M31.664 6.06a3 3 0 1 0-4.726-3.697L14.411 18.374a3 3 0 1 0 4.725 3.698L31.664 6.06Z"
        :stroke="isDark ? 'url(#ia-grad-2)' : '#4F46E5'"
        stroke-width="0.2"
        stroke-miterlimit="10"
      />
      <path
        ref="path4"
        d="M19.102 6.06a3 3 0 1 0-4.726-3.697L1.85 18.375a3 3 0 1 0 4.725 3.697L19.102 6.06Z"
        :stroke="isDark ? 'url(#ia-grad-3)' : '#4F46E5'"
        stroke-width="0.2"
        stroke-miterlimit="10"
      />
    </svg>
  </div>
</template>

<style scoped>
.insignia-wrap {
  position: relative;
  display: block;
  line-height: 0;
}
</style>
