---
title: "Editor Setup"
description: "Setting up your editor for an enhanced Maizzle workflow."
---

# Editor Setup

Configuring your editor can help speed up your development workflow and ensures consistency when working in a team.

## Which editor to use?

Although you may use any text editor or IDE with Maizzle, we recommend [VS Code](https://code.visualstudio.com/) for its flexibility and available tooling.

## Tailwind CSS IntelliSense

The official [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension for VS Code is probably the most important extension you'll want to install.

It provides utility class autocomplete, so you don't have to learn all those Tailwind class names. It also provides syntax highlighting and linting, letting you know immediately if you applied the same class twice, for example.

## .editorconfig

> EditorConfig helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.

Simply install an [EditorConfig plugin](https://editorconfig.org/#download) for your editor - all Maizzle starters include a `.editorconfig` file that will automatically configure your editor.

## PostCSS syntax

Tailwind CSS includes some custom at-rules, like `@apply` or `@layer`, which may trigger warnings in your editor. This is handled automatically by the Tailwind CSS IntelliSense extension if you're using VS Code.

For other editors, or if you need full PostCSS language support, you might need to install an extension. For example, there's [PostCSS Language Support](https://marketplace.visualstudio.com/items?itemName=csstools.postcss) for VS Code.

## PostHTML Snippets

The [PostHTML Snippets](https://marketplace.visualstudio.com/items?itemName=cossssmin.posthtml) extension for VS Code provides autocomplete for PostHTML tags like `<extends>`, `<block>` or `<component>`.
