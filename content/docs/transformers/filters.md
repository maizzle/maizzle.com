---
title: "Filters"
description: "Apply transformations to content inside tags from your HTML email templates"
---

# Filters

Maizzle includes filters that enable you to do anything you want to text inside elements that you mark with custom attributes.

## Usage

Add a `filters` object to your Maizzle config:

<code-sample title="config.js">

  ```js
  module.exports = {
    filters: {}
  }
  ```

</code-sample>

Each entry in this object is made up of a `key: value` pair.

- `key` represents a custom HTML attribute name
- `value` is a function that accepts two arguments, and must return a string

Example:

<code-sample title="config.js">

  ```js
  module.exports = {
    filters: {
      uppercase: str => str.toUpperCase()
    }
  }
  ```

</code-sample>

Used in a Template:

<code-sample title="src/templates/example.html">

  ```xml
  <p uppercase>Here is some foo.</p>
  ```

</code-sample>

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

<code-sample title="config.js">

  ```js
  module.exports = {
    filters: false
  }
  ```

</code-sample>

## Default filters

The following filters are included by default.

### append

Append text to the end of the string.

<code-sample title="example.html">

  ```xml
  <p append=" bar">foo</p>
  <!-- <p>foo bar</p> -->
  ```

</code-sample>

### prepend

Prepend text to the beginning of the string.

<code-sample title="example.html">

  ```xml
  <p prepend="foo ">bar</p>
  <!-- <p>foo bar</p> -->
  ```

</code-sample>

### uppercase

Uppercase the string.

<code-sample title="example.html">

  ```xml
  <p uppercase>foo</p>
  <!-- <p>FOO</p> -->
  ```

</code-sample>

### lowercase

Lowercase the string.

<code-sample title="example.html">

  ```xml
  <p lowercase>FOO</p>
  <!-- <p>foo</p> -->
  ```

</code-sample>

### capitalize

Uppercase the first letter of the string.

<code-sample title="example.html">

  ```xml
  <p capitalize>foo</p>
  <!-- <p>Foo</p> -->
  ```

</code-sample>

### ceil

Round up to the nearest integer.

<code-sample title="example.html">

  ```xml
  <p ceil>1.2</p>
  <!-- <p>2</p> -->
  ```

</code-sample>

### floor

Round down to the nearest integer.

<code-sample title="example.html">

  ```xml
  <p ceil>1.2</p>
  <!-- <p>1</p> -->
  ```

</code-sample>

### round

Round to the nearest integer.

<code-sample title="example.html">

  ```xml
  <p round>1234.567</p>
  <!-- <p>1235</p> -->
  ```

</code-sample>

### escape

Escapes a string by replacing characters with escape sequences (so that the string can be used in a URL, for example).

<code-sample title="example.html">

  ```xml
  <p escape>"&'<></p>
  <!-- <p>&#34;&amp;&#39;&lt;&gt;</p> -->
  ```

</code-sample>

### escape-once

Escapes a string without changing existing escaped entities.

<code-sample title="example.html">

  ```xml
  <p escape-once>1 &lt; 2 &amp; 3</p>
  <!-- <p>1 &lt; 2 &amp; 3</p> -->
  ```

</code-sample>

### lstrip

Remove leading whitespace from the string.

<code-sample title="example.html">

  ```xml
  <p lstrip> test </p>
  <!-- <p>test </p> -->
  ```

</code-sample>

### rstrip

Remove trailing whitespace from the string.

<code-sample title="example.html">

  ```xml
  <p rstrip> test </p>
  <!-- <p> test</p> -->
  ```

</code-sample>

### trim

Remove leading and trailing whitespace from the string.

<code-sample title="example.html">

  ```xml
  <p trim> test </p>
  <!-- <p>test</p> -->
  ```

</code-sample>

### minus

Subtracts one number from another.

<code-sample title="example.html">

  ```xml
  <p minus="2">3</p>
  <!-- <p>1</p> -->
  ```

</code-sample>

### plus

Adds one number to another.

<code-sample title="example.html">

  ```xml
  <p plus="2">3</p>
  <!-- <p>5</p> -->
  ```

</code-sample>

### multiply

Alias: `times`

