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
    content: ['emails/**/*.html'],
  }
}
```

## content

Type: `String[]`\
Default: `['emails/**/*.html']`

Define the source directories where Maizzle should look for Templates to compile.

This is an array of glob patterns, similar to how content sources are configured in Tailwind CSS. See [fast-glob](https://github.com/mrmlnc/fast-glob) for how to write glob patterns.

The `content` key is unique to each config file - unlike other options in your config, it is not merged when using multiple Environments. This way, we avoid processing unwanted Templates when building for a specific Environment.

To illustrate this, imagine this is your `config.js` file:

```js [config.js]
export default {
  build: {
    content: ['emails/**/*.html'],
  }
}
```

... and this is your `config.production.js` file:

```js [config.production.js]
export default {
  build: {
    content: ['emails/transactional/**/*.html'],
  }
}
```

When running `maizzle build production`, only the Templates from the `emails/transactional` folder will be compiled, no matter if the `emails` folder contains other Templates.

### File types

Specify which file extensions should be considered when looking for Templates to compile. For example, to include both `.html` and `.blade.php` files:

```js [config.js]
export default {
  build: {
    content: ['emails/**/*.{html,blade.php}'],
  }
}
```

### Excluding files

You may exclude files from being compiled by prefixing the glob pattern with an exclamation mark `!`. For example, to exclude all files ending in `-ignore.html`:

```js [config.js]
export default {
  build: {
    content: [
      'emails/**/*.html',
      '!emails/**/*-ignore.html',
    ],
  }
}
```

### Compute paths

If you need to compute the content source paths dynamically, you can use a function that returns an array of strings:

```js [config.js]
const sources = () => {
  return ['templates**/*.html', 'amp-templates/**/*.html']
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
      'marketing/**/*.html',
      'transactional/**/*.html'
    ]
  }
}
```

## output

Type: `Object`\
Default: `{ path: 'build_[env]', extension: 'html', from: ['emails'] }`

Define the output path for compiled Templates, and what file extension they should use.

### path

Type: `String`\
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

Type: `String`\
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

### from

Type: `String[]`\
Default: `['emails']`

Default directories to unwrap when outputting compiled Templates.

For example, if you have a Template located at `emails/welcome.html` in your Maizzle project, by default the compiled file will be output as `build_[env]/welcome.html` - the `emails` part of the path is discarded.

If you have multiple sources, you can specify additional directories to unwrap:

```js [config.js]
export default {
  build: {
    content: [
      'emails/**/*.html',
      'amp-templates/**/*.html'
    ],
    output: {
      from: ['emails', 'amp-templates']
    }
  }
}
```

<alert>You must specify all directories to unwrap when using `output.from` and multiple `build.content` source paths, as this option overwrites the default `[emails]` value.</alert>

In this case, the compiled files will all be output at the root of the `build_[env]` directory.

#### \`from\` caveat

Templates in Maizzle are processed in the order their source paths are defined in `build.content`, which means files with identical names will be overwritten if they have the same output path as a result of their parent directory being unwrapped.

In the `emails` and `amp-templates` example above, if both directories contain a `welcome.html` file, the content of the one in the `amp-templates` directory will overwrite that of the one in the `emails` directory.

## permalink

Type: `String`\
Default: `undefined`

Use the `permalink` Front Matter key to define a custom output path right in a Template:

```hbs [emails/example.html]
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

```hbs [emails/example.html]
---
permalink: ../newsletter.html
---

<x-main>
  <!-- your email HTML... -->
</x-main>
```

Output at a specific system location:

```hbs [emails/example.html]
---
permalink: C:/Users/Cosmin/Newsletter/2024/07/index.html
---

<x-main>
  <!-- your email HTML... -->
</x-main>
```

<Alert type="warning">`permalink` must be a <em>file</em> path, and can only be used in the Template's Front Matter. Using a directory path will result in a build error.</Alert>

## static

Type: `Object`\
Default: `{ source: '', destination: 'assets' }`

Source and destination directories for static asset files.

At build time, `build.static.destination` will be created relative to `build.output.path`, and files inside `build.static.source` will be copied into it:

```js [config.js]
export default {
  build: {
    static: {
      source: 'images/**/*',
      destination: 'images',
    }
  }
}
```

You can use it to store _any_ files you might need, not just images.

## spinner

Type: `String|Object`\
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

## summary

Type: `Boolean`\
Default: `false`

Show a summary at the end the build process. A table with the following information will be displayed:

- file name
- file size
- build time

You may also enable this option by passing the `--summary` or `-s` flag to the build command.

```sh
maizzle build --summary
```
