---
title: "How to add PrismJS syntax highlighting to HTML emails"
description: "Using PrismJS, Markdown fenced code blocks, and Events in Maizzle to add syntax highlighting to HTML emails."
date: 2020-02-05
---

# How to add PrismJS syntax highlighting to HTML emails

<p class="text-sm">Last updated: May 30, 2022</p>

If you want to show a block of code in an HTML email _and_ have it look nice, it usually involves a lot of manual work: escaping, formatting, tokenizing, styling tokens...

With Maizzle however, we can use JavaScript libraries to do that work for us 💅

## Getting started

Let's create a new Maizzle project.

Open a terminal window and clone the Starter:

<terminal show-copy>

  ```
  npx degit maizzle/maizzle example-syntax-highlight
  ```

</terminal>

Install dependencies:

<terminal show-copy>

  ```
  cd example-syntax-highlight

  npm install
  ```

</terminal>

Once it finishes installing dependencies open it in your editor.

We'll be covering two different techniques:

- with PostHTML
- with Markdown

For both techniques we'll be using the [PrismJS](https://prismjs.com/) library to highlight code blocks.

## PostHTML

Using a PostHTML plugin, we can write our own `<pre><code>` markup and have the plugin highlight the contents of the `<code>` element.

### Install plugin

First, let's install the [posthtml-prism](https://github.com/posthtml/posthtml-prism) plugin, which we'll use to highlight code blocks:

<terminal show-copy>

  ```
  npm i posthtml-prism
  ```

</terminal>

Next, add it to the plugins list in your `config.js`:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      posthtml: {
        plugins: [
          require('posthtml-prism')()
        ]
      }
    }
  }
  ```

</code-sample>

### Add code block

Add a block of code in your template, like so:

<code-sample title="src/templates/example.html">

  ```xml
  <pre>
    <code class="language-javascript">
    function foo(bar) {
      var a = 42,
        b = 'Prism';
      return a + bar(b);
    }
    </code>
  </pre>
  ```

</code-sample>

<alert>Notice how we added the `language-javascript` class on the `<code>` tag - this is required in order to get language-specific syntax highlighting.</alert>

<alert type="warning">You need to reset the indentation of code inside the `<pre>` tag yourself - see the <a href="https://github.com/maizzle/example-syntax-highlight/blob/master/src/templates/posthtml.html">PostHTML example</a> in the tutorial repository.</alert>

## Build

Run `npm run dev` to start the development server, open `http://localhost:3000/` in a browser, and navigate to the template.

You'll see something like this:

<pre class="mb-4"><code><span>function</span> <span>foo</span><span>(</span><span>bar</span><span>)</span> <span>{</span>
  <span>var</span> a <span>=</span> <span>42</span><span>,</span>
    b <span>=</span> <span>'Prism'</span><span>;</span>
  <span>return</span> a <span>+</span> <span>bar</span><span>(</span>b<span>)</span><span>;</span>
<span>}</span></code></pre>

If you view the source of the page, you'll notice a lot of `<span>` tags. This means it worked, and PrismJS has tokenized our code block.

But it's not very pretty, is it? We need a theme!

## Theming

