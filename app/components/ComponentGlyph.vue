<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

defineProps<{ name: string }>()

const root = ref<SVGElement | null>(null)
const initialized = ref(false)
let observer: IntersectionObserver | null = null
let animated = false
let focalAnimating = false

function preHide(el: SVGGeometryElement) {
  if (el.hasAttribute('data-anim-scan')) {
    const from = parseFloat(el.getAttribute('data-scan-from') ?? el.getAttribute('y1') ?? '0')
    el.setAttribute('y1', String(from))
    el.setAttribute('y2', String(from))
    if (!el.hasAttribute('data-orig-so')) el.setAttribute('data-orig-so', el.getAttribute('stroke-opacity') ?? '1')
    ;(el as SVGElement).style.strokeOpacity = '0'
    return
  }

  if (el.hasAttribute('data-anim-horizontal')) {
    if (el.tagName.toLowerCase() === 'line') {
      if (!el.hasAttribute('data-orig-x2')) {
        el.setAttribute('data-orig-x2', el.getAttribute('x2') || '0')
      }
      el.setAttribute('x2', el.getAttribute('x1') || '0')
      // zero-length line with round linecap renders a dot — hide via stroke-opacity
      if (!el.hasAttribute('data-orig-so')) el.setAttribute('data-orig-so', el.getAttribute('stroke-opacity') ?? '1')
      ;(el as SVGElement).style.strokeOpacity = '0'
    } else {
      if (!el.hasAttribute('data-orig-width')) {
        el.setAttribute('data-orig-width', el.getAttribute('width') || '0')
      }
      el.setAttribute('width', '0')
    }
    return
  }

  if (el.hasAttribute('data-anim-slide-up')) {
    gsap.set(el, { opacity: 0, y: 5 })
    return
  }

  if (el.hasAttribute('data-anim-slide-right')) {
    gsap.set(el, { opacity: 0, x: 16 })
    return
  }

  if (el.hasAttribute('data-anim-expand') && el.tagName.toLowerCase() === 'line') {
    const x1 = parseFloat(el.getAttribute('x1') || '0')
    const x2 = parseFloat(el.getAttribute('x2') || '0')
    if (!el.hasAttribute('data-expand-x1')) el.setAttribute('data-expand-x1', String(x1))
    if (!el.hasAttribute('data-expand-x2')) el.setAttribute('data-expand-x2', String(x2))
    const center = (x1 + x2) / 2
    el.setAttribute('x1', String(center))
    el.setAttribute('x2', String(center))
    // zero-length line with round linecap renders a dot — hide via stroke-opacity
    if (!el.hasAttribute('data-orig-so')) el.setAttribute('data-orig-so', el.getAttribute('stroke-opacity') ?? '1')
    ;(el as SVGElement).style.strokeOpacity = '0'
    return
  }

  if (el.tagName.toLowerCase() === 'text') {
    const stroke = el.getAttribute('stroke')
    if (stroke && stroke !== 'none' && stroke !== 'transparent') {
      el.setAttribute('stroke-dasharray', `0 200`)
      if (!el.hasAttribute('data-orig-so')) el.setAttribute('data-orig-so', el.getAttribute('stroke-opacity') ?? '1')
      ;(el as SVGElement).style.strokeOpacity = '0'
    } else {
      ;(el as SVGElement).style.opacity = '0'
    }
    return
  }
  const fill = el.getAttribute('fill') || 'none'
  const stroke = el.getAttribute('stroke') || 'none'
  const hasFill = fill !== 'none' && fill !== 'transparent'
  const hasStroke = stroke !== 'none' && stroke !== 'transparent'
  if (hasStroke) {
    let len = 0
    try {
      len = el.getTotalLength()
    } catch {
      len = 200
    }
    if (!len || !isFinite(len)) len = 200
    el.setAttribute('stroke-dasharray', `0 ${len}`)
    // round linecap renders a 1px dot at dasharray="0 len" — use stroke-opacity to fully hide
    if (!el.hasAttribute('data-orig-so')) el.setAttribute('data-orig-so', el.getAttribute('stroke-opacity') ?? '1')
    ;(el as SVGElement).style.strokeOpacity = '0'
    if (hasFill) {
      ;(el as SVGElement).style.fillOpacity = '0'
    }
  } else if (hasFill) {
    ;(el as SVGElement).style.opacity = '0'
  }
}

function killTween(el: SVGGeometryElement) {
  const existing = (el as unknown as { _cgTween?: gsap.core.Tween })._cgTween
  if (existing) {
    existing.kill()
    ;(el as unknown as { _cgTween?: gsap.core.Tween })._cgTween = undefined
  }
  gsap.killTweensOf(el)
}

function animateElement(el: SVGGeometryElement, delay: number) {
  killTween(el)

  if (el.hasAttribute('data-anim-scan')) {
    const from = parseFloat(el.getAttribute('data-scan-from') ?? el.getAttribute('y1') ?? '0')
    const to = parseFloat(el.getAttribute('data-scan-to') ?? el.getAttribute('y1') ?? '0')
    const peak = parseFloat(el.getAttribute('data-orig-so') ?? el.getAttribute('stroke-opacity') ?? '1')
    el.setAttribute('y1', String(from))
    el.setAttribute('y2', String(from))
    ;(el as SVGElement).style.strokeOpacity = '0'
    const obj = { p: 0 }
    const tw = gsap.to(obj, {
      p: 1,
      duration: 1.5,
      delay,
      ease: 'none',
      onUpdate: () => {
        const y = from + (to - from) * obj.p
        el.setAttribute('y1', String(y))
        el.setAttribute('y2', String(y))
        ;(el as SVGElement).style.strokeOpacity = String(Math.sin(obj.p * Math.PI) * peak)
      },
      onComplete: () => {
        ;(el as SVGElement).style.strokeOpacity = '0'
        el.removeAttribute('data-orig-so')
        ;(el as unknown as { _cgTween?: gsap.core.Tween })._cgTween = undefined
      },
    })
    ;(el as unknown as { _cgTween?: gsap.core.Tween })._cgTween = tw
    return
  }

  if (el.hasAttribute('data-anim-horizontal')) {
    if (el.tagName.toLowerCase() === 'line') {
      const x1 = parseFloat(el.getAttribute('x1') || '0')
      const orig = parseFloat(el.getAttribute('data-orig-x2') || el.getAttribute('x2') || '0')
      if (!el.hasAttribute('data-orig-x2')) {
        el.setAttribute('data-orig-x2', String(orig))
      }
      const origSoH = parseFloat(el.getAttribute('data-orig-so') ?? el.getAttribute('stroke-opacity') ?? '1')
      el.setAttribute('x2', String(x1))
      ;(el as SVGElement).style.strokeOpacity = '0'
      const obj = { v: x1, so: 0 }
      const tw = gsap.to(obj, {
        v: orig,
        so: origSoH,
        duration: 0.9,
        delay,
        ease: 'power2.inOut',
        onUpdate: () => {
          el.setAttribute('x2', String(obj.v))
          ;(el as SVGElement).style.strokeOpacity = String(obj.so)
        },
        onComplete: () => {
          el.setAttribute('x2', String(orig))
          ;(el as SVGElement).style.strokeOpacity = ''
          el.removeAttribute('data-orig-so')
          ;(el as unknown as { _cgTween?: gsap.core.Tween })._cgTween = undefined
        },
      })
      ;(el as unknown as { _cgTween?: gsap.core.Tween })._cgTween = tw
      return
    }
    const orig = parseFloat(el.getAttribute('data-orig-width') || el.getAttribute('width') || '0')
    if (!el.hasAttribute('data-orig-width')) {
      el.setAttribute('data-orig-width', String(orig))
    }
    el.setAttribute('width', '0')
    const obj = { w: 0 }
    const tw = gsap.to(obj, {
      w: orig,
      duration: 0.9,
      delay,
      ease: 'power2.inOut',
      onUpdate: () => {
        el.setAttribute('width', String(obj.w))
      },
      onComplete: () => {
        el.setAttribute('width', String(orig))
        ;(el as unknown as { _cgTween?: gsap.core.Tween })._cgTween = undefined
      },
    })
    ;(el as unknown as { _cgTween?: gsap.core.Tween })._cgTween = tw
    return
  }

  if (el.hasAttribute('data-anim-slide-up')) {
    gsap.set(el, { opacity: 0, y: 5 })
    const tw = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay,
      ease: 'power3.out',
      onComplete: () => {
        ;(el as unknown as { _cgTween?: gsap.core.Tween })._cgTween = undefined
      },
    })
    ;(el as unknown as { _cgTween?: gsap.core.Tween })._cgTween = tw
    return
  }

  if (el.hasAttribute('data-anim-slide-right')) {
    gsap.set(el, { opacity: 0, x: 16 })
    const tw = gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 0.7,
      delay,
      ease: 'power3.out',
      onComplete: () => {
        ;(el as unknown as { _cgTween?: gsap.core.Tween })._cgTween = undefined
      },
    })
    ;(el as unknown as { _cgTween?: gsap.core.Tween })._cgTween = tw
    return
  }

  if (el.hasAttribute('data-anim-expand') && el.tagName.toLowerCase() === 'line') {
    const origX1 = parseFloat(el.getAttribute('data-expand-x1') || el.getAttribute('x1') || '0')
    const origX2 = parseFloat(el.getAttribute('data-expand-x2') || el.getAttribute('x2') || '0')
    const origSoExpand = parseFloat(el.getAttribute('data-orig-so') ?? el.getAttribute('stroke-opacity') ?? '1')
    const center = (origX1 + origX2) / 2
    const halfWidth = (origX2 - origX1) / 2
    el.setAttribute('x1', String(center))
    el.setAttribute('x2', String(center))
    ;(el as SVGElement).style.strokeOpacity = '0'
    const obj = { v: 0, so: 0 }
    const tw = gsap.to(obj, {
      v: halfWidth,
      so: origSoExpand,
      duration: 0.9,
      delay,
      ease: 'power2.inOut',
      onUpdate: () => {
        el.setAttribute('x1', String(center - obj.v))
        el.setAttribute('x2', String(center + obj.v))
        ;(el as SVGElement).style.strokeOpacity = String(obj.so)
      },
      onComplete: () => {
        el.setAttribute('x1', String(origX1))
        el.setAttribute('x2', String(origX2))
        ;(el as SVGElement).style.strokeOpacity = ''
        el.removeAttribute('data-orig-so')
        ;(el as unknown as { _cgTween?: gsap.core.Tween })._cgTween = undefined
      },
    })
    ;(el as unknown as { _cgTween?: gsap.core.Tween })._cgTween = tw
    return
  }

  if (el.tagName.toLowerCase() === 'text') {
    const textStroke = el.getAttribute('stroke')
    if (textStroke && textStroke !== 'none' && textStroke !== 'transparent') {
      const len = 200
      const origSoText = parseFloat(el.getAttribute('data-orig-so') ?? el.getAttribute('stroke-opacity') ?? '1')
      el.setAttribute('stroke-dasharray', `0 ${len}`)
      ;(el as SVGElement).style.strokeOpacity = '0'
      const tween = { d: 0, so: 0 }
      const tw = gsap.to(tween, {
        d: len,
        so: origSoText,
        duration: 2.4,
        delay,
        ease: 'power3.inOut',
        onUpdate: () => {
          const v = Math.min(tween.d, len)
          el.setAttribute('stroke-dasharray', `${v} ${Math.max(len - v, 0)}`)
          ;(el as SVGElement).style.strokeOpacity = String(tween.so)
        },
        onComplete: () => {
          el.removeAttribute('stroke-dasharray')
          ;(el as SVGElement).style.strokeOpacity = ''
          el.removeAttribute('data-orig-so')
          ;(el as unknown as { _cgTween?: gsap.core.Tween })._cgTween = undefined
        },
      })
      ;(el as unknown as { _cgTween?: gsap.core.Tween })._cgTween = tw
    } else {
      ;(el as SVGElement).style.opacity = '0'
      const tw = gsap.to(el, {
        opacity: 1,
        duration: 0.7,
        delay,
        ease: 'power3.out',
        onComplete: () => {
          ;(el as unknown as { _cgTween?: gsap.core.Tween })._cgTween = undefined
        },
      })
      ;(el as unknown as { _cgTween?: gsap.core.Tween })._cgTween = tw
    }
    return
  }

  const fill = el.getAttribute('fill') || 'none'
  const stroke = el.getAttribute('stroke') || 'none'
  const hasFill = fill !== 'none' && fill !== 'transparent'
  const hasStroke = stroke !== 'none' && stroke !== 'transparent'

  if (hasStroke) {
    let len = 0
    try {
      len = el.getTotalLength()
    } catch {
      len = 200
    }
    if (!len || !isFinite(len)) len = 200

    const origSo = parseFloat(el.getAttribute('data-orig-so') ?? el.getAttribute('stroke-opacity') ?? '1')
    el.setAttribute('stroke-dasharray', `0 ${len}`)
    ;(el as SVGElement).style.strokeOpacity = '0'
    let origFillOpacity = 1
    if (hasFill) {
      const attr = el.getAttribute('fill-opacity')
      origFillOpacity = attr !== null ? parseFloat(attr) : 1
      ;(el as SVGElement).style.fillOpacity = '0'
    }

    const tween = { d: 0, so: 0 }
    const tw = gsap.to(tween, {
      d: len,
      so: origSo,
      duration: 1.4,
      delay,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.min(tween.d, len)
        el.setAttribute('stroke-dasharray', `${v} ${Math.max(len - v, 0)}`)
        ;(el as SVGElement).style.strokeOpacity = String(tween.so)
      },
      onComplete: () => {
        const persist = el.getAttribute('data-dashed-after')
        if (persist) {
          el.setAttribute('stroke-dasharray', persist)
        } else {
          el.removeAttribute('stroke-dasharray')
        }
        ;(el as SVGElement).style.strokeOpacity = ''
        el.removeAttribute('data-orig-so')
        if (hasFill) {
          gsap.to(el, { fillOpacity: origFillOpacity, duration: 0.3, ease: 'power2.out' })
        }
        ;(el as unknown as { _cgTween?: gsap.core.Tween })._cgTween = undefined
      },
    })
    ;(el as unknown as { _cgTween?: gsap.core.Tween })._cgTween = tw
  } else if (hasFill) {
    ;(el as SVGElement).style.opacity = '0'
    const tw = gsap.to(el, {
      opacity: 1,
      duration: 0.7,
      delay,
      ease: 'power3.out',
      onComplete: () => {
        ;(el as unknown as { _cgTween?: gsap.core.Tween })._cgTween = undefined
      },
    })
    ;(el as unknown as { _cgTween?: gsap.core.Tween })._cgTween = tw
  }
}

