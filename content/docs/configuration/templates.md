---
title: "Templates configuration"
description: "Configuring template sources and other related options in Maizzle."
---

# Templates configuration

Configure where your Templates live, where they should be output, as well as what file extensions they use or which assets should be copied over in the process.

Template configuration is done under the `build.templates` key of your Maizzle config:

```js [config.js]
module.exports = {
  build: {
    templates: {
      // ...
    }
  }
}
```

## source

Type: String|Array|Function\
Default: `src/templates`

Define the source directory where Maizzle should look for Templates to compile.

`source` can be:

- a string
- an array of strings
- a function that returns one of the above

### String source

Use a string `source` to define a single source directory:

```js [config.js]
module.exports = {
  build: {
    templates: {
      source: 'src/templates'
    }
  }
}
```

### Array source

Use `source` as an array of strings to define multiple source directories:

```js [config.js]
module.exports = {
  build: {
    templates: {
      source: ['src/templates', 'src/amp-templates']
    }
  }
}
```

### Function source

Use `source` as a function to define a dynamic source directory.

The function receives the Maizzle `config` object as its only argument, and must return a string or an array of strings:

```js [config.js]
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

Remember, Maizzle will copy these folders and their entire contents to the `templates.destination.path` directory.

<Alert>Maizzle automatically configures paths in `templates.source` as Tailwind CSS [`content` paths](/docs/configuration/tailwindcss#content), no need to manually add them yourself.</Alert>

### Multiple sources

You may define multiple `templates` sources as an array of objects. Each source will be processed and templates will be output based on its own configuration.

```js [config.js]
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

## filetypes

Type: String|Array\
Default: `'html'`

Define what file extensions your Templates use.

`filetypes` can be a string that defines a single file extension:

```js [config.js]
module.exports = {
  build: {
    templates: {
      filetypes: 'html'
    }
  }
}
```

You may use an array of strings to define multiple file extensions:

```js [config.js]
module.exports = {
  build: {
    templates: {
      filetypes: ['html', 'blade.php']
    }
  }
}
```

You may also define multiple file extensions by separating them with pipe in a string:

```js [config.js]
module.exports = {
  build: {
    templates: {
      filetypes: 'html|blade.php'
    }
  }
}
```

Maizzle will only compile files with these extensions.

This means you can keep other files alongside your Templates, and Maizzle will not try to compile them - it will simply copy them over to the build destination directory.

## destination

Type: Object\
Default: `{ path: 'build_[env]', extension: 'html' }`

Define the output path for compiled Templates, and what file extension they should use.

### path

Type: String\
Default: `build_[env]`

Directory path where Maizzle should output the compiled emails.

```js [config.js]
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

If you omit this key, a `build_[env]` directory name will be used, where `[env]` is the current environment, i.e. `build_production` or `build_local`.

#### Unique destination paths

Using [multiple `templates`](#multiple-templates) config blocks? Make sure to have unique `destination.path` names, otherwise files with the same name will be overwritten.

### extension

Type: String\
Default: `'html'`

Define the file extension - without the leading dot - to be used for the compiled templates. For example, let's output [Laravel Blade](https://laravel.com/docs/8.x/blade) files:

```js [config.js]
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

The compiled templates will be output as `build_laravel/*.blade.php`.

## permalink

Type: String\
Default: `undefined`

Use the `permalink` Front Matter key to define a custom output path right in a Template:

```hbs [src/templates/example.html]
---
permalink: output/this/template/here.html
---

<x-main>
  <!-- your email HTML... -->
</x-main>
```

This will override `destination.path` from your config, but only for this Template.

You may use both relative and absolute file paths.

For example, output one level above project directory:

```hbs [src/templates/example.html]
---
permalink: ../newsletter.html
---

<x-main>
  <!-- your email HTML... -->
</x-main>
```

Output at a specific system location:

```hbs [src/templates/example.html]
---
permalink: C:/Users/Cosmin/Newsletter/2022/12/index.html
---

<x-main>
  <!-- your email HTML... -->
</x-main>
```

<Alert type="warning">`permalink` must be a <em>file</em> path, and can only be used in the Template's Front Matter. Using a directory path will result in a build error.</Alert>

## assets

Type: Object\
Default: `{ source: '', destination: 'assets' }`

Source and destination directories for your asset files.

At build time, `templates.assets.destination` will be created relative to `templates.destination`, and files inside `templates.assets.source` will be copied into it:

```js [config.js]
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

You can use it to store _any_ files you might need, not just images.

Of course, if using multiple `templates` blocks, you can have different asset configurations for each block:

```js [config.js]
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

## omit

Type: Array\
Default: `['']`

This option can be used to define paths to files or directories from your `source` that should not be copied over to the build destination.

For example, imagine this project structure:

```
src/templates
├── 1.html
├── 2.html
└── archive
    ├── 3.html
    └── 4.html
```


You can prevent `1.html` and `4.html` from being copied to the build destination like this:

```js [config.js]
module.exports = {
  build: {
    templates: {
      source: 'src/templates',
      omit: ['1.html', 'archive/4.html'],
      // ...
    }
  }
}
```

Now, running `maizzle build production` would create a `build_production` folder with these files inside:

```
build_production
├── 2.html
└── archive
    ├── 3.html
```

It supports directory paths, so you can omit the entire `archive` folder:

```js [config.js]
module.exports = {
  build: {
    templates: {
      source: 'src/templates',
      omit: ['1.html', 'archive'],
    }
  }
}
```

The result would be:

```
build_production
├── 2.html
```

## skip

Type: String|Array\
Default: `['']`

Use `skip` if you want to skip the compilation of a template. The file will only be copied as-is to the build destination, it will not be parsed in any way by Maizzle.

```js [config.js]
module.exports = {
  build: {
    templates: {
      source: 'src/templates',
      skip: ['1.html', 'archive/3.html'],
    }
  }
}
```

`skip` can be a string (skip a single file) or an array of strings like in the example above.

Each string must be a file path that is relative to your `templates.source` directory.
