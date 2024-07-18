## Dev server

Maizzle includes a dev server for local email development. It can watch your Templates and other files, and immediately update them in the browser as you make changes.

### hmr

Type: `Boolean`\
Default: `true`

Enable Hot Module Replacement (HMR) for the dev server.

When `true`, changes you make to Templates, Components, config files etc. will be reflected in the browser without a full page reload.

You may disable HMR by setting this to `false`:

```js [config.js]
export default {
  server: {
    hmr: false,
  }
}
```

### watch

Type: `Array`\
Default: `[]`

An array of paths (which can be globs) to watch for changes. When a file in one of these paths changes, the dev server will update the preview in the browser.

By default, Maizzle watches these paths:

- all Template, Component, and Layout paths
- `config*.js`
- `maizzle.config*.js`
- `tailwind*.config.js`
- `**/*.css`

You may add more paths to watch:

```js [config.js]
export default {
  server: {
    watch: ['./src/example/**/*'],
  }
}
```

### port

Type: `Number`\
Default: `3000`

Port number for the dev server.

```js [config.js]
export default {
  server: {
    port: 8080,
  }
}
```

The server will now be available at `http://localhost:8080`.

### maxRetries

Type: `Number`\
Default: `10`

Number of times to retry starting the dev server if the port is already in use.

```js [config.js]
export default {
  server: {
    maxRetries: 5,
  }
}
```

### scrollSync

Type: `Boolean`\
Default: `true`

Scrolling in one browser window will be mirrored across all browser windows that are showing the same Template.

Disable it by setting this to `false`:

```js [config.js]
export default {
  server: {
    scrollSync: false,
  }
}
```

### reportFileSize

Type: `Boolean`\
Default: `false`

When enabled, the dev server will report the size of the compiled HTML file in the console.
This number will be color-coded based on how close the file size is to the [102KB limit for Gmail](https://github.com/hteumeuleu/email-bugs/issues/41).

Enable it by setting this to `true`:

```js [config.js]
export default {
  server: {
    reportFileSize: true,
  }
}
```

Less than 50KB:

<div class="font-mono">✔ Done in 41 ms [src/templates/example.html] · 6.74 KB</div>

Between 50KB and 102KB:

<div class="font-mono">✔ Done in 41 ms [src/templates/example.html] · <span class="text-amber-500">78.1 KB</span></div>

More than 102KB:

<div class="font-mono">✔ Done in 41 ms [src/templates/example.html] · <span class="text-red-500">112.3 KB</span></div>
