import { resolve } from 'path'
import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  setup (_options, nuxt) {
    nuxt.options.nitro.externals = nuxt.options.nitro.externals || {}
    nuxt.options.nitro.externals.inline = nuxt.options.nitro.externals.inline || []
    nuxt.options.nitro.externals.inline.push(resolve('./shiki'))
    nuxt.hook('content:context', (contentContext) => {
      contentContext.transformers.push(resolve('./modules/shiki/transformer.js'))
    })
  }
})