function animate() {
  if (animated || !root.value) return
  animated = true

  const shapes = root.value.querySelectorAll<SVGGeometryElement>(
    'path, rect, line, circle, ellipse, polyline, polygon, text'
  )

  shapes.forEach((el, i) => {
    if (el.hasAttribute('data-skip-anim')) return
    const extra = parseFloat(el.getAttribute('data-anim-delay') || '0')
    animateElement(el, i * 0.05 + extra)
  })
}

function isIndigoColor(value: string | null): boolean {
  if (!value) return false
  return value.toUpperCase().includes('4F46E5')
}

function hasIndigoAncestor(el: Element): boolean {
  let cur: Element | null = el
  let depth = 0
  while (cur && depth < 3) {
    if (isIndigoColor(cur.getAttribute('fill')) || isIndigoColor(cur.getAttribute('stroke'))) {
      return true
    }
    cur = cur.parentElement
    depth++
  }
  return false
}

function collectFocals(): SVGGeometryElement[] {
  if (!root.value) return []
  const candidates = root.value.querySelectorAll<SVGGeometryElement>(
    'path, rect, line, circle, ellipse, polyline, polygon, text'
  )
  const result: SVGGeometryElement[] = []
  candidates.forEach((el) => {
    if (el.hasAttribute('data-focal-skip')) return
    if (el.hasAttribute('data-skip-anim')) return
    if (el.hasAttribute('data-focal') || el.hasAttribute('data-anim-horizontal') || el.hasAttribute('data-anim-slide-up') || el.hasAttribute('data-anim-slide-right') || el.hasAttribute('data-anim-expand')) {
      result.push(el)
      return
    }
    if (hasIndigoAncestor(el)) {
      result.push(el)
    }
  })
  return result
}

function animateFocal() {
  if (!root.value || focalAnimating) return
  const focals = collectFocals()
  if (focals.length === 0) return
  focalAnimating = true
  focals.forEach((el, i) => {
    const extra = parseFloat(el.getAttribute('data-anim-delay') || '0')
    animateElement(el, i * 0.06 + extra)
  })
  setTimeout(() => { focalAnimating = false }, 3200)
}

