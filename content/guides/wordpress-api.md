---
title: "Using the WordPress API to create a newsletter from your posts"
description: "Learn how to use the WordPress API and Maizzle to create an HTML email newsletter with your latest posts."
date: 2020-03-02
---

# Using the WordPress API to create a newsletter from your posts

<p class="text-sm">Last updated: May 30, 2022</p>

Learn how to use Maizzle to fetch content from an API endpoint, process it, and display it in an HTML email newsletter.

You may [preview the final result](https://codepen.io/maizzle/pen/wvaeOVM?editors=1000) on CodePen.

## Initial setup

As always, let's start by creating a new Maizzle project.

```sh
npx create-maizzle
```

In the interactive setup wizard, specify the directory name to create the project in, i.e. `./example-wordpress`, and select the Default Starter.

Choose Yes when prompted to Install dependencies.

Once it finishes installing dependencies, open the project folder in your favorite editor.

## WordPress API

Instead of imagining abstract APIs and how you'd interact with them, let's work with a real one so you can actually follow along and test things out yourself.

Given its popularity, we'll be using the [WordPress REST API](https://developer.wordpress.org/rest-api/) in our example. We'll also need to fetch data from a real blog, so let's use the wonderful [CSS-Tricks](https://css-tricks.com).

The WordPress API on CSS-Tricks is available at https://css-tricks.com/wp-json/wp/v2/

Click that link and you'll see the various routes you can access.

### `/posts` route

We can fetch posts from the `/posts` route:

https://css-tricks.com/wp-json/wp/v2/posts/

We can also use [query string parameters](https://developer.wordpress.org/rest-api/reference/posts/#arguments) in order to refine our API call.

For example, this only asks for the 3 latest posts:

https://css-tricks.com/wp-json/wp/v2/posts?page=1&per_page=3&_embed=1

<Alert>`_embed=1` is a request scope that adds a few more fields to the response. We use it to include `_embedded["wp:featuredmedia"]`.</Alert>

## Fetch posts

Let's use the `<fetch>` tag to fetch posts from the CSS-Tricks WordPress API.

```xml [src/templates/example.html]
<x-main>
  <fetch url="https://css-tricks.com/wp-json/wp/v2/posts?page=1&per_page=6&_embed=1">
    <!-- Posts are now available in {{ response }} -->
  </fetch>
</x-main>
```

## Use in Template

`promotional.html` in Maizzle displays 6 articles in four different layouts. Above, we're also fetching the latest 6 articles from CSS-Tricks, so it's a perfect fit ✌

### Featured Post

Let's update the Hero with background image to show the first post.

Our code becomes:

```hbs [src/templates/example.html]
---
bodyClass: bg-gray-200
title: "Latest posts on CSS-Tricks"
preheader: "👀 Lorem, ipsum, and much dolor in this week's edition"
---

<x-main>
  <fetch url="https://css-tricks.com/wp-json/wp/v2/posts?page=1&per_page=6&_embed=1">
    <!-- ... existing template markup before the HERO <tr> -->
    <tr>
      <td class="bg-top bg-no-repeat bg-cover rounded text-left" style="background-image: url('{{ response[0]._embedded['wp:featuredmedia'][0]['source_url'] || 'https://via.placeholder.com/600x400' }}');">
        <!--[if mso]>
        <v:image src="{{ response[0]._embedded['wp:featuredmedia'][0]['source_url'] || 'https://via.placeholder.com/600x400' }}" xmlns:v="urn:schemas-microsoft-com:vml" style="width:600px;height:400px;" />
        <v:rect fill="false" stroke="false" style="position:absolute;width:600px;height:400px;">
        <v:textbox inset="0,0,0,0"><div><![endif]-->
        <div class="leading-8">&zwj;</div>
        <table class="w-full">
          <tr>
            <td class="w-12 sm:w-4"></td>
            <td>
              <h1 class="m-0 mb-4 text-4xl text-white sm:leading-10">
                {{ response[0].title.rendered }}
              </h1>
              <div class="m-0 text-white text-lg leading-6">
                {{ response[0].excerpt.rendered }}
              </div>
              <div class="leading-8">&zwj;</div>
              <table>
                <tr>
                  <th class="bg-indigo-800 hover:bg-indigo-700 rounded" style="mso-padding-alt: 16px 24px;">
                    <a href="{{ response[0].link }}" class="block font-semibold text-white text-base leading-full py-4 px-6 [text-decoration:none]">Read more &rarr;</a>
                  </th>
                </tr>
              </table>
            </td>
            <td class="w-12 sm:w-4"></td>
          </tr>
        </table>
        <div class="leading-8">&zwj;</div>
        <!--[if mso]></div></v:textbox></v:rect><![endif]-->
      </td>
    </tr>
  </fetch>
</x-main>
```

We can use `response[index]` to output data for each post, manually. For example, we would use `response[1].title.rendered` to show the title of the second post.

### Post dates

We can add a function to `config.js` and use it to format the post's date according to our audience's locale:

```js [config.js]
module.exports = {
  formattedDate(str) {
    const date = new Date(str)
    return date.toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'})
  }
}
```

We can then display it in the template with an expression like this:

```hbs
{{ page.formattedDate(response[1].date) }}
```

### Looping

We can use the `<each>` tag in Maizzle to loop over each item in the `response`:

```hbs
<fetch url="https://css-tricks.com/wp-json/wp/v2/posts?page=1&per_page=6&_embed=1">
  <each loop="post in response">
    {{ post.title.rendered }}
  </each>
</fetch>
```

Want to loop over a specific subset only? You can use [expressions](/docs/templates#expressions).

For example, let's show the last 2 posts in a list format at the end of the template:

```hbs [src/templates/example.html]
<x-main>
  <fetch url="https://css-tricks.com/wp-json/wp/v2/posts?page=1&per_page=6&_embed=1">
    <h3 class="m-0 text-base font-semibold text-gray-500 uppercase">From the archives</h3>
    <div class="leading-6">&zwj;</div>
    <table class="w-full">
      <each loop="post in response.slice(-2)">
        <tr>
          <td>
            <p class="text-xs text-gray-500 mb-0.5">
              {{ page.formattedDate(post.date) }}
            </p>
            <h4 class="m-0 mb-1 text-xl font-semibold">
              <a href="{{ post.link }}" class="text-blue-500 hover:text-blue-400 [text-decoration:none]">
                {{ post.title.rendered }}
              </a>
            </h4>
            <div class="m-0 text-gray-500">
              {{ post.excerpt.rendered }}
            </div>
            <if condition="loop.last">
              <table class="w-full">
                <tr>
                  <td class="py-6">
                    <div class="bg-gray-300 h-px leading-px">&zwj;</div>
                  </td>
                </tr>
              </table>
            </if>
          </td>
        </tr>
      </each>
    </table>
  </fetch>
</x-main>
```

Notes:

- we also added the post date in a paragraph above the title
- we're using [`loop` meta](/docs/tags#loop-meta) to output the divider only _between_ list items

## Conclusion

All that we've done in this tutorial is to:

1. Use the `<fetch>` tag to fetch JSON data from an API endpoint
2. Use that data in a Maizzle template

So this isn't tied to WordPress: it was used as an example because of its convenient API, but you're free to implement it with any other APIs.

Some ideas:

- use your CMS as an authoring system for your newsletter's content
- show the latest products from your store
- include data from [public APIs](https://github.com/public-apis/public-apis)

## Resources

- [CSS-Tricks](https://css-tricks.com)
- [Maizzle Events](/docs/events)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)
- [GitHub repository](https://github.com/maizzle/starter-wordpress-api) for this tutorial
