---
title: "Tags"
description: "Special tags for templating logic that you can use in Maizzle."
---

# Tags

Maizzle includes some special tags designed to help you with templating logic.

## Conditionals

You can use if/elseif/else conditionals in your email templates.

For example, the Starter uses it to output a preheader in its Layout:

```hbs [emails/example.html]
<if condition="page.preheader">
  <div class="hidden">{{ page.preheader }}</div>
</if>
```

Of course, you can create more complex conditions:

```html [emails/example.html]
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
  expressions: {
    conditionalTags: ['when', 'ifnotthen', 'otherwise'],
  }
}
```

Example:

```html [emails/example.html]
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

```html [emails/example.html]
<template uppercase>test</template>
```

Result:

```xml
TEST
```

... or to compile a markdown string:

```html [emails/example.html]
<template markdown>
  # Hello, world!
</template>
```

Result:

```html
<h1>Hello, world!</h1>
```

#### Preserving template tags

If you actually need to output a `<template>` tag in the compiled HTML, you may use the `preserve` attribute:

```html [emails/example.html]
<template preserve>
  test
</template>
```

Result:

```html
<template>
  test
</template>
```

## Outlook

Wrap content in <abbr title="Microsoft Office">MSO</abbr> conditional comments to show it only in Outlook 2007-2021 on Windows:

```html [emails/example.html]
<outlook>
  <div>Show this in all Outlook versions</div>
</outlook>
```

That will output:

```html
<!--[if mso|ie]>
  <div>Show this in all Outlook versions</div>
<![endif]-->
```

Of course, there's also a tag for showing content in all email clients _except_ in Outlook:

```html [emails/example.html]
<not-outlook>
  <div>All Outlooks (on Windows) will ignore this</div>
</not-outlook>
```

Result:

```html
<!--[if !mso]><!-->
  <div>All Outlooks (on Windows) will ignore this</div>
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

```html [emails/example.html]
<outlook only="2013">
  <div>Show only in Outlook 2013</div>
</outlook>
```

Result:

```html
<!--[if mso 15]>
  <div>Show only in Outlook 2013</div>
<![endif]-->
```

The `only` and `not` attributes support multiple values, separated with a comma:

```html [emails/example.html]
<outlook only="2013,2016">
  <div>Show only in Outlook 2013 and 2016</div>
</outlook>
```

Result:

```html
<!--[if (mso 15)|(mso 16)]>
  <div>Show only in Outlook 2013 and 2016</div>
<![endif]-->
```

You may also combine attributes:

```html [emails/example.html]
<outlook gt="2003" lte="2013">
  <div>Show in 2007, 2010, 2013</div>
</outlook>
```

Result:

```html
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

```html [emails/example.html]
<mso only="2013">Show only in Outlook 2013</mso>
<not-mso>Hide from all Outlooks</not-mso>
```

## Switch

Need to use a [switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) statement?

```html [emails/example.html]
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

```html [emails/example.html]
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

```hbs [emails/example.html]
<each loop="item, index in someArray">
  <p>{{ index }}: {{ item }}</p>
</each>
```

For objects:

```hbs [emails/example.html]
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

```hbs [emails/example.html]
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

```hbs [emails/example.html]
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

```hbs [emails/example.html]
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

```hbs [emails/example.html]
<!-- Will output 'Jane' -->
<context with="page.roles.editor">
  {{ name }}
</context>
```

## Fetch

You can fetch and display remote content in your email templates:

```hbs [emails/example.html]
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
export default {
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

```hbs [emails/example.html]
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

```hbs [emails/example.html]
<verbatim>
  This will not be parsed: {{ page.env }}
</verbatim>
```

## Env

You may output content based on the current Environment through the `<env:>` tag:

```html [emails/example.html]
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