<code-sample title="example.html">

  ```xml
  <p multiply="2">1.2</p>
  <!-- <p>2.4</p> -->
  ```

</code-sample>

### divide-by

Alias: `divide`

<code-sample title="example.html">

  ```xml
  <div divide-by="2">1.2</div>
  <!-- <p>0.6</p> -->
  ```

</code-sample>

### modulo

Returns the remainder of one number divided by another.

<code-sample title="example.html">

  ```xml
  <p modulo="2">3</p>
  <!-- <p>1</p> -->
  ```

</code-sample>

### newline-to-br

Insert an HTML line break (`<br />`) in front of each newline (`\n`) in a string.

<code-sample title="example.html">

  ```xml
  <p newline-to-br>
    test
    test
  </p>
  <!-- <p><br>  test<br>  test<br></p> -->
  ```

</code-sample>

### strip-newlines

Remove any newline characters (line breaks) from the string.

<code-sample title="example.html">

  ```xml
  <p strip_newlines>
    test
    test
  </p>
  <!-- <p>  test  test</p> -->
  ```

</code-sample>

### remove

Remove every occurrence of `text` from the string.

<code-sample title="example.html">

  ```xml
  <p remove="rain">I strained to see the train through the rain</p>
  <!-- <p>I sted to see the t through the </p> -->
  ```

</code-sample>

### remove-first

Remove the first occurrence of `text` from the string.

<code-sample title="example.html">

  ```xml
  <p remove-first="rain">I strained to see the train through the rain</p>
  <!-- <p>I sted to see the train through the rain</p> -->
  ```

</code-sample>

### replace

Replace every occurrence of the first argument with the second argument.

You must separate arguments with a pipe character (`|`).

<code-sample title="example.html">

  ```xml
  <p replace="1|test">test</p>
  <!-- <p>1es1</p> -->
  ```

</code-sample>

### replace-first

Replace the first occurrence of the first argument with the second argument.

You must separate arguments with a pipe character (`|`).

<code-sample title="example.html">

  ```xml
  <p replace-first="t|b">test</p>
  <!-- <p>best</p> -->
  ```

</code-sample>

### size

Return the number of characters in the string.

<code-sample title="example.html">

  ```xml
  <p size>one</p>
  <!-- <p>3</p> -->
  ```

</code-sample>

### slice

Return a slice of the string starting at the provided index.

<code-sample title="example.html">

  ```xml
  <p slice="1">test</p>
  <!-- <p>est</p> -->
  ```

</code-sample>

You may pass a startIndex and endIndex:

<code-sample title="example.html">

  ```xml
  <p slice="0,-1">test</p>
  <!-- <p>tes</p> -->
  ```

</code-sample>

### truncate

Shorten a string down to the number of characters passed as the argument.

<code-sample title="example.html">

  ```xml
  <p truncate="17">Ground control to Major Tom.</p>
  <!-- <p>Ground control to...</p> -->
  ```

</code-sample>

You may pass a custom ellipsis as the second argument.

Separate arguments with a comma:

<code-sample title="example.html">

  ```xml
  <p truncate="17, no one">Ground control to Major Tom.</p>
  <!-- <p>Ground control to no one</p> -->
  ```

</code-sample>

### truncate-words

Shorten a string down to the number of words passed as the argument.

<code-sample title="example.html">

  ```xml
  <p truncate-words="2">Ground control to Major Tom.</p>
  <!-- <p>Ground control...</p> -->
  ```

</code-sample>

You may pass a custom ellipsis as the second argument.

Separate arguments with a comma:

<code-sample title="example.html">

  ```xml
  <p truncate-words="2, over and out">Ground control to Major Tom.</p>
  <!-- <p>Ground control over and out</p> -->
  ```

</code-sample>

### url-decode

Decode a string that has been encoded as a URL.

<code-sample title="example.html">

  ```xml
  <p url-decode>%27Stop%21%27+said+Fred</p>
  <!-- <p>'Stop!' said Fred</p> -->
  ```

</code-sample>

### url-encode

Convert any URL-unsafe characters in a string into percent-encoded characters.

<code-sample title="example.html">

  ```xml
  <p url-encode>user@example.com</p>
  <!-- <p>user%40example.com</p> -->
  ```

</code-sample>
