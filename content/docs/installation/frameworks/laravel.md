---
title: "Laravel"
description: "How to use Maizzle with Laravel to build email templates alongside your web application."
section: Framework Guides
order: 1
---

# Laravel

The Maizzle Vite plugin brings email template development into your Laravel workflow. You author templates as Vue SFCs and they get compiled to Blade templates.

## Installation

First, install Maizzle in your Laravel project:

```bash
npm install @maizzle/framework
```

## Setup

### Project structure

Create an `emails` directory inside `resources/js` for your email templates:

``` [your-laravel-app] {4-7}
├── app/
├── resources/
│   ├── js/
│   │   ├── emails/
│   │   │   ├── welcome.vue
│   │   │   └── images/
│   │   │       └── logo.png
├── vite.config.ts
├── tsconfig.json
└── package.json
```

### Vite config

Register the Maizzle Vite plugin in your `vite.config.ts`:

```ts {5,15-23}
import laravel from 'laravel-vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { maizzle } from '@maizzle/framework'

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.ts'],
      refresh: true,
    }),
    tailwindcss(),
    vue(),
    maizzle({
      root: 'resources/js/emails',
      output: {
        path: 'resources/views/emails',
        extension: 'blade.php',
      },
      static: {
        source: ['resources/js/emails/images'],
      },
    }),
  ],
})
```

Set `output.extension` to `blade.php` so Laravel can use compiled email templates as views.

See [Configuration](/docs/development/configuration) for all available options.

### TypeScript

Maizzle detects Laravel projects and generates type declarations for auto-imported components and composables relative to `root` location. 

Laravel's default `tsconfig.json` typically includes `resources/js/**/*.d.ts`, which covers the generated types automatically.

If your tsconfig doesn't include them, add the path:

```json [tsconfig.json]
{
  // ...
  "include": [
    "resources/js/**/*.ts",
    "resources/js/**/*.d.ts",
    "resources/js/**/*.vue" // [!code ++]
  ]
}
```

## Usage

Create Vue SFC email templates in your `resources/js/emails` directory.

```vue [resources/js/emails/welcome.vue]
<script setup>
  defineConfig({
    user: 'world',
  })
</script>

<template>
  <Layout>
    <Container class="max-w-xl">
      <Heading>
        Hello, {{ user }}!
      </Heading>
      <Text>
        Welcome aboard!
      </Text>
      <Button href="https://example.com">
        Verify email
      </Button>
    </Container>
  </Layout>
</template>
```

On build, this will compile to `resources/views/emails/welcome.blade.php`.

### Development

Run `composer dev` as usual to start the dev server.

```bash
composer dev
```

- Your Laravel app will typically be available at `http://localhost:8000`
- Access the Maizzle dev UI at `http://localhost:3000`

### Production build

When you run `npm run build`, Maizzle compiles your email templates to Blade files:

```bash
npm run build
```

This outputs production-ready `.blade.php` email templates in `resources/views/emails/`.

## Sending emails

### Using Blade output

The compiled `.blade.php` files can be used directly with Laravel's `Mail` facade:

```php [app/Mail/WelcomeEmail.php]
namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

class WelcomeEmail extends Mailable
{
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Welcome!',
        );
    }

    public function content(): Content
    {
        return new Content(
            html: 'emails.welcome',
        );
    }
}
```

Then, send it:

```php [routes/web.php]
use App\Mail\WelcomeEmail;
use Illuminate\Support\Facades\Mail;

Mail::to('user@example.com')->send(new WelcomeEmail());
```


## Other frameworks

Not using Laravel? Check out the other framework guides:

::framework-guides{:exclude="laravel"}
::