Choose one of the default themes, or see [prism-themes](https://github.com/PrismJS/prism-themes) for more.

For this tutorial, we'll go with a Tailwind adaptation the [Synthwave '84 Theme](https://marketplace.visualstudio.com/items?itemName=RobbOwen.synthwave-vscode).

Save [prism-synthwave84.css](https://raw.githubusercontent.com/maizzle/starter-prismjs/master/src/css/prism-synthwave84.css) to the `src/css` directory in your project,
and import it into your `src/css/tailwind.css`:

```postcss
/* Tailwind CSS components */
@import "tailwindcss/components";

/**
 * @import here any custom CSS components - that is, CSS that
 * you'd want loaded before the Tailwind utilities, so the
 * utilities can still override them.
*/
@import "custom/prism-synthwave84";

/* Tailwind CSS utility classes */
@import "tailwindcss/utilities";

/* Your custom utility classes */
@import "utilities";
```

Now, running `npm run build` will yield the result we expected:

<pre style="padding: 24px; margin-bottom: 24px; overflow: auto; font-family: Menlo, Consolas, monospace; font-size: 16px; text-align: left; white-space: pre; background-image: linear-gradient(to bottom, #2a2139 75%, #34294f); color: #f92aad; hyphens: none; tab-size: 2; text-shadow: 0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3; word-break: normal; word-spacing: normal; word-wrap: normal; background-color: #2a2139;"><code class="language-javascript"><span style="color: #f4eee4; text-shadow: 0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575;">function</span> <span style="color: #fdfdfd; text-shadow: 0 0 2px #001716, 0 0 3px #03edf975, 0 0 5px #03edf975, 0 0 8px #03edf975;">foo</span><span style="color: #cccccc;">(</span><span style="color: #f92aad;">bar</span><span style="color: #cccccc;">)</span> <span style="color: #cccccc;">{</span>
  <span style="color: #f4eee4; text-shadow: 0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575;">var</span> <span style="color:#f92aad;">a</span> <span style="color: #67cdcc;">=</span> <span style="color: #e2777a;">42</span><span style="color: #cccccc;">,</span>
    <span style="color: #f92aad;">b</span> <span style="color: #67cdcc;">=</span> <span style="color: #f87c32;">'Prism'</span><span style="color: #cccccc;">;</span>
  <span style="color: #f4eee4; text-shadow: 0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575;">return</span> <span style="color: #f92aad;">a</span> <span style="color: #67cdcc;">+</span> <span style="color: #fdfdfd; text-shadow: 0 0 2px #001716, 0 0 3px #03edf975, 0 0 5px #03edf975, 0 0 8px #03edf975;">bar</span><span style="color: #cccccc;">(</span><span style="color: #f92aad;">b</span><span style="color: #cccccc;">)</span><span style="color: #cccccc;">;</span>
<span style="color: #cccccc;">}</span></code></pre>

## Markdown

Alternatively, we can also use Markdown to write fenced code blocks and have PrismJS automatically syntax-highlight them.

### Install PrismJS

First, we must install the PrismJS library:

<terminal show-copy>

  ```
  npm i prismjs
  ```

</terminal>

### Configure Markdown

Next, we need to configure Maizzle to use PrismJS as a custom highlight function for the Markdown renderer.

We do that in `config.js`:

<code-sample title="config.js">

  ```js
  const Prism = require('prismjs')

  module.exports = {
    markdown: {
      markdownit: {
        highlight(code, lang) {
          lang = lang || 'markup'
          return Prism.highlight(code, Prism.languages[lang], lang)
        }
      }
    }
  }
  ```

</code-sample>

### Fenced code block

We can now write code inside a fenced code block in our Template:

<code-sample title="src/templates/example.html">

  ```xml
  <extends src="src/layouts/main.html">
    <block name="template">
      <md>
        ```js
        function foo(bar) {
          var a = 42,
            b = 'Prism';
          return a + bar(b);
        }
        ```
      </md>
    </block>
  </extends>
  ```

</code-sample>

## Compatibility

Some email clients require  extra steps in order to render our code blocks properly.

### Gmail

Gmail will change our inline `white-space: pre;` to `white-space: pre-wrap;`.
This results in code wrapping, instead of showing a horizontal scrollbar.

Fix it by adding the following CSS at the beginning of `prism-synthwave84.css`:

<code-sample title="src/css/prism-synthwave84.css">

  ```postcss
  pre {
    @apply whitespace-pre;
  }
  ```

</code-sample>

### Outlook

Padding on `<pre>` doesn't work in Outlook.

We can fix this by wrapping `<pre>` inside a table that we only show in Outlook. We then style this table inline, like so:

<code-sample title="src/templates/example.html">

  ```xml
  <!--[if mso]>
  <table style="width:100%;">
    <tr>
      <td style="background: #2a2139; padding: 24px;">
  <![endif]-->
  <pre>
    <code class="language-javascript">
    function foo(bar) {
      var a = 42,
        b = 'Prism';
      return a + bar(b);
    }
    </code>
  </pre>
  <!--[if mso]></td></tr></table><![endif]-->
  ```

</code-sample>

## Production build

We've been developing locally so far, configuring PostHTML or Markdown in `config.js`. This means CSS isn't inlined, and most email optimizations are off.

When you're satisfied with the dev preview, run `npm run build` and use the template inside the `build_production/` directory for sending the email.

## Resources

- [GitHub repository](https://github.com/maizzle/starter-prismjs) for this tutorial
- [posthtml-prism](https://github.com/posthtml/posthtml-prism) plugin
- [PrismJS](https://prismjs.com/) library
- [Synthwave '84](https://github.com/PrismJS/prism-themes/blob/master/themes/prism-synthwave84.css) theme
