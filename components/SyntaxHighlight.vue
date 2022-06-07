<template>
  <div class="relative z-10 prose">
    <div class="code-frame relative z-10 bg-white">
      <span>{{ title }}</span>
      <svg
        v-show="!copied && !noCopy"
        class="h-5 w-5 text-slate-400 hover:text-slate-600 cursor-pointer"
        :class="{'my-2': !title}"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
        @click="copyCode"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      <svg
        v-show="!noCopy && copied"
        class="h-5 w-5 text-slate-400 pointer-events-none"
        :class="{'my-3': !title}"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div ref="code" class="prose relative z-10 bg-white">
      <slot />
    </div>
    <div
      class="w-full h-full rounded-lg absolute z-0 border border-slate-200 bg-white"
      :class="bkgFrameClass"
    />
  </div>
</template>

<script>
import { getHighlighter, setCDN } from 'shiki'

export default {
  name: 'SyntaxHighlight',
  props: {
    lang: {
      type: String,
      default: 'js',
    },
    bkgFrameClass: {
      type: String,
      default: 'top-4 left-4 sm:top-8 sm:left-8',
    },
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
  // async mounted() {
    //const highlighted = await this.highlight(this.$refs.code.innerHTML)

    //this.$refs.code.innerHTML = highlighted
  // },
  methods: {
    async highlight(code) {
      setCDN('./node_modules/shiki/')

      const highlighter = await getHighlighter({
        theme: 'github-light',
      })

      // eslint-disable-next-line
      return highlighter.codeToHtml(code.replace(/<(\/?|\!?)(pre)>/g, ''), {lang: this.lang})
    },
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
