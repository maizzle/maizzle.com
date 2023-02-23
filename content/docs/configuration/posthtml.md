---
title: "PostHTML configuration"
description: "Configuring PostHTML options in Maizzle"
---

# PostHTML configuration

Maizzle uses PostHTML for templating and transformations, and you can configure it or even register plugins that can further transform your HTML emails.

## Options

PostHTML is configured under `build.posthtml.options` in your `config.js`.

### directives

You can configure the PostHTML parser to correctly process custom directives.

For example, you may tell it to ignore `<?php ?>` tags instead of treating them as HTML:

<code-sample title="config.js">

  ```js
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

</code-sample>

### xmlMode

Type: Boolean\
Default: `false`

Enable `xmlMode` if you're using Maizzle to output XML content, and not actual HTML.

<code-sample title="config.js">

  ```js
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

</code-sample>

### decodeEntities

Type: Boolean\
Default: `false`

Set this to `true` to have entities within the document decoded.

<code-sample title="config.js">

  ```js
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

</code-sample>

### lowerCaseTags

Type: Boolean\
Default: `false`

Set this to `true` to output all tags in lowercase. Works only when `xmlMode` is disabled.

<code-sample title="config.js">

  ```js
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

</code-sample>

### lowerCaseAttributeNames

Type: Boolean\
Default: `false`

Output all attribute names in lowercase.

<alert type="warning">This has a significant impact on speed.</alert>

<code-sample title="config.js">

  ```js
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

</code-sample>

### recognizeCDATA

Type: Boolean\
Default: `false`

Recognize CDATA sections as text even if the `xmlMode` option is disabled.

<alert>If `xmlMode` is enabled, CDATA sections will always be recognized as text.</alert>

<code-sample title="config.js">

  ```js
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

</code-sample>

### recognizeSelfClosing

Type: Boolean\
Default: `false`

If enabled, self-closing tags will trigger the `onclosetag` event even if `xmlMode` is disabled.

<alert>When `xmlMode` is enabled self-closing tags will always be recognized.</alert>

<code-sample title="config.js">

  ```js
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

</code-sample>

### sourceLocations

Type: Boolean\
Default: `false`

If set to `true`, AST nodes will have a `location` property containing the `start` and `end` line and column position of the node.

<code-sample title="config.js">

  ```js
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

</code-sample>

### recognizeNoValueAttribute

Type: Boolean\
Default: `true`

If set to `true`, PostHTML will render attributes with no values exactly as they were written and will not add `=""` to them.

<code-sample title="config.js">

  ```js
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

</code-sample>

### singleTags

Type: Array&lt;String|RegExp&gt;\
Default: `[]`

Use the `singleTags` option to tell PostHTML to treat custom tags as self-closing.

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      posthtml: {
        options: {
          singleTags: ['custom']
        }
      }
    }
  }
  ```

</code-sample>

You may then use the `<custom />` tag as self-closing:

<code-sample title="src/templates/example.html">

  ```xml
  <custom name="opencounter" type="tracking" />
  ```

</code-sample>

### closingSingleTag

Type: String\
Default: `'default'`

Define the closing format for single tags.

By default it will not close self-closing tags that it knows about:

<code-sample title="src/templates/example.html">

  ```xml
  <img>
  <p></p>
  ```

</code-sample>

Available options:

##### **tag**

Will add a closing tag.

<code-sample title="config.js">

  ```js
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

</code-sample>

<code-sample title="src/templates/example.html">

  ```xml
  <custom></custom>
  ```

</code-sample>

##### **slash**

Will add a closing tag.

<code-sample title="config.js">

  ```js
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

</code-sample>

<code-sample title="src/templates/example.html">

  ```xml
  <custom />
  ```

</code-sample>

### quoteAllAttributes

Type: Boolean\
Default: `true`

Disable if you want to remove quotes on all attributes

<code-sample title="config.js">

  ```js
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

</code-sample>

<code-sample title="src/templates/example.html">

  ```xml
  <img src=example.jpg>
  ```

</code-sample>

### replaceQuote

Type: Boolean\
Default: `true`

Disable if you want to remove quotes on all attributes.

<code-sample title="config.js">

  ```js
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

</code-sample>

<code-sample title="src/templates/example.html">

  ```xml
  <!-- `true` (default) -->
  <img src="<?php echo $foo[&quote;bar&quote;] ?>">

  <!-- `false` -->
  <img src="<?php echo $foo["bar"] ?>">
  ```

</code-sample>

### quoteStyle

Type: Number\
Default: `2`

Specify the attribute value quotes style.

<code-sample title="config.js">

  ```js
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

</code-sample>

<code-sample title="src/templates/example.html">

  ```xml
  <!-- `2` (double quotes, default) -->
  <img src="example.png" onload="testFunc("test")">

  <!-- `1` (single quotes) -->
  <img src='example.png' onload='testFunc("test")'>

  <!-- `0` (based on attribute value) -->
  <img src="example.png" onload='testFunc("test")'>
  ```

</code-sample>

## Plugins

Register any PostHTML plugins that you would like to use, in the `plugins` array:

<code-sample title="config.js">

  ```js
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

</code-sample>

### Custom plugins

Here's how you can write a PostHTML plugin right in your Maizzle `config.js` file:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      posthtml: {
        plugins: [
          // Inline plugin that adds a random number to all img src URLs
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

</code-sample>

<alert>Note that this is a naive example that doesn't take existing query strings into account.</alert>

### Built-in plugins

Maizzle already uses the following plugins, no need to add them to your config:

- [posthtml-extend](https://github.com/posthtml/posthtml-extend)
- [posthtml-modules](https://github.com/posthtml/posthtml-modules)
- [posthtml-expressions](https://github.com/posthtml/posthtml-expressions)
- [posthtml-fetch](https://github.com/posthtml/posthtml-fetch)
- [posthtml-mso](https://github.com/posthtml/posthtml-mso)
- [posthtml-base-url](https://github.com/posthtml/posthtml-base-url)
- [posthtml-content](https://github.com/posthtml/posthtml-content)
- [posthtml-extra-attributes](https://github.com/posthtml/posthtml-extra-attributes)
- [posthtml-markdownit](https://github.com/posthtml/posthtml-markdownit)
- [posthtml-postcss-merge-longhand](https://github.com/posthtml/posthtml-postcss-merge-longhand)
- [posthtml-remove-attributes](https://github.com/princed/posthtml-remove-attributes)
- [posthtml-safe-class-names](https://github.com/posthtml/posthtml-safe-class-names)
- [posthtml-url-parameters](https://github.com/posthtml/posthtml-url-parameters)
