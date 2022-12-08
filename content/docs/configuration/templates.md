---
title: "Templates configuration"
description: "Configuring template sources and other related options in Maizzle"
---

# Templates configuration

Configure where your Templates live, where they should be output, as well as what file extensions they use or which assets should be copied over in the process.

Template configuration is done under the `build.templates` key of your Maizzle config:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      templates: {
        source: 'src/templates',
        destination: {
          path: 'build_local',
          extension: 'html'
        },
        filetypes: 'html',
        assets: {
          source: './src/images',
          destination: 'images'
        }
      }
    }
  }
  ```

</code-sample>

## source

Define the source directory where Maizzle should look for Templates to compile.

`source` can be:

- a string
- an array of strings
- a function that returns one of the above

### String source

Use a string `source` to define a single source directory:

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

### Array source

Use `source` as an array of strings to define multiple source directories:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      templates: {
        source: ['src/templates', 'src/amp-templates']
      }
    }
  }
  ```

</code-sample>

### Function source

Use `source` as a function to define a dynamic source directory.

The function receives the Maizzle `config` object as its only argument, and must return a string or an array of strings:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      templates: {
        source: (config) => {
          if (config.env === 'production') {
            return 'src/templates'
          }

          return ['src/templates', 'src/amp-templates']
        }
      }
    }
  }
  ```

</code-sample>

Remember, Maizzle will copy these folders and their entire contents to the `templates.destination.path` directory.

<alert>Maizzle automatically configures paths in `templates.source` as Tailwind CSS [`content` paths](/docs/configuration/tailwindcss#content), no need to manually add them yourself.</alert>

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

## destination

Define the output path for compiled Templates, and what file extension they should use.

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

If you omit this key, a `build_[env]` directory name will be used, where `[env]` is the current environment, i.e. `build_production` or `build_local`.

#### Unique destination paths

Using [multiple `templates`](#multiple-templates) config blocks? Make sure to have unique `destination.path` names, otherwise files with the same name will be overwritten.

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

The compiled templates will be output as `build_laravel/*.blade.php`.

### permalink

Use the `permalink` Front Matter key to define a custom output path right in a Template:

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

This will override `destination.path` from your config, but only for this Template.

You may use both relative and absolute file paths.

For example, output one level above project directory:

<code-sample title="src/templates/example.html">

  ```xml
  ---
  permalink: ../newsletter.html
  ---

  <extends src="src/layouts/main.html">
    <block name="template">
      <!-- ... -->
    </block>
  </extends>
  ```

</code-sample>

Output at a specific system location:

<code-sample title="src/templates/example.html">

  ```xml
  ---
  permalink: C:/Users/Cosmin/Newsletter/2022/12/index.html
  ---

  <extends src="src/layouts/main.html">
    <block name="template">
      <!-- ... -->
    </block>
  </extends>
  ```

</code-sample>

<alert type="warning">`permalink` must be a <em>file</em> path, and can be used only in the Template's Front Matter. Using a directory path will result in a build error.</alert>

### assets

Source and destination directories for your asset files.

At build time, `templates.assets.destination` will be created relative to `templates.destination`, and files inside `templates.assets.source` will be copied into it:

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

## Multiple templates

You may define multiple `templates` sections.
Each section will be processed and templates will be output based on the section's configuration.

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      // Multiple `templates` as array of objects
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
