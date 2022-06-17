---
title: "Plaintext"
description: "Automatically create plaintext versions of your HTML emails in Maizzle"
---

# Plaintext

Maizzle can automatically create plaintext versions of your HTML emails.

## Usage

Generate a plaintext version for all your email templates by adding a `plaintext` key to your templates source in `config.js`:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      templates: {
        plaintext: true,
        // ...
      },
    },
  }
  ```

</code-sample>

## Custom path

You may configure where the plaintext files are output and what file extension they have.

<code-sample title="config.js">

  ```js
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

</code-sample>

<alert>The `path` option must be a directory path, otherwise a single plaintext file will be generated for all of your emails.</alert>

Using multiple Template sources? You can enable plaintext on a per-source basis:

<code-sample title="config.js">

  ```js
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

</code-sample>

## Front Matter

Generate a plaintext version for a single Template by enabling it in its Front Matter:

<code-sample title="src/templates/example.html">

  ```xml
  ---
  plaintext: true
  ---

  <extends src="src/layouts/main.html">
    <block name="template">
      <!-- ... -->
    </block>
  </extends>
  ```

</code-sample>

A `.txt` file will be output at the same location with the compiled Template.

## Permalink

If you're using the [`permalink`](/docs/configuration/templates#permalink) Front Matter key in your Template, Maizzle will output the `.txt` file at that location:

<code-sample title="src/templates/example.html">

  ```xml
  ---
  permalink: example/email.html
  plaintext: true
  ---

  <extends src="src/layouts/main.html">
    <block name="template">
      <!-- ... -->
    </block>
  </extends>
  ```

</code-sample>

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

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      templates: {
        plaintext: {
          ignoreTags: [],
          onlyStripTags: [],
          stripTogetherWithTheirContents: ['script', 'style', 'xml'],
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

</code-sample>

<alert>With the config above, Maizzle will output plaintext versions for all Templates.</alert>

### Front Matter override

Using `plaintext: true` like in the [Front Matter example](/docs/plaintext#front-matter) will override your plaintext config object if you have it defined in `config.js` like above.

If you need to control `string-strip-html` options when generating plaintext for a single Template, you need to use `enabled: true`.

You basically add the options object as shown above, but in Front Matter syntax:

<code-sample title="src/templates/example.html">

  ```xml
  ---
  plaintext:
    dumpLinkHrefsNearby:
      enabled: true
      putOnNewLine: true,
      wrapHeads: '['
      wrapTails: ']'
  ---

  <extends src="src/layouts/main.html">
    <block name="template">
      <a href="https://example.com">Click here</a>
    </block>
  </extends>
  ```

</code-sample>

That will output:

```
Click here

[https://example.com]
```

## &lt;plaintext&gt; tag

You can output content only in the plaintext version, with the `<plaintext>` tag:

<code-sample title="src/templates/example.html">

  ```xml
  ---
  plaintext: true
  ---

  <extends src="src/layouts/main.html">
    <block name="template">
      This text shows in both the HTML and the plaintext versions.
      <plaintext>This will be output only in the plaintext version</plaintext>
    </block>
  </extends>
  ```

</code-sample>

## API

You may render an HTML string to plaintext in your application with the help of the `plaintext()` method.

<code-sample title="app.js">

  ```js
  const Maizzle = require('@maizzle/framework')

  const {plaintext} = await Maizzle.plaintext(`<p>your html string</p>`)

  // your html string
  ```

</code-sample>

You can also pass a config object to this method:

<code-sample title="app.js">

  ```js
  const {plaintext} = await Maizzle.plaintext('html string', {
    plaintext: {
      // string-strip-html options
    }
  })
  ```

</code-sample>

The object that you pass here must contain a `plaintext: {}` key, as explained in the [customization section](/docs/plaintext#customization) above.
