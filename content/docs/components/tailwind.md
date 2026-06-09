---
title: Tailwind
description: Compile a Tailwind stylesheet from the classes used inside a block and inject it into <head>.
section: Components
order: 29
---

# Tailwind

Explicitly use Tailwind CSS in your email templates.

## Usage

Wrap any region of your template with `<Tailwind>`.

```vue [emails/example.vue]
<template>
  <Html>
    <Head />
    <Tailwind>
      <Body class="font-sans bg-slate-100">
        <Container class="max-w-xl">
          <h1 class="m-0 mb-6 text-lg">Hello, welcome aboard!</h1>
          <Button href="https://example.com">Get Started</Button>
        </Container>
      </Body>
    </Tailwind>
  </Html>
</template>
```

::callout{type="info"}
A `<Head />` component must be present in the template. If it's missing, you'll get an error.
::

## Custom config

Use the `#config` slot to pass raw CSS that replaces the default `@maizzle/tailwindcss` import. This is the entry point the Tailwind compiler sees, so it's where you customize tokens, register variants, or import additional layers:

```vue [emails/example.vue]
<template>
  <Html>
    <Head />
    <Tailwind>
      <template #config>
        @import "@maizzle/tailwindcss";

        @theme {
          --color-brand: #6366f1;
          --font-display: "Inter", sans-serif;
        }
      </template>

      <Body>
        <h1 class="font-display text-brand">Hello</h1>
      </Body>
    </Tailwind>
  </Html>
</template>
```

The `#config` slot is read once at setup time and never rendered into the document — it's only used as the CSS input to the compiler.

## Multiple blocks

Use a single `<Tailwind>` block per template. Multiple sibling blocks compile, but they share the same Tailwind class names — `.text-brand` from block A and `.text-brand` from block B both end up in `<head>` targeting the same selector. After CSS inlining, every matching element receives every matching rule and the cascade resolves to whichever block appears last, so all elements end up styled by the final block:

```vue [emails/example.vue]
<template>
  <Html>
    <Head />
    <Body>
      <Tailwind>
        <template #config>
          @import "@maizzle/tailwindcss";
          @theme { --color-brand: #6366f1; }
        </template>

        <Container class="text-brand">Block A</Container>
      </Tailwind>

      <Tailwind>
        <template #config>
          @import "@maizzle/tailwindcss";
          @theme { --color-brand: #ef4444; }
        </template>

        <Container class="text-brand">Block B</Container>
      </Tailwind>
    </Body>
  </Html>
</template>
```

Both `Block A` and `Block B` render with `color: #ef4444` — the `#6366f1` rule from block A is shadowed by block B's identically-named class.

If you need different theme tokens in different parts of a template, define them once in a single `<Tailwind>` block and use distinct utility class names per region (for example, expose two custom tokens like `--color-brand-a` and `--color-brand-b` and reference `text-brand-a` / `text-brand-b`).

## Nested blocks

Nesting `<Tailwind>` inside another `<Tailwind>` is allowed but flattened: the inner block's classes flow up into the outer block's stylesheet, and the inner `#config` slot is ignored. Only the outermost block produces a `<style>`.

```vue
<template>
  <Tailwind>
    <Body>
      <Tailwind>
        <!-- These classes are compiled into the outer block's stylesheet. -->
        <Container class="bg-slate-100">…</Container>
      </Tailwind>
    </Body>
  </Tailwind>
</template>
```

## Slots

### default

The content rendered into the document. Every `class` attribute on elements inside it is fed to the Tailwind compiler for this block.

### config

Optional. Raw CSS used as the input for the Tailwind compiler instead of the default `@import "@maizzle/tailwindcss";` seed. Read once at setup, not rendered into the document.
