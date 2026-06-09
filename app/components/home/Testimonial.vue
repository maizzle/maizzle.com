<script setup lang="ts">
defineProps<{
  quote: string
  author: string
  role: string
  avatar?: string
}>()
</script>

<template>
  <ContainerAlt :bottom-border="false">
    <div class="relative overflow-hidden sm:-mx-10 bg-white text-gray-900 dark:bg-gray-950 dark:text-white selection:bg-teal-400 selection:text-white dark:selection:text-gray-900">
      <div class="absolute inset-0 bg-[url('/stripes.svg')] bg-repeat opacity-[0.05]" />
      <div class="relative px-6 sm:px-12 py-20 sm:py-32">
          <figure class="max-w-3xl mx-auto text-center">
            <svg class="mx-auto mb-8 size-10 text-teal-400" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4Zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4Z" />
            </svg>
            <blockquote class="text-2xl sm:text-3xl/[1.3] font-medium text-balance">
              “{{ quote }}”
            </blockquote>
            <figcaption class="mt-8 flex items-center justify-center gap-3">
              <div v-if="avatar" class="size-10 rounded-full bg-gray-900/10 dark:bg-white/10 overflow-hidden">
                <img :src="avatar" alt="" class="size-full object-cover">
              </div>
              <div class="text-center">
                <p class="text-sm font-semibold">{{ author }}</p>
                <p class="text-sm text-gray-500 dark:text-white/60" v-html="role" />
              </div>
            </figcaption>
          </figure>
      </div>
    </div>
  </ContainerAlt>
</template>
