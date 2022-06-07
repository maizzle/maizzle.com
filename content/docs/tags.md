---
title: "Tags"
description: "Special tags for templating logic that you can use in Maizzle"
---

# Tags

Maizzle includes some special tags designed to help you with templating logic.

## Conditionals

You can use if/elseif/else conditionals in your email templates.

For example, the Starter uses it to output a preheader in its Layout:

<code-sample title="src/templates/example.html">

  ```xml
  <if condition="page.preheader">
    <div class="hidden">{{ page.preheader }}</div>
  </if>
  ```

</code-sample>

Of course, you can create more complex conditions:

<code-sample title="src/templates/example.html">

  ```xml
  <if condition="page.env === 'node'">
    <p>Using Maizzle programmatically</p>
  </if>
  <elseif condition="page.env === 'production'">
    <p>We are in production!</p>
  </elseif>
  <else>
    <p>We are probably developing locally.</p>
  </else>
  ```

</code-sample>

#### Custom conditionals tag

You may customize the conditional tag names:

<code-sample title="config.js">

```js
module.exports = {
  build: {
    posthtml: {
      expressions: {
        conditionalTags: ['when', 'ifnotthen', 'otherwise']
      }
    }
  }
}
```

</code-sample>

Example:

<code-sample title="src/templates/example.html">

  ```xml
  <when condition="page.env === 'node'">
    <p>Using Maizzle programmatically</p>
  </when>
  <ifnotthen condition="page.env === 'production'">
    <p>We are in production!</p>
  </ifnotthen>
  <otherwise>
    <p>We are probably developing locally.</p>
  </otherwise>
  ```

</code-sample>

## Outlook

Wrap content with MSO conditional comments so that it will only show up in Outlook 2007-2019 on Windows:

<code-sample title="src/templates/example.html">

  ```xml
  <outlook>
    <div>Show this in all Outlook versions</div>
  </outlook>
  ```

</code-sample>

That will output:

```xml
<!--[if mso|ie]>
  <div>Show this in all Outlook versions</div>
<![endif]-->
```

Of course, there's also a tag for showing content everywhere _except_ in Outlook:

<code-sample title="src/templates/example.html">

  ```xml
  <not-outlook>
    <div>All Outlooks will ignore this</div>
  </not-outlook>
  ```

</code-sample>

Result:

```xml
<!--[if !mso]><!-->
  <div>All Outlooks will ignore this</div>
<!--<![endif]-->
```

The `<outlook>` tag supports various combinations of attributes that will help with showing or hiding content in specific Outlook versions:

- `only` - show only in these Outlook versions
- `not` - show in all versions except these
- `lt` - all versions before this (not including it, i.e. lower than)
- `lte` - all versions before this (including it, i.e. lower than or equal to)
- `gt` - all versions after this (not including it, i.e. greater than)
- `gte` - all versions after this (including it, i.e. greater than or equal to)

For example:

<code-sample title="src/templates/example.html">

  ```xml
  <outlook only="2013">
    <div>Show only in Outlook 2013</div>
  </outlook>
  ```

</code-sample>

Result:

```xml
<!--[if mso 15]>
  <div>Show only in Outlook 2013</div>
<![endif]-->
```

The `only` and `not` attributes support multiple values, separated with a comma:

<code-sample title="src/templates/example.html">

  ```xml
  <outlook only="2013,2016">
    <div>Show only in Outlook 2013 and 2016</div>
  </outlook>
  ```

</code-sample>

Result:

```xml
<!--[if (mso 15)|(mso 16)]>
  <div>Show only in Outlook 2013 and 2016</div>
<![endif]-->
```

You may also combine attributes:

<code-sample title="src/templates/example.html">

  ```xml
  <outlook gt="2003" lte="2013">
    <div>Show in 2007, 2010, 2013</div>
  </outlook>
  ```

</code-sample>

Result:

```xml
<!--[if (gt mso 11)&(lte mso 15)]>
  <div>Show in 2007, 2010, 2013</div>
<![endif]-->
```

#### Custom Outlook tag

Of course, you may customize the `<outlook>` tag name:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      posthtml: {
        outlook: {
          tag: 'mso'
        }
      }
    }
  }
  ```

</code-sample>

You'd then use it like this:

<code-sample title="src/templates/example.html">

  ```xml
  <mso only="2013">Show only in Outlook 2013</mso>
  <not-mso>Hide from all Outlooks</not-mso>
  ```

</code-sample>

## Switch

Need to use a [switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) statement?

<code-sample title="src/templates/example.html">

  ```xml
  <switch expression="page.user.subscription">
    <case n="'monthly'">
      <p>Your monthly subscription is about to renew.</p>
    </case>
    <case n="'yearly'">
      <p>Heads up! Yearly renewal coming soon, make sure you have enough money in your account.</p>
    </case>
    <default>
      <p>Your subscription will soon renew.</p>
    </default>
  </switch>
  ```

</code-sample>

#### Custom switch tag

You may define custom tags for the switch statement:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      posthtml: {
        expressions: {
          switchTags: ['handle', 'when', 'fallback']
        }
      }
    }
  }
  ```

