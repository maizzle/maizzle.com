---
title: "URL Parameters"
description: "Easily append custom URL parameters to links in your HTML email template"
---

# URL Parameters

Maizzle can automatically append custom parameters to your URLs.

## Usage

To add the same parameters to all URLs in all Templates, use your environment config:

<code-sample title="config.js">

  ```js
  module.exports = {
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

</code-sample>

## Local

Of course, you may define URL parameters at a Template level, through Front Matter:

<code-sample title="src/templates/example.html">

  ```xml
  ---
  title: "These URL params are unique to this template"
  urlParameters:
    utm_source: custom
    utm_campaign: "Pre-launch August"
  ---

  <extends src="src/layouts/main.html">
    <block name="template">
      <!-- ... -->
    </block>
  </extends>
  ```

</code-sample>

## Options

You may configure the tags to process, as well as the options for the library.

### tags

Type: `array`
<br>
Default: `['a']`

Array of tag names to process. Only URLs inside `href=""` attributes of tags in this array will be processed.

### qs

Options to pass to the [query-string](https://github.com/sindresorhus/query-string#stringifyobject-options) library.

For example, Maizzle disables encoding by default, but you can enable it:

<code-sample title="config.js">

  ```js
  module.exports = {
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

</code-sample>

Result:

```xml
https://example.com/?foo=%40Bar%40
```

## API

<code-sample title="app.js">

  ```js
  const {addURLParams} = require('@maizzle/framework')

  const html = await addURLParams('<a href="https://example.com">test</a>', {utm_source: 'maizzle'})
  ```

</code-sample>
