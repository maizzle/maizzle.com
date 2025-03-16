<template>
  <div class="mb-6">
    <div
      v-if="filename || frameType === 'terminal'"
      class="frame flex justify-between items-center px-6 border border-slate-200 rounded-t-md backdrop-blur-[3px] h-10"
      :class="[
        `frame-${frameType}`,
      ]"
    >
      <div
        v-if="frameType === 'terminal'"
        class="flex gap-1.5"
      >
        <div class="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
        <div class="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
        <div class="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
      </div>
      <span
        v-if="filename"
        class="h-10 inline-flex items-center border-b border-indigo-600 text-xs"
      >{{ filename }}</span>
      <button
        v-show="!copied && !hideCopy"
        class="my-2 -mr-1 text-slate-400 hover:text-slate-600"
        title="Copy to clipboard"
        @click="copyCode"
      >
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
      <svg
        v-show="!hideCopy && copied"
        class="h-5 w-5 -mr-1 text-slate-400 pointer-events-none"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <pre
      ref="cw"
      class="shiki border border-slate-200 rounded-md backdrop-blur-[3px]"
      :class="[{
        'border-t-0 rounded-t-none rounded-b-md': frameType !== 'none' && filename || frameType === 'terminal',
        'blur-lines': shouldBlurUnhighlightedLines,
        'rounded-t-none border-t-0': isExampleFrame,
        'no-root': noRoot,
      }]"
    >
      <slot />
    </pre>
  </div>
</template>

<script setup>
// Code wrapper
const cw = ref('')

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array,
    default: () => [],
  },
  meta: {
    type: String,
    default: '',
  },
})

const hideCopy = computed(() => props.meta && props.meta.split(' ').includes('no-copy'))

const isExampleFrame = computed(() => props.meta && props.meta.split(' ').includes('example'))

const noRoot = computed(() => props.meta && props.meta.split(' ').includes('no-root'))

const frameType = computed(() => {
  if (['sh', 'bash', 'shell'].includes(props.language)) return 'terminal'
  if (props.language) return 'code'
  return 'none'
})

const shouldBlurUnhighlightedLines = computed(() => props.meta && props.meta.split(' ').includes('blur'))

const copied = ref(false)

const copyCode = () => {
  const highlights = cw.value.querySelectorAll('.highlight')
  const lines = cw.value.querySelectorAll('.line')
  const nodeList = highlights.length ? highlights : lines
  const textarea = document.createElement('textarea')
  textarea.value = [...nodeList].map((el) => el.innerText).join('')
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 1000)
}
</script>
