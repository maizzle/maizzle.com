---
title: Plaintext
description: Route content between HTML and plaintext versions, removing it entirely from the other.
section: Components
order: 31
---

# Plaintext

Two complementary components that route slot content to a single output. Whatever you wrap stays in the matching output and is removed from the other.

| Component | Appears in `.html` | Appears in `.txt` |
|-----------|--------------------|-------------------|
| `<Plaintext>` | × | ✓ |
| `<NotPlaintext>` | ✓ | × |

## Usage

```vue [emails/example.vue]
<template>
  <Layout>
    <Container>
      <Text>This shows in both outputs.</Text>

      <Plaintext>
        Only shows in the plaintext version.
      </Plaintext>

      <NotPlaintext>
        Only shows in the HTML version.
      </NotPlaintext>
    </Container>
  </Layout>
</template>
```

## Plaintext output

To actually generate a `.txt` file alongside each compiled email, enable `plaintext`:

```ts [maizzle.config.ts]
import { defineConfig } from '@maizzle/framework'

export default defineConfig({
  plaintext: true,
})
```
