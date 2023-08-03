---
title: "PostHTML configuration"
description: "Configuring PostHTML options in Maizzle."
---

# PostHTML configuration

Maizzle uses PostHTML for templating and transformations, and you can configure it or even register plugins that can further transform your HTML emails.

## Options

PostHTML is configured under `build.posthtml.options` in your `config.js`.

### directives

Type: Array\
Default: `[]`

You can configure the PostHTML parser to correctly process custom directives.

For example, you may tell it to ignore `<?php ?>` tags instead of treating them as HTML:

```js [config.js]
module.exports = {
  build: {
    posthtml: {
      options: {
        directives: [
          { name: '?php', start: '<', end: '>' }
        ]
      }
    }
  }
}
```

### xmlMode

Type: Boolean\
Default: `false`

Enable `xmlMode` if you're using Maizzle to output XML content, and not actual HTML.

```js [config.js]
module.exports = {
  build: {
    posthtml: {
      options: {
        xmlMode: true
      }
    }
  }
}
```

### decodeEntities

Type: Boolean\
Default: `false`

Set this to `true` to have entities within the document decoded.

```js [config.js]
module.exports = {
  build: {
    posthtml: {
      options: {
        decodeEntities: true
      }
    }
  }
}
```

### lowerCaseTags

Type: Boolean\
Default: `false`

Set this to `true` to output all tags in lowercase. Works only when `xmlMode` is disabled.

```js [config.js]
module.exports = {
  build: {
    posthtml: {
      options: {
        lowerCaseTags: true
      }
    }
  }
}
```

### lowerCaseAttributeNames

Type: Boolean\
Default: `false`

Output all attribute names in lowercase.

<Alert type="warning">This has a significant impact on speed.</Alert>

```js [config.js]
module.exports = {
  build: {
    posthtml: {
      options: {
        lowerCaseAttributeNames: true
      }
    }
  }
}
```
</CodeSample>

### recognizeCDATA

Type: Boolean\
Default: `false`

Recognize CDATA sections as text even if the `xmlMode` option is disabled.

<Alert>If `xmlMode` is enabled, CDATA sections will always be recognized as text.</Alert>

```js [config.js]
module.exports = {
  build: {
    posthtml: {
      options: {
        recognizeCDATA: true
      }
    }
  }
}
```

### recognizeSelfClosing

Type: Boolean\
Default: `true`

If enabled, self-closing tags will trigger the `onclosetag` event even if `xmlMode` is disabled.

<Alert>When `xmlMode` is enabled self-closing tags will always be recognized.</Alert>

Maizzle sets this to `true` to ensure self-closing tags like those of Components are rendered correctly.

```js [config.js]
module.exports = {
  build: {
    posthtml: {
      options: {
        recognizeSelfClosing: true
      }
    }
  }
}
```

### sourceLocations

Type: Boolean\
Default: `false`

If set to `true`, AST nodes will have a `location` property containing the `start` and `end` line and column position of the node.

```js [config.js]
module.exports = {
  build: {
    posthtml: {
      options: {
        sourceLocations: true
      }
    }
  }
}
```

### recognizeNoValueAttribute

Type: Boolean\
Default: `true`

If set to `true`, PostHTML will render attributes with no values exactly as they were written and will not add `=""` to them.

```js [config.js]
module.exports = {
  build: {
    posthtml: {
      options: {
        recognizeNoValueAttribute: true
      }
    }
  }
}
```

### singleTags

Type: Array&lt;String|RegExp&gt;\
Default: `[]`

Use the `singleTags` option to tell PostHTML to treat custom tags as self-closing.

<Alert type="warning">This needs to be used in conjunction with `closingSingleTag` to tell PostHTML how to close the tag, otherwise you will end up with an unclosed tag.</Alert>

```js [config.js]
module.exports = {
  build: {
    posthtml: {
      options: {
        singleTags: ['custom'],
        closingSingleTag: 'slash', // see docs below
      }
    }
  }
}
```

You may then use the `<custom />` tag as self-closing:

```xml [src/templates/example.html]
<custom name="opencounter" type="tracking" />
```

### closingSingleTag

Type: String\
Default: `'default'`

Define the closing format for single tags.

