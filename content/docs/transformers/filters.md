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
  <div append=" bar">foo</div>
  <!-- <div>foo bar</div> -->
  ```

</code-sample>

### prepend

Prepend text to the beginning of the string.

<code-sample title="example.html">

  ```xml
  <div prepend="foo ">bar</div>
  <!-- <div>foo bar</div> -->
  ```

</code-sample>

### uppercase

Uppercase the string.

<code-sample title="example.html">

  ```xml
  <div uppercase>foo</div>
  <!-- <div>FOO</div> -->
  ```

</code-sample>

### lowercase

Lowercase the string.

<code-sample title="example.html">

  ```xml
  <div lowercase>FOO</div>
  <!-- <div>foo</div> -->
  ```

</code-sample>

### capitalize

Uppercase the first letter of the string.

<code-sample title="example.html">

  ```xml
  <div capitalize>foo</div>
  <!-- <div>Foo</div> -->
  ```

</code-sample>

### ceil

Round up to the nearest integer.

<code-sample title="example.html">

  ```xml
  <div ceil>1.2</div>
  <!-- <div>2</div> -->
  ```

</code-sample>

### floor

Round down to the nearest integer.

<code-sample title="example.html">

  ```xml
  <div ceil>1.2</div>
  <!-- <div>1</div> -->
  ```

</code-sample>

### round

Round to the nearest integer.

<code-sample title="example.html">

  ```xml
  <div round>1234.567</div>
  <!-- <div>1235</div> -->
  ```

</code-sample>

### escape

Escapes a string by replacing characters with escape sequences (so that the string can be used in a URL, for example).

<code-sample title="example.html">

  ```xml
  <div escape>"&'<></div>
  <!-- <div>&#34;&amp;&#39;&lt;&gt;</div> -->
  ```

</code-sample>

### escape-once

Escapes a string without changing existing escaped entities.

<code-sample title="example.html">

  ```xml
  <div escape-once>1 &lt; 2 &amp; 3</div>
  <!-- <div>1 &lt; 2 &amp; 3</div> -->
  ```

</code-sample>

### lstrip

Remove leading whitespace from the string.

<code-sample title="example.html">

  ```xml
  <div lstrip> test </div>
  <!-- <div>test </div> -->
  ```

</code-sample>

### rstrip

Remove trailing whitespace from the string.

<code-sample title="example.html">

  ```xml
  <div rstrip> test </div>
  <!-- <div> test</div> -->
  ```

</code-sample>

### trim

Remove leading and trailing whitespace from the string.

<code-sample title="example.html">

  ```xml
  <div trim> test </div>
  <!-- <div>test</div> -->
  ```

</code-sample>

### minus

Subtracts one number from another.

<code-sample title="example.html">

  ```xml
  <div minus="2">3</div>
  <!-- <div>1</div> -->
  ```

</code-sample>

### plus

Adds one number to another.

<code-sample title="example.html">

  ```xml
  <div plus="2">3</div>
  <!-- <div>5</div> -->
  ```

</code-sample>

### multiply

Alias: `times`

<code-sample title="example.html">

  ```xml
  <div multiply="2">1.2</div>
  <!-- 2.4 -->
  ```

</code-sample>

### divide-by

Alias: `divide`

<code-sample title="example.html">

  ```xml
  <div divide-by="2">1.2</div>
  <!-- 0.6 -->
  ```

</code-sample>

### modulo

Returns the remainder of one number divided by another.

<code-sample title="example.html">

  ```xml
  <div modulo="2">3</div>
  <!-- 1 -->
  ```

</code-sample>

### newline-to-br

Insert an HTML line break (`<br />`) in front of each newline (`\n`) in a string.

<code-sample title="example.html">

  ```xml
  <div newline-to-br>
    test
    test
  </div>
  <!-- <div><br>  test<br>  test<br></div> -->
  ```

</code-sample>

### strip-newlines

Remove any newline characters (line breaks) from the string.

<code-sample title="example.html">

  ```xml
  <div strip_newlines>
    test
    test
  </div>
  <!-- <div>  test  test</div> -->
  ```

</code-sample>

### remove

Remove every occurrence of `text` from the string.

<code-sample title="example.html">

  ```xml
  <div remove="rain">I strained to see the train through the rain</div>
  <!-- <div>I sted to see the t through the </div> -->
  ```

</code-sample>

### remove-first

Remove the first occurrence of `text` from the string.

<code-sample title="example.html">

  ```xml
  <div remove-first="rain">I strained to see the train through the rain</div>
  <!-- <div>I sted to see the train through the rain</div> -->
  ```

</code-sample>

### replace

Replace every occurrence of the first argument with the second argument.

You must separate arguments with a pipe character (`|`).

<code-sample title="example.html">

  ```xml
  <div replace="1|test">test</div>
  <div>1es1</div>
  ```

</code-sample>

### replace-first

Replace the first occurrence of the first argument with the second argument.

You must separate arguments with a pipe character (`|`).

<code-sample title="example.html">

  ```xml
  <div replace-first="t|b">test</div>
  <div>best</div>
  ```

</code-sample>

### size

Return the number of characters in the string.

<code-sample title="example.html">

  ```xml
  <div size>one</div>
  <!-- <div>3</div> -->
  ```

</code-sample>

### slice

Return a slice of the string starting at the provided index.

<code-sample title="example.html">

  ```xml
  <div slice="1">test</div>
  <!-- <div>est</div> -->
  ```

</code-sample>

You may pass a startIndex and endIndex:

<code-sample title="example.html">

  ```xml
  <div slice="0,-1">test</div>
  <!-- <div>tes</div> -->
  ```

</code-sample>

### truncate

Shorten a string down to the number of characters passed as the argument.

<code-sample title="example.html">

  ```xml
  <div truncate="17">Ground control to Major Tom.</div>
  <!-- <div>Ground control to...</div> -->
  ```

</code-sample>

You may pass a custom ellipsis as the second argument.

Separate arguments with a comma:

<code-sample title="example.html">

  ```xml
  <div truncate="17, no one">Ground control to Major Tom.</div>
  <!-- <div>Ground control to no one</div> -->
  ```

</code-sample>

### truncate-words

Shorten a string down to the number of words passed as the argument.

<code-sample title="example.html">

  ```xml
  <div truncate-words="2">Ground control to Major Tom.</div>
  <!-- <div>Ground control...</div> -->
  ```

</code-sample>

You may pass a custom ellipsis as the second argument.

Separate arguments with a comma:

<code-sample title="example.html">

  ```xml
  <div truncate-words="2, over and out">Ground control to Major Tom.</div>
  <!-- <div>Ground control over and out</div> -->
  ```

</code-sample>

### url-decode

Decode a string that has been encoded as a URL.

<code-sample title="example.html">

  ```xml
  <div url-decode>%27Stop%21%27+said+Fred</div>
  <!-- <div>'Stop!' said Fred</div> -->
  ```

</code-sample>

### url-encode

Convert any URL-unsafe characters in a string into percent-encoded characters.

<code-sample title="example.html">

  ```xml
  <div url-encode>user@example.com</div>
  <!-- <div>user%40example.com</div> -->
  ```

</code-sample>
