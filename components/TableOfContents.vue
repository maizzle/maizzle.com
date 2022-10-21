<template>
  <div class="sticky top-28">
    <nav
      v-if="toc.length > 0"
      class="custom-scrollbar max-w-[16rem] max-h-[calc(100vh-7rem)] overflow-y-auto pb-8  [scrollbar-gutter:stable]"
    >
      <div class="sticky top-0">
        <h4 class="text-xs uppercase text-slate-700 font-semibold bg-white">On this page:</h4>
        <div class="bg-gradient-to-b from-white h-6 w-full"></div>
      </div>
      <ul class="space-y-2.5 text-sm">
        <li
          v-for="link of toc"
          :key="link.id"
          class="truncate"
          :class="{ 'pl-2': link.depth === 2, 'pl-4': link.depth === 3 }"
        >
          <a
            :href="`#${link.id}`"
            class="text-slate-600 hover:text-slate-900"
            :class="{'text-indigo-600 hover:text-indigo-600': $route.hash === `#${link.id}`}"
            @click="scrollTo(`#${link.id}`)"
          >{{ link.text }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import scrollToElement from 'scroll-to-element'

export default {
  name: 'TableOfContents',
  props: {
    toc: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    scrollTo(id) {
      scrollToElement(id, {
        offset: -100,
        ease: 'out-expo',
        duration: 400
      })
    },
  },
}
</script>