onMounted(() => {
  if (!root.value) return

  // Pre-hide every animatable element so the canvas starts blank
  const shapes = root.value.querySelectorAll<SVGGeometryElement>(
    'path, rect, line, circle, ellipse, polyline, polygon, text'
  )
  shapes.forEach((el) => {
    if (el.hasAttribute('data-skip-anim')) return
    preHide(el)
  })

  // Element-level hide states are set; remove blanket CSS opacity so GSAP can drive visibility
  initialized.value = true

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.intersectionRatio >= 0.99) {
          animate()
          observer?.disconnect()
          break
        }
      }
    },
    { threshold: [0.99, 1] }
  )
  observer.observe(root.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <svg
    ref="root"
    viewBox="0 0 120 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="['text-gray-900', `cg-${name.toLowerCase()}`]"
    :style="initialized ? undefined : { opacity: 0 }"
    @mouseenter="animateFocal"
  >
    <template v-if="name.toLowerCase() === 'body'">
      <defs>
        <clipPath id="cg-body-clip">
          <rect x="4" y="4" width="112" height="82" rx="2" />
        </clipPath>
        <linearGradient id="cg-body-grad-v" x1="0" y1="13" x2="0" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" />
          <stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-body-mask-v" maskUnits="userSpaceOnUse" x="0" y="13" width="120" height="79">
          <rect x="0" y="13" width="120" height="79" fill="url(#cg-body-grad-v)" />
        </mask>
        <linearGradient id="cg-body-grad-h" x1="10" y1="0" x2="110" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" />
          <stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-body-mask-h" maskUnits="userSpaceOnUse" x="10" y="0" width="100" height="90">
          <rect x="10" y="0" width="100" height="90" fill="url(#cg-body-grad-h)" />
        </mask>
      </defs>

      <!-- Outer browser window -->
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <!-- Traffic lights -->
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />

      <g clip-path="url(#cg-body-clip)">
        <!-- Inner frame -->
        <path
          d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z"
          stroke="currentColor"
          stroke-opacity="0.08"
          stroke-width="0.5"
          fill="#FAFAFA"
        />

        <!-- 3 fade-out guide lines OUTSIDE the email frame (top, left, right) -->
        <line data-skip-anim x1="29" y1="13" x2="29" y2="92" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-body-mask-v)" />
        <line data-skip-anim x1="91" y1="13" x2="91" y2="92" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-body-mask-v)" />
        <line data-skip-anim x1="10" y1="20" x2="110" y2="20" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-body-mask-h)" />

        <!-- White header box inside the dashed Body wrapper -->
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <!-- White body box inside the dashed Body wrapper -->
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />

        <!-- Outer Body wrapper: dashed indigo enclosing both header + body boxes, revealed via animated mask stroke-draw -->
        <mask id="cg-body-stroke-reveal" maskUnits="userSpaceOnUse" x="28" y="19" width="64" height="100">
          <rect data-focal x="30" y="21" width="60" height="96" rx="1.5" fill="none" stroke="white" stroke-width="4" stroke-linecap="butt" />
        </mask>
        <rect
          data-skip-anim
          mask="url(#cg-body-stroke-reveal)"
          x="30" y="21" width="60" height="96" rx="1.5"
          fill="none"
          stroke="#4F46E5"
          stroke-width="0.6"
          stroke-dasharray="2 2"
        />
      </g>
    </template>

    <template v-else-if="name.toLowerCase() === 'button'">
      <defs>
        <clipPath id="cg-btn-clip">
          <rect x="4" y="4" width="112" height="82" rx="2" />
        </clipPath>
        <linearGradient id="cg-btn-grad-v" x1="0" y1="48" x2="0" y2="76" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" />
          <stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-btn-mask-v" maskUnits="userSpaceOnUse" x="0" y="48" width="120" height="28">
          <rect x="0" y="48" width="120" height="28" fill="url(#cg-btn-grad-v)" />
        </mask>
        <linearGradient id="cg-btn-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" />
          <stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-btn-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90">
          <rect x="22" y="0" width="76" height="90" fill="url(#cg-btn-grad-h)" />
        </mask>
      </defs>

      <!-- Outer browser window (white, very light border) -->
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <!-- Traffic lights — light gray -->
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />

      <g clip-path="url(#cg-btn-clip)">
        <!-- Inner frame -->
        <path
          d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z"
          stroke="currentColor"
          stroke-opacity="0.08"
          stroke-width="0.5"
          fill="#FAFAFA"
        />

        <!-- Email wrapper: same color as browser frame -->
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />

        <!-- Email header: logo + 2 nav links -->
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />

        <!-- Text lines above the button (start where other components' content begins) -->
        <rect x="35" y="42" width="50" height="1.4" rx="0.7" fill="currentColor" fill-opacity="0.15" />
        <rect x="35" y="46" width="44" height="1.4" rx="0.7" fill="currentColor" fill-opacity="0.15" />
        <rect x="35" y="50" width="48" height="1.4" rx="0.7" fill="currentColor" fill-opacity="0.15" />

        <!-- 4 guide lines wrapping the button (moved down below the text) -->
        <line data-skip-anim x1="33" y1="48" x2="33" y2="76" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-btn-mask-v)" />
        <line data-skip-anim x1="87" y1="48" x2="87" y2="76" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-btn-mask-v)" />
        <line data-skip-anim x1="22" y1="57" x2="98" y2="57" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-btn-mask-h)" />
        <line data-skip-anim x1="22" y1="67" x2="98" y2="67" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-btn-mask-h)" />

        <!-- Button (positioned below the text lines, wrapped by the guides) -->
        <rect data-anim-slide-right x="50" y="59" width="20" height="6" rx="1.5" fill="#4F46E5" />
        <line data-anim-slide-right x1="55" y1="62" x2="65" y2="62" stroke="white" stroke-width="0.9" />
      </g>
    </template>

    <template v-else-if="name.toLowerCase() === 'codeblock'">
      <defs>
        <clipPath id="cg-cb-clip">
          <rect x="4" y="4" width="112" height="82" rx="2" />
        </clipPath>
        <linearGradient id="cg-cb-grad-v" x1="0" y1="31" x2="0" y2="77" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" />
          <stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-cb-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="46">
          <rect x="0" y="31" width="120" height="46" fill="url(#cg-cb-grad-v)" />
        </mask>
        <linearGradient id="cg-cb-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" />
          <stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-cb-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90">
          <rect x="22" y="0" width="76" height="90" fill="url(#cg-cb-grad-h)" />
        </mask>
      </defs>

      <!-- Outer browser window -->
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <!-- Traffic lights -->
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />

      <g clip-path="url(#cg-cb-clip)">
        <!-- Inner frame -->
        <path
          d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z"
          stroke="currentColor"
          stroke-opacity="0.08"
          stroke-width="0.5"
          fill="#FAFAFA"
        />

        <!-- Email wrapper: same color as browser frame -->
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />

        <!-- Email header: logo dot + 2 nav links -->
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />

        <!-- 4 guide lines wrapping the code block -->
        <line data-skip-anim x1="33" y1="31" x2="33" y2="77" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-cb-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="77" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-cb-mask-v)" />
        <line data-skip-anim x1="22" y1="40" x2="98" y2="40" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-cb-mask-h)" />
        <line data-skip-anim x1="22" y1="68" x2="98" y2="68" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-cb-mask-h)" />

        <!-- Code block container (same width as divider: x=35→85) -->
        <rect x="35" y="42" width="50" height="24" rx="2" fill="none" stroke="currentColor" stroke-opacity="0.2" stroke-width="0.5" />
        <!-- Line number gutter divider -->
        <line x1="41" y1="44" x2="41" y2="64" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <!-- Line number markers -->
        <circle cx="38" cy="46" r="0.5" fill="currentColor" fill-opacity="0.35" />
        <circle cx="38" cy="50" r="0.5" fill="currentColor" fill-opacity="0.35" />
        <circle cx="38" cy="54" r="0.5" fill="currentColor" fill-opacity="0.35" />
        <circle cx="38" cy="58" r="0.5" fill="currentColor" fill-opacity="0.35" />
        <circle cx="38" cy="62" r="0.5" fill="currentColor" fill-opacity="0.35" />
        <!-- Code lines as div-like rects, mixed colors for syntax-highlight feel -->
        <rect data-anim-horizontal x="43" y="45.4" width="16" height="1.2" rx="0.6" fill="#94A3B8" />
        <rect data-anim-horizontal x="43" y="49.4" width="12" height="1.2" rx="0.6" fill="#4F46E5" />
        <rect data-anim-horizontal x="45" y="53.4" width="22" height="1.2" rx="0.6" fill="#94A3B8" />
        <rect data-anim-horizontal x="45" y="57.4" width="16" height="1.2" rx="0.6" fill="#94A3B8" />
        <rect data-anim-horizontal x="43" y="61.4" width="10" height="1.2" rx="0.6" fill="#4F46E5" />
      </g>
    </template>

    <!-- ============ COLUMN: 3 columns highlighted in indigo ============ -->
    <template v-else-if="name.toLowerCase() === 'column'">
      <defs>
        <clipPath id="cg-col-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-col-grad-v" x1="0" y1="31" x2="0" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-col-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="54"><rect x="0" y="31" width="120" height="54" fill="url(#cg-col-grad-v)" /></mask>
        <linearGradient id="cg-col-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-col-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-col-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-col-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-skip-anim x1="33" y1="31" x2="33" y2="85" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-col-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="85" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-col-mask-v)" />
        <line data-skip-anim x1="22" y1="40" x2="98" y2="40" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-col-mask-h)" />
        <line data-skip-anim x1="22" y1="76" x2="98" y2="76" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-col-mask-h)" />
        <!-- 3 columns in dashed indigo, revealed via animated mask stroke-draw -->
        <mask id="cg-col-stroke-reveal" maskUnits="userSpaceOnUse" x="33" y="40" width="54" height="36">
          <rect data-focal x="35" y="42" width="14" height="32" rx="1.5" fill="none" stroke="white" stroke-width="4" stroke-linecap="butt" />
          <rect data-focal x="53" y="42" width="14" height="32" rx="1.5" fill="none" stroke="white" stroke-width="4" stroke-linecap="butt" />
          <rect data-focal x="71" y="42" width="14" height="32" rx="1.5" fill="none" stroke="white" stroke-width="4" stroke-linecap="butt" />
        </mask>
        <rect data-skip-anim mask="url(#cg-col-stroke-reveal)" x="35" y="42" width="14" height="32" rx="1.5" fill="none" stroke="#4F46E5" stroke-width="0.6" stroke-dasharray="2 2" />
        <rect data-skip-anim mask="url(#cg-col-stroke-reveal)" x="53" y="42" width="14" height="32" rx="1.5" fill="none" stroke="#4F46E5" stroke-width="0.6" stroke-dasharray="2 2" />
        <rect data-skip-anim mask="url(#cg-col-stroke-reveal)" x="71" y="42" width="14" height="32" rx="1.5" fill="none" stroke="#4F46E5" stroke-width="0.6" stroke-dasharray="2 2" />
      </g>
    </template>

    <!-- ============ DIVIDER: 2 sections with indigo line between ============ -->
    <template v-else-if="name.toLowerCase() === 'hr'">
      <defs>
        <clipPath id="cg-dvr-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-dvr-grad-v" x1="0" y1="31" x2="0" y2="89" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-dvr-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="58"><rect x="0" y="31" width="120" height="58" fill="url(#cg-dvr-grad-v)" /></mask>
        <linearGradient id="cg-dvr-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-dvr-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-dvr-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-dvr-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-skip-anim x1="33" y1="31" x2="33" y2="89" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-dvr-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="89" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-dvr-mask-v)" />
        <line data-skip-anim x1="22" y1="40" x2="98" y2="40" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-dvr-mask-h)" />
        <line data-skip-anim x1="22" y1="80" x2="98" y2="80" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-dvr-mask-h)" />
        <!-- 2 sections + indigo divider line between -->
        <rect x="35" y="42" width="50" height="15" rx="1" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <line data-anim-expand x1="35" y1="60" x2="85" y2="60" stroke="#4F46E5" stroke-width="1" stroke-linecap="butt" />
        <rect x="35" y="63" width="50" height="15" rx="1" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
      </g>
    </template>

    <!-- ============ IMG: image placeholder ============ -->
    <template v-else-if="name.toLowerCase() === 'img'">
      <defs>
        <clipPath id="cg-img-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-img-grad-v" x1="0" y1="31" x2="0" y2="77" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-img-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="46"><rect x="0" y="31" width="120" height="46" fill="url(#cg-img-grad-v)" /></mask>
        <linearGradient id="cg-img-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-img-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-img-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-img-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-skip-anim x1="33" y1="31" x2="33" y2="77" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-img-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="77" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-img-mask-v)" />
        <line data-skip-anim x1="22" y1="40" x2="98" y2="40" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-img-mask-h)" />
        <line data-skip-anim x1="22" y1="68" x2="98" y2="68" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-img-mask-h)" />
        <!-- Image frame + outlined sun + outlined mountain (50 wide, 24 tall) -->
        <rect x="35" y="42" width="50" height="24" rx="1.5" fill="none" stroke="#4F46E5" stroke-width="0.6" />
        <circle cx="43" cy="49" r="2" fill="none" stroke="#4F46E5" stroke-width="0.6" />
        <path d="M 38 64 L 50 52 L 60 60 L 72 50 L 82 64 Z" fill="none" stroke="#4F46E5" stroke-width="0.6" stroke-linejoin="round" stroke-linecap="round" />
      </g>
    </template>

    <!-- ============ HEADING: bold heading bar + smaller body bars ============ -->
    <template v-else-if="name.toLowerCase() === 'heading'">
      <defs>
        <clipPath id="cg-hd-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-hd-grad-v" x1="0" y1="31" x2="0" y2="74" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-hd-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="43"><rect x="0" y="31" width="120" height="43" fill="url(#cg-hd-grad-v)" /></mask>
        <linearGradient id="cg-hd-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-hd-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-hd-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-hd-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-skip-anim x1="33" y1="31" x2="33" y2="74" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-hd-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="74" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-hd-mask-v)" />
        <line data-skip-anim x1="22" y1="40" x2="98" y2="40" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-hd-mask-h)" />
        <line data-skip-anim x1="22" y1="65" x2="98" y2="65" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-hd-mask-h)" />
        <!-- Real "Heading" text in indigo + small gray body bars below (top/bottom gaps match other glyphs) -->
        <text data-anim-slide-right x="35" y="45" dominant-baseline="middle" font-family="'Inter', 'Helvetica Neue', system-ui, sans-serif" font-size="6" font-weight="700" fill="#4F46E5">Heading</text>
        <rect data-anim-horizontal x="35" y="50" width="50" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
        <rect data-anim-horizontal x="35" y="54" width="44" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
        <rect data-anim-horizontal x="35" y="58" width="48" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
        <rect data-anim-horizontal x="35" y="62" width="40" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
      </g>
    </template>

    <!-- ============ TEXT: paragraph of text bars ============ -->
    <template v-else-if="name.toLowerCase() === 'text'">
      <defs>
        <clipPath id="cg-txt-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-txt-grad-v" x1="0" y1="31" x2="0" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-txt-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="39"><rect x="0" y="31" width="120" height="39" fill="url(#cg-txt-grad-v)" /></mask>
        <linearGradient id="cg-txt-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-txt-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-txt-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-txt-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-skip-anim x1="33" y1="31" x2="33" y2="70" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-txt-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="70" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-txt-mask-v)" />
        <line data-skip-anim x1="22" y1="40" x2="98" y2="40" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-txt-mask-h)" />
        <line data-skip-anim x1="22" y1="61" x2="98" y2="61" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-txt-mask-h)" />
        <!-- Paragraph: 5 text bars in indigo, varying widths -->
        <rect data-anim-horizontal x="35" y="42" width="50" height="1.4" rx="1" fill="#4F46E5" />
        <rect data-anim-horizontal x="35" y="46" width="46" height="1.4" rx="1" fill="#4F46E5" />
        <rect data-anim-horizontal x="35" y="50" width="50" height="1.4" rx="1" fill="#4F46E5" />
        <rect data-anim-horizontal x="35" y="54" width="42" height="1.4" rx="1" fill="#4F46E5" />
        <rect data-anim-horizontal x="35" y="58" width="34" height="1.4" rx="1" fill="#4F46E5" />
      </g>
    </template>

    <!-- ============ SECTION: 1 box highlighted in indigo ============ -->
    <template v-else-if="name.toLowerCase() === 'section'">
      <defs>
        <clipPath id="cg-sec-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-sec-grad-v" x1="0" y1="31" x2="0" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-sec-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="51"><rect x="0" y="31" width="120" height="51" fill="url(#cg-sec-grad-v)" /></mask>
        <linearGradient id="cg-sec-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-sec-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-sec-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-sec-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-skip-anim x1="33" y1="31" x2="33" y2="82" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-sec-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="82" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-sec-mask-v)" />
        <line data-skip-anim x1="22" y1="40" x2="98" y2="40" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-sec-mask-h)" />
        <line data-skip-anim x1="22" y1="73" x2="98" y2="73" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-sec-mask-h)" />
        <!-- 1 section box in dashed indigo, revealed via animated mask stroke-draw -->
        <mask id="cg-sec-stroke-reveal" maskUnits="userSpaceOnUse" x="33" y="40" width="54" height="33">
          <rect data-focal x="35" y="42" width="50" height="29" rx="1.5" fill="none" stroke="white" stroke-width="4" stroke-linecap="butt" />
        </mask>
        <rect data-skip-anim mask="url(#cg-sec-stroke-reveal)" x="35" y="42" width="50" height="29" rx="1.5" fill="none" stroke="#4F46E5" stroke-width="0.6" stroke-dasharray="2 2" />
        <rect x="40" y="48" width="40" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
        <rect x="40" y="53" width="34" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
        <!-- Button: same size as Button component, gray fill, white label bar -->
        <rect x="50" y="61" width="20" height="6" rx="1.5" fill="currentColor" fill-opacity="0.15" />
        <rect x="54" y="63.3" width="12" height="1.4" rx="0.7" fill="white" />
      </g>
    </template>

    <!-- ============ ROW: 1 horizontal row highlighted in indigo ============ -->
    <template v-else-if="name.toLowerCase() === 'row'">
      <defs>
        <clipPath id="cg-row-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-row-grad-v" x1="0" y1="31" x2="0" y2="77" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-row-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="46"><rect x="0" y="31" width="120" height="46" fill="url(#cg-row-grad-v)" /></mask>
        <linearGradient id="cg-row-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-row-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-row-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-row-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-skip-anim x1="33" y1="31" x2="33" y2="77" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-row-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="77" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-row-mask-v)" />
        <line data-skip-anim x1="22" y1="40" x2="98" y2="40" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-row-mask-h)" />
        <line data-skip-anim x1="22" y1="68" x2="98" y2="68" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-row-mask-h)" />
        <!-- 1 horizontal row in dashed indigo, revealed via animated mask stroke-draw -->
        <mask id="cg-row-stroke-reveal" maskUnits="userSpaceOnUse" x="33" y="40" width="54" height="28">
          <rect data-focal x="35" y="42" width="50" height="24" rx="1" fill="none" stroke="white" stroke-width="4" stroke-linecap="butt" />
        </mask>
        <rect data-skip-anim mask="url(#cg-row-stroke-reveal)" x="35" y="42" width="50" height="24" rx="1" fill="none" stroke="#4F46E5" stroke-width="0.6" stroke-dasharray="2 2" />
        <line x1="51.67" y1="43" x2="51.67" y2="65" stroke="#4F46E5" stroke-opacity="0.6" stroke-width="0.5" />
        <line x1="68.33" y1="43" x2="68.33" y2="65" stroke="#4F46E5" stroke-opacity="0.6" stroke-width="0.5" />
      </g>
    </template>

    <!-- ============ CONTAINER: outer wrapper around email content ============ -->
    <template v-else-if="name.toLowerCase() === 'container'">
      <defs>
        <clipPath id="cg-ctn-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-ctn-grad-v" x1="0" y1="31" x2="0" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-ctn-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="44"><rect x="0" y="31" width="120" height="44" fill="url(#cg-ctn-grad-v)" /></mask>
        <linearGradient id="cg-ctn-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-ctn-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-ctn-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-ctn-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-skip-anim x1="33" y1="31" x2="33" y2="75" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-ctn-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="75" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-ctn-mask-v)" />
        <line data-skip-anim x1="22" y1="40" x2="98" y2="40" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-ctn-mask-h)" />
        <line data-skip-anim x1="22" y1="66" x2="98" y2="66" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-ctn-mask-h)" />
        <!-- Outer container: dashed indigo, revealed via animated mask stroke-draw -->
        <mask id="cg-ctn-stroke-reveal" maskUnits="userSpaceOnUse" x="33" y="40" width="54" height="26">
          <rect data-focal x="35" y="42" width="50" height="22" rx="1.5" fill="none" stroke="white" stroke-width="4" stroke-linecap="butt" />
        </mask>
        <rect data-skip-anim mask="url(#cg-ctn-stroke-reveal)" x="35" y="42" width="50" height="22" rx="1.5" fill="none" stroke="#4F46E5" stroke-width="0.6" stroke-dasharray="2 2" />
        <rect x="40" y="47" width="22" height="3" rx="1" fill="currentColor" fill-opacity="0.15" />
        <rect x="40" y="53" width="40" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
        <rect x="40" y="58" width="32" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
      </g>
    </template>

    <!-- ============ SPACER: 2 sections with empty space highlighted in indigo ============ -->
    <template v-else-if="name.toLowerCase() === 'spacer'">
      <defs>
        <clipPath id="cg-spc-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-spc-grad-v" x1="0" y1="48" x2="0" y2="73" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-spc-mask-v" maskUnits="userSpaceOnUse" x="0" y="48" width="120" height="25"><rect x="0" y="48" width="120" height="25" fill="url(#cg-spc-grad-v)" /></mask>
        <linearGradient id="cg-spc-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-spc-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-spc-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-spc-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-skip-anim x1="33" y1="48" x2="33" y2="73" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-spc-mask-v)" />
        <line data-skip-anim x1="87" y1="48" x2="87" y2="73" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-spc-mask-v)" />
        <line data-skip-anim x1="22" y1="53" x2="98" y2="53" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-spc-mask-h)" />
        <line data-skip-anim x1="22" y1="68" x2="98" y2="68" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-spc-mask-h)" />
        <!-- Top section (gray) + Spacer indicator (up/down arrows) + Bottom section (gray) -->
        <rect x="35" y="40" width="50" height="12" rx="1" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <!-- Spacer indicator: horizontal dashed line across the gap + short vertical lines with arrows going up and down -->
        <mask id="cg-spc-stroke-reveal" maskUnits="userSpaceOnUse" x="34" y="60" width="52" height="2">
          <line data-focal x1="35" y1="61" x2="85" y2="61" stroke="white" stroke-width="2" stroke-linecap="butt" />
        </mask>
        <line data-skip-anim mask="url(#cg-spc-stroke-reveal)" x1="35" y1="61" x2="85" y2="61" stroke="#4F46E5" stroke-width="0.5" stroke-dasharray="1.5 1.5" />
        <line x1="60" y1="61" x2="60" y2="57" stroke="#4F46E5" stroke-width="0.5" />
        <polygon points="60,55.2 58.5,57 61.5,57" fill="#4F46E5" />
        <line x1="60" y1="61" x2="60" y2="64" stroke="#4F46E5" stroke-width="0.5" />
        <polygon points="60,65.8 58.5,64 61.5,64" fill="#4F46E5" />
        <rect x="35" y="69" width="50" height="12" rx="1" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
      </g>
    </template>

    <!-- ============ LINK: paragraph with one segment as a link ============ -->
    <template v-else-if="name.toLowerCase() === 'link'">
      <defs>
        <clipPath id="cg-lnk-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-lnk-grad-v" x1="0" y1="31" x2="0" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-lnk-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="39"><rect x="0" y="31" width="120" height="39" fill="url(#cg-lnk-grad-v)" /></mask>
        <linearGradient id="cg-lnk-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-lnk-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-lnk-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-lnk-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-skip-anim x1="33" y1="31" x2="33" y2="70" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-lnk-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="70" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-lnk-mask-v)" />
        <line data-skip-anim x1="22" y1="40" x2="98" y2="40" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-lnk-mask-h)" />
        <line data-skip-anim x1="22" y1="61" x2="98" y2="61" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-lnk-mask-h)" />
        <!-- Paragraph with one segment in indigo (the link) -->
        <rect data-anim-horizontal x="35" y="42" width="50" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
        <rect data-anim-horizontal x="35" y="46" width="14" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
        <rect data-anim-horizontal x="50" y="46" width="18" height="1.4" rx="1" fill="#4F46E5" />
        <line data-anim-horizontal x1="50" y1="49" x2="68" y2="49" stroke="#4F46E5" stroke-width="0.6" />
        <rect data-anim-horizontal x="69" y="46" width="14" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
        <rect data-anim-horizontal x="35" y="50" width="46" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
        <rect data-anim-horizontal x="35" y="54" width="44" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
        <rect data-anim-horizontal x="35" y="58" width="38" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
      </g>
    </template>

    <!-- ============ CODEINLINE: paragraph with inline code span ============ -->
    <template v-else-if="name.toLowerCase() === 'codeinline'">
      <defs>
        <clipPath id="cg-cinl-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-cinl-grad-v" x1="0" y1="31" x2="0" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-cinl-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="39"><rect x="0" y="31" width="120" height="39" fill="url(#cg-cinl-grad-v)" /></mask>
        <linearGradient id="cg-cinl-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-cinl-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-cinl-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-cinl-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-skip-anim x1="33" y1="31" x2="33" y2="70" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-cinl-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="70" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-cinl-mask-v)" />
        <line data-skip-anim x1="22" y1="40" x2="98" y2="40" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-cinl-mask-h)" />
        <line data-skip-anim x1="22" y1="61" x2="98" y2="61" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-cinl-mask-h)" />
        <!-- Paragraph with inline code span in middle line -->
        <rect data-anim-horizontal x="35" y="42" width="50" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
        <rect data-anim-horizontal x="35" y="46" width="14" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
        <rect data-anim-horizontal x="50" y="44.8" width="20" height="3" rx="0.5" fill="#4F46E5" fill-opacity="0.12" />
        <rect data-anim-horizontal x="52" y="45.6" width="16" height="1.4" rx="0.5" fill="#4F46E5" />
        <rect data-anim-horizontal x="71" y="46" width="12" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
        <rect data-anim-horizontal x="35" y="50" width="46" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
        <rect data-anim-horizontal x="35" y="54" width="44" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
        <rect data-anim-horizontal x="35" y="58" width="38" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
      </g>
    </template>

    <!-- ============ FONT: typographic Aa specimen ============ -->
    <template v-else-if="name.toLowerCase() === 'font'">
      <defs>
        <clipPath id="cg-fnt-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-fnt-grad-v" x1="0" y1="31" x2="0" y2="73" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-fnt-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="42"><rect x="0" y="31" width="120" height="42" fill="url(#cg-fnt-grad-v)" /></mask>
        <linearGradient id="cg-fnt-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-fnt-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-fnt-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-fnt-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-skip-anim x1="33" y1="31" x2="33" y2="73" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-fnt-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="73" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-fnt-mask-v)" />
        <line data-skip-anim x1="22" y1="40" x2="98" y2="40" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-fnt-mask-h)" />
        <line data-skip-anim x1="22" y1="64" x2="98" y2="64" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-fnt-mask-h)" />
        <!-- Typographic Aa specimen -->
        <text x="60" y="58" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="16" font-weight="700" fill="none" stroke="#4F46E5" stroke-width="0.7">Aa</text>
      </g>
    </template>

    <!-- ============ HEAD: <head> tag ============ -->
    <template v-else-if="name.toLowerCase() === 'head'">
      <defs>
        <clipPath id="cg-hed-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-hed-grad-v" x1="0" y1="31" x2="0" y2="71" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-hed-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="40"><rect x="0" y="31" width="120" height="40" fill="url(#cg-hed-grad-v)" /></mask>
        <linearGradient id="cg-hed-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-hed-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-hed-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-hed-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-skip-anim x1="33" y1="31" x2="33" y2="71" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-hed-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="71" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-hed-mask-v)" />
        <line data-skip-anim x1="22" y1="40" x2="98" y2="40" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-hed-mask-h)" />
        <line data-skip-anim x1="22" y1="62" x2="98" y2="62" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-hed-mask-h)" />
        <text x="60" y="56" text-anchor="middle" font-family="ui-monospace, 'SF Mono', Menlo, monospace" font-size="10" font-weight="600" fill="#4F46E5">&lt;head&gt;</text>
      </g>
    </template>

    <!-- ============ HTML: <html> tag ============ -->
    <template v-else-if="name.toLowerCase() === 'html'">
      <defs>
        <clipPath id="cg-htm-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-htm-grad-v" x1="0" y1="31" x2="0" y2="81" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-htm-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="50"><rect x="0" y="31" width="120" height="50" fill="url(#cg-htm-grad-v)" /></mask>
        <linearGradient id="cg-htm-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-htm-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-htm-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-htm-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-skip-anim x1="33" y1="31" x2="33" y2="81" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-htm-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="81" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-htm-mask-v)" />
        <line data-skip-anim x1="22" y1="40" x2="98" y2="40" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-htm-mask-h)" />
        <line data-skip-anim x1="22" y1="72" x2="98" y2="72" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-htm-mask-h)" />
        <!-- Document structure: <html> wrapping <Body> with a comment, then </html> -->
        <text data-anim-slide-right x="36" y="44" dominant-baseline="middle" font-family="ui-monospace, 'SF Mono', Menlo, monospace" font-size="4" font-weight="700" fill="#4F46E5">&lt;html&gt;</text>
        <text data-anim-slide-right x="40" y="50" dominant-baseline="middle" font-family="ui-monospace, 'SF Mono', Menlo, monospace" font-size="4" font-weight="700" fill="#4F46E5">&lt;Body&gt;</text>
        <text data-anim-slide-right x="44" y="56" dominant-baseline="middle" font-family="ui-monospace, 'SF Mono', Menlo, monospace" font-size="3.5" font-weight="600" fill="#4F46E5" fill-opacity="0.65">&lt;!-- Content --&gt;</text>
        <text data-anim-slide-right x="40" y="62" dominant-baseline="middle" font-family="ui-monospace, 'SF Mono', Menlo, monospace" font-size="4" font-weight="700" fill="#4F46E5">&lt;/Body&gt;</text>
        <text data-anim-slide-right x="36" y="68" dominant-baseline="middle" font-family="ui-monospace, 'SF Mono', Menlo, monospace" font-size="4" font-weight="700" fill="#4F46E5">&lt;/html&gt;</text>
      </g>
    </template>

    <!-- ============ LAYOUT: structured grid ============ -->
    <template v-else-if="name.toLowerCase() === 'layout'">
      <defs>
        <clipPath id="cg-lay-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-lay-grad-v" x1="0" y1="31" x2="0" y2="87" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-lay-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="56"><rect x="0" y="31" width="120" height="56" fill="url(#cg-lay-grad-v)" /></mask>
        <linearGradient id="cg-lay-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-lay-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-lay-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-lay-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-skip-anim x1="33" y1="31" x2="33" y2="87" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-lay-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="87" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-lay-mask-v)" />
        <line data-skip-anim x1="22" y1="40" x2="98" y2="40" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-lay-mask-h)" />
        <line data-skip-anim x1="22" y1="78" x2="98" y2="78" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-lay-mask-h)" />
        <!-- Layout: header + 2 columns + footer; 3-unit gap vertical and horizontal -->
        <rect x="35" y="42" width="50" height="6" rx="1" fill="none" stroke="#4F46E5" stroke-width="0.6" />
        <rect x="35" y="51" width="23.5" height="16" rx="1" fill="none" stroke="#4F46E5" stroke-width="0.6" />
        <rect x="61.5" y="51" width="23.5" height="16" rx="1" fill="none" stroke="#4F46E5" stroke-width="0.6" />
        <rect x="35" y="70" width="50" height="6" rx="1" fill="none" stroke="#4F46E5" stroke-width="0.6" />
      </g>
    </template>

    <!-- ============ MARKDOWN: # heading marker ============ -->
    <template v-else-if="name.toLowerCase() === 'markdown'">
      <defs>
        <clipPath id="cg-md-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-md-grad-v" x1="0" y1="31" x2="0" y2="77" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-md-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="46"><rect x="0" y="31" width="120" height="46" fill="url(#cg-md-grad-v)" /></mask>
        <linearGradient id="cg-md-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-md-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-md-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-md-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-skip-anim x1="33" y1="31" x2="33" y2="77" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-md-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="77" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-md-mask-v)" />
        <line data-skip-anim x1="22" y1="40" x2="98" y2="40" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-md-mask-h)" />
        <line data-skip-anim x1="22" y1="68" x2="98" y2="68" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-md-mask-h)" />
        <!-- Markdown sample: ## H2 Title, ### subheading bar, blockquote -->
        <text data-anim-slide-right x="36" y="46.2" dominant-baseline="middle" font-family="ui-monospace, 'SF Mono', Menlo, monospace" font-size="5.5" font-weight="700" fill="#4F46E5">##</text>
        <text data-anim-slide-right x="46" y="46.2" dominant-baseline="middle" font-family="'Inter', 'Helvetica Neue', system-ui, sans-serif" font-size="5.5" font-weight="700" fill="#4F46E5">H2 Title</text>
        <text data-anim-slide-right x="36" y="53.3" dominant-baseline="middle" font-family="ui-monospace, 'SF Mono', Menlo, monospace" font-size="3.5" font-weight="700" fill="#4F46E5">###</text>
        <rect data-anim-slide-right x="44" y="52.5" width="22" height="1.6" rx="0.8" fill="#4F46E5" />
        <text data-anim-slide-right x="37" y="60.1" dominant-baseline="middle" font-family="ui-monospace, 'SF Mono', Menlo, monospace" font-size="4" font-weight="700" fill="#4F46E5">&gt;</text>
        <rect data-anim-slide-right x="42" y="59.4" width="32" height="1.4" rx="0.7" fill="currentColor" fill-opacity="0.15" />
        <text data-anim-slide-right x="37" y="65.1" dominant-baseline="middle" font-family="ui-monospace, 'SF Mono', Menlo, monospace" font-size="4" font-weight="700" fill="#4F46E5">&gt;</text>
        <rect data-anim-slide-right x="42" y="64.4" width="26" height="1.4" rx="0.7" fill="currentColor" fill-opacity="0.15" />
      </g>
    </template>

    <!-- ============ NOTOUTLOOK: Outlook crossed out ============ -->
    <template v-else-if="name.toLowerCase() === 'notoutlook'">
      <defs>
        <clipPath id="cg-not-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-not-grad-v" x1="0" y1="31" x2="0" y2="71" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-not-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="40"><rect x="0" y="31" width="120" height="40" fill="url(#cg-not-grad-v)" /></mask>
        <linearGradient id="cg-not-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-not-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-not-grad-h)" /></mask>
        <mask id="cg-not-div-mask" maskUnits="userSpaceOnUse" x="58" y="41" width="4" height="20">
          <line data-focal x1="60" y1="42" x2="60" y2="60" stroke="white" stroke-width="3" stroke-linecap="butt" />
        </mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-not-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-skip-anim x1="33" y1="31" x2="33" y2="71" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-not-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="71" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-not-mask-v)" />
        <line data-skip-anim x1="22" y1="40" x2="98" y2="40" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-not-mask-h)" />
        <line data-skip-anim x1="22" y1="62" x2="98" y2="62" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-not-mask-h)" />
        <!-- Left: vivid indigo (modern clients see this content) -->
        <rect x="35" y="43" width="22" height="16" rx="1.5" fill="#4F46E5" fill-opacity="0.1" stroke="#4F46E5" stroke-width="0.4" />
        <rect data-anim-horizontal x="38" y="47" width="10" height="1.4" rx="0.7" fill="#4F46E5" fill-opacity="0.7" />
        <rect data-anim-horizontal x="38" y="50.5" width="14" height="1.4" rx="0.7" fill="#4F46E5" fill-opacity="0.5" />
        <rect data-anim-horizontal x="38" y="54" width="8" height="1.4" rx="0.7" fill="#4F46E5" fill-opacity="0.35" />
        <!-- Divider: mask-revealed dashed line -->
        <line data-skip-anim mask="url(#cg-not-div-mask)" x1="60" y1="42" x2="60" y2="60" stroke="#4F46E5" stroke-width="0.5" stroke-dasharray="1.5 1" />
        <!-- Right: Outlook sees nothing (greyed placeholder with cross, animates in) -->
        <rect x="63" y="43" width="22" height="16" rx="1.5" fill="currentColor" fill-opacity="0.04" stroke="currentColor" stroke-opacity="0.12" stroke-width="0.4" data-dashed-after="2 1.5" />
        <line x1="65.5" y1="45.5" x2="82.5" y2="57" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.6" />
        <line x1="82.5" y1="45.5" x2="65.5" y2="57" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.6" />
      </g>
    </template>

    <!-- ============ NOWIDOWS: paragraph with bound last words ============ -->
    <template v-else-if="name.toLowerCase() === 'nowidows'">
      <defs>
        <clipPath id="cg-nw-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-nw-grad-v" x1="0" y1="31" x2="0" y2="66" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-nw-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="35"><rect x="0" y="31" width="120" height="35" fill="url(#cg-nw-grad-v)" /></mask>
        <linearGradient id="cg-nw-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-nw-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-nw-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-nw-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-skip-anim x1="33" y1="31" x2="33" y2="66" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-nw-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="66" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-nw-mask-v)" />
        <line data-skip-anim x1="22" y1="40" x2="98" y2="40" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-nw-mask-h)" />
        <line data-skip-anim x1="22" y1="57" x2="98" y2="57" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-nw-mask-h)" />
        <!-- Paragraph with last two "words" bound (indigo, with tie arc above) -->
        <rect x="35" y="42" width="50" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
        <rect x="35" y="48" width="46" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
        <rect x="35" y="54" width="14" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
        <rect data-anim-horizontal x="52" y="54" width="14" height="1.4" rx="1" fill="#4F46E5" />
        <rect data-anim-horizontal x="68" y="54" width="16" height="1.4" rx="1" fill="#4F46E5" />
        <path d="M 59 53.5 Q 67 50.5 75 53.5" fill="none" stroke="#4F46E5" stroke-width="0.5" />
      </g>
    </template>

    <!-- ============ OUTLOOK: Outlook-only marker ============ -->
    <template v-else-if="name.toLowerCase() === 'outlook'">
      <defs>
        <clipPath id="cg-out-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-out-grad-v" x1="0" y1="31" x2="0" y2="71" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-out-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="40"><rect x="0" y="31" width="120" height="40" fill="url(#cg-out-grad-v)" /></mask>
        <linearGradient id="cg-out-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-out-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-out-grad-h)" /></mask>
        <mask id="cg-out-div-mask" maskUnits="userSpaceOnUse" x="58" y="41" width="4" height="20">
          <line data-focal x1="60" y1="42" x2="60" y2="60" stroke="white" stroke-width="3" stroke-linecap="butt" />
        </mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-out-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-skip-anim x1="33" y1="31" x2="33" y2="71" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-out-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="71" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-out-mask-v)" />
        <line data-skip-anim x1="22" y1="40" x2="98" y2="40" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-out-mask-h)" />
        <line data-skip-anim x1="22" y1="62" x2="98" y2="62" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-out-mask-h)" />
        <!-- Left: modern clients see nothing (greyed placeholder with cross, animates in) -->
        <rect x="35" y="43" width="22" height="16" rx="1.5" fill="currentColor" fill-opacity="0.04" stroke="currentColor" stroke-opacity="0.12" stroke-width="0.4" data-dashed-after="2 1.5" />
        <line x1="37.5" y1="45.5" x2="54.5" y2="57" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.6" />
        <line x1="54.5" y1="45.5" x2="37.5" y2="57" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.6" />
        <!-- Divider: mask-revealed dashed line -->
        <line data-skip-anim mask="url(#cg-out-div-mask)" x1="60" y1="42" x2="60" y2="60" stroke="#4F46E5" stroke-width="0.5" stroke-dasharray="1.5 1" />
        <!-- Right: vivid indigo (Outlook only sees this content) -->
        <rect x="63" y="43" width="22" height="16" rx="1.5" fill="#4F46E5" fill-opacity="0.1" stroke="#4F46E5" stroke-width="0.4" />
        <rect data-anim-horizontal x="66" y="47" width="10" height="1.4" rx="0.7" fill="#4F46E5" fill-opacity="0.7" />
        <rect data-anim-horizontal x="66" y="50.5" width="14" height="1.4" rx="0.7" fill="#4F46E5" fill-opacity="0.5" />
        <rect data-anim-horizontal x="66" y="54" width="8" height="1.4" rx="0.7" fill="#4F46E5" fill-opacity="0.35" />
      </g>
    </template>

    <!-- ============ OVERLAP: two overlapping rectangles ============ -->
    <template v-else-if="name.toLowerCase() === 'overlap'">
      <defs>
        <clipPath id="cg-ovl-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-ovl-grad-v" x1="0" y1="31" x2="0" y2="77" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-ovl-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="46"><rect x="0" y="31" width="120" height="46" fill="url(#cg-ovl-grad-v)" /></mask>
        <linearGradient id="cg-ovl-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-ovl-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-ovl-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-ovl-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-skip-anim x1="33" y1="31" x2="33" y2="77" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-ovl-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="77" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-ovl-mask-v)" />
        <line data-skip-anim x1="22" y1="40" x2="98" y2="40" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-ovl-mask-h)" />
        <line data-skip-anim x1="22" y1="68" x2="98" y2="68" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-ovl-mask-h)" />
        <!-- Background image (light gray frame + sun + mountain like Img) + centered indigo title strip over the image -->
        <rect data-focal x="35" y="42" width="50" height="24" rx="1.5" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle data-focal cx="43" cy="49" r="2" fill="#EBEBEB" stroke="#EBEBEB" stroke-width="0.6" />
        <path data-focal d="M 38 64 L 50 52 L 60 60 L 72 50 L 82 64 Z" fill="#EBEBEB" stroke="#EBEBEB" stroke-width="0.6" stroke-linejoin="round" stroke-linecap="round" />
        <!-- Real "Overlap" text in indigo, centered over the image -->
        <text data-anim-slide-up x="60" y="54" text-anchor="middle" dominant-baseline="middle" font-family="'Inter', 'Helvetica Neue', system-ui, sans-serif" font-size="6" font-weight="700" fill="#4F46E5">Overlap</text>
      </g>
    </template>

    <!-- ============ PREHEADER: hidden preview text at top ============ -->
    <template v-else-if="name.toLowerCase() === 'preheader'">
      <defs>
        <clipPath id="cg-pre-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-pre-grad-v" x1="0" y1="14" x2="0" y2="33" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-pre-mask-v" maskUnits="userSpaceOnUse" x="0" y="14" width="120" height="19"><rect x="0" y="14" width="120" height="19" fill="url(#cg-pre-grad-v)" /></mask>
        <linearGradient id="cg-pre-grad-h" x1="16" y1="0" x2="104" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-pre-mask-h" maskUnits="userSpaceOnUse" x="16" y="0" width="88" height="90"><rect x="16" y="0" width="88" height="90" fill="url(#cg-pre-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-pre-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <!-- Preheader (focal indigo section) full width, matching the email header -->
        <rect x="30" y="21" width="60" height="5" rx="1" fill="none" stroke="#4F46E5" stroke-width="0.6" />
        <rect data-anim-horizontal x="33" y="22.8" width="24" height="1.4" rx="0.7" fill="#4F46E5" />
        <!-- Email header close to preheader -->
        <rect x="30" y="30" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <!-- Email body (2-unit gap below header, matching the standard) -->
        <rect x="30" y="42" width="60" height="75" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <!-- Header content -->
        <circle cx="35" cy="35" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="35" x2="79" y2="35" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="35" x2="86" y2="35" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <!-- Guides around the preheader (verticals moved outward to match full-width preheader) -->
        <line data-skip-anim x1="28" y1="14" x2="28" y2="33" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-pre-mask-v)" />
        <line data-skip-anim x1="92" y1="14" x2="92" y2="33" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-pre-mask-v)" />
        <line data-skip-anim x1="16" y1="19" x2="104" y2="19" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-pre-mask-h)" />
        <line data-skip-anim x1="16" y1="28" x2="104" y2="28" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-pre-mask-h)" />
        <!-- Decorative body text (no guides around) -->
        <rect x="35" y="51" width="50" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
        <rect x="35" y="55" width="44" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
        <rect x="35" y="59" width="48" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
        <rect x="35" y="63" width="42" height="1.4" rx="1" fill="currentColor" fill-opacity="0.15" />
      </g>
    </template>

    <!-- ============ RAW: raw HTML pass-through ============ -->
    <template v-else-if="name.toLowerCase() === 'raw'">
      <defs>
        <clipPath id="cg-raw-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-raw-grad-v" x1="0" y1="65" x2="0" y2="89" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-raw-mask-v" maskUnits="userSpaceOnUse" x="0" y="65" width="120" height="24"><rect x="0" y="65" width="120" height="24" fill="url(#cg-raw-grad-v)" /></mask>
        <linearGradient id="cg-raw-grad-h" x1="16" y1="0" x2="104" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-raw-mask-h" maskUnits="userSpaceOnUse" x="16" y="0" width="88" height="90"><rect x="16" y="0" width="88" height="90" fill="url(#cg-raw-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-raw-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <!-- Header box (existing email-header style: dot + recipient lines) -->
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <!-- Body box (shortened to make room for the footer) -->
        <rect x="30" y="33" width="60" height="37" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <line data-skip-anim x1="28" y1="65" x2="28" y2="89" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-raw-mask-v)" />
        <line data-skip-anim x1="92" y1="65" x2="92" y2="89" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-raw-mask-v)" />
        <line data-skip-anim x1="16" y1="70" x2="104" y2="70" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-raw-mask-h)" />
        <line data-skip-anim x1="16" y1="84" x2="104" y2="84" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-raw-mask-h)" />
        <!-- Body content: text bars representing the email body -->
        <rect x="35" y="42" width="50" height="1.4" rx="0.7" fill="currentColor" fill-opacity="0.15" />
        <rect x="35" y="46" width="44" height="1.4" rx="0.7" fill="currentColor" fill-opacity="0.15" />
        <rect x="35" y="50" width="48" height="1.4" rx="0.7" fill="currentColor" fill-opacity="0.15" />
        <rect x="35" y="54" width="40" height="1.4" rx="0.7" fill="currentColor" fill-opacity="0.15" />
        <!-- Footer box: same style as header (no logo) with the unsubscribe template variable inside -->
        <rect x="30" y="72" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <text data-anim-slide-right x="60" y="77" dominant-baseline="middle" text-anchor="middle" font-family="ui-monospace, 'SF Mono', Menlo, monospace" font-size="4" font-weight="700" fill="#4F46E5">&#123;&#123; unsubscribe &#125;&#125;</text>
      </g>
    </template>

    <!-- ============ VML: legacy Outlook VML markup ============ -->
    <template v-else-if="name.toLowerCase() === 'outlookbg'">
      <defs>
        <clipPath id="cg-vml-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-vml-grad-v" x1="0" y1="31" x2="0" y2="86" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-vml-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="55"><rect x="0" y="31" width="120" height="55" fill="url(#cg-vml-grad-v)" /></mask>
        <linearGradient id="cg-vml-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-vml-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-vml-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-vml-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-skip-anim x1="33" y1="31" x2="33" y2="86" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-vml-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="86" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-vml-mask-v)" />
        <line data-skip-anim x1="22" y1="40" x2="98" y2="40" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-vml-mask-h)" />
        <line data-skip-anim x1="22" y1="77" x2="98" y2="77" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-vml-mask-h)" />
        <!-- Hero image at top of body (frame + sun + mountain) + content below -->
        <rect x="35" y="42" width="50" height="16" rx="1" fill="none" stroke="#4F46E5" stroke-width="0.6" />
        <circle cx="43" cy="47" r="1.5" fill="none" stroke="#4F46E5" stroke-width="0.6" />
        <path d="M 38 56 L 50 48 L 60 52 L 72 46 L 82 56 Z" fill="none" stroke="#4F46E5" stroke-width="0.6" stroke-linejoin="round" stroke-linecap="round" />
        <rect x="35" y="62" width="50" height="1.4" rx="0.7" fill="currentColor" fill-opacity="0.15" />
        <rect x="35" y="66" width="44" height="1.4" rx="0.7" fill="currentColor" fill-opacity="0.15" />
        <rect x="35" y="70" width="48" height="1.4" rx="0.7" fill="currentColor" fill-opacity="0.15" />
        <rect x="35" y="74" width="40" height="1.4" rx="0.7" fill="currentColor" fill-opacity="0.15" />
      </g>
    </template>

    <!-- ============ WITHURL: chain-link / URL icon ============ -->
    <template v-else-if="name.toLowerCase() === 'withurl'">
      <defs>
        <clipPath id="cg-url-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-url-grad-v" x1="0" y1="31" x2="0" y2="77" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-url-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="46"><rect x="0" y="31" width="120" height="46" fill="url(#cg-url-grad-v)" /></mask>
        <linearGradient id="cg-url-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-url-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-url-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-url-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-skip-anim x1="33" y1="31" x2="33" y2="77" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-url-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="77" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-url-mask-v)" />
        <line data-skip-anim x1="22" y1="40" x2="98" y2="40" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-url-mask-h)" />
        <line data-skip-anim x1="22" y1="68" x2="98" y2="68" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-url-mask-h)" />
        <!-- Two perfectly-square image blocks side-by-side (muted gray); each has an indigo link icon in the top-right -->
        <rect data-focal x="35" y="42" width="23.5" height="23.5" rx="1" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle data-focal cx="40" cy="48" r="1.4" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <path data-focal d="M 36.5 63.5 L 42 55.5 L 47 59.5 L 52 53.5 L 57 63.5 Z" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" stroke-linejoin="round" stroke-linecap="round" />
        <rect data-focal x="61.5" y="42" width="23.5" height="23.5" rx="1" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle data-focal cx="66.5" cy="48" r="1.4" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <path data-focal d="M 63 63.5 L 68.5 55.5 L 73.5 59.5 L 78.5 53.5 L 83.5 63.5 Z" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" stroke-linejoin="round" stroke-linecap="round" />
        <g transform="translate(51 43.5) scale(0.28)" vector-effect="non-scaling-stroke">
          <path data-anim-delay="1.2" fill="none" stroke="#4F46E5" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
        </g>
        <g transform="translate(77.5 43.5) scale(0.28)" vector-effect="non-scaling-stroke">
          <path data-anim-delay="1.2" fill="none" stroke="#4F46E5" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
        </g>
      </g>
    </template>

    <!-- ============ TAILWIND: <Tailwind> wrapping a utility-classed element ============ -->
    <template v-else-if="name.toLowerCase() === 'tailwind'">
      <defs>
        <clipPath id="cg-tw-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-tw-grad-v" x1="0" y1="31" x2="0" y2="74" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-tw-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="43"><rect x="0" y="31" width="120" height="43" fill="url(#cg-tw-grad-v)" /></mask>
        <linearGradient id="cg-tw-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-tw-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-tw-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-tw-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-skip-anim x1="33" y1="31" x2="33" y2="74" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-tw-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="74" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-tw-mask-v)" />
        <line data-skip-anim x1="22" y1="40" x2="98" y2="40" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-tw-mask-h)" />
        <line data-skip-anim x1="22" y1="66" x2="98" y2="66" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-tw-mask-h)" />
        <!-- <Tailwind> wrapping <div class="..."> + content -->
        <text data-anim-slide-right x="36" y="46" dominant-baseline="middle" font-family="ui-monospace, 'SF Mono', Menlo, monospace" font-size="4" font-weight="700" fill="#4F46E5">&lt;Tailwind&gt;</text>
        <rect data-anim-horizontal data-anim-delay="0.25" x="40" y="51.3" width="6" height="1.4" rx="0.7" fill="#94A3B8" />
        <rect data-anim-horizontal data-anim-delay="0.4" x="48" y="51.3" width="22" height="1.4" rx="0.7" fill="#4F46E5" />
        <rect data-anim-horizontal data-anim-delay="0.55" x="44" y="57.3" width="20" height="1.4" rx="0.7" fill="#94A3B8" fill-opacity="0.6" />
        <text data-anim-slide-right data-anim-delay="0.7" x="36" y="63" dominant-baseline="middle" font-family="ui-monospace, 'SF Mono', Menlo, monospace" font-size="4" font-weight="700" fill="#4F46E5">&lt;/Tailwind&gt;</text>
      </g>
    </template>

    <!-- ============ QRCODE: QR in the email, revealed by an indigo scan line ============ -->
    <template v-else-if="name.toLowerCase() === 'qrcode'">
      <defs>
        <clipPath id="cg-qr-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-qr-grad-v" x1="0" y1="31" x2="0" y2="74" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-qr-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="43"><rect x="0" y="31" width="120" height="43" fill="url(#cg-qr-grad-v)" /></mask>
        <linearGradient id="cg-qr-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-qr-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-qr-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-qr-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />

        <!-- guide lines framing the QR -->
        <line data-skip-anim x1="33" y1="31" x2="33" y2="74" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-qr-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="74" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-qr-mask-v)" />
        <line data-skip-anim x1="22" y1="40" x2="98" y2="40" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-qr-mask-h)" />
        <line data-skip-anim x1="22" y1="73" x2="98" y2="73" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-qr-mask-h)" />

        <!-- QR group, scaled down slightly to clear the frame -->
        <g transform="translate(59.5 56.5) scale(0.86) translate(-59.5 -56.5)">
        <!-- indigo scan line: sweeps top->bottom (sits behind the modules) -->
        <line data-anim-scan data-scan-from="42" data-scan-to="72" x1="44" y1="42" x2="76" y2="42" stroke="#4F46E5" stroke-width="1.4" stroke-opacity="0.9" />

        <!-- top-left + top-right finder patterns -->
        <rect x="46" y="43" width="8" height="8" rx="1.2" fill="none" stroke="#4F46E5" stroke-width="1" />
        <rect x="48.6" y="45.6" width="2.8" height="2.8" rx="0.6" fill="#4F46E5" />
        <rect x="65" y="43" width="8" height="8" rx="1.2" fill="none" stroke="#4F46E5" stroke-width="1" />
        <rect x="67.6" y="45.6" width="2.8" height="2.8" rx="0.6" fill="#4F46E5" />

        <!-- data modules, top -> middle (DOM order = reveal order) -->
        <rect x="56" y="44" width="2" height="2" rx="0.4" fill="#94A3B8" />
        <rect x="56" y="47.5" width="2" height="2" rx="0.4" fill="#94A3B8" />
        <rect x="59.5" y="47.5" width="2" height="2" rx="0.4" fill="#94A3B8" />
        <rect x="59.5" y="50" width="2" height="2" rx="0.4" fill="#94A3B8" />
        <rect x="47" y="52.5" width="2" height="2" rx="0.4" fill="#94A3B8" />
        <rect x="53" y="52.5" width="2" height="2" rx="0.4" fill="#94A3B8" />
        <rect x="59.5" y="52.5" width="2" height="2" rx="0.4" fill="#94A3B8" />
        <rect x="66" y="52.5" width="2" height="2" rx="0.4" fill="#94A3B8" />
        <rect x="70" y="52.5" width="2" height="2" rx="0.4" fill="#94A3B8" />
        <rect x="50" y="55.5" width="2" height="2" rx="0.4" fill="#94A3B8" />
        <rect x="59.5" y="55.5" width="2" height="2" rx="0.4" fill="#94A3B8" />
        <rect x="70" y="55.5" width="2" height="2" rx="0.4" fill="#94A3B8" />
        <rect x="47" y="58.5" width="2" height="2" rx="0.4" fill="#94A3B8" />
        <rect x="56" y="58.5" width="2" height="2" rx="0.4" fill="#94A3B8" />
        <rect x="63" y="58.5" width="2" height="2" rx="0.4" fill="#94A3B8" />
        <rect x="70" y="58.5" width="2" height="2" rx="0.4" fill="#94A3B8" />
        <rect x="50" y="61" width="2" height="2" rx="0.4" fill="#94A3B8" />
        <rect x="66" y="61" width="2" height="2" rx="0.4" fill="#94A3B8" />

        <!-- bottom-left finder, then bottom-right modules -->
        <rect x="46" y="63" width="8" height="8" rx="1.2" fill="none" stroke="#4F46E5" stroke-width="1" />
        <rect x="48.6" y="65.6" width="2.8" height="2.8" rx="0.6" fill="#4F46E5" />
        <rect x="56" y="64" width="2" height="2" rx="0.4" fill="#94A3B8" />
        <rect x="66" y="64" width="2" height="2" rx="0.4" fill="#94A3B8" />
        <rect x="70" y="64" width="2" height="2" rx="0.4" fill="#94A3B8" />
        <rect x="59.5" y="67" width="2" height="2" rx="0.4" fill="#94A3B8" />
        <rect x="70" y="67" width="2" height="2" rx="0.4" fill="#94A3B8" />
        <rect x="56" y="70" width="2" height="2" rx="0.4" fill="#94A3B8" />
        <rect x="63" y="70" width="2" height="2" rx="0.4" fill="#94A3B8" />
        </g>
      </g>
    </template>

    <!-- ============ PLAINTEXT: styled HTML reduced to plain text ============ -->
    <template v-else-if="name.toLowerCase() === 'plaintext'">
      <defs>
        <clipPath id="cg-pt-clip"><rect x="4" y="4" width="112" height="82" rx="2" /></clipPath>
        <linearGradient id="cg-pt-grad-v" x1="0" y1="31" x2="0" y2="69" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-pt-mask-v" maskUnits="userSpaceOnUse" x="0" y="31" width="120" height="38"><rect x="0" y="31" width="120" height="38" fill="url(#cg-pt-grad-v)" /></mask>
        <linearGradient id="cg-pt-grad-h" x1="22" y1="0" x2="98" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="white" stop-opacity="0" /><stop offset="0.3" stop-color="white" stop-opacity="1" />
          <stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="cg-pt-mask-h" maskUnits="userSpaceOnUse" x="22" y="0" width="76" height="90"><rect x="22" y="0" width="76" height="90" fill="url(#cg-pt-grad-h)" /></mask>
      </defs>
      <rect x="4" y="4" width="112" height="82" rx="2" fill="white" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.6" />
      <circle data-traffic-light="red" cx="7.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="yellow" cx="11.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" /><circle data-traffic-light="green" cx="15.2" cy="7.5" r="1" fill="currentColor" fill-opacity="0.2" />
      <g clip-path="url(#cg-pt-clip)">
        <path d="M 6 100 L 6 13 Q 6 11 8 11 L 112 11 Q 114 11 114 13 L 114 100 Z" stroke="currentColor" stroke-opacity="0.08" stroke-width="0.5" fill="#FAFAFA" />
        <rect x="30" y="21" width="60" height="10" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <rect x="30" y="33" width="60" height="84" rx="1.5" fill="white" stroke="currentColor" stroke-opacity="0.15" stroke-width="0.5" />
        <circle cx="35" cy="26" r="1.2" fill="currentColor" fill-opacity="0.45" />
        <line data-anim-slide-right data-focal-skip x1="74" y1="26" x2="79" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <line data-anim-slide-right data-focal-skip x1="81" y1="26" x2="86" y2="26" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />

        <!-- guide lines framing the example -->
        <line data-skip-anim x1="33" y1="31" x2="33" y2="69" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-pt-mask-v)" />
        <line data-skip-anim x1="87" y1="31" x2="87" y2="69" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-pt-mask-v)" />
        <line data-skip-anim x1="22" y1="41" x2="98" y2="41" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-pt-mask-h)" />
        <line data-skip-anim x1="22" y1="68" x2="98" y2="68" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" vector-effect="non-scaling-stroke" mask="url(#cg-pt-mask-h)" />

        <!-- example group, scaled down slightly to clear the frame -->
        <g transform="translate(60 54.75) scale(0.88) translate(-60 -54.75)">
        <!-- LEFT: styled HTML -->
        <rect data-anim-horizontal x="34" y="44.5" width="18" height="2.2" rx="1.1" fill="#4F46E5" />
        <rect data-anim-horizontal x="34" y="50" width="20" height="1.4" rx="0.7" fill="#94A3B8" />
        <rect data-anim-horizontal x="34" y="53.5" width="15" height="1.4" rx="0.7" fill="#94A3B8" />
        <rect x="34" y="58.5" width="17" height="6.5" rx="1.5" fill="#4F46E5" fill-opacity="0.12" stroke="#4F46E5" stroke-width="0.5" />
        <rect data-anim-horizontal x="37" y="61.1" width="11" height="1.4" rx="0.7" fill="#4F46E5" fill-opacity="0.7" />

        <!-- arrow: HTML -> text -->
        <path d="M56.5 54 L61.5 54 M59.7 52.3 L61.6 54 L59.7 55.7" fill="none" stroke="#4F46E5" stroke-width="1" />

        <!-- RIGHT: plain text -->
        <rect data-anim-horizontal x="64" y="45.5" width="19" height="1.4" rx="0.7" fill="#94A3B8" />
        <rect data-anim-horizontal x="64" y="49.5" width="22" height="1.4" rx="0.7" fill="#94A3B8" />
        <rect data-anim-horizontal x="64" y="53" width="17" height="1.4" rx="0.7" fill="#94A3B8" />
        <rect data-anim-horizontal x="64" y="56.5" width="21" height="1.4" rx="0.7" fill="#94A3B8" />
        <rect data-anim-horizontal x="64" y="60" width="13" height="1.4" rx="0.7" fill="#94A3B8" />
        <rect data-anim-horizontal x="64" y="63.5" width="20" height="1.4" rx="0.7" fill="#4F46E5" fill-opacity="0.7" />
        </g>
      </g>
    </template>
  </svg>
</template>

<style scoped>
/* Dark-mode theming: flip the white "email/browser" surfaces to the card's
   gray palette and lift the line-art + indigo accent for contrast. */
.dark svg { color: var(--color-gray-100); }
.dark svg [fill="white"] { fill: var(--color-gray-900); }
.dark svg [fill="#FAFAFA"] { fill: var(--color-gray-950); }
.dark svg [fill="#EBEBEB"] { fill: var(--color-gray-700); }
.dark svg [stroke="#EBEBEB"] { stroke: var(--color-gray-700); }
.dark svg [fill="#4F46E5"] { fill: #818cf8; }
</style>

