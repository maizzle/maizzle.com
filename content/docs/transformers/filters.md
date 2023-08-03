---
title: "Filters"
description: "Apply transformations to content inside tags from your HTML email templates."
---

# Filters

Maizzle includes filters that enable you to do anything you want to text inside elements that you mark with custom attributes.

## Usage

Add a `filters` object to your Maizzle config:

```js [config.js]
module.exports = {
  filters: {}
}
```

Each entry in this object is made up of a `key: value` pair.

- `key` represents a custom HTML attribute name
- `value` is a function that accepts two arguments, and must return a string

Example:

```js [config.js]
module.exports = {
  filters: {
    uppercase: str => str.toUpperCase()
  }
}
```

Used in a Template:

```xml [src/templates/example.html]
<p uppercase>Here is some foo.</p>
```

Result:

```xml
<p>HERE IS SOME FOO BAR.</p>
```

Of course, this is just a dumb example - you could imagine more complex scenarios where you pull in packages and do stuff like:

- compile CSS in some `<style>` tag with Sass or others
- normalize html whitespace in parts of your code
- create various content filters
- ...

## Disabling

You may disable all filters by setting the option to `false`:

```js [config.js]
module.exports = {
  filters: false
}
```

## Default filters

The following filters are included by default.

### append

Append text to the end of the string.

```xml [example.html]
<p append=" bar">foo</p>
<!-- <p>foo bar</p> -->
```

### prepend

Prepend text to the beginning of the string.

```xml [example.html]
<p prepend="foo ">bar</p>
<!-- <p>foo bar</p> -->
```

### uppercase

Uppercase the string.

```xml [example.html]
<p uppercase>foo</p>
<!-- <p>FOO</p> -->
```

### lowercase

Lowercase the string.

```xml [example.html]
<p lowercase>FOO</p>
<!-- <p>foo</p> -->
```

### capitalize

Uppercase the first letter of the string.

```xml [example.html]
<p capitalize>foo</p>
<!-- <p>Foo</p> -->
```

### ceil

Round up to the nearest integer.

```xml [example.html]
<p ceil>1.2</p>
<!-- <p>2</p> -->
```

### floor

Round down to the nearest integer.

```xml [example.html]
<p ceil>1.2</p>
<!-- <p>1</p> -->
```

### round

Round to the nearest integer.

```xml [example.html]
<p round>1234.567</p>
<!-- <p>1235</p> -->
```

### escape

Escapes a string by replacing characters with escape sequences (so that the string can be used in a URL, for example).

```xml [example.html]
<p escape>"&'<></p>
<!-- <p>&#34;&amp;&#39;&lt;&gt;</p> -->
```

### escape-once

Escapes a string without changing existing escaped entities.

```xml [example.html]
<p escape-once>1 &lt; 2 &amp; 3</p>
<!-- <p>1 &lt; 2 &amp; 3</p> -->
```

### lstrip

Remove leading whitespace from the string.

```xml [example.html]
<p lstrip> test </p>
<!-- <p>test </p> -->
```

### rstrip

Remove trailing whitespace from the string.

```xml [example.html]
<p rstrip> test </p>
<!-- <p> test</p> -->
```

### trim

Remove leading and trailing whitespace from the string.

```xml [example.html]
<p trim> test </p>
<!-- <p>test</p> -->
```

### minus

Subtracts one number from another.

```xml [example.html]
<p minus="2">3</p>
<!-- <p>1</p> -->
```

### plus

Adds one number to another.

```xml [example.html]
<p plus="2">3</p>
<!-- <p>5</p> -->
```

### multiply

Alias: `times`

```xml [example.html]
<p multiply="2">1.2</p>
<!-- <p>2.4</p> -->
```

### divide-by

Alias: `divide`

```xml [example.html]
<div divide-by="2">1.2</div>
<!-- <p>0.6</p> -->
```

### modulo

Returns the remainder of one number divided by another.

```xml [example.html]
<p modulo="2">3</p>
<!-- <p>1</p> -->
```

### newline-to-br

Insert an HTML line break (`<br />`) in front of each newline (`\n`) in a string.

```xml [example.html]
<p newline-to-br>
  test
  test
</p>
<!-- <p><br>  test<br>  test<br></p> -->
```

### strip-newlines

Remove any newline characters (line breaks) from the string.

```xml [example.html]
<p strip_newlines>
  test
  test
</p>
<!-- <p>  test  test</p> -->
```

### remove

Remove every occurrence of `text` from the string.

```xml [example.html]
<p remove="rain">I strained to see the train through the rain</p>
<!-- <p>I sted to see the t through the </p> -->
```

### remove-first

Remove the first occurrence of `text` from the string.

```xml [example.html]
<p remove-first="rain">I strained to see the train through the rain</p>
<!-- <p>I sted to see the train through the rain</p> -->
```

### replace

Replace every occurrence of the first argument with the second argument.

You must separate arguments with a pipe character (`|`).

```xml [example.html]
<p replace="1|test">test</p>
<!-- <p>1es1</p> -->
```

### replace-first

Replace the first occurrence of the first argument with the second argument.

You must separate arguments with a pipe character (`|`).

```xml [example.html]
<p replace-first="t|b">test</p>
<!-- <p>best</p> -->
```

### size

Return the number of characters in the string.

```xml [example.html]
<p size>one</p>
<!-- <p>3</p> -->
```

### slice

Return a slice of the string starting at the provided index.

```xml [example.html]
<p slice="1">test</p>
<!-- <p>est</p> -->
```

You may pass a startIndex and endIndex:

```xml [example.html]
<p slice="0,-1">test</p>
<!-- <p>tes</p> -->
```

### truncate

Shorten a string down to the number of characters passed as the argument.

```xml [example.html]
<p truncate="17">Ground control to Major Tom.</p>
<!-- <p>Ground control to...</p> -->
```

You may pass a custom ellipsis as the second argument.

Separate arguments with a comma:

```xml [example.html]
<p truncate="17, no one">Ground control to Major Tom.</p>
<!-- <p>Ground control to no one</p> -->
```

### truncate-words

Shorten a string down to the number of words passed as the argument.

```xml [example.html]
<p truncate-words="2">Ground control to Major Tom.</p>
<!-- <p>Ground control...</p> -->
```

You may pass a custom ellipsis as the second argument.

Separate arguments with a comma:

```xml [example.html]
<p truncate-words="2, over and out">Ground control to Major Tom.</p>
<!-- <p>Ground control over and out</p> -->
```

### url-decode

Decode a string that has been encoded as a URL.

```xml [example.html]
<p url-decode>%27Stop%21%27+said+Fred</p>
<!-- <p>'Stop!' said Fred</p> -->
```

### url-encode

Convert any URL-unsafe characters in a string into percent-encoded characters.

```xml [example.html]
<p url-encode>user@example.com</p>
<!-- <p>user%40example.com</p> -->
```
