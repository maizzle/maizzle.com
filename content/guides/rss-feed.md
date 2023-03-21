---
title: "How to create an email newsletter from an RSS feed"
description: "Learn how to use Maizzle Events and RSS parsing libraries to create an email newsletter from an (atom) RSS feed."
date: 2020-03-04
---

# How to create an email newsletter from an RSS feed

<p class="text-sm">Last updated: May 30, 2022</p>

In this tutorial, we'll use [Events](/docs/events) in Maizzle to fetch the contents of an RSS feed and display them in an HTML email newsletter.

You can [preview the final result](https://codepen.io/maizzle/pen/ExjvmdP?editors=1000) on CodePen.

## Initial setup

Let's start by creating a new Maizzle project.

<terminal show-copy>

  ```
  npx degit maizzle/maizzle example-rss
  ```

</terminal>

Install dependencies:

<terminal show-copy>

  ```
  cd example-rss

  npm install
  ```

</terminal>

Once it finishes installing dependencies, open the project in your favorite editor.

### rss-parser

We'll be using [rss-parser](https://www.npmjs.com/package/rss-parser) fetch the contents of the RSS feed, so let's install it:

<terminal show-copy>

  ```
  npm install rss-parser
  ```

</terminal>

## RSS Feed

We'll need an RSS feed to work with, so let's go with the best site for learning Laravel.

The [Laracasts](https://laracasts.com) feed is available at https://laracasts.com/feed.

Let's add that feed URL inside the `build` object in `config.js`:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      feed: {
        url: 'https://laracasts.com/feed'
      }
    }
  }
  ```

</code-sample>

## Fetch Items

We can use `rss-parser` inside the [beforeCreate](/docs/events#beforecreate) event to fetch feed data.

Edit `config.js`, require `rss-parser`, and use it in the `beforeCreate` event:

<code-sample title="config.js">

  ```js
  const Parser = require('rss-parser')

  module.exports = {
    events: {
      async beforeCreate(config) {
        // create a new Parser instance
        const parser = new Parser({
          customFields: {
            feed: ['subtitle'],
            item: ['summary']
          }
        })

        // fetch and parse the feed
        let feed = await parser.parseURL(config.build.feed.url)

        // store the feed data in our config
        config.feed = {
          title: feed.title,
          subtitle: feed.subtitle,
          link: feed.link,
          updated_at: feed.lastBuildDate,
          posts: feed.items
        }
      }
    }
  }
  ```

</code-sample>

<alert>The Laracasts feed contains fields that `rss-parser` does not currently return by default. We include them through the `customFields` option.</alert>

## Date Format

We'll probably need to format the date of a feed item to something more readable than what the feed provides.

We can add a function to `config.js` and use it to format the item's date according to our audience's locale:

<code-sample title="config.js">

  ```js
  module.exports = {
    formattedDate(str) {
      const date = new Date(str)
      return date.toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'})
    }
  }
  ```

</code-sample>

<alert>Tip: you could set `'en-US'` dynamically, based on your subscriber's preference.</alert>

## Template

We'll use a simplified version of the [promotional template](https://github.com/maizzle/maizzle/blob/master/src/templates/promotional.html) from the Starter, displaying posts as full width cards.

### Header

Let's update the existing header row:

<code-sample title="src/templates/promotional.html">

  ```xml
  <tr>
    <td class="p-12 sm:py-8 sm:px-6 text-center">
      <a href="https://laracasts.com">
        <img src="laracasts-logo.png" width="157" alt="{{ page.feed.title }}">
      </a>
      <p class="m-0 mt-2 text-sm text-slate-600">
        {{ page.feed.subtitle }}
      </p>
    </td>
  </tr>
  ```

</code-sample>

### Items Loop

Let's use a full width card from the [promotional template](https://github.com/maizzle/maizzle/blob/master/src/templates/promotional.html) to show a list of all items from the feed:

<code-sample title="src/templates/promotional.html">

  ```xml
  <each loop="post in page.feed.posts">
    <tr>
      <td class="p-6 bg-white hover:shadow-xl rounded transition-shadow duration-300">
        <p class="m-0 mb-1 text-sm text-slate-500">
          {{ page.formattedDate(post.pubDate) }}
        </p>

        <h2 class="m-0 mb-4 text-2xl leading-6">
          <a href="{{ post.link }}" class="text-slate-800 hover:text-slate-700 [text-decoration:none]">
            {{ post.title }}
          </a>
        </h2>

        <p class="m-0 text-base">
          <a href="{{ post.link }}" class="text-slate-500 hover:text-slate-700 [text-decoration:none]">
            {{ post.summary }}
          </a>
        </p>
      </td>
    </tr>
    <if condition="!loop.last">
      <tr>
        <td class="h-24"></td>
      </tr>
    </if>
  </each>
  ```

</code-sample>

That's it, run `npm run build` to generate the production-ready email template.

Take a look at the [final result on CodePen](https://codepen.io/maizzle/pen/ExjvmdP).

## Resources

- [Laracasts](https://laracasts.com/)
- [rss-parser](https://www.npmjs.com/package/rss-parser)
- [Maizzle Events](/docs/events/)
- [GitHub repo](https://github.com/maizzle/starter-rss) for this tutorial
- [CodePen preview](https://codepen.io/maizzle/pen/ExjvmdP)
