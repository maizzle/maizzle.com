---
title: Outlook
description: Wraps content in conditional comments for targeting specific Word-based Outlook versions.
section: Components
order: 21
---

# Outlook

Wraps content in conditional comments that target Word-based Outlook versions on Windows.

## Usage

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue {4-6}
  <template>
    <Layout>
      <Container>
        <Outlook>
          <p>Only Outlook (classic) sees this.</p>
        </Outlook>
      </Container>
    </Layout>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <!--[if mso]><p>Only Outlook (classic) sees this.</p><![endif]-->
  ```
  :::
::

With no props, the component targets all Word-based Outlook versions.

## Props

### only

Type: `string`\
Default: `undefined`

Render content only in the specified Outlook version(s). Pass a single year or comma-separated years.

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <Outlook only="2013">
      <p>Outlook 2013 only.</p>
    </Outlook>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <!--[if mso 15]><p>Outlook 2013 only.</p><![endif]-->
  ```
  :::
::

Multiple versions:

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <Outlook only="2013,2016">
      <p>Outlook 2013 and 2016.</p>
    </Outlook>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <!--[if (mso 15)|(mso 16)]><p>Outlook 2013 and 2016.</p><![endif]-->
  ```
  :::
::

### not

Type: `string`\
Default: `undefined`

Render in all Word-based Outlook versions except the specified one(s).

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <Outlook not="2007">
      <p>All Outlook except 2007.</p>
    </Outlook>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <!--[if !mso 12]><p>All Outlook except 2007.</p><![endif]-->
  ```
  :::
::

### lt

Type: `string`\
Default: `undefined`

Render in Outlook versions lower than the specified one.

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <Outlook lt="2013">
      <p>Outlook versions before 2013.</p>
    </Outlook>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <!--[if (lt mso 15)]><p>Outlook versions before 2013.</p><![endif]-->
  ```
  :::
::

### lte

Type: `string`\
Default: `undefined`

Render in Outlook versions lower than or equal to the specified one.

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <Outlook lte="2013">
      <p>Outlook 2013 and earlier.</p>
    </Outlook>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <!--[if (lte mso 15)]><p>Outlook 2013 and earlier.</p><![endif]-->
  ```
  :::
::

### gt

Type: `string`\
Default: `undefined`

Render in Outlook versions greater than the specified one.

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <Outlook gt="2010">
      <p>Outlook versions after 2010.</p>
    </Outlook>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <!--[if (gt mso 14)]><p>Outlook versions after 2010.</p><![endif]-->
  ```
  :::
::

### gte

Type: `string`\
Default: `undefined`

Render in Outlook versions greater than or equal to the specified one.

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <Outlook gte="2010">
      <p>Outlook 2010 and newer.</p>
    </Outlook>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <!--[if (gte mso 14)]><p>Outlook 2010 and newer.</p><![endif]-->
  ```
  :::
::

Multiple comparison props are combined with `&` in the conditional comment.

### open

Type: `string`\
Default: `''`

Raw HTML inserted at the start of the conditional comment, before the slot content.

This bypasses Vue's template parser, so unbalanced tags are preserved. Use it for MSO ghost tables where the opening `<table><tr><td>` must live inside the conditional comment.

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <Outlook 
      open='<table align="center" width="600"><tr><td>' 
      close="</td></tr></table>"
    >
      <div style="max-width: 600px;">
        <p>Centered in Outlook via ghost table.</p>
      </div>
    </Outlook>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <!--[if mso]><table align="center" width="600"><tr><td><div style="max-width: 600px;"><p>Centered in Outlook via ghost table.</p></div></td></tr></table><![endif]-->
  ```
  :::
::

### close

Type: `string`\
Default: `''`

Raw HTML inserted at the end of the conditional comment, after the slot content. Pair with `open` to close ghost-table tags inside the conditional.

## Version mapping

The component maps year-based props to MSO version numbers:

| Year | MSO version |
|------|-------------|
| 2003 | 11 |
| 2007 | 12 |
| 2010 | 14 |
| 2013 | 15 |
| 2016 | 16 |
| 2019 | 16 |
