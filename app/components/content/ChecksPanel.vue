<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

type Category = 'CSS' | 'HTML' | 'Image'

interface Issue {
  category: Category
  title: string
  description: string
  descriptionHtml?: string
  line: number
}

const issues: Issue[] = [
  { category: 'CSS', title: 'background-image', description: 'Not supported in Outlook', line: 42 },
  { category: 'CSS', title: 'border-radius', description: 'Not supported in Outlook', line: 17 },
  { category: 'HTML', title: '<picture> element', description: 'Partial support in Apple Mail, Gmail, Outlook, Yahoo! Mail', line: 8 },
  { category: 'Image', title: 'Missing alt text', description: '', descriptionHtml: 'Image is missing the <code class="px-1 py-0.5 rounded bg-gray-100 dark:bg-white/10 font-mono text-[11px]">alt</code> attribute', line: 24 },
]

const categories: Category[] = ['CSS', 'HTML', 'Image']
const active = ref<Category>('CSS')

const counts = computed<Record<Category, number>>(() => ({
  CSS: issues.filter(i => i.category === 'CSS').length,
  HTML: issues.filter(i => i.category === 'HTML').length,
  Image: issues.filter(i => i.category === 'Image').length,
}))

const filteredIssues = computed(() => issues.filter(i => i.category === active.value))
</script>

<template>
  <div class="not-prose my-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm">
    <div class="flex items-center justify-between min-h-10 pl-2 pr-3 border-b border-gray-200 dark:border-white/10">
      <div class="flex h-10 items-center gap-1">
        <div class="relative">
          <span class="block text-xs font-normal px-3 h-10 leading-10 border-b border-gray-400 dark:border-gray-600 text-gray-900 dark:text-gray-100 select-none">
            Checks
          </span>
          <span
            aria-hidden="true"
            class="pointer-events-none absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-amber-400 dark:ring-amber-500"
          />
        </div>
        <span class="text-xs font-normal px-3 h-10 leading-10 text-gray-500 dark:text-gray-400 select-none">Stats</span>
        <span class="text-xs font-normal px-3 h-10 leading-10 text-gray-500 dark:text-gray-400 select-none">Test</span>
      </div>
      <ChevronDown class="size-4 text-gray-400 dark:text-gray-500" :stroke-width="1.5" />
    </div>

    <div class="flex gap-1 pl-3 pr-4 py-2 border-b border-gray-200 dark:border-white/10">
      <button
        v-for="cat in categories"
        :key="cat"
        type="button"
        class="px-2 py-0.5 text-[11px] rounded-full transition-colors cursor-default"
        :class="active === cat
          ? 'bg-gray-900 text-white dark:bg-gray-600 dark:text-gray-100'
          : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10'"
        @click="active = cat"
      >
        {{ cat }} <span class="ml-0.5 tabular-nums">{{ counts[cat] }}</span>
      </button>
    </div>

    <ul class="divide-y divide-gray-200 dark:divide-white/10 text-xs pl-5">
      <li v-for="issue in filteredIssues" :key="issue.title" class="pr-4 py-2 flex items-center justify-between gap-4">
        <div>
          <span class="font-medium text-amber-600 dark:text-amber-500">{{ issue.title }}</span>
          <div class="text-gray-500 dark:text-gray-400 mt-0.5">
            <span v-if="issue.descriptionHtml" v-html="issue.descriptionHtml" />
            <span v-else>{{ issue.description }}</span>
          </div>
        </div>
        <span class="text-gray-500 dark:text-gray-400 hover:text-gray-900 cursor-pointer tabular-nums shrink-0">L{{ issue.line }}</span>
      </li>
    </ul>
  </div>
</template>
