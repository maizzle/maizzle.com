---
title: Html
description: The Html component is document root element for Maizzle email templates.
section: Components
order: 1
---

# Html

The document root element for your email templates.

## Usage

Use `<Html>` as the root element in your templates to render an `<html>` tag with the necessary attributes for email clients:

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue [emails/example.vue]
  <template>
    <Html> // [!code ++]
      <Head />
      <Body>
        <!-- your email content -->
      </Body>
    </Html> // [!code ++]
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <!DOCTYPE html>
  <html lang="en" dir="ltr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <!-- <head>, <body>... -->
  </html>
  ```
  :::
::

## Props

### doctype

Type: `string`\
Default: `'<!DOCTYPE html>'`

You may set a custom doctype by passing this prop to `<Html>`.

```vue [emails/example.vue]
<template>
  <Html doctype='<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">'>
    <Head />
    <Body>
      <!-- HTML 4.01 Transitional content -->
    </Body>
  </Html>
</template>
```

::callout{type="info"}
By default, Maizzle uses the HTML5 doctype, which is enough to trigger standards mode in all email clients that do support defining a doctype.
::

::callout{type="info"}
Void elements such as `<br>`, `<img>`, and `<hr>` will automatically get a self-closing slash (i.e. `<br />`) based on the doctype used.
::

### lang

Type: `string`\
Default: `'en'`

Sets the `lang` attribute on the `<html>` element. Setting it correctly matters: email clients, browsers, and assistive technology like screen readers may use it to interpret your content. This value is also provided to the child `Body` component.

```vue [emails/example.vue]
<template>
  <Html lang="de">
    <Head />
    <Body>
      <!-- German email content -->
    </Body>
  </Html>
</template>
```

### dir

Type: `'ltr' | 'rtl'`\
Default: `'ltr'`

Sets the text direction on the `<html>` element.

```vue [emails/example.vue]
<template>
  <Html lang="ar" dir="rtl">
    <Head />
    <Body>
      <!-- right-to-left content -->
    </Body>
  </Html>
</template>
```

### xmlns

Type: `boolean | string`\
Default: `true`

Controls whether VML and Office XML namespace declarations are included on the `<html>` element. These are required for Outlook VML support, like background images and rounded buttons. Set it to `false` to omit the namespace declarations:

```vue [emails/example.vue]
<template>
  <Html :xmlns="false">
    <!-- ... -->
  </Html>
</template>
```

### outlookFallback

Type: `boolean`\
Default: `true`

Toggle Outlook (MSO) and VML fallback markup for the entire template. Set this to `false` to use modern markup and skip MSO ghost tables, VML shapes, `xmlns:v` / `xmlns:o` attributes, and mso-specific CSS across all descendant components.

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue [emails/example.vue]
  <template>
    <Html :outlook-fallback="false">
      <Head />
      <Body>
        <!-- modern markup only across the whole template -->
      </Body>
    </Html>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html {2}
  <!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <!-- ... -->
    </head>
    <body style="margin: 0; width: 100%; height: 100%; padding: 0; word-break: break-word;">
      <!-- modern markup only across the whole template -->
    </body>
  </html>
  ```
  :::
::

Individual components can still re-enable their own MSO markup by passing `:outlook-fallback="true"` locally.
