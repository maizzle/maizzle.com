---
title: "Components configuration"
description: "Configuring components in Maizzle."
---

# Components configuration

Control where your Components live and how you reference them.

## root

Type: `String`\
Default: `'./'`

Root path where to look for folders containing component files.

## folders

Type: `Array`\
Default: `['components', 'layouts', 'emails']`

Folder paths where to look for component files. Relative to `root`.

If you keep your components in a different folder, you can add it here:

```js [config.js]
export default {
  components: {
    folders: ['custom-components'],
  },
}
```

The paths you defined will be added to the default folders.

## tagPrefix

Type: `String`\
Default: `'x-'`

Prefix string to use for component tags.

If you prefer to write `<a-button>` instead of `<x-button>`, do this:

```js [config.js]
export default {
  components: {
    tagPrefix: 'a-',
  },
}
```

## tag

Type: `String|Boolean`\
Default: `'component'`

You may alternatively reference any component using this tag name and passing in the component file path in the `src` prop.

By default, this ensures backwards compatibility with the old components system so you can continue to use syntax like `<component src="button.html" />` in your templates.

For example, if you prefer to write `<module src="button.html" />`, do this:

```js [config.js]
export default {
  components: {
    tag: 'module',
  },
}
```

Set it to `false` to disable this feature and only use `x-` tags.

## attribute

Type: `String`\
Default: `'src'`

You may define a custom attribute name to use for the `tag`.

```js [config.js]
export default {
  components: {
    attribute: 'href',
  },
}
```

You can now use `<component href="button.html" />` in your templates.

## fileExtension

Type: `String`|`String[]`\
Default: `'html'`

Define the file extension(s) that component files must use.

To define multiple file extensions, use an array:

```js [config.js]
export default {
  components: {
    fileExtension: ['html', 'php'],
  },
}
```

Any other files will be ignored and not be made available as components.

## yield

Type: `String`\
Default: `'yield'`

Name of the tag that will be replaced with the content that is passed to the component.

If you want to change it to be `content` as in previous versions of Maizzle, do this:

```js [config.js]
export default {
  components: {
    yield: 'content',
  },
}
```

You'd then define a component like this:

```html [components/button.html]
<a href="...">
  <content />
</a>
```

## slot

Type: `String`\
Default: `'slot'`

