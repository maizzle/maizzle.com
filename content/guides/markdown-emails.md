---
title: "How to create an HTML email newsletter from Markdown files"
description: "Learn how to create responsive HTML emails from Markdown files in Maizzle. Write your newsletter in .md files, import components and style it all with Tailwind CSS."
date: 2022-12-05
---

# How to create an HTML email newsletter from Markdown files

In this tutorial, you'll learn how to create HTML emails from Markdown files in Maizzle.

You'll be able to compile Markdown files from a folder into responsive HTML emails, use components, expressions, and even style them with Tailwind CSS.

If you want to dive right in, check out the [Markdown Starter](https://github.com/maizzle/starter-markdown).

## Project setup

Scaffold a new project using the Markdown Starter:

```sh
npx create-maizzle
```

In the interactive setup wizard, specify the directory name to create the project in, i.e. `./markdown-project`, and select the Default Starter.

Choose Yes when prompted to Install dependencies.

Once it finishes installing dependencies, open the project folder in your favorite code editor.

### Structure

We'll be using the `content` folder to store our Markdown files:

```html
src
└── content
    └── newsletter-1.md
    └── newsletter-2.md
    └── ...
```

<Alert>You can remove the `emails` directory, we won't need it.</Alert>

Next, create `content/newsletter-1.md` and add some markdown to it:

```md [newsletter-1.md]
# Hello world

This is the first newsletter.
```

### Layout

Since we just want to write Markdown and not have to deal with any tables and such, we need to update `layouts/main.html` to contain the entire HTML boilerplate.

Replace its contents with the following:

```hbs [layouts/main.html]
<!doctype {{{ page.doctype || 'html' }}}>
<html lang="{{ page.language || 'en' }}" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="{{ page.charset || 'utf-8' }}">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style>
    td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
  </style>
  <![endif]-->
  <if condition="page.title">
    <title>{{{ page.title }}}</title>
  </if>
  <style>
    @tailwind utilities;
    @tailwind components;
  </style>
  <stack name="head" />
</head>
<body class="m-0 p-0 w-full [word-break:break-word] [-webkit-font-smoothing:antialiased] {{ page.bodyClass || 'bg-slate-100' }}">
  <if condition="page.preheader">
    <div class="hidden">
      {{{ page.preheader }}}
      <each loop="item in Array.from(Array(150))">&#847; </each>
    </div>
  </if>

  <div
    align="center"
    role="article"
    aria-roledescription="email"
    lang="{{ page.language || 'en' }}"
    class="{{ page.bodyClass || 'bg-slate-100' }}"
    aria-label="{{{ page.title || '' }}}"
  >
    <table class="font-sans">
      <tr>
        <td class="w-[600px] max-w-full bg-white rounded-xl">
          <table class="w-full">
            <tr>
              <td class="p-0 px-8 sm:px-4 text-base/6 text-slate-700">
                <yield />
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>
```

### Dependencies

We'll need a couple of extra dependencies to parse the Markdown files:

- `front-matter` to be able to use [Front Matter](/docs/templates#front-matter) in our Markdown files
- `markdown-it-attrs` to be able to add Tailwind CSS classes right in Markdown

Let's install them:

```sh
npm install front-matter markdown-it-attrs
```

### config.js

Since we're not using the default setup anymore, we need to tell Maizzle where to look for 'templates' to compile.

Update `build.templates` to use .md files from the `content` folder:

```js [config.js] {3}
export default {
  build: {
    content: ['content/**/*.md'], // [!code ++]
  },
}
```

## Compile Markdown

If you run `npm run build` now, you'll notice the files output to `build_production` only include the raw, unparsed content of your Markdown files: they were not compiled to HTML, neither did they use our `main.html` layout.

Maizzle doesn't know what layout to use or that the content of our .md files is Markdown that needs parsing, so we need to instruct it to do that.

We can use the [`beforeRender` event](/docs/events#beforerender) for this:

```js [config.js]
import fm from 'front-matter'

export default {
  beforeRender(html) {
    const { body } = fm(html)

    return `
      <x-main>
        <md>${body}</md>
      </x-main>`
  },
}
```

Here's a step-by-step explanation of what's happening:

1. We're hooking into the `beforeRender` event to alter the HTML before it's compiled.
1. We use `front-matter` to extract the Markdown content from the file into a `body` variable. This ensures that we only parse Markdown content, and not the Front Matter too.
1. We're returning a string that includes the contents of the `body` property wrapped in `<md>` tags, so Maizzle can parse them as Markdown. See the [Markdown documentation](/docs/markdown) for more info on this tag. Finally, the `<x-main>` tag tells Maizzle to use our `main.html` layout.

Run `npm run build` again and you'll see that the files in the `build_production` folder are now compiled to HTML using our `main.html` layout 🥳

## Styling

Let's create a `css/markdown.css` file so we can add some global styles for our Markdown content:

```css [css/markdown.css]
h1 {
  @apply text-3xl leading-9;
}

p {
  @apply m-0 mb-8;
}

img {
  @apply max-w-full leading-full align-middle;
  border: 0;
}
```

Make sure to import this file in the `<style>` tag:

```html [layouts/main.html]
<style>
  @import "css/markdown.css";
  @import 'tailwindcss/components';
  @import 'tailwindcss/utilities';
</style>
```

Run `npm run build` again and you'll see that the styles are now applied:

```html [build_production/newsletter-1.html] {2} no-copy
  <h1>Hello world</h1> <!-- [!code --]-->
  <h1 style="font-size: 30px; line-height: 36px;">Hello world</h1> <!-- [!code ++]-->
```

### Tailwind CSS

We can also use Tailwind CSS classes directly in our Markdown files.

To do this, we'll use the `markdown-it-attrs` plugin, which allows us to add attributes like class names to elements right when writing Markdown.

Update `config.js` to have Maizzle use the plugin:

```js [config.js] {7}
import mdAttrs from 'markdown-it-attrs'

export default {
  markdown: {
    plugins: [
      {
        plugin: mdAttrs, // [!code ++]
      }
    ]
  },
}
```

You can now add Tailwind CSS classes to your Markdown elements by adding them inside curly braces after the content:

```md [content/newsletter-1.md]
---
title: "Edition #1"
---

# Hello world {.m-0 .mb-10 .text-slate-900}
```

Notice how classes include the leading dot, and are separated by spaces.

Result:

```html [build_production/newsletter-1.html] {2} no-copy
  <h1 style="font-size: 30px; line-height: 36px;">Hello world</h1> <!-- [!code --]-->
  <h1 style="font-size: 30px; line-height: 36px; margin: 0 0 40px; color: #0f172a">Hello world</h1> <!-- [!code ++]-->
```

### @tailwindcss/typography

Although it's the obvious choice for styling Markdown content with Tailwind, we don't recommend using [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) for Markdown _emails_.

The plugin is great for the web, but it contains complex CSS selectors that are not fully supported by most email clients, and cannot be properly inlined either.

Feel free to experiment with it, but consider yourself warned.

## Syntax highlighting

You can use syntax highlighters like [Shiki](https://shiki.matsu.io/) or [Prism](https://prismjs.com/) to add syntax highlighting to fenced code blocks in your markdown.

For example, here's how you'd use Shiki.

First, install the library:

```sh
npm install shiki
```

Next, define a custom `highlight` method for `markdown-it`. Add it in the `beforeCreate` event so that the highlighter is retrieved once, before templates are compiled:

```js [config.js]
import { createHighlighter } from 'shiki'

export default {
  async beforeCreate(config) {
    const highlighter = await createHighlighter({
      themes: ['nord'],
      langs: ['html'],
    })

    config = Object.assign(config, {
      markdown: {
        markdownit: {
          highlight: (code, lang) => {
            lang = lang || 'html'
            return highlighter.codeToHtml(code, { lang, theme: 'nord' })
          }
        }
      }
    })
  },
}
```

Now all your markdown code blocks will be highlighted with the Nord theme.

## Expressions

You can use [expressions](/docs/templates#expressions) in Markdown files just as you would in any Maizzle template:

```hbs [content/newsletter-1.md]
---
title: "Edition #1"
---

# {{ page.title }}

This is the first newsletter.
```

## Components

You can also import Maizzle components in your Markdown files.

For example, let's create an `<x-alert>` component:

```html [components/alert.html]
<table class="w-full mb-8">
  <tr>
    <td
      attributes
      class="py-2 px-4 bg-blue-100 text-blue-600 rounded"
    >
      <yield />
    </td>
  </tr>
</table>
```

Notice the `attributes` attribute - this indicates that any attributes passed to the component should be added to this element, instead of the root element.

We can use it like this:

```hbs [content/newsletter-1.md]
---
title: "Edition #1"
---

# {{ page.title }}

This is the first newsletter.

<x-alert>
  Notice: this is an alert.
</x-alert>
```

### Markdown in components

To use Markdown inside a component, add an empty line before and after the content that you pass inside:

```hbs [content/newsletter-1.md]
---
title: "Edition #1"
---

<x-alert>

  # {{ page.title }}

  This is the first newsletter.

</x-alert>
```

To prevent an issue with code indentation in `markdown-it` that would result in `<pre>` tags being added to the rendered HTML, simply don't indent the closing tags after `<yield />`. A bit of a workaround, but it works:

```html [components/alert.html]
<table class="w-full mb-8">
  <tr>
    <td
      attributes
      class="py-2 px-4 bg-blue-100 text-blue-600 rounded"
    >
      <yield />
</td>
</tr>
</table>
```

Alternatively, you may use the `prettify` transformer to remove the indentation:

```js [config.js]
import { prettify } from '@maizzle/framework'

export default {
  afterRender(html) {
    return prettify(html, {
      indent_size: 0,
    })
  }
}
```

## Custom layouts

You may need to use different designs for your newsletters. We can use Front Matter to do this, by defining a custom layout name for each Markdown file to use.

Go ahead and create `layouts/secondary.html` based on `main.html`.

For the purpose of this tutorial, we'll just change the body background color to differentiate it from the `main.html` layout: replace both occurrences of `bg-slate-100` with `bg-indigo-200`.

Next, update the `beforeRender` event in `config.js` to use the layout name from Front Matter:

```js [config.js]
import fm from 'front-matter'

export default {
  beforeRender(html) {
    const { attributes, body } = fm(html)
    const layout = attributes.layout || 'main'

    return `
      <x-${layout}>
        <md>${body}</md>
      </x-${layout}>`
  }
}
```

You can now specify a custom layout for each Markdown file, via Front Matter:

```md [content/newsletter-1.md]
---
layout: secondary
---

# Hello world

Welcome to our first newsletter.
```

You'll notice that the compiled HTML file at `build_production/newsletter-1.html` now has an indigo background color, which means it's using our custom layout.

## Outlook note

Your markdown may include retina-sized images that will very likely be larger in natural size than the 600px width of the layout.

By default, compiling Markdown to HTML will not add a `width` attribute to images.

While this is fine in browsers and modern email clients because you can control it through CSS, it will be an issue in Outlook for Windows: not specifying the width of an image will render it at its natural size, blowing up the layout in case of retina images.

To fix this, we can use `markdown-it-attrs` to manually add our image width in Markdown:

```md [content/newsletter-1.md]
# Hello world

Welcome to our first newsletter.

![Image description](/images/retina-image.jpg){width=600}
```

Notice how there's no space between the last `)` and the opening `{` where we specify the attribute. This ensures the attribute is added to the `img` tag, and not the `p` tag wrapping it.

## Resources

- [GitHub repository](https://github.com/maizzle/starter-markdown) for this guide
- For the new components syntax, see the Maizzle 4.4.0-beta [release notes](https://github.com/maizzle/framework/releases/tag/v4.4.0-beta.1)
- Docs for [Markdown in Maizzle](/docs/markdown)
