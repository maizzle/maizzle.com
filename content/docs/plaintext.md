---
title: "Plaintext"
description: "Automatically create plaintext versions of your HTML emails in Maizzle."
---

# Plaintext

Maizzle can automatically create plaintext versions of your HTML emails.

## Usage

Generate a plaintext version for all your email templates by adding a `plaintext` key to your templates source in `config.js`:

```js [config.js]
module.exports = {
  build: {
    templates: {
      plaintext: true,
    },
  },
}
```

## Custom path

You may configure where the plaintext files are output and what file extension they have.

```js [config.js]
module.exports = {
  build: {
    templates: {
      plaintext: {
        destination: {
          path: 'dist/brand/plaintext',
          extension: 'rtxt',
        }
      },
    },
  },
}
```

<Alert>The `path` option must be a directory path, otherwise a single plaintext file will be generated for all of your emails.</Alert>

Using multiple Template sources? You can enable plaintext on a per-source basis:

```js [config.js]
module.exports = {
  build: {
    templates: [
      {
        source: 'src/templates',
        destination: {
          path: 'build-1',
        },
        plaintext: true // build-1 folder only: output plaintext files next to the HTML counterparts
      },
      {
        source: 'src/templates',
        destination: {
          path: 'build-2',
        },
        // build-2 folder only: output plaintext files in the `plaintext` subdirectory, with custom extension
        plaintext: {
          destination: {
            path: 'build-2/plaintext',
            extension: 'rtxt'
          }
        },
      },
      // plaintext won't be generated in the `build-3` directory, because we didn't enable it
      {
        source: 'src/templates',
        destination: {
          path: 'build-3',
        }
      },
    ]
  }
}
```

## Front Matter

Generate a plaintext version for a single Template by enabling it in its Front Matter:

```hbs [src/templates/example.html]
---
plaintext: true
---

<x-main>
  <!-- your email HTML... -->
</x-main>
```

A `.txt` file will be output at the same location with the compiled Template.

## Permalink

If you're using the [`permalink`](/docs/configuration/templates#permalink) Front Matter key in your Template, Maizzle will output the `.txt` file at that location:

```hbs [src/templates/example.html]
---
permalink: example/email.html
plaintext: true
---

<x-main>
  <!-- your email HTML... -->
</x-main>
```

For the Template above, `example/email.txt` will be generated.

## Customization

By default, the plaintext generator in Maizzle uses most default options from [`string-strip-html`](https://codsen.com/os/string-strip-html/#optional-options-object), with this exception:

```js
dumpLinkHrefsNearby: {
  enabled: true
},
```

This ensures URLs from anchors are actually output in the plaintext version.

You may use a `plaintext` object in your `config.js` to overwrite any of the defaults from `string-strip-html`.

```js [config.js]
module.exports = {
  build: {
    templates: {
      plaintext: {
        ignoreTags: [],
        onlyStripTags: [],
        stripTogetherWithTheirContents: ['script', 'style', 'xml', 'not-plaintext'],
        skipHtmlDecoding: false,
        trimOnlySpaces: false,
        dumpLinkHrefsNearby: {
          enabled: false,
          putOnNewLine: false,
          wrapHeads: '',
          wrapTails: ''
        },
        cb: null,
      },
    },
  },
}
```

<Alert>With the config above, Maizzle will output plaintext versions for all Templates.</Alert>

### Front Matter override

Using `plaintext: true` like in the [Front Matter example](/docs/plaintext#front-matter) will override your plaintext config object if you have it defined in `config.js` like above.

If you need to control `string-strip-html` options when generating plaintext for a single Template, you need to use `enabled: true`.

You basically add the options object as shown above, but in Front Matter syntax:

```hbs
---
plaintext:
  dumpLinkHrefsNearby:
    enabled: true
    putOnNewLine: true,
    wrapHeads: '['
    wrapTails: ']'
---

<x-main>
  <a href="https://example.com">Click here</a>
</x-main>
```

That will output:

```
Click here

[https://example.com]
```

## `<plaintext>` tag

You can output content only in the plaintext version, with the `<plaintext>` tag:

```hbs [src/templates/example.html]
---
plaintext: true
---

<x-main>
  This text shows in both the HTML and the plaintext versions.

  <plaintext>This will be output only in the plaintext version</plaintext>
</x-main>
```

## `<not-plaintext>` tag

You may also discard content from the plaintext version while preserving it in the HTML, with the help of the `<not-plaintext>` tag:

```hbs [src/templates/example.html]
---
plaintext: true
---

<x-main>
  This text shows in both the HTML and the plaintext versions.

  <not-plaintext>
    <p>This paragraph will be output only in the HTML version</p>
  </not-plaintext>
</x-main>
```

## API

You may render an HTML string to plaintext in your application with the help of the `plaintext()` method. The custom tags, like `<plaintext>`, are also supported.

```js [app.js]
const Maizzle = require('@maizzle/framework')

const {plaintext} = await Maizzle.plaintext(`<p>your html string</p>`)

// your html string
```

You can also pass a config object to this method:

```js [app.js]
const {plaintext} = await Maizzle.plaintext('html string', {
  plaintext: {
    // string-strip-html options
  }
})
```

The object that you pass here must contain a `plaintext: {}` key, as explained in the [customization section](/docs/plaintext#customization) above.
