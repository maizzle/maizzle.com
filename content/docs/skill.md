---
title: Agent Skill
description: Use the official Maizzle Agent Skill to help AI coding agents build HTML emails the right way.
section: Getting Started
order: 6
---

# Agent Skill

Maizzle ships an official SKILL, a packaged set of instructions that teaches AI coding agents how to build HTML emails with Maizzle, Vue components, and Tailwind CSS.

When the skill is available, your agent knows to reach for built-in components over raw HTML, style with Tailwind utilities, configure the build pipeline, and respect email client constraints, rather than guessing.

## What it covers

The skill teaches agents to:

- Build templates with Maizzle's Vue components (`<Layout>`, `<Container>`, `<Section>`, `<Button>`, …)
- Style emails with Tailwind CSS 4, including responsive breakpoints, dark mode, and client variants
- Configure the build pipeline: CSS inlining, purging, shorthand optimization
- Handle static assets, URL rewriting, and UTM tracking
- Render programmatically and generate plaintext
- Use the [CLI](/docs/cli) for scaffolding and building
- Follow email client compatibility best practices

It's structured for progressive disclosure: a `SKILL.md` with the core knowledge, plus `references/` files (components, composables, configuration, styling, transformers, conversion guides) the agent reads only when it needs deeper detail.

The skill lives in the framework repo at [`skills/maizzle`](https://github.com/maizzle/framework/tree/master/skills/maizzle).

## Usage

### Point your agent at the skill

The simplest way: tell your agent to read the skill directory and follow it. Most agents can fetch a URL or read a local path. Point them at:

```
https://github.com/maizzle/framework/tree/master/skills/maizzle
```

The agent reads `SKILL.md` for the core instructions and pulls in `references/` files as needed.

### Install with skills.sh

To install the skill into your agent's skills directory so it loads automatically, use [skills.sh](https://www.skills.sh):

```bash
npx skills add maizzle/framework
```

This works with Claude Code, Cursor, Codex, GitHub Copilot, Windsurf, Gemini, and other agents that support the [Agent Skills](https://agentskills.io) specification.
