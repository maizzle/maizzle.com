<template>
  <div v-html="html" />
</template>

<script setup>
import { getHighlighter, renderToHtml, toShikiTheme } from 'shiki-es'
import stripIndent from 'strip-indent'
import vsCodeTheme from '@/assets/shiki/themes/github-light.json'

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  lang: {
    type: String,
    default: null,
  },
})

const shikiTheme = toShikiTheme(vsCodeTheme)

const highlighter = await getHighlighter({
  theme: shikiTheme,
  langs: [props.lang]
})

const html = ref('')

const tokens = highlighter.codeToThemedTokens(
  stripIndent(props.code).trim().replace(/^\n+/, ''),
  props.lang ?? undefined,
)

html.value = renderToHtml(tokens, {
  elements: {
    pre({ className, style, children }) {
      return `<div class="${className}"><pre>${children}</pre></div>`
    },
  },
})
</script>
