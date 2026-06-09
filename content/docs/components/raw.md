---
title: Raw
description: "Emits content verbatim, bypassing Vue's template parser and allowing you to use delimiters like {{ }} for ESP variables or server-side templating."
section: Components
order: 28
---

# Raw

Emit content verbatim, without letting Vue parse it. Use this for ESP, Handlebars, or Liquid syntax that uses `{{ }}` — Vue would otherwise interpret those as expressions and fail or render the wrong output.

## Usage

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <Layout>
      <Container>
        <Text>
          Hi <Raw>{{ first_name }}</Raw>,
        </Text>
        <Text>
          Your order <Raw>{{ order_id }}</Raw> has shipped.
        </Text>
      </Container>
    </Layout>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <p style="margin: 16px 0; font-size: 16px; line-height: 24px;">Hi {{ first_name }},</p>
  <p style="margin: 16px 0; font-size: 16px; line-height: 24px;">Your order {{ order_id }} has shipped.</p>
  ```
  :::
::

The `{{ ... }}` delimiters pass through untouched, ready for your ESP to personalize.

## Props

### content

Type: `string`\
Default: `''`

Content to emit. You don't normally set this prop yourself (it's auto-populated from slot content) but you may pass it explicitly if you have a string variable you want to render:

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <script setup>
  const liquidSnippet = '{% if customer %}{{ customer.first_name }}{% endif %}'
  </script>

  <template>
    <Text>
      Hello <Raw :content="liquidSnippet" />,
    </Text>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <p style="margin: 16px 0; font-size: 16px; line-height: 24px;">Hello {% if customer %}{{ customer.first_name }}{% endif %},</p>
  ```
  :::
::

::callout{type="info"}
When `:content` is set explicitly, the slot is ignored.
::

## When to use

Reach for `Raw` whenever your output needs delimiters that conflict with Vue's template syntax: ESP variables (SendGrid/Postmark `{{ var }}`), Handlebars/Mustache, Liquid, or any server-side templating that runs after Maizzle hands the HTML off.

If you only need to bypass Vue's parser for a single attribute value, prefer Vue's standard escaping (`v-bind` with a string, HTML entities, or `v-pre`). `Raw` is for blocks of content where escaping each delimiter would be tedious or unreadable.
