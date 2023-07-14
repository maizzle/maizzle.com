import { defineNuxtModule } from '@nuxt/kit'
import { ofetch } from 'ofetch'

export default defineNuxtModule({
  async setup (options, nuxt) {
    try {
      const {tag_name} = await ofetch('https://api.github.com/repos/maizzle/framework/releases/latest')
      nuxt.options.runtimeConfig.public.latestRelease = tag_name
    } catch (error) {
      nuxt.options.runtimeConfig.public.latestRelease = 4

    }

  }
})
