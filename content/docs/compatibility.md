---
title: "Compatibility"
description: "Email client compatibility and what Maizzle does to help improve your template's rendering."
---

# Compatibility

Maizzle gives you complete freedom to code your HTML emails however you like, there's no definitive compatibility chart. It really depends on your markup.

Wherever possible, the framework tries to help through configuration and tools that you can use to code emails that render well.

For example, the [official Starter](https://github.com/maizzle/maizzle) uses a custom Tailwind CSS preset and plugins that output more email client-friendly CSS, or that help you target specific email clients.

Tailwind CSS itself is [configured](/docs/configuration/tailwindcss#tailwindconfigjs) to use values that are better supported by email clients, like `px` instead of `rem` or HEX colors instead of CSS variables.

However, when it comes to markup, it's really up to you how well your emails will render.

## Components

The Maizzle Starter includes a few components, such as Spacer, Divider, or Button.

These have been render-tested to work well in the most popular email clients, including iOS/Mail, Gmail, Outlook, and Yahoo!.

## Can I Email

The [caniemail.com](https://www.caniemail.com/) website is a great resource if you need to check which email clients will support your HTML or CSS.

## Testing

When coding HTML emails, you should always run render tests in the most popular email clients - tools like [Email on Acid](https://www.emailonacid.com/), [Litmus](https://www.litmus.com/) or [Testi@](https://testi.at/) can help with that.

Finally, another common (and good) practice is to send yourself a test email before sending to your subscribers.

Simulating a send from the same system you're going to use (be it your ESP or your application) is a very good way of catching any missed errors or edge-cases.
