---
title: "Templates configuration"
description: "Configuring template sources and other related options in Maizzle"
---

# Templates configuration

Configure where your Templates live, where they should be output, as well as what file extensions to use/look for and which assets should be copied over in the process.

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      templates: {
        filetypes: 'html',
        source: 'src/templates',
        destination: {
          path: 'build_local',
          extension: 'html'
        },
        assets: {
          source: './src/images',
          destination: 'images'
        }
      }
    }
  }
  ```

</code-sample>

## Multiple sources

You may define multiple `templates` sections. Each section will be processed and templates will be output based on the section's configuration.

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      templates: [
        {
          source: 'src/templates',
          destination: {
            path: 'build_local'
          }
        },
        {
          source: 'src/amp-templates',
          destination: {
            path: 'build_amp'
          }
        }
      ]
    }
  }
  ```

</code-sample>

## filetypes

Default: `html`

Define what file extensions your Templates use.

`filetypes` can be a string, but it can also be an array or a pipe|delimited list:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      templates: {
        filetypes: ['html', 'blade.php'] // or 'html|blade.php'
      }
    }
  }
  ```

</code-sample>

Maizzle will only compile files with these extensions.

This means you can keep other files alongside your Templates, and Maizzle will not try to compile them - it will simply copy them over to the build destination directory.

## source

Define the source directory where Maizzle should look for Templates to compile.

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      templates: {
        source: 'src/templates'
      }
    }
  }
  ```

</code-sample>

Remember, Maizzle will copy these folders and their entire contents to the `templates.destination.path` directory.

<alert>Maizzle configures `templates.source` as a Tailwind CSS `content` path, so that it can generate utilities that you use in any Templates in there.</alert>

## destination

This allows you to customize the output path and file extension.

### path

Directory path where Maizzle should output the compiled emails.

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      templates: {
        destination: {
          path: 'build_local'
        }
      }
    }
  }
  ```

</code-sample>

If you omit this key, a `build_${env}` directory name will be used.

<alert type="danger">Using multiple `templates` config blocks? Make sure to have unique `destination.path` names! Defaulting to `build_${env}` can result in files with the same name being overwritten.</alert>

### extension

Define the file extension - without the leading dot - to be used for the compiled templates.
For example, let's output [Laravel Blade](https://laravel.com/docs/8.x/blade) files:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      templates: {
        destination: {
          path: 'build_laravel',
          extension: 'blade.php'
        }
      }
    }
  }
  ```

</code-sample>

### permalink

You may use a custom output path for a Template file with the help of the `permalink` Front Matter key.

<code-sample title="src/templates/example.html">

  ```xml
  ---
  permalink: output/this/template/here.html
  ---

  <extends src="src/layouts/main.html">
    <block name="template">
      <!-- ... -->
    </block>
  </extends>
  ```

</code-sample>

This will override `destination.path` from your config and will output the compiled Template file at the location set in `permalink`.

You may use both relative and absolute file paths.

For example, output one level above project directory:

```
---
permalink: ../newsletter.html
---
```

Output at a specific system location:

```
---
permalink: C:/Users/Cosmin/Newsletter/2022/06/index.html
---
```

<alert type="warning">`permalink` must be a <em>file</em> path, and can be used only in the Template's Front Matter. Using a directory path will result in a build error.</alert>

### assets

Source and destination directories for your asset files.

At build time, `templates.assets.destination` will be created relative to `templates.destination`, and everything inside `templates.assets.source` will be copied into it:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      templates: {
        assets: {
          source: 'src/images',
          destination: 'images'
        }
      }
    }
  }
  ```

</code-sample>

You can use it to store _any_ files you might need, not just images.

Of course, if using multiple `templates` blocks, you can have different asset configurations for each block:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      templates: [
        {
          source: 'src/templates',
          destination: {
            path: 'build_basic'
          },
          assets: {
            source: 'src/images',
            destination: 'images' // assets output to build_basic/images
          }
        },
        {
          source: 'src/amp-templates',
          destination: {
            path: 'build_amp'
          },
          assets: {
            source: 'src/assets/amp',
            destination: 'media' // assets output to build_amp/media
          }
        }
      ]
    }
  }
  ```

</code-sample>
