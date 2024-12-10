---
title: "Base URL"
description: "Set a base URL and easily prepend absolute URLs to any source in your HTML emails."
---

# Base URL

Define a string that will be prepended to all sources and hrefs in your HTML and CSS.

Useful if you already host your images somewhere like a CDN, so you don't have to write the full URL every time when developing.

Works with the following HTML attributes:

- src
- href
- srcset
- poster
- background

... and with the following CSS properties:

- <span class="text-sm font-mono">background: url()</span>
- <span class="text-sm font-mono">background-image: url()</span>
- <span class="text-sm font-mono">@font-face { src: url() }</span>

Both `<style>` tags and `style=""` attributes are supported. CSS property values with multiple `url()` sources (like @font-face declarations) are supported as well.

## Usage

Make it globally available by setting it in your environment config:

```js [config.js]
export default {
  baseURL: 'https://cdn.example.com/'
}
```

<Alert type="danger">Note that this will apply to _all_ sources and hrefs, including `<a>` tags, as long as the source's initial value is not an URL.</Alert>

## Customization

You'll most likely want to customize the transformer so that it applies only to certain elements, or even only to certain attributes of certain elements.

### tags

Type: `String[]|<Record<string, boolean|string>>`\
Default: [see default tags](https://github.com/posthtml/posthtml-base-url/blob/main/lib/index.js)

Apply the base URL only to `<img>` tags:

```js [config.js]
export default {
  baseURL: {
    url: 'https://cdn.example.com/',
    tags: ['img'],
  },
}
```

That will apply the `url` to all known source attributes on all `<img>` elements in your HTML, like `src=""` or `srcset="`.

If you need greater control, you may specify which attributes of which tags should be prepended what URL, by passing in an object instead:

```js [config.js]
export default {
  baseURL: {
    url: 'https://cdn.example.com/',
    tags: {
      img: {
        src: true, // use the value of `url` above
        srcset: 'https://bar.com/',
      },
    },
  },
}
```

### attributes

Type: `Object`\
Default: `{}`

Key-value pairs of attributes and what to prepend to them.

```js [config.js]
export default {
  baseURL: {
    attributes: {
      'data-url': 'https://example.com/',
    },
  },
}
```

### styleTag

Type: `Boolean`\
Default: `true`

By default, the transformer will prepend your `url` to all `url()` sources in `<style>` tags. Set this option to `false` to prevent it from doing so:

```js [config.js]
export default {
  baseURL: {
    url: 'https://cdn.example.com/',
    tags: ['img'],
    styleTag: false,
  },
}
```

### inlineCss

Type: `Boolean`\
Default: `true`

Similarly, the transformer will prepend your `url` to all `url()` sources in `style=""` attributes. You may disable this if you need to:

```js [config.js]
export default {
  baseURL: {
    url: 'https://cdn.example.com/',
    tags: ['img'],
    inlineCss: false,
  },
}
```

## Front Matter

You may override it for a single Template, through Front Matter:

```hbs [emails/example.html]
---
baseURL: 'https://res.cloudinary.com/user/image/upload/'
---

<x-main>
  <img src="example.jpg">
</x-main>
```

## Trailing slash

When `baseURL` is not an absolute URL, `path.join` is used to prepend the base URL to the source, so you don't need to worry about trailing slashes.

However, you need to consider trailing slashes when the base URL is an absolute URL.

```html [baseURL: 'https://example.com/img']
<img src="/folder/product-1.png">

<!-- Result -->
<img src="https://example.com/img/folder/product-1.png">
```

If we add a trailing slash to `baseURL`, we get a double slash in the result:

```html [baseURL: 'https://example.com/img/']
<img src="/folder/product-1.png">

<!-- Result -->
<img src="https://example.com/img//folder/product-1.png">
```

## Disabling

If you have `baseURL` set globally (in your config), you may disable it for a Template by setting its value to an empty string or a falsy value in Front Matter:

```yaml
---
baseURL: ''
---
```

or

```yaml
---
baseURL: false
---
```

## API

```js [app.js]
import { addBaseUrl } from '@maizzle/framework'

const config = {
  url: 'https://cdn.example.com/img/',
}

const html = await addBaseUrl('<img src="image.jpg">', config)
```
