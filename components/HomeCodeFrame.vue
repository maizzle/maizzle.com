<template>
  <div class="relative z-10 home-code-sample">
    <div class="flex justify-between items-center px-6 border border-slate-200 rounded-t-2xl bg-white relative z-10">
      <span class="h-10 flex items-center border-b border-indigo-600 -mb-px text-xs">
        {{ title }}
      </span>
      <svg
        v-show="!copied && !noCopy"
        class="my-2 h-5 w-5 text-slate-400 hover:text-slate-600 cursor-pointer"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
        @click="copyCode"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      <svg
        v-show="!noCopy && copied"
        class="h-5 w-5 text-slate-400 pointer-events-none"
        :class="{'my-3': !title}"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>

    <div class="relative z-20 border border-t-0 border-slate-200 rounded-b-2xl backdrop-blur-[3px] bg-white">
      <slot />
    </div>

    <div
      class="w-full h-full rounded-2xl absolute z-0 border border-slate-200"
      :class="bgFrameClass"
    />
  </div>
</template>

<script setup>
  const props = defineProps({
    bgFrameClass: {
      type: String,
      default: 'top-4 left-4 sm:top-8 sm:left-8 backdrop-blur-[3px]',
    },
    title: {
      type: String,
      default: '',
    },
    noCopy: {
      type: Boolean,
      default: false,
    },
  })

  const copied = ref(false)

  const copyCode = () => {
    const textarea = document.createElement('textarea')
    textarea.value = props.code
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    copied = true
    setTimeout(() => {
      copied = false
    }, 1000)
  }
</script>
