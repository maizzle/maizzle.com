---
title: "Plaintext"
description: "Automatically create plaintext versions of your HTML emails in Maizzle."
---

# Plaintext

Maizzle can automatically create plaintext versions of your HTML emails.

## Usage

Generate a plaintext version for all your email templates by adding a `plaintext` key to your templates source in `config.js`:

```js [config.js]
export default {
  plaintext: true,
}
```

## Custom path

Set the `plaintext` key to be a directory path to output plaintext files to a custom location. Plaintext files will be output relative to the `build.output.path` folder.

```js [config.js]
export default {
  plaintext: 'dist/brand/plaintext',
}
```

You may configure both the output directory and the file extension by providing an object with `output.path` and `output.extension` keys:

```js [config.js]
export default {
  plaintext: {
    output: {
      path: 'dist/brand/plaintext',
      extension: 'rtxt',
    }
  },
}
```

<Alert>The `path` option must be a directory path, otherwise a single plaintext file will be generated for all of your emails.</Alert>

## Front Matter

Generate a plaintext version for a specific Template by enabling it in its Front Matter:

```hbs [src/templates/example.html]
---
plaintext: true
---

<x-main>
  <!-- your email HTML... -->
</x-main>
```

A `.txt` file will be output at the same location with the compiled Template.

You may of course set `plaintext` to a custom path in Front Matter as well.

Using a file path for `plaintext` in Front Matter will output that file at the specified location relative to the project root:

```hbs [src/templates/example.html]
---
plaintext: dist/brand/plain.txt
---
```

This will output the plaintext file at `dist/brand/plain.txt` relative to your project root:

```sh no-root {1-3}
dist
└─  brand
  └─  plain.txt
src
└─  templates
  └─  example.html
package.json
...
```

However if you use a directory path, the plaintext file will be output relative to the `build.output.path` folder instead, and will use the same name as the Template:

```hbs [src/templates/example.html]
---
plaintext: dist/brand
---
```

Result:

```sh no-root {2-4}
build_production
└─  dist
  └─  brand
    └─  example.txt
src
└─  templates
  └─  example.html
package.json
...
```

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

No matter what you set `plaintext` to in Front Matter in this case, as long as it's a truthy value the plaintext file will be output at the location specified by `permalink`, using the exact same filename but with the `.txt` extension.

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
export default {
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
}
```

<Alert>With the config above, Maizzle will output plaintext versions for all Templates.</Alert>

### Front Matter override

Using `plaintext: true` like in the [Front Matter example](/docs/plaintext#front-matter) will override your plaintext config object if you have it defined in `config.js` like above.

If you need to control `string-strip-html` options when generating plaintext for a specific Template, you need to use `enabled: true`.

You basically add the options object to the Template's Front Matter:

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

## &lt;plaintext&gt; tag

Output content only in the plaintext version:

```hbs [src/templates/example.html]
---
plaintext: true
---

<x-main>
  This text shows in both the HTML and the plaintext versions.

  <plaintext>This will be output only in the plaintext version</plaintext>
</x-main>
```

## &lt;not-plaintext&gt; tag

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
import { generatePlaintext } from '@maizzle/framework'

const plaintext = await generatePlaintext(`<p>your html string</p>`)

// your html string
```

You can also pass a config object to this method:

```js [app.js]
const plaintext = await generatePlaintext('html string', {
  posthtml: {
    // PostHTML options...
  }
  // ... string-strip-html options
})
```
