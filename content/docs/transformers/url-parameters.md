---
title: "URL Parameters"
description: "Easily append custom URL parameters to links in your HTML email template."
---

# URL Parameters

Maizzle can automatically append custom parameters to your URLs.

## Usage

To add the same parameters to all URLs in all Templates, use the environment config:

```js [config.js]
export default {
  urlParameters: {
    _options: {
      tags: ['a'],
      qs: {}
    },
    utm_source: 'maizzle',
    utm_campaign: 'Campaign Name',
    utm_medium: 'email',
    custom_parameter: 'foo',
    '1stOfApril': 'bar'
  }
}
```

## Front Matter

Of course, you may define URL parameters at a Template level, through Front Matter:

```hbs [emails/example.html]
---
title: "These URL params are unique to this template"
urlParameters:
  utm_source: custom
  utm_campaign: "Pre-launch August"
---

<x-main>
  <!-- your email HTML... -->
</x-main>
```

## Options

Configure the tags to process and other transformer options.

### tags

Type: `String[]`\
Default: `['a']`

Array of tag names to process.

By default, only URLs inside [known attributes](#attributes) of tags in this array will be processed.

You may use CSS selectors to select only certain attributes. For example, this will apply parameters only to anchors that include example.com in their `href` value:

```js [config.js]
export default {
  urlParameters: {
    _options: {
      tags: ['a[href*="example.com"]'],
    },
    utm_source: 'maizzle',
  }
}
```

### attributes

Type: `String[]`\
Default: `['src', 'href', 'poster', 'srcset', 'background']`

Array of attributes to process for the given tags.

You may override this with your own list of attributes - the plugin will only process URLs in these attributes.

```js [config.js]
export default {
  urlParameters: {
    _options: {
      tags: ['a', 'img'],
      attributes: ['data-href', 'src']
    },
    foo: 'bar',
  }
}
```

Given this HTML:

```html
<a href="https://foo.bar" data-href="https://example.com">Test</a>
<img src="https://example.com">
```

The result will be:

```html
<a href="https://foo.bar" data-href="https://example.com?foo=bar">Test</a>
<img src="https://example.com?foo=bar">
```

### strict

Type: `Boolean`\
Default: `true`

By default, query parameters are appended only to valid URLs.

Disable strict mode to append parameters to any string:

```js [config.js]
export default {
  urlParameters: {
    _options: {
      strict: false,
    },
    foo: 'bar'
  }
}
```

Input:

```html
<a href="example.com">test</a>
```

Result:

```html
<a href="example.com?foo=bar">test</a>
```

### qs

Type: `Object`\
Default: `undefined`

Options to pass to the [query-string](https://github.com/sindresorhus/query-string#stringifyobject-options) library.

For example, Maizzle disables encoding by default, but you can enable it:

```js [config.js]
export default {
  urlParameters: {
    _options: {
      qs: {
        encode: true
      }
    },
    foo: '@Bar@'
  }
}
```

Result:

```html
https://example.com/?foo=%40Bar%40
```

## API

```js [app.js]
import { addURLParams } from '@maizzle/framework'

const html = await addURLParams('<a href="https://example.com">test</a>', {utm_source: 'maizzle'})
```
