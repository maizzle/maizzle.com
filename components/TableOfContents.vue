<template>
  <div class="sticky top-28">
    <nav
      v-if="toc.links.length > 0"
      class="custom-scrollbar lg:max-w-[16rem] lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto pb-8 [scrollbar-gutter:stable]"
    >
      <div class="hidden lg:block sticky top-0">
        <h4 class="text-xs uppercase text-slate-700 font-semibold bg-white">
          On this page:
        </h4>
        <div class="bg-gradient-to-b from-white h-6 w-full"></div>
      </div>
      <ul class="hidden lg:block space-y-2.5 text-sm">
        <li
          v-for="link of toc.links"
          :key="link.id"
          class="truncate"
          :class="{ 'pl-4': [3,4].includes(link.depth) }"
        >
          <a
            :href="`#${link.id}`"
            class="text-slate-600 hover:text-slate-900"
            :class="{'!text-indigo-600 hover:!text-indigo-600': $route.hash === `#${link.id}`}"
          >{{ link.text }}</a>

          <ul
            v-if="link.children"
            class="space-y-2.5 mt-2.5"
          >
            <li
              v-for="child of link.children"
              :key="child.id"
              class="truncate"
              :class="{ 'pl-4': [3,4].includes(child.depth) }"
            >
              <a
                :href="`#${child.id}`"
                class="text-slate-600 hover:text-slate-900"
                :class="{'!text-indigo-600 hover:!text-indigo-600': $route.hash === `#${child.id}`}"
              >{{ child.text }}</a>
            </li>
          </ul>
        </li>
      </ul>
      <div class="lg:mt-8 px-4 max-w-xs">
        <ClientOnly>
          <Component
            is="script"
            src="//cdn.carbonads.com/carbon.js?serve=CE7IK2QM&placement=maizzlecom"
            async
            id="_carbonads_js"
          />
        </ClientOnly>
      </div>
    </nav>
  </div>
</template>

<script setup>
defineProps({
  toc: {
    type: Object,
    default: () => ({
      links: [],
    }),
  },
})
</script>
