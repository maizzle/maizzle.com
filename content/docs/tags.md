---
title: "Tags"
description: "Special tags for templating logic that you can use in Maizzle."
---

# Tags

Maizzle includes some special tags designed to help you with templating logic.

## Conditionals

You can use if/elseif/else conditionals in your email templates.

For example, the Starter uses it to output a preheader in its Layout:

```hbs [src/templates/example.html]
<if condition="page.preheader">
  <div class="hidden">{{ page.preheader }}</div>
</if>
```

Of course, you can create more complex conditions:

```xml [src/templates/example.html]
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

#### Custom conditionals tag

You may customize the conditional tag names:

```js [config.js]
export default {
  build: {
    expressions: {
      conditionalTags: ['when', 'ifnotthen', 'otherwise'],
    }
  }
}
```

Example:

```xml [src/templates/example.html]
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

## Template

The `<template>` tag will only return its contents.

You can use it to apply a filter to a string, for example:

```xml [src/templates/example.html]
<template uppercase>test</template>
```

Result:

```xml
TEST
```

... or to compile a markdown string:

```xml [src/templates/example.html]
<template markdown>
  # Hello, world!
</template>
```

Result:

```xml
<h1>Hello, world!</h1>
```

#### Preserving template tags

If you actually need to output a `<template>` tag in the compiled HTML, you may use the `preserve` attribute:

```xml [src/templates/example.html]
<template preserve>
  test
</template>
```

Result:

```xml
<template>
  test
</template>
```

## Outlook

Wrap content with MSO conditional comments so that it will only show up in Outlook 2007-2019 on Windows:

```xml [src/templates/example.html]
<outlook>
  <div>Show this in all Outlook versions</div>
</outlook>
```

That will output:

```xml
<!--[if mso|ie]>
  <div>Show this in all Outlook versions</div>
<![endif]-->
```

Of course, there's also a tag for showing content everywhere _except_ in Outlook:

```xml [src/templates/example.html]
<not-outlook>
  <div>All Outlooks will ignore this</div>
</not-outlook>
```

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

```xml [src/templates/example.html]
<outlook only="2013">
  <div>Show only in Outlook 2013</div>
</outlook>
```

Result:

```xml
<!--[if mso 15]>
  <div>Show only in Outlook 2013</div>
<![endif]-->
```

The `only` and `not` attributes support multiple values, separated with a comma:

```xml [src/templates/example.html]
<outlook only="2013,2016">
  <div>Show only in Outlook 2013 and 2016</div>
</outlook>
```

Result:

```xml
<!--[if (mso 15)|(mso 16)]>
  <div>Show only in Outlook 2013 and 2016</div>
<![endif]-->
```

You may also combine attributes:

```xml [src/templates/example.html]
<outlook gt="2003" lte="2013">
  <div>Show in 2007, 2010, 2013</div>
</outlook>
```

Result:

```xml
<!--[if (gt mso 11)&(lte mso 15)]>
  <div>Show in 2007, 2010, 2013</div>
<![endif]-->
```

#### Custom Outlook tag

Of course, you may customize the `<outlook>` tag name:

```js [config.js]
export default {
  outlook: {
    tag: 'mso',
  }
}
```

You'd then use it like this:

```xml [src/templates/example.html]
<mso only="2013">Show only in Outlook 2013</mso>
<not-mso>Hide from all Outlooks</not-mso>
```

## Switch

Need to use a [switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) statement?

```xml [src/templates/example.html]
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

#### Custom switch tag

You may define custom tags for the switch statement:

```js [config.js]
export default {
  expressions: {
    switchTags: ['handle', 'when', 'fallback'],
  }
}
```

Example:

```xml [src/templates/example.html]
<handle expression="page.env">
  <when n="'production'">
    production
  </when>
  <fallback>
    fallback content
  </fallback>
