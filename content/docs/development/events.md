---
title: Events
description: Using lifecycle events fired during the Maizzle build pipeline to hook into the build process.
section: Development
order: 5
---

# Events

Maizzle fires events at key points during the build. You can register handlers from `maizzle.config.ts` or from a `<script setup>` using the [`useEvent()`](/docs/api/composables#useevent) composable.

## Event scope

| Event            | `maizzle.config.ts` | `useEvent()` | Scope        |
|------------------|---------------------|--------------|--------------|
| `beforeCreate`   | ✓                   | ×            | Build-once   |
| `beforeRender`   | ✓                   | ×            | Per-template |
| `afterRender`    | ✓                   | ✓            | Per-template |
| `afterTransform` | ✓                   | ✓            | Per-template |
| `afterBuild`     | ✓                   | ✓            | Build-once   |

- **Per-template** handlers fire once per template. SFC handlers registered via `useEvent()` are scoped to the template that registered them and cleared between renders so they don't leak.
- **Build-once** handlers fire a single time per build. SFC `afterBuild` handlers accumulate across every template that registers one and all fire together at the end.
- `beforeCreate` and `beforeRender` cannot fire SFC handlers because they run before — or as part of — discovering them. Register these in `maizzle.config.ts` instead.

## Available events

### beforeCreate

```ts
beforeCreate({ config }) {
  // mutate config before any template is processed
}
```

Type: `(params: { config: MaizzleConfig }) => void | Promise<void>`

Fires once at the start of the build, before any templates are discovered or rendered. Mutate `config` here to apply build-wide overrides. Return value is ignored.

::callout{type="warning"}
Only registrable in `maizzle.config.ts`. By the time SFCs are parsed this event already fired.
::

```ts [maizzle.config.ts]
export default defineConfig({
  beforeCreate({ config }) {
    if (process.env.NODE_ENV === 'production') {
      config.css ??= {}
      config.css.purge = true
    }
  },
})
```

### beforeRender

```ts
beforeRender({ config, template }) {
  // 1. inject data the template will read via useConfig()…
  config.greeting = await fetchGreeting(template.path.name)
  // 2. …and/or rewrite the source before it compiles
  return template.source.replace('COMPANY_NAME', 'Acme Inc.')
}
```

Type: `(params: { config: MaizzleConfig; template: TemplateInfo }) => string | void | Promise<string | void>`

Fires before each template is passed to the Vue SSR renderer. It gives you two things:

- **The config this template is about to compile with.** `config` is the fully-computed config for this template, **cloned per template** — so any changes you make here are scoped to this one template and won't leak into the others. This is the common use: fetch data from an API and inject it, set a preheader, flip a transformer for a single template, and so on. The template reads the result through [`useConfig()`](/docs/api/composables#useconfig).
- **The source about to be compiled.** Return a string to replace `template.source` (the raw SFC source) for any subsequent handlers and for the renderer. Return nothing to leave it unchanged.

When multiple handlers are registered, they chain: each handler's returned string becomes the next handler's `template.source`.

::callout{type="warning"}
Only registrable from `maizzle.config.ts`. SFC handlers can't be discovered until parsing happens, which is what this hook precedes — and inside a template you already have the same config via [`useConfig()`](/docs/api/composables#useconfig) and `defineConfig()`.
::

```ts [maizzle.config.ts]
export default defineConfig({
  async beforeRender({ config, template }) {
    // Per-template data, scoped to this template only
    if (template.path.name === 'newsletter') {
      config.posts = await fetchLatestPosts()
      return template.source.replace('PLACEHOLDER', 'Newsletter content')
    }
  },
})
```

### afterRender

```ts
afterRender({ config, template, html }) {
  return html.replace('<!--banner-->', '<div class="banner">…</div>')
}
```

Type: `(params: { config: MaizzleConfig; template: TemplateInfo; html: string }) => string | void | Promise<string | void>`

Fires after the template renders to HTML, but **before** the transformer pipeline runs. Return a string to replace the HTML for subsequent handlers and for the transformer pipeline.

Use this when you want your changes to flow through the pipeline (CSS inlining, purging, minification, etc.) — anything you inject here gets processed alongside the rest of the markup.

```vue [emails/welcome.vue]
<script setup>
  useEvent('afterRender', ({ html }) => {
    const banner = '<div class="bg-blue-500 text-white p-4 text-center">Limited time offer!</div>'

    return html.replace('<body', `<body>${banner}`)
  })
</script>
```

### afterTransform

```ts
afterTransform({ config, template, html }) {
  return html.replace(
    '</body>',
    '<img src="https://track.example.com/pixel.gif" width="1" height="1" alt="">\n</body>'
  )
}
```

Type: `(params: { config: MaizzleConfig; template: TemplateInfo; html: string }) => string | void | Promise<string | void>`

Fires after all transformers have run on each template. Return a string to replace the final HTML before it's written to disk.

Use this when you need the post-pipeline output and don't want your insertion to be touched by transformers — for example, tracking pixels or raw markup that shouldn't be re-inlined or purged.

```ts [maizzle.config.ts]
export default defineConfig({
  afterTransform({ html, template }) {
    if (template.path.name === 'promotional') {
      return html.replace('</body>', '<script src="https://analytics.example.com/track.js"></script>\n</body>')
    }
  },
})
```

### afterBuild

```ts
afterBuild({ files, config }) {
  console.log(`Built ${files.length} templates`)
}
```

Type: `(params: { files: string[]; config: MaizzleConfig }) => void | Promise<void>`

Fires once after every template has been built. Receives the full list of output file paths. Return value is ignored.

When multiple templates each register an `afterBuild` handler via `useEvent()`, all of them fire — useful for per-template post-build hooks (e.g. uploading the built file to a CDN).

::callout{type="info"}
`afterBuild` only fires during `maizzle build`. The dev server doesn't fire build events because templates are rendered on demand.
::

## useEvent

`useEvent(name, handler)` registers a handler from inside a template's `<script setup>`:

```vue [emails/welcome.vue]
<script setup>
  useEvent('afterTransform', ({ html }) => {
    return html.replace('</body>', '<img src="https://track.example.com/p.gif" width="1" height="1" alt="">\n</body>')
  })
</script>
```

The composable is auto-imported, so you don't need to add an import statement. Only `afterRender`, `afterTransform`, and `afterBuild` can be registered this way — see the [Event scope](#event-scope) table.

## Execution order

When the same event has handlers from both `maizzle.config.ts` and one or more `<script setup>` blocks, they run in this order:

1. **Config handler** (from `maizzle.config.ts`)
2. **SFC handlers** (registered via `useEvent()`), in the order they were registered

For events that return a value (`beforeRender`, `afterRender`, `afterTransform`), the returned string replaces the input for the next handler in the chain. Handlers that return nothing pass the input through untouched.

::code-tabs
  :::code-tab{label="maizzle.config.ts"}
  ```ts
  // 1. config handler runs first
  export default defineConfig({
    afterTransform({ html }) {
      return html.replace('STEP_1', 'replaced by config')
    },
  })
  ```
  :::
  :::code-tab{label="emails/welcome.vue"}
  ```vue
  <script setup>
    // 2. SFC handler runs second, sees the config handler's output
    useEvent('afterTransform', ({ html }) => {
      return html.replace('STEP_2', 'replaced by SFC')
    })
  </script>
  ```
  :::
::