Name for the [`slot` tag](/docs/components#slots).

For example, maybe you want to change this to be `provide`:

```js [config.js]
export default {
  components: {
    slot: 'provide',
  },
}
```

You could then use `provide` instead of `slot` when defining a component:

```html [components/footer.html]
<script props>
  module.exports = {
    year: new Date().getFullYear(),
  }
</script>

<footer>
  <provide:footer-logo />

  <p>&copy; {{ year }}</p>

  <content />
</footer>
```

You'd fill `provide` as usual:

```html [emails/example.html]
<x-footer>
  <fill:footer-logo>
    <img src="logo.png">
  </fill:footer-logo>

  <p>Some content</p>
</x-footer>
```

Result:

```html [build_production/example.html]
<footer>
  <img src="logo.png">

  <p>&copy; 2023</p>

  <p>Some content</p>
</footer>
```

## fill

Type: `String`\
Default: `'fill'`

Name for the [`fill` tag](/docs/components#slots).

For example, maybe you want to change this to be `inject`:

```js [config.js]
export default {
  components: {
    fill: 'inject',
  },
}
```

Given the previous example, you'd now use `inject` instead of `fill` when defining a component:

```html [emails/example.html]
<x-footer>
  <inject:footer-logo>
    <img src="logo.png">
  </inject:footer-logo>

  <p>Some content</p>
</x-footer>
```

## slotSeparator

Type: `String`\
Default: `':'`

String to use as a separator between the `slot` tag and its name.

For example, changing it to `@`:

```js [config.js]
export default {
  components: {
    slotSeparator: '@',
  },
}
```

You'd then use `<slot@footer-logo />` and `<fill@footer-logo>`:

```html [emails/example.html]
<x-footer>
  <fill@footer-logo>
    <img src="logo.png">
  </fill@footer-logo>
</x-footer>
```

## push

Type: `String`\
Default: `'push'`

Name for the [`push` tag](/docs/components#stacks).

## stack

Type: `String`\
Default: `'stack'`

Name for the [`stack` tag](/docs/components#stacks).

## propsScriptAttribute

Type: `String`\
Default: `'props'`

Name of the props attribute to use in the `<script>` tag of a component.

If you change it to `locals`:

```js [config.js]
export default {
  components: {
    propsScriptAttribute: 'locals',
  },
}
```

... you'd then use `locals` instead of `props` when defining the script in a component:

```hbs [components/button.html]
<script locals>
  module.exports = {
    href: props.href || '#',
  }
</script>

<a href="{{ href }}">
  <yield />
</a>
```

## propsContext

Type: `String`\
Default: `'props'`

Name of the object that will be used to store the props of a component.

For example, if you change it to `data` like this:

```js [config.js]
export default {
  components: {
    propsContext: 'data',
  },
}
```

... you'd then use `data` instead of `props` when defining the props of a component:

```hbs [components/button.html]
<script props>
  module.exports = {
    href: data.href || '#', // using data.href instead of props.href
  }
</script>

<a href="{{ href }}">
  <yield />
</a>
```

## propsAttribute

Type: `String`\
Default: `'locals'`

Name of the attribute that will be used to pass props to a component as JSON.

Set to `locals` by default, for backwards compatibility with the old components system.

Again, let's change it to `data`:

```js [config.js]
export default {
  components: {
    propsAttribute: 'data',
  },
}
```

You'd then use `data` instead of `locals` when passing props as JSON to a component:

```html [emails/example.html]
<x-button data='{"href": "https://example.com"}'>
  Click me
</x-button>
```

## propsSlot

Type: `String`\
Default: `'props'`

String value used to retrieve the props passed to slot via `$slots.slotName.props`.

For example, if you change it to `data` and have a component with a `header` slot, you'd be able to access the props passed to the slot via `$slots.header.data`.

## parserOptions

Type: `Object`\
Default: `{ recognizeSelfClosing: true }`

Object to configure the underlying `posthtml-parser` library.

By default, it enables support for self-closing component tags.

## expressions

Type: `Object`\
Default: `{/*custom object*/}`

Object to configure how expressions are handled in components.

Maizzle passes your config variables and the contents of your `build.expressions` object to it, so that you have them all available inside your&nbsp;components.

## plugins

Type: `Array`\
Default: `[]`

Array of PostHTML plugins to apply to each parsed component.

## attrsParserRules

Type: `Object`\
Default: `{}`

Extra rules for the PostHTML plugin that is used by components to parse attributes.

## strict

Type: `Boolean`\
Default: `true`

In `strict` mode, an error will be thrown if a component cannot be rendered.

## utilities

Type: `Object`\
Default: `{ merge: _.mergeWith, template: _.template }`

Utility methods to be passed to `<script props>`.

By default you can use `mergeWith` and `template` from `lodash`.

## elementAttributes

Type: `Object`\
Default: `{}`

Define additional attributes that should be preserved for specific HTML elements.

It's an object with the following structure:

```js
TAG_NAME: (defaultAttributes) => {
  // return defaultAttributes
}
```

For example, say you have an attribute called `tracking-id` that you only use on `<div>` elements. By default, it would be stripped out in a component, because it's not a standard HTML attribute.

But you can add it to the 'valid' attributes list for `<div>` elements like this:

```js [config.js] {5-8}
export default {
  components: {
    elementAttributes: {
      DIV: (defaultAttributes) => {
        defaultAttributes.push('tracking-id')

        return defaultAttributes
      },
    },
  },
}
```

<Alert>This is only useful to control which elements can use what attributes. If you'd like to have all elements use an non-standard attribute, use `safelistAttributes` instead.</Alert>

## safelistAttributes

Type: `Array`\
Default: `['data-*']`

Array of attributes that should be preserved in components (on all elements).

You can use a `*` wildcard to match the rest of the string:

```js [config.js]
export default {
  components: {
    safelistAttributes: ['data-*', 'tracking-*'],
  },
}
```

## blacklistAttributes

Type: `Array`\
Default: `[]`

Array of attributes that should be removed from components (on all elements).

```js [config.js]
export default {
  components: {
    // remove the `id` attribute from all elements in components
    blacklistAttributes: ['id'],
  },
}
```
