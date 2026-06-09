---
title: NoWidows
description: Prevents orphaned words in text by replacing the last space with a non-breaking space.
section: Components
order: 26
---

# NoWidows

Prevents orphaned words in text by replacing the last space with a non-breaking space.

## Usage

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <NoWidows>
      <Text>This paragraph will not have a widow on the last line.</Text>
    </NoWidows>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <p style="margin: 16px 0; font-size: 16px; line-height: 24px;">
    This paragraph will not have a widow on the last&nbsp;line.
  </p>
  ```
  :::
::

In typography, a "widow" is a single word left alone on the last line of a paragraph. In emails with narrow columns, this looks awkward. NoWidows prevents it automatically by inserting a `&nbsp;` between the last two words, keeping them together.

The component recursively processes all text nodes in child elements, so it works with nested HTML too:

```vue [emails/example.vue]
<template>
  <NoWidows>
    <Text>This paragraph will not have a widow on the last line.</Text>
    <Text>Neither will <strong>this bold paragraph</strong> on the last line.</Text>
  </NoWidows>
</template>
```

Template expression syntax like `{{ }}`, `{% %}`, `<%= %>` and others (Handlebars, Liquid, Nunjucks, EJS, Smarty, PHP, Pug) is automatically skipped to avoid breaking template logic.

## Props

### minWords

Type: `String | Number`\
Default: `4`

Minimum number of words a text node must have for widow prevention to apply. Text with fewer words is left unchanged.

```vue [emails/example.vue]
<template>
  <NoWidows :min-words="6">
    <Text>Short text is left alone.</Text>
    <Text>But this longer paragraph will have widow prevention applied to it properly.</Text>
  </NoWidows>
</template>
```

Only the second paragraph gets a `&nbsp;` before the last word, because the first one has fewer than 6 words.
