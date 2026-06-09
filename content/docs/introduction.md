---
title: What is Maizzle?
description: Getting started with the Maizzle Email Framework.
section: Getting Started
order: 1
---

# Introduction

Maizzle is a modern framework for building HTML emails with Vue and Tailwind CSS. 

It provides a component-based workflow, modern dev server, production-ready email build pipeline, tools and many optimizations that help you focus on what you want to build instead of fighting email client quirks.

## Why Maizzle?

Building HTML emails is notoriously difficult. Email clients render HTML inconsistently, CSS support is limited, and coding layouts that look good and render well quickly becomes a game of whack-a-mole with nested tables and a soup of inline styles with conditional comments for The Old Outlooks.

Maizzle bridges the gap between frontend development and the unique requirements of HTML emails through a modern dev stack:

- **Vue components**: render-tested, composable components
- **Tailwind CSS**: style emails with utility classes
- **Transformers**: CSS inlining, unused CSS purging etc.
- **Vite plugin**: use it in your Vite-powered project

## How it works

You write Vue Single-File Components (SFCs) as your email templates, using our built-in components or your own HTML, and style them with Tailwind CSS or inline styles.

::code-tabs
  :::code-tab{label="Components"}
  ```vue [emails/welcome.vue]
  <template>
    <Html>
      <Head />
      <Tailwind>
        <Body class="font-sans bg-slate-100">
          <Container class="max-w-xl">
            <h1 class="m-0 mb-6 text-lg">
              Hello, welcome aboard!
            </h1>
            <Button href="https://example.com">
              Get Started
            </Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  </template>
  ```
  :::
  :::code-tab{label="Custom HTML"}
  ```vue [emails/welcome.vue]
  <template>
    <html>
      <head>
        <style>
          @import "@maizzle/tailwindcss";
        </style>
      </head>
      <body class="m-0 p-0 w-full">
        <table class="w-full font-sans bg-slate-100">
          <tr>
            <td class="w-xl sm:w-full">
              <h1 class="m-0 mb-6 text-lg">
                Hello, welcome aboard!
              </h1>

              <div>
                <a href="https://example.com" class="inline-block py-4 px-6 text-base no-underline rounded text-white bg-indigo-500">
                  <!--[if mso]><i style="mso-font-width: 150%; mso-text-raise: 31px;" hidden>&emsp;</i><![endif]-->
                  <span class="mso-text-raise-4">Get Started</span>
                  <!--[if mso]><i style="mso-font-width: 150%;" hidden>&emsp;&#8203;​</i><![endif]-->
                </a>
              </div>
            </td>
          </tr>
        </table>
      </body>
    </html>
  </template>
  ```
  :::
::

When you build for production, Maizzle renders the Vue components to HTML and runs a series of transformers that optimize the output for email clients. 

The result is production-ready HTML with inlined CSS, email-safe class names, and proper Outlook fallbacks that you can upload to your <abbr title="Email Service Provider">ESP</abbr> or send with an email sending service.

## Key features

### Components

30+ email components handle the hard parts for you — responsive layouts, buttons that work in Outlook, images with dark mode support, syntax-highlighted code blocks, and more. All render-tested to ensure they look good and work well across popular email clients.

### Tailwind CSS

Tailwind CSS is a first-class citizen in Maizzle: it works out of the box through a custom compilation pipeline and email-optimized configuration that adjusts spacing, sizing, and other utilities for maximum email client compatibility.

### Transformers

After being rendered, your HTML goes through a configurable pipeline of transformers that handle CSS inlining, unused CSS removal, minification, and many other email optimizations.

### Dev server

A modern dev server with live preview/HMR, device resizing, compatibility checks with jump-to-editor, dark mode emulation, quick search and even test email sending.

### Vite plugin

Already have a Vite project? Use Maizzle as a Vite plugin and start building emails in any Vite-powered framework, like Laravel, Nuxt, SvelteKit or Astro.

### CLI tool

Easily scaffold new projects, generate components or configuration, develop locally and run production builds straight from the terminal.

### API

Use functions like `render()` to compile a template string, or `build()` to build a batch of templates and output them to disk.
