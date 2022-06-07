---
title: "Components"
description: "Import components into your HTML email templates and render them with custom slot content and data"
---

# Components

Components help you organize blocks of markup that you use often by extracting them to a file, so you can reuse them in multiple templates.

## Usage

To create a Component, simply create an HTML file with a `<content>` tag:

<code-sample title="src/components/example.html">

  ```xml
  <content></content>
  ```

</code-sample>

The `<content>` tag will be replaced with the content passed to the Component.

<alert type="info">You can safely omit the `<content>` tag if you want to use Components as includes, and don't actually need to pass any content to them.</alert>

You may use the `<component>` tag to insert a Component in a Template:

<code-sample title="src/templates/example.html">

  ```xml
  <component src="src/components/example.html">
    This text will replace the `<content>` tag in the Component.
  </component>
  ```

</code-sample>

## Configuration

You may define where you keep your Components and what markup they use.

### Attribute

Use a custom attribute name:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      components: {
        attribute: 'href',
      }
    }
  }
  ```

</code-sample>

You can now use it like this:

<code-sample title="src/templates/example.html">

  ```xml
  <component href="src/components/example.html">
    Content to pass inside component...
  </component>
  ```

</code-sample>

### Tag

Use a custom tag name:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      components: {
        tag: 'module',
      }
    }
  }
  ```

</code-sample>

You can now use it like this:

<code-sample title="src/templates/example.html">

  ```xml
  <module src="src/components/example.html">
    Content to pass inside component...
  </module>
  ```

</code-sample>

### Root

By default, when using a Component you have to reference its path relative to your project root (like we did above).

However, you may customize this path:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      components: {
        root: 'src/components',
      }
    }
  }
  ```

</code-sample>

Now you can reference them relative to that `root` path, and write less code:

<code-sample title="src/templates/example.html">

  ```xml
  <component src="example.html">
    Content to pass inside component...
  </component>
  ```

</code-sample>

## Example

Let's create a VML background image Component to which we pass data about the image and the HTML to be overlayed on top of it.

We might imagine something like this:

<code-sample title="src/components/v-fill.html">

  ```xml
  <!--[if mso]>
  <v:rect stroke="false" style="width: {{ width }}" xmlns:v="urn:schemas-microsoft-com:vml">
  <v:fill type="frame" src="{{{ image }}}" />
  <v:textbox inset="0,0,0,0" style="mso-fit-shape-to-text: true"><div><![endif]-->
  <content></content>
  <!--[if mso]></div></v:textbox></v:rect><![endif]-->
  ```

</code-sample>

The content of the component or, in our case, the HTML to be placed over the image, will be output in place of the `<content>` tag.

The variables that we are referencing in there are currently undefined, so let's create them in Front Matter and pass them to the component:

<code-sample title="src/templates/example.html">

  ```xml
  ---
  image:
    url: 'https://example.com/image.jpg'
    width: '600px'
    height: '400px'
  ---

  <extends src="src/layouts/main.html">
    <block name="template">
      <component
        src="src/components/v-fill.html"
        image="{{ image.url }}"
        width="{{ image.width }}"
        height="{{ image.height }}"
      >
        <div>
          Overlayed HTML!
        </div>
      </component>
    </block>
  </extends>
  ```

</code-sample>

Result:

<code-sample title="build_production/example.html">

  ```xml
  <!--[if mso]>
  <v:rect stroke="false" style="width: {{ width }}" xmlns:v="urn:schemas-microsoft-com:vml">
  <v:fill type="frame" src="{{{ image }}}" />
  <v:textbox inset="0,0,0,0" style="mso-fit-shape-to-text: true"><div><![endif]-->
  <div>
    Overlayed HTML!
  </div>
  <!--[if mso]></div></v:textbox></v:rect><![endif]-->
  ```

</code-sample>

## Variables

When creating a Component, you have access to global variables:

<code-sample title="src/components/example.html">

  ```xml
  <div>
    Building for: {{ page.env }}
  </div>
  ```

</code-sample>

You can also manually provide data to the Component through attributes:

<code-sample title="src/templates/example.html">

  ```xml
  <component
    src="src/components/example.html"
    env="{{ page.env }}"
    role="user"
  >
    Building for: {{ env }}
    Role is: {{ role }}
  </component>
  ```

</code-sample>

## Ignoring expressions

Ignoring expressions inside a Component works as you'd expect:

<code-sample title="src/components/example.html">

  ```xml
  Hello @{{ name | fallback: 'friend' }}!

  <content></content>
  ```

</code-sample>

Of course, you can ignore expressions when passing data or content to the Component:

<code-sample title="src/templates/example.html">

  ```xml
  <component
    src="src/components/example.html"
    role="@{{ user.role }}"
  >
    Hello @{{ name | fallback: 'friend' }}!

    <raw>
      @{{ foo }}
    </raw>
  </component>
  ```

</code-sample>

#### Ignoring raw blocks

There's just one caveat: ignoring expressions inside `<raw>` blocks that you pass inside a component will only work like this:

<code-sample title="src/templates/example.html">

  ```xml
  <component src="src/components/example.html">
    <raw>
      @{{ foo }}
    </raw>
  </component>
  ```

</code-sample>
