---
title: "Components configuration"
description: "Configuring components in Maizzle"
---

# Components configuration

**👋 New components**

You are viewing the documentation for the new Components, introduced in `v4.4.0`.

Not ready to switch yet? See the [legacy Components configuration docs](https://v43x.maizzle.com/docs/configuration/components).

---

Control where your Components live and how you reference them.

<alert class="lg:hidden">We're testing a new components system for v4.4.0 - [give it a try](https://github.com/maizzle/framework/releases/tag/v4.4.0-beta.1)!</alert>

## root

Type: `String`\
Default: `'./'`

Root path where to look for folders containing component files.

## folders

Type: `Array`\
Default: `['src/components', 'src/layouts', 'src/templates']`

Folder paths where to look for component files. Relative to `root`.

If you keep your components in a different folder, you can add it here:

<code-sample title="config.js">

```js
module.exports = {
  build: {
    components: {
      folders: ['src/custom-components'],
    },
  }
}
```

</code-sample>

The paths you defined will be added to the default folders.

## tagPrefix

Type: `String`\
Default: `'x-'`

Prefix string to use for component tags.

If you prefer to write `<a-button>` instead of `<x-button>`, do this:

<code-sample title="config.js">

```js
module.exports = {
  build: {
    components: {
      tagPrefix: 'a-',
    },
  }
}
```

</code-sample>

## tag

Type: `String|Boolean`\
Default: `'component'`

You may alternatively reference any component using this tag name and passing in the component file path in the `src` prop.

By default, this ensures backwards compatibility with the old components system so you can continue to use syntax like `<component src="button.html" />` in your templates.

For example, if you prefer to write `<module src="button.html" />`, do this:

<code-sample title="config.js">

```js
module.exports = {
  build: {
    components: {
      tag: 'module',
    },
  }
}
```

</code-sample>

Set it to `false` to disable this feature and only use `x-` tags.

## attribute

Type: `String`\
Default: `'src'`

You may define a custom attribute name to use for the `tag`.

<code-sample title="config.js">

```js
module.exports = {
  build: {
    components: {
      attribute: 'href',
    },
  }
}
```

</code-sample>

You can now use `<component href="button.html" />` in your templates.

## fileExtension

Type: `String`\
Default: `'html'`

Define the file extension that component files must use.

Any other files will be ignored and not be made available as components.

## yield

Type: `String`\
Default: `'content'`

Name of the tag that will be replaced with the content that is passed to the component.

Maizzle uses `content` by default, to ensure backwards compatibility with the old components system.

If you want to change this to be `yield`:

<code-sample title="config.js">

```js
module.exports = {
  build: {
    components: {
      yield: 'yield',
    },
  }
}
```

</code-sample>

You'd then define a component like this:

<code-sample title="src/components/button.html">

```xml
<a href="...">
  <yield />
</a>
```

</code-sample>

## slot

Type: `String`\
Default: `'slot'`

Name for the [`slot` tag](/docs/components#slots).

For example, maybe you want to change this to be `provide`:

<code-sample title="config.js">

```js
module.exports = {
  build: {
    components: {
      slot: 'provide',
    },
  }
}
```

</code-sample>

You could then use `provide` instead of `slot` when defining a component:

<code-sample title="src/components/footer.html">

```jsx
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

</code-sample>

You'd fill `provide` as usual:

<code-sample title="src/templates/example.html">

```xml
<x-footer>
  <fill:footer-logo>
    <img src="logo.png">
  </fill:footer-logo>

  <p>Some content</p>
</x-footer>
```

</code-sample>

Result:

<code-sample title="build_production/example.html">

```html
<footer>
  <img src="logo.png">

  <p>&copy; 2023</p>

  <p>Some content</p>
</footer>
```

</code-sample>

## fill

Type: `String`\
Default: `'fill'`

Name for the [`fill` tag](/docs/components#slots).

For example, maybe you want to change this to be `inject`:

<code-sample title="config.js">

```js
module.exports = {
  build: {
    components: {
      fill: 'inject',
    },
  }
}
```

</code-sample>

Given the previous example, you'd now use `inject` instead of `fill` when defining a component:

<code-sample title="src/templates/example.html">

```xml
<x-footer>
  <inject:footer-logo>
    <img src="logo.png">
  </inject:footer-logo>

  <p>Some content</p>
</x-footer>
```

</code-sample>

## slotSeparator

Type: `String`\
Default: `':'`

String to use as a separator between the `slot` tag and its name.

For example, changing it to `@`:

<code-sample title="config.js">

```js
module.exports = {
  build: {
    components: {
      slotSeparator: '@',
    },
  }
}
```

</code-sample>

You'd then use `<slot@footer-logo />` or `<fill@footer-logo></fill@footer-logo>`.

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

<code-sample title="config.js">

```js
module.exports = {
  build: {
    components: {
      propsScriptAttribute: 'locals',
    },
  }
}
```

</code-sample>

... you'd then use `locals` instead of `props` when defining the script in a component:

<code-sample title="src/components/button.html">

```jsx
<script locals>
  module.exports = {
    href: props.href || '#',
  }
</script>

<a href="{{ href }}">
  <content />
</a>
```

</code-sample>

## propsContext

Type: `String`\
Default: `'props'`

Name of the object that will be used to store the props of a component.

For example, if you change it to `data` like this:

<code-sample title="config.js">

```js
module.exports = {
  build: {
    components: {
      propsContext: 'data',
    },
  }
}
```

</code-sample>

... you'd then use `data` instead of `props` when defining the props of a component:

<code-sample title="src/components/button.html">

```jsx
<script props>
  module.exports = {
    href: data.href || '#', // using data.href instead of props.href
  }
</script>

<a href="{{ href }}">
  <content />
</a>
```

</code-sample>

## propsAttribute

Type: `String`\
Default: `'locals'`

Name of the attribute that will be used to pass props to a component as JSON.

Set to `locals` by default, for backwards compatibility with the old components system.

Again, let's change it to `data`:

<code-sample title="config.js">

```js
module.exports = {
  build: {
    components: {
      propsAttribute: 'data',
    },
  }
}
```

</code-sample>

You'd then use `data` instead of `locals` when passing props as JSON to a component:

<code-sample title="src/templates/example.html">

```xml
<x-button data='{"href": "https://example.com"}'>
  Click me
</x-button>
```

</code-sample>

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

Object to configure `posthtml-expressions`.

By default, Maizzle passes your config variables and the contents of your `build.posthtml.expressions` object to it, so that you have them all available inside your&nbsp;components.

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

<code-sample>

```js
TAG_NAME: (defaultAttributes) => {
  // return defaultAttributes
}
```

</code-sample>

For example, say you have an attribute called `tracking-id` that you only use on `<div>` elements.
By default, it would be stripped out in a component, because it's not a standard HTML attribute.

But you can add it to the 'valid' attributes list for `<div>` elements like this:

<code-sample title="config.js">

```js
module.exports = {
  build: {
    components: {
      elementAttributes: {
        DIV: (defaultAttributes) => {
          defaultAttributes.push('tracking-id')

          return defaultAttributes
        },
      },
    },
  }
}
```

</code-sample>

<alert>This is only useful to control which elements can use what attributes. If you'd like to have all elements use an non-standard attribute, use `safelistAttributes` instead.</alert>

## safelistAttributes

Type: `Array`\
Default: `['data-*']`

Array of attributes that should be preserved in components (on all elements).

You can use a `*` wildcard to match the rest of the string:

<code-sample title="config.js">

```js
module.exports = {
  build: {
    components: {
      safelistAttributes: ['data-*', 'tracking-*'],
    },
  }
}
```

</code-sample>

## blacklistAttributes

Type: `Array`\
Default: `[]`

Array of attributes that should be removed from components (on all elements).

<code-sample title="config.js">

```js
module.exports = {
  build: {
    components: {
      // remove the `id` attribute from all elements in components
      blacklistAttributes: ['id'],
    },
  }
}
```

</code-sample>
