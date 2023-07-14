import { defineNuxtModule } from '@nuxt/kit'
import menu from '../data/navigation'

export default defineNuxtModule({
  setup (options, nuxt) {
    nuxt.options.runtimeConfig.public.navigation = menu
  }
})
