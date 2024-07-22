---
title: "Build configuration"
description: "Configuring content sources and other build related options in Maizzle."
---

# Build configuration

Configure the paths where Maizzle should look for Templates to compile, where they should be output to, or what extensions they should use.

This is done under the `build` key of your config:

```js [config.js]
export default {
  build: {
    content: ['src/templates/**/*.html'],
  }
}
```

## content

Type: String[]\
Default: `['src/templates/**/*.html']`

Define the source directories where Maizzle should look for Templates to compile.

This is an array of glob patterns, similar to how content sources are configured in Tailwind CSS. See [fast-glob](https://github.com/mrmlnc/fast-glob) for more information on how to write glob patterns.

### File types

Specify which file extensions should be considered when looking for Templates to compile. For example, to include both `.html` and `.blade.php` files:

```js [config.js]
export default {
  build: {
    content: ['src/templates/**/*.{html,blade.php}'],
  }
}
```

### Excluding files

You may exclude files from being compiled by prefixing the glob pattern with an exclamation mark `!`. For example, to exclude all files ending in `-ignore.html`:

```js [config.js]
export default {
  build: {
    content: [
      'src/templates/**/*.html',
      '!src/templates/**/*-ignore.html',
    ],
  }
}
```

### Compute paths

If you need to compute the content source paths dynamically, you can use a function that returns an array of strings:

```js [config.js]
const sources = () => {
  return ['src/templates**/*.html', 'src/amp-templates/**/*.html']
}

export default {
  build: {
    content: sources
  }
}
```

<Alert>Previously this was called 'Function source', and it allowed defining sources as a function that was evaluated by Maizzle. This is deprecated starting with Maizzle 5.</Alert>

### Multiple sources

You may define multiple content sources:

```js [config.js]
export default {
  build: {
    content: [
      'src/marketing/**/*.html',
      'src/transactional/**/*.html'
    ]
  }
}
```

## output

Type: Object\
Default: `{ path: 'build_[env]', extension: 'html' }`

Define the output path for compiled Templates, and what file extension they should use.

### path

Type: String\
Default: `build_[env]`

Directory path where Maizzle should output the compiled emails.

```js [config.production.js]
export default {
  build: {
    output: {
      path: 'build_production',
    }
  }
}
```

If you omit this key, a `build_[env]` directory name will be used, where `[env]` is the current environment, i.e. `build_production` or `build_local`.

### extension

Type: String\
Default: `undefined`

Define the file extension - without the leading dot - to be used for the compiled templates. For example, let's output [Laravel Blade](https://laravel.com/docs/8.x/blade) files:

```js [config.laravel.js]
export default {
  build: {
    output: {
      path: 'build_laravel',
      extension: 'blade.php'
    }
  }
}
```

The compiled Templates will be output as `build_laravel/*.blade.php`.

By default, Maizzle will use the extension of the source file.

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

This will override `output.path` from your config, but only for this Template.

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
permalink: C:/Users/Cosmin/Newsletter/2024/07/index.html
---

<x-main>
  <!-- your email HTML... -->
</x-main>
```

<Alert type="warning">`permalink` must be a <em>file</em> path, and can only be used in the Template's Front Matter. Using a directory path will result in a build error.</Alert>

## static

Type: Object\
Default: `{ source: '', destination: 'assets' }`

Source and destination directories for static asset files.

At build time, `build.static.destination` will be created relative to `build.output.path`, and files inside `build.static.source` will be copied into it:

```js [config.js]
export default {
  build: {
    static: {
      source: 'src/images/**/*',
      destination: 'images',
    }
  }
}
```

You can use it to store _any_ files you might need, not just images.

## spinner

Type: String|Object\
Default: `'circleHalves'`

Customize the spinner shown in the console during build.

```js [config.js]
export default {
  build: {
    spinner: 'dots'
  }
}
```

See the [ora spinners list](https://github.com/sindresorhus/cli-spinners/blob/main/spinners.json) for available options.
