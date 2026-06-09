---
title: CodeBlock
description: Syntax-highlighted code blocks using Shiki for Maizzle email templates.
section: Components
order: 18
---

# CodeBlock

Syntax-highlighted code blocks using Shiki, for your HTML emaills.

## Usage

Ever wanted to share a code snippet with your technical audience but feared it might break in email clients? The `<CodeBlock>` component makes it super-easy:

```vue [emails/example.vue] {4-8}
<template>
  <Layout>
    <Container>
      <CodeBlock language="html">
        <div class="container">
          <p>Hello world</p>
        </div>
      </CodeBlock>
    </Container>
  </Layout>
</template>
```

::callout{type="info"}
The code is wrapped in a table for Outlook compatibility, preventing horizontal overflow.
::

## Props

### code

Type: `string`\
Default: `''`

The code string to highlight. Alternative to passing code as slot content.

```vue
<script setup>
  const snippet = `const x = 42`
</script>

<template>
  <CodeBlock :code="snippet" language="javascript" />
</template>
```

### language

Type: `string`\
Default: `'html'`

The language for syntax highlighting. Supports any [language](https://shiki.style/languages) available in Shiki.

```vue
<template>
  <CodeBlock language="css">
    .button {
      background-color: #4338ca;
      color: white;
    }
  </CodeBlock>
</template>
```

### theme

Type: `string`\
Default: `'github-light'`

The [Shiki theme](https://shiki.style/themes) to use for syntax highlighting.

```vue
<template>
  <CodeBlock language="html" theme="github-dark">
    <div class="container">
      <p>Dark theme example</p>
    </div>
  </CodeBlock>
</template>
```

### tdClass

Type: `string`\
Default: `'max-w-0 mso-padding-alt-4'`

CSS class applied to the wrapping `<td>` element. The default classes help prevent overflow issues and add some padding for Outlook (classic).
