---
title: NotOutlook
description: Hides content from all Word-based Outlook versions.
section: Components
order: 22
---

# NotOutlook

Hides content from all Word-based Outlook versions on Windows.

## Usage

```vue [emails/example.vue] {4-8}
<template>
  <Layout>
    <Container>
      <NotOutlook>
        <div style="background-image: url('hero.jpg')">
          <p>CSS background — not supported in Outlook.</p>
        </div>
      </NotOutlook>
    </Container>
  </Layout>
</template>
```

This wraps the slot content in the inverse MSO conditional comment:

```html
<!--[if !mso]><!-->
  <div style="background-image: url('hero.jpg')">
    <p>CSS background — not supported in Outlook.</p>
  </div>
<!--<![endif]-->
```

Every email client except Word-based Outlook will render the content. This is the inverse of using `<Outlook>` without any version props.

The component has no props — it always targets all Word-based Outlook versions.
