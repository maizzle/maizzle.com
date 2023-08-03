---
title: "Layouts configuration"
description: "Configuring layout options in Maizzle."
---

# Layouts configuration

**⚠️ Deprecation notice**

The docs on this page apply only to the [legacy Layouts syntax](https://v43x.maizzle.com/docs/layouts), that used `<extends>` / `<block>` tags. If you're using the new, x-tags Components syntax (which we recommended), you don't need it.

This configuration is now deprecated and will be removed in the next major release.

---

You may use the `layouts` key in `config.js` to customize the way you use Layouts:

```js [config.js]
module.exports = {
  build: {
    layouts: {
      // ... options
    }
  }
}
```

Let's take a look at the available options:

### Encoding

You may specify the encoding used by your Layout files through the `encoding` option:

```js [config.js]
module.exports = {
  build: {
    layouts: {
      encoding: 'windows-1250',
    }
  }
}
```

By default, this is set to `utf8`.

<Alert>This encoding is only used when reading a Layout file from disk, it does not automatically set the `<meta charset>` tag in your compiled Template.</Alert>

### Blocks

Normally, Template Blocks are defined through the `<block>` tag.

However, you may customize this tag name:

```js [config.js]
module.exports = {
  build: {
    layouts: {
      slotTagName: 'slot', // default: 'block'
      fillTagName: 'fill' // default: 'block'
    }
  }
}
```

Now you can use `<slot>` tags in the Layout, and `<fill>` tags in your Template:

```hbs [src/layouts/main.html] {7}
<!doctype html>
<html>
<head>
  <style>{{{ page.css }}}</style>
</head>
<body>
  <slot name="template"></slot>
</body>
```

```hbs [src/templates/example.html] {6}
---
title: "A template with a <fill> tag"
---

<extends src="src/layouts/main.html">
  <fill name="template"></fill>
</extends>
```

### Root

You may define a path to the directory where your Layouts live:

```js [config.js]
module.exports = {
  build: {
    layouts: {
      root: 'src/layouts',
    }
  }
}
```

This allows you to specify a `src=""` relative to the path in that `root` key:

```xml [src/templates/example.html]
<extends src="main.html">
  <block name="template">
    <!--  -->
  </block>
</extends>
```

<Alert type="danger">If you're extending a file that also extends a file (i.e. when extending a Template), this will not work. Instead, don't define the `root` key and only use project root-relative paths (i.e. `src/templates/template.html`)</Alert>

### Tag

You may use a tag name other than `extends`:

```js [config.js]
module.exports = {
  build: {
    layouts: {
      tagName: 'layout',
    }
  }
}
```

```xml [src/templates/example.html]
<layout src="src/layouts/main.html">
  <block name="template">
    <!-- ... -->
  </block>
</layout>
```
