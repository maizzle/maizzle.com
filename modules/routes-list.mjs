import { defineNuxtModule } from '@nuxt/kit'
import fs from 'node:fs/promises'
import path from 'node:path'

async function listFilesInDirectory(directory, prefix = '') {
  const entries = await fs.readdir(directory, { withFileTypes: true })

  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry.name)
    const relativePath = path.join(prefix, entry.name)

    if (entry.isDirectory()) {
      // If the entry is a directory, recursively list the files in it
      return listFilesInDirectory(fullPath, relativePath)
    } else {
      // If the entry is a file, remove the extension, prepend a slash, and remove number and dot prefix
      const ext = path.extname(entry.name)
      const nameWithoutExtension = path.basename(entry.name, ext)
      const nameWithoutNumberPrefix = nameWithoutExtension.replace(/^\d+\.\s/, '')

      // Check if the name ends with 'index', if so, replace it with '/'
      if (nameWithoutNumberPrefix === 'index') {
        return path.join('/', prefix, '/')
      }

      let finalPath = path.join('/', prefix, nameWithoutNumberPrefix)

      // Replace backslashes with forward slashes on Windows, so we can build locally.
      // Seems that Nitro doesn't handle them for now...
      if (path.sep === '\\') {
        finalPath = finalPath.replace(/\\/g, '/')
      }

      return finalPath
    }
  }))

  // Flatten the array and return it
  return Array.prototype.concat(...files)
}

export default defineNuxtModule({
  async setup(_moduleOptions, nuxt) {
    const paths = await listFilesInDirectory('./content')
    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.prerender.routes = nitroConfig.prerender.routes || []

      nitroConfig.prerender.routes?.push(...paths)
    })
  }
})
