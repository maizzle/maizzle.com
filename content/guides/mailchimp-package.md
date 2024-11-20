---
title: "Automating Mailchimp template zip packaging with Maizzle"
description: "Using events in Maizzle to automatically package email templates and their images into a zip archive that can be uploaded to Mailchimp."
date: 2023-08-04
---

# Automating Mailchimp template zip packaging with Maizzle

If you've ever built custom email templates to be used in Mailchimp, you know that one way to upload them to a campaign is to create a .zip archive that includes the HTML file and all its images.

And if you've done this for many templates, you also know that it can be a tedious process.

In this guide, you'll learn how to use Maizzle's [events](/docs/events) to automatically package your templates and their images into a zip archive that can be uploaded to Mailchimp.

If you want to dive right in, check out the [Mailchimp Starter](https://github.com/maizzle/starter-mailchimp).

## Requirements

Mailchimp requires that the zip archive contains the HTML file and all its images in the same folder.

For example:

```
template.zip
├── index.html
├── image1.jpg
├── image2.jpg
└── image3.jpg
```

With this in mind, we must also make sure that the images are referenced correctly in the HTML file. In order for an image to be uploaded to Mailchimp's servers, it must be referenced using a relative path:

```html diff
- <img src="https://some-cdn.com/image1.jpg">
+ <img src="image1.jpg">
```

## Project setup

We're starting from scratch, so let's scaffold a new project using the Official Starter:

```sh
npx create-maizzle
```

In the interactive setup wizard, specify the directory name to create the project in, i.e. `./mailchimp-project`, and select the Default Starter.

Choose Yes when prompted to Install dependencies.

Once it finishes installing dependencies, open the project folder in your favorite editor.

### Structure

We'll be organizing our templates into folders inside `src/templates`:

```
src
└── templates
    └── template-1
        ├── index.html
        ├── image1.jpg
        ├── image2.jpg
        └── image3.jpg
    └── ...
```

This will not only make it easier to create the .zip archive, but this way we can also easily add and reference images in the HTML.

## Create a template

For this written guide, we'll be using a simplified template with a few images. See the [Mailchimp Starter](https://github.com/maizzle/starter-mailchimp) for a more extensive example.

Create `emails/template-1/index.html` and paste in the following code:

```hbs [emails/template-1/index.html]
---
title: "Example template 1"
---

<x-main>
  <!-- Condition needed in order to see global images when developing locally -->
  <if condition="page.env === 'local'">
    <img src="/images/insignia.png" width="70" alt="Maizzle">
  </if>
  <else>
    <img src="insignia.png" width="70" alt="Maizzle">
  </else>

  <h1>
    Hello,
  </h1>

  <p>
    As you might know, lorem ipsum dolor sit amet...
  </p>

  <div>
    <img src="maizzle.png" width="456" alt="Maizzle cover image">
  </div>

  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus ex deserunt, placeat.
  </p>

  <div>
    <img src="tailwindcss.jpg" width="456" alt="Tailwind CSS cover image">
  </div>

  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus ex deserunt, placeat, suscipit sapiente non minus necessitatibus vero hic.
  </p>
</x-main>
```

Make sure to save the [`maizzle.png`](https://maizzle.com/__og_image__/og.png) and [`tailwindcss.jpg`](https://tailwindcss.com/_next/static/media/social-card-large.a6e71726.jpg) images to the same folder.

## Production config

This is where the magic happens.

Our strategy is as follows:

- for each template, create a list of the images it uses
- push that list along with some data about the template file to a queue
- after all templates have been compiled, process the queue and create the .zip archives

For now, update your `config.production.js` to look like this:

```js [config.production.js] {1,5}
const queue = []

export default {
  build: {
    static: false,
    output: {
      path: 'dist',
    },
  },
  css: {
    inline: true,
    purge: true,
    shorthand: true,
  },
  prettify: true,
```

We're setting `static: false` because we don't want Maizzle to copy the global `src/images` folder to the `dist` folder. We'll handle any global images ourselves.

## Get image paths from HTML

We'll need a way of creating a list of images that are used in a template.

Create `src/utils/getImagePaths.js` and paste in the following code:

```js [src/utils/getImagePaths.js]
export default function htmlString() {
  const imagePaths = []
  const regexSrcAttribute = /src=["'](.*?)["']/gi
  const regexBackgroundAttribute = /background=["'](.*?)["']/gi
  const regexInlineBackgroundCSS = /background(-image)?:\s?url\(['"](.*?)['"]\)/gi
  const regexSrcsetAttribute = /srcset=["'](.*?)["']/gi
  const regexPosterAttribute = /poster=["'](.*?)["']/gi
  const regexStyleTag = /<style\b[^>]*>(.*?)<\/style>/gi

  // Extract image paths from src attributes
  const srcMatches = htmlString.match(regexSrcAttribute)
  if (srcMatches) {
    srcMatches.forEach(match => {
      const imagePath = match.replace(regexSrcAttribute, '$1')
      imagePaths.push(imagePath)
    })
  }

  // Extract image paths from background attributes
  const backgroundMatches = htmlString.match(regexBackgroundAttribute)
  if (backgroundMatches) {
    backgroundMatches.forEach(match => {
      const imagePath = match.replace(regexBackgroundAttribute, '$1')
      imagePaths.push(imagePath)
    })
  }

  // Extract image paths from inline background CSS
  const inlineBackgroundMatches = htmlString.match(regexInlineBackgroundCSS)
  if (inlineBackgroundMatches) {
    inlineBackgroundMatches.forEach(match => {
      const imagePath = match.replace(regexInlineBackgroundCSS, '$2')
      imagePaths.push(imagePath)
    })
  }

  // Extract image paths from srcset attributes
  const srcsetMatches = htmlString.match(regexSrcsetAttribute)
  if (srcsetMatches) {
    srcsetMatches.forEach(match => {
      const imagePath = match.replace(regexSrcsetAttribute, '$1')
      // Split the srcset and add each image path individually
      const imagePathsArray = imagePath.split(/\s*,\s*/)
      imagePaths.push(...imagePathsArray)
    })
  }

  // Extract image paths from poster attributes
  const posterMatches = htmlString.match(regexPosterAttribute)
  if (posterMatches) {
    posterMatches.forEach(match => {
      const imagePath = match.replace(regexPosterAttribute, '$1')
      imagePaths.push(imagePath)
    })
  }

  // Extract image paths from CSS inside <style> tags in the <head>
  const styleTagMatches = htmlString.match(regexStyleTag)
  if (styleTagMatches) {
    styleTagMatches.forEach(styleTag => {
      const cssMatches = styleTag.match(regexInlineBackgroundCSS)
      if (cssMatches) {
        cssMatches.forEach(match => {
          const imagePath = match.replace(regexInlineBackgroundCSS, '$2')
          imagePaths.push(imagePath)
        })
      }
    })
  }

  return imagePaths
}
```

This will return an array of image paths extracted from the following:

- `src` attributes
- `srcset` attributes
- `poster` attributes
- `background` attributes
- CSS inside `<style>` tags in the `<head>`
- inline `background` and `background-image` CSS

## Archiving library

There are a few libraries that can create .zip archives, but we'll be using [archiver](https://www.npmjs.com/package/archiver) for this guide.

Install it now:

```bash
npm install archiver
```

## Add to the queue

Let's use the `afterTransformers` event to push information about each template and the images it uses to the `queue` variable that we defined earlier.

Modify your `config.production.js` to look like this:

```js [config.production.js] {18-29}
import getImagePathsFromHTML from './src/utils/getImagePaths.js'

const queue = []

export default {
  build: {
    static: false,
    output: {
      path: 'dist',
    },
  },
  css: {
    inline: true,
    purge: true,
    shorthand: true,
  },
  prettify: true,
  afterTransformers(html, config) {
    // Get image paths from HTML
    const imagePaths = getImagePathsFromHTML(html)

    queue.push({
      images: imagePaths,
      ...config.build.current,
    })

    return html
  },
```

## Create the .zip archives

We can now process the queue and create the .zip archive for each template.

We'll use the `afterBuild` event for this, which is triggered after all templates have been compiled.

Modify your `config.production.js` to look like this:

```js [config.production.js] {1-4,33-77}
import fs from 'node:fs'
import path from 'node:path'
import archiver from 'archiver'
import baseConfig from './config.js'
import getImagePathsFromHTML from './src/utils/getImagePaths.js'

const queue = []

export default {
  build: {
    static: false,
    output: {
      path: 'dist',
    },
  },
  css: {
    inline: true,
    purge: true,
    shorthand: true,
  },
  prettify: true,
  afterTransformers(html, config) {
    // Get image paths from HTML
    const imagePaths = getImagePathsFromHTML(html)

    queue.push({
      images: imagePaths,
      ...config.build.current,
    })

    return html
  },
  afterBuild() {
    // Process each item in the queue
    for (const {path: template, images} of queue) {
      // Read template's directory
      fs.readdir(template.dir, (err, files) => {
        // Exit early if there's an error
        if (err) throw err

        // Create archive
        const output = fs.createWriteStream(`${template.dir}/${template.name}.zip`)
        const archive = archiver('zip', {
          zlib: {
            level: 9 // Sets the compression level
          }
        })

        archive.on('error', function(err) {
          throw err
        })

        // Pipe archive data to the file
        archive.pipe(output)

        // Add files from template's directory to archive
        files.forEach(file => {
          archive.file(`${template.dir}/${file}`, { name: file })
        })

        // Get a list of files found in `src/images` that have been used in the template
        const assetsSource = baseConfig.build.templates.assets.source
        const globalImages = fs.readdirSync(assetsSource)
          .filter(file => images.includes(path.basename(file)))
          .map(file => path.join(assetsSource, file))

        // Add global images to archive
        globalImages.forEach(image => {
          archive.file(image, { name: path.basename(image) })
        })

        // Finalize the archive
        archive.finalize()
      })
    }
  },
}
```

## Build the templates

Running the `npm run build` command will now create a .zip archive for each template in the `dist` directory.

The archive file will have the same name as the template, so you'll see something like this:

```
build_production
  └── template-1
      ├── index.html
      └── index.zip
        ├── index.html
        ├── insignia.png
        ├── maizzle.png
        ├── tailwindcss.jpg
      ├── maizzle.png
      ├── tailwindcss.jpg
  └── template-2
      └── ...
```

You'll notice that `insignia.png` has been added to both archives, even though none of the template folders include it.

## Resources

- [GitHub repository](https://github.com/maizzle/starter-mailchimp) for this guide
- [archiver](https://www.npmjs.com/package/archiver) library documentation