</code-sample>

Example:

<code-sample title="src/templates/example.html">

  ```xml
  <handle expression="page.env">
    <when n="'production'">
      production
    </when>
    <fallback>
      fallback content
    </fallback>
  </handle>
  ```

</code-sample>

## Loops

You can iterate over arrays and objects with the `<each>` tag.

For arrays:

<code-sample title="src/templates/example.html">

  ```xml
  <each loop="item, index in someArray">
    <p>{{ index }}: {{ item }}</p>
  </each>
  ```

</code-sample>

For objects:

<code-sample title="src/templates/example.html">

  ```xml
  <each loop="value, key in anObject">
    <p>{{ key }}: {{ value }}</p>
  </each>
  ```

</code-sample>

### Loop meta

Inside a loop you will have access to a `{{ loop }}` object that contains information about the loop currently being executed:

- `loop.index` - the current iteration of the loop (0 indexed)
- `loop.remaining` - number of iterations until the end (0 indexed)
- `loop.first` - boolean indicating if it's the first iteration
- `loop.last` - boolean indicating if it's the last iteration
- `loop.length` - total number of items

Example:

<code-sample title="src/templates/example.html">

  ```xml
  <each loop="item, index in [1,2,3]">
    <p>Number of iterations until the end: {{ loop.remaining }}</p>
  </each>
  ```

</code-sample>

#### Custom loop tag

You may customize the name of the loop tag:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      posthtml: {
        expressions: {
          loopTags: ['for']
        }
      }
    }
  }
  ```

</code-sample>

You can now use a `<for>` tag instead:

<code-sample title="src/templates/example.html">

  ```xml
  <for loop="item, index in [1,2,3]">
    <p>{{ item }}</p>
  </for>
  ```

</code-sample>

## Scope

Use `<scope>` tags to provide a data context to the content inside.

Imagine we had this data in our `config.js`:

<code-sample title="config.js">

  ```js
  module.exports = {
    roles: {
      author: { name: 'John' },
      editor: { name: 'Jane' },
    }
  }
  ```

</code-sample>

We could provide each object as a scope, so we can then access it from the context, instead of going up to the parent:

<code-sample title="src/templates/example.html">

  ```xml
  <!-- Will output 'John', no need to write {{ page.roles.author.name }} -->
  <scope with="page.roles.author">
    {{ name }}
  </scope>

  <!-- Will output 'Jane' -->
  <scope with="page.roles.editor">
    {{ name }}
  </scope>
  ```

</code-sample>

#### Custom scope tag

You may customize the `<scope>` tag name:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      posthtml: {
        expressions: {
          scopeTags: ['context']
        }
      }
    }
  }
  ```

</code-sample>

Example:

<code-sample title="src/templates/example.html">

  ```xml
  <!-- Will output 'Jane' -->
  <context with="page.roles.editor">
    {{ name }}
  </context>
  ```

</code-sample>

## Fetch

You can fetch and display remote content in your email templates:

<code-sample title="src/templates/example.html">

  ```xml
  <fetch url="https://jsonplaceholder.typicode.com/users">
    <each loop="user in response">
      {{ user.name }}
    </each>
  </fetch>
  ```

</code-sample>

Inside the `<fetch>` tag, you have access to a `{{ response }}` variable.

#### Fetch options

You may use the `fetch` key to customize options:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      posthtml: {
        fetch: {
          tags: ['get'], // default ['fetch', 'remote']
          attribute: 'resource', // default 'url'
          got: {}, // pass options to the `got` package
          preserveTag: true, // default false
          expressions: {}, // configure expressions in fetch context
        }
      }
    }
  }
  ```

</code-sample>

## Raw

Need to skip tag and expressions parsing in a whole block?

<code-sample title="src/templates/example.html">

  ```xml
  <raw>
    This will not be parsed:
    <if condition="page.env">
      {{ page.env }}
    </if>
    Neither will this expression: {{ page.env }}
  </raw>
  ```

</code-sample>

Result:

<code-sample title="build_production/example.html">

  ```xml
  This will not be parsed:
  <if condition="page.env">
    {{ page.env }}
  </if>
  Neither will this expression: {{ page.env }}
  ```

</code-sample>

#### Custom raw tag

The `<raw>` tag name may be customized:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      posthtml: {
        expressions: {
          ignoredTag: 'verbatim'
        }
      }
    }
  }
  ```

</code-sample>

Example:

<code-sample title="src/templates/example.html">

  ```xml
  <verbatim>
    This will not be parsed: {{ page.env }}
  </verbatim>
  ```

</code-sample>
