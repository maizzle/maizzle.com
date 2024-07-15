---
title: "Cards"
description: "Create simple, effective attention grabbers in HTML emails with Tailwind CSS in Maizzle."
---

# Cards

The traditional content block for showing article excerpts, like those from a blog.

## Rounded with Shadow

<div class="example-preview">
  <div class="not-prose px-4">
    <table class="w-full sm:max-w-[400px] xl:max-w-[340px] shadow-xl rounded m-0">
      <tr>
        <td>
          <img
            class="rounded-tl rounded-tr m-0"
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&h=300&q=80"
            alt
          >
        </td>
      </tr>
      <tr>
        <td class="bg-white p-6 rounded-br rounded-bl">
          <span class="text-xs text-slate-500">April 7, 2020</span>
          <h2 class="mt-2 mb-3 text-2xl leading-7">
            <a href="https://example.com" style="color:#000;display:inline-block;position:relative;margin:0;" class="text-gradient-none no-underline">Lorem ipsum dolor sit amet, consectetur</a>
          </h2>
          <p class="m-0 mb-4 text-base text-slate-500">Anim ullamco anim ipsum Lorem id voluptate consequat excepteur proident cillum mollit.</p>
          <a href="https://example.com" class="text-blue-500 no-underline hover:underline">Learn more &rarr;</a>
        </td>
      </tr>
    </table>
  </div>

  ```xml example
  <table class="sm:w-full font-sans shadow-xl rounded">
    <tr>
      <td>
        <img
          class="rounded-t"
          src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&h=300&q=80"
        >
      </td>
    </tr>
    <tr>
      <td class="p-6 bg-white rounded-b">
        <span class="text-xs text-slate-500">April 7, 2020</span>
        <h2 class="m-0 mt-2 mb-3 text-2xl leading-full">
          <a href="https://example.com" class="text-black hover:text-slate-700 no-underline">
            Lorem ipsum dolor sit amet, consectetur
          </a>
        </h2>
        <p class="m-0 mb-16 text-base text-slate-500">
          Anim ullamco anim ipsum Lorem id voluptate consequat excepteur proident cillum mollit.
        </p>
        <a href="https://example.com" class="text-blue-500 no-underline hover:underline">
          Learn more &rarr;
        </a>
      </td>
    </tr>
  </table>
  ```
</div>
