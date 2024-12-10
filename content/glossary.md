---
title: "Glossary"
description: "Terms and abbreviations used in HTML email development."
---

# HTML email terms and abbreviations

There are many terms and abbreviations used in HTML email development. Here are some of the most common ones you might come across and what they mean.

## a11y

a11y is a numeronym that stands for _accessibility_. It is used to refer to the practice of making content accessible to people with disabilities.

There are many aspects to accessibility in HTML emails: using HTML text, providing alt text for images, ensuring good color contrast, decently-sized click targets and much more.

Accessibility is very important and a huge domain in itself, but if you want to dive deep into accessibility for HTML emails we recommend starting from Wilbert Heinen's [Accessible Email documentation](https://github.com/wilbertheinen/accessible-email-documentation) on GitHub.

## Hybrid email

In email coding, a hybrid email refers to the coding approach used to develop an HTML email that adapts in width to the screen size in any email client, no matter if it supports media queries or not.

The most common way to code hybrid HTML emails is to start with a fluid layout that uses percentage-based widths for the main table elements. A `max-width` CSS property is then used to control the layout width on larger screens.

Finally, ghost tables are used to control the layout width in MS Outlook on Windows.

## Ghost table

A ghost table in HTML email development is a table structure split into two parts, each commented-out through Outlook conditional comments.

```html
<!--[if mso]>
<table width="600" align="center" cellspacing="0" cellpadding="0" role="none">
  <tr>
    <td valign="top" width="600">
<![endif]-->
<div class="w-full max-w-[600px]">
  Email content
</div>
<!--[if mso]>
    </td>
  </tr>
</table>
<![endif]-->
```

Ghost tables are primarily used to control the layout width in MS Outlook on Windows when coding hybrid HTML emails.

## GANGA

GANGA is an acronym that stands for Gmail Android with Non Gmail Account. It refers to users who check their non-Gmail email accounts (like Yahoo!) in the Gmail Android app.

This is important to consider when coding HTML emails, as the Gmail Android app does not support embedded (`<style>`) CSS when checking non-Gmail accounts:

```html
<!doctype html>
<html>
<head>
  <!-- This entire style tag will not work in GANGA context -->
  <style>
    .text-gray-700 {
      color: #4b5563;
    }
  </style>
</head>
<body>
  <p class="text-gray-700">
    ...
  </p>
</body>
</html>
```

Together with Outlook on Windows which only supports the first class in a class attribute, GANGA is one of the main reasons we use inline CSS in HTML emails.

## Gmail clipping

