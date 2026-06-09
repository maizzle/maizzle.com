import { defineConfig } from '@nuxtjs/mdc/config'
import { transformerNotationWordHighlight } from '@shikijs/transformers'

export default defineConfig({
  shiki: {
    transformers: [
      transformerNotationWordHighlight(),
    ],
  },
})