</handle>
```

## Loops

You can iterate over arrays and objects with the `<each>` tag.

For arrays:

```xml [src/templates/example.html]
<each loop="item, index in someArray">
  <p>{{ index }}: {{ item }}</p>
</each>
```

For objects:

```xml [src/templates/example.html]
<each loop="value, key in anObject">
  <p>{{ key }}: {{ value }}</p>
</each>
```

### Loop meta

Inside a loop you will have access to a `{{ loop }}` object that contains information about the loop currently being executed:

- `loop.index` - the current iteration of the loop (0 indexed)
- `loop.remaining` - number of iterations until the end (0 indexed)
- `loop.first` - boolean indicating if it's the first iteration
- `loop.last` - boolean indicating if it's the last iteration
- `loop.length` - total number of items

Example:

```xml [src/templates/example.html]
<each loop="item, index in [1,2,3]">
  <p>Number of iterations until the end: {{ loop.remaining }}</p>
</each>
```

#### Custom loop tag

You may customize the name of the loop tag:

```js [config.js]
export default {
  expressions: {
    loopTags: ['for'],
  }
}
```

You can now use a `<for>` tag instead:

```xml [src/templates/example.html]
<for loop="item, index in [1,2,3]">
  <p>{{ item }}</p>
</for>
```

## Scope

Use `<scope>` tags to provide a data context to the content inside.

Imagine we had this data in our `config.js`:

```js [config.js]
export default {
  roles: {
    author: { name: 'John' },
    editor: { name: 'Jane' },
  }
}
```

We could provide each object as a scope, so we can then access it from the context, instead of going up to the parent:

```hbs [src/templates/example.html]
<!-- Will output 'John', no need to write {{ page.roles.author.name }} -->
<scope with="page.roles.author">
  {{ name }}
</scope>

<!-- Will output 'Jane' -->
<scope with="page.roles.editor">
  {{ name }}
</scope>
```

#### Custom scope tag

You may customize the `<scope>` tag name:

```js [config.js]
export default {
  expressions: {
    scopeTags: ['context'],
  }
}
```

Example:

```hbs [src/templates/example.html]
<!-- Will output 'Jane' -->
<context with="page.roles.editor">
  {{ name }}
</context>
```

## Fetch

You can fetch and display remote content in your email templates:

```hbs [src/templates/example.html]
<fetch url="https://jsonplaceholder.typicode.com/users">
  <each loop="user in response">
    {{ user.name }}
  </each>
</fetch>
```

Inside the `<fetch>` tag, you have access to a `{{ response }}` variable.

#### Fetch options

You may use the `fetch` key to customize options:

```js [config.js]
module.exports = {
  fetch: {
    tags: ['get'], // default ['fetch', 'remote']
    attribute: 'resource', // default 'url'
    ofetch: {}, // pass options to the `ofetch` package
    preserveTag: true, // default false
    expressions: {}, // configure expressions in fetch context
  }
}
```

## Raw

Need to skip tag and expressions parsing in a whole block?

```hbs [src/templates/example.html]
<raw>
  This will not be parsed:
  <if condition="page.env">
    {{ page.env }}
  </if>
  Neither will this expression: {{ page.env }}
</raw>
```

Result:

```hbs [build_production/example.html]
This will not be parsed:
<if condition="page.env">
  {{ page.env }}
</if>
Neither will this expression: {{ page.env }}
```

#### Custom raw tag

The `<raw>` tag name may be customized:

```js [config.js]
export default {
  expressions: {
    ignoredTag: 'verbatim',
  }
}
```

Example:

```hbs [src/templates/example.html]
<verbatim>
  This will not be parsed: {{ page.env }}
</verbatim>
```

## Env

You may output content based on the current Environment through the `<env:>` tag:

```xml [src/templates/example.html]
<env:local>
  This will only show in local.
</env:local>

<env:production>
  This will only show in production.
</env:production>
```

If the tag doesn't match the current Environment, it will be removed from the output.

In this example, running `maizzle build production` will output:

```xml
This will only show in production.
```