Gmail clipping is a term used to describe the way Gmail cuts off the content of an email that exceeds a certain weight. [This is thought to be around 102KB](https://github.com/hteumeuleu/email-bugs/issues/41), but it can also be triggered by some special characters, like &copy;, no matter the email size.

Image size does not affect Gmail clipping, only the HTML weight of the email does. So it's fine if you use a large HERO image that is 200KB for example.

Another thing to consider is that your <abbr title="Email Service Provider">ESP</abbr> might add some extra weight to your email, usually by rewriting your URLs to their own so that clicks and opens can be tracked.

## Preview text

Preview text, also known as preheader text, is the text that appears in the inbox list view, after the subject line. It is used to provide additional context to the recipient and encourage them to open the email.

There are many ways to code preview text for HTML emails, and techniques constantly evolve as email clients change their rendering behavior, specifically around how they handle characters used for spacing.

Currently, this is the preview text we recommend using:

```html {7-10}
<!doctype html>
<html lang="en">
<head>
  <!-- ... -->
</head>
<body>
  <div style="display: none">
    Your preview text here
    &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
  </div>
</body>
</html>
```

The `&#8199;&#65279;&#847; ` sequence is repeated aprox. 150 times to ensure that nothing is shown after the preview text - most email clients would normally show text from the top of the email body after the preview text.

<Alert>Note that this can increase the risk of Gmail clipping, as it adds a few extra KB to your email's weight.</Alert>

In Maizzle, you can take advantage of the loop tag and clean up the code quite a bit:

```html
<div class="hidden">
  Your preview text here
  <each loop="item in Array.from(Array(150))">&#8199;&#65279;&#847; </each>
</div>
```

## Web fonts

Web font, or custom fonts, are fonts that are usually not available on most devices. They are loaded from a server and embedded in the email using the `@font-face` CSS rule.

See our [custom fonts guide](/guides/custom-fonts) for more information.

## Web-safe fonts

Web-safe fonts are fonts that are pre-installed on most devices. They are safe to use in HTML emails because they are likely to be displayed correctly across different email clients and operating systems.

Some examples of web-safe fonts are Arial, Times New Roman, and Georgia.

## Image blocking

Image blocking is a feature in email clients that prevents images from being displayed by default. This is done mainly for privacy and security reasons, as images can be used to track email opens and gather information about the recipient.

When images are blocked, the email client will usually display a placeholder instead of the image. Most email clients will show alt text if the image provides it, but some don't.

As a rule of thumb, always make sure all images have descriptive alt text and that the email is still readable and engaging without images.

## Bulletproof buttons

_Bulletproof button_ is a slightly misleading term used in HTML email development that describes buttons that look and work the same in all email clients.

The "bulletproof" part came to be because of Outlook on Windows, which does not support padding on inline elements such as `<a>` tags. To fix this, [VML code](https://learn.microsoft.com/en-us/windows/win32/vml/web-workshop---specs---standards----introduction-to-vector-markup-language--vml-) is used to create a fully clickable button that looks and works the same in Outlook.

Here's an example of a bulletproof button:

```html
<div>
  <!--[if mso]>
  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="https://maizzle.com" style="height: 46px; width: 120px; v-text-anchor:middle;" arcsize="10%" stroke="f" fillcolor="#6366f1">
    <w:anchorlock/>
    <center>
<![endif]-->
<a href="https://maizzle.com" class="inline-block py-4 px-6 text-sm/none font-semibold rounded no-underline text-white bg-indigo-500 hover:bg-indigo-600">
  Read more
</a>
<!--[if mso]>
    </center>
  </v:roundrect>
<![endif]--></div>
```

The term is misleading because buttons that use <abbr title="Vector Markup Language">VML</abbr> are not accessible to screen readers - they are rendered as images by the Word rendering engine in Outlook.

A better name for these buttons would be _VML buttons_.

## Bulletproof backgrounds

The Word rendering engine, used in Outlook 2007-2021 for Windows, does not support CSS background images in HTML emails. Similar to buttons, VML code is used to work around this.

For example:

```html
<table cellpadding="0" cellspacing="0" role="none">
  <tr>
    <td style="background-image: url('https://picsum.photos/600/400')" class="bg-no-repeat bg-cover">
      <!--[if mso]>
      <v:rect stroke="f" fillcolor="none" style="width: 600px" xmlns:v="urn:schemas-microsoft-com:vml">
      <v:fill type="frame" src="https://picsum.photos/600/400" />
      <v:textbox inset="0,0,0,0" style="mso-fit-shape-to-text: true"><div><![endif]-->
        HTML to show on top of the image
      <!--[if mso]></div></v:textbox></v:rect><![endif]-->
    </td>
  </tr>
</table>
```

## VML

From [Microsoft's VML documentation](https://learn.microsoft.com/en-us/windows/win32/vml/web-workshop---specs---standards----introduction-to-vector-markup-language--vml-):

> Vector Markup Language (VML) is an XML-based exchange, editing, and delivery format for high-quality vector graphics on the Web that meets the needs of both productivity users and graphic design professionals.

In HTML email development, VML is mainly used to create bulletproof buttons and to enable background images in Outlook on Windows, as shown above.

It can also be used to position elements in Outlook, which helps create designs with overlapping elements like in the [Faux Absolute Positioning technique](https://www.goodemailcode.com/email-enhancements/faux-absolute-position).

While VML does help create more consistent designs across email clients, it's important to note that it is not accessible to screen readers.
