<template>
  <div class="backdrop-blur-sm">
    <div class="code-frame">
      <span>{{ title }}</span>
      <button
        v-show="!copied && !noCopy"
        class="text-slate-400 hover:text-slate-600"
        :class="{'my-2': !title}"
        title="Copy to clipboard"
        @click="copyCode"
      >
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
      <svg
        v-show="!noCopy && copied"
        class="h-5 w-5 text-slate-400 pointer-events-none"
        :class="{'my-3': !title}"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div ref="code">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CodeSample',
  props: {
    title: {
      type: String,
      default: '',
    },
    noCopy: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      copied: false,
    }
  },
  methods: {
    copyCode() {
      const code = this.$refs.code.innerText
      const textarea = document.createElement('textarea')
      textarea.value = code
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      textarea.remove()
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 1000)
    },
  },
}
</script>
