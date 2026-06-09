---
title: Preheader
description: Add hidden text for email client inbox previews.
section: Components
order: 17
---

# Preheader

Hidden preview text that appears in email client inbox list views.

## Usage

```vue [emails/example.vue]
<template>
  <Layout>
    <Preheader>Check out our latest deals — up to 50% off everything.</Preheader> // [!code ++]

    <Container>
      <Text>Email body content.</Text>
    </Container>
  </Layout>
</template>
```

You can place the Preheader anywhere in your template — it uses Vue's Teleport to render at the start of `<body>`, before any visible content.

## Content

Anything you pass into `<Preheader>` is output as text.

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <Preheader>Hi <strong>there</strong>, thanks for signing up to our newsletter!</Preheader>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <div style="display: none;">
      Hi there, thanks for signing up to our newsletter!&#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
      &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
      &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
      &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
      &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
      &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
      &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
      &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
      &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
      &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
      &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &nbsp;
    </div>
  ```
  :::
::

If you want stylized preview text for an email, you could use Unicode stylized characters:

```vue
<Preheader>Only ➍➋ seats left!</Preheader>
```

::callout{type="warning"}
Keep in mind that Unicode characters create accessibility issues for screen readers, as well as noise in the user's inbox. Consider avoiding them in general.
::

## Auto-sized fillers

Email clients can show up to 200+ characters for the inbox preview text. 

By default, the component pads your text with invisible filler characters up to a combined total of 200 characters, in order to avoid the client pulling body content into the snippet.

That means:

- Empty preheader → 200 fillers.
- 50-char preheader → 150 fillers.
- 200+ char preheader → no fillers (the budget is already full).

## Props

### spaces

Type: `number`\
Default: `undefined`

Explicit number of filler sequences to render. When set, it overrides the auto calculation entirely — the component renders exactly this many fillers, regardless of slot length.

```vue
<Preheader :spaces="20">Short preview, will get body text in here...</Preheader>
```

Negative values are clamped to `0`. Set to `0` to disable fillers entirely.

## How it works

The component renders a hidden `<div>` containing:

1. Your preview text (escaped, slot content extracted to text)
2. Filler sequences — auto-sized to the 200-char preview budget, or fixed at the `spaces` prop value when provided
3. A non-breaking space at the end

The `display: none` style hides the entire block from the rendered email while keeping it accessible to email clients for preview text extraction.

::callout{type="info"}
Some email clients might use AI-generated snippets or summaries instead of your preheader text, so consider this as progressive enhancement rather than a guaranteed display.
::