By default it will not close self-closing tags that it knows about:

```xml [src/templates/example.html]
<img>
<p></p>
```

Available options:

##### **tag**

Will add a closing tag.

```js [config.js]
module.exports = {
  build: {
    posthtml: {
      options: {
        singleTags: ['custom'],
        closingSingleTag: 'tag'
      }
    }
  }
}
```

```xml [src/templates/example.html]
<custom></custom>
```

##### **slash**

Will add a closing tag.

```js [config.js]
module.exports = {
  build: {
    posthtml: {
      options: {
        singleTags: ['custom'],
        closingSingleTag: 'slash'
      }
    }
  }
}
```

```xml [src/templates/example.html]
<custom />
```

### quoteAllAttributes

Type: Boolean\
Default: `true`

Disable if you want to remove quotes on all attributes

```js [config.js]
module.exports = {
  build: {
    posthtml: {
      options: {
        quoteAllAttributes: false
      }
    }
  }
}
```

```xml [src/templates/example.html]
<img src=example.jpg>
```

### replaceQuote

Type: Boolean\
Default: `true`

Disable if you want to remove quotes on all attributes.

```js [config.js]
module.exports = {
  build: {
    posthtml: {
      options: {
        replaceQuote: false
      }
    }
  }
}
```

```xml [src/templates/example.html]
<!-- `true` (default) -->
<img src="<?php echo $foo[&quote;bar&quote;] ?>">

<!-- `false` -->
<img src="<?php echo $foo["bar"] ?>">
```

### quoteStyle

Type: Number\
Default: `2`

Specify the attribute value quotes style.

```js [config.js]
module.exports = {
  build: {
    posthtml: {
      options: {
        quoteStyle: 1
      }
    }
  }
}
```

```xml [src/templates/example.html]
<!-- `2` (double quotes, default) -->
<img src="example.png" onload="testFunc("test")">

<!-- `1` (single quotes) -->
<img src='example.png' onload='testFunc("test")'>

<!-- `0` (based on attribute value) -->
<img src="example.png" onload='testFunc("test")'>
```

## Plugins

Type: Array\
Default: `[]`

Register any PostHTML plugins that you would like to use, in the `plugins` array:

```js [config.js]
const spaceless = require('posthtml-spaceless')

module.exports = {
  build: {
    posthtml: {
      plugins: [
        spaceless()
      ]
    }
  }
}
```

### Custom plugins

You may write your own PostHTML plugins, right in your Maizzle `config.js` file.

For example, here's a plugin that adds a random number to all `<img>` src URLs:

```js [config.js]
module.exports = {
  build: {
    posthtml: {
      plugins: [
        (() => tree => {
          const process = node => {
            if (node.tag === 'img' && node.attrs?.src) {
              const randomNumber = Math.floor(Math.random() * 10 ** 16).toString().padStart(16, '0')
              node.attrs.src = node.attrs.src + `?v=${randomNumber}`
            }

            return node
          }

          return tree.walk(process)
        })()
      ]
    }
  }
}
```

<Alert>Note that this is a naive example that doesn't take existing query strings into account.</Alert>

### Built-in plugins

Maizzle already uses the following PostHTML plugins internally:

- [posthtml-extend](https://github.com/posthtml/posthtml-extend)
- [posthtml-fetch](https://github.com/posthtml/posthtml-fetch)
- [posthtml-mso](https://github.com/posthtml/posthtml-mso)
- [posthtml-base-url](https://github.com/posthtml/posthtml-base-url)
- [posthtml-content](https://github.com/posthtml/posthtml-content)
- [posthtml-component](https://github.com/thewebartisan7/posthtml-components)
- [posthtml-extra-attributes](https://github.com/posthtml/posthtml-extra-attributes)
- [posthtml-markdownit](https://github.com/posthtml/posthtml-markdownit)
- [posthtml-postcss-merge-longhand](https://github.com/posthtml/posthtml-postcss-merge-longhand)
- [posthtml-remove-attributes](https://github.com/princed/posthtml-remove-attributes)
- [posthtml-safe-class-names](https://github.com/posthtml/posthtml-safe-class-names)
- [posthtml-url-parameters](https://github.com/posthtml/posthtml-url-parameters)
