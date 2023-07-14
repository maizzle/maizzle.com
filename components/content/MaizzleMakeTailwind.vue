<template>
  <div class="backdrop-blur-sm relative">
    <div
      v-if="!started"
      class="bg-white/50 absolute inset-0"
    />
    <div class="flex justify-between items-center px-6 border rounded-t-md backdrop-blur-[3px] h-10">
      <div class="flex gap-1.5">
        <div class="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
        <div class="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
        <div class="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
      </div>
      <button
        v-show="completed"
        @click="replay"
      >
        <svg class="w-4 text-slate-400" viewBox="0 0 420 420" xml:space="preserve">
          <title>Replay</title>
          <path fill="currentColor" d="M400.813 169.581c-2.502-4.865-14.695-16.012-35.262-5.891-20.564 10.122-10.625 32.351-10.625 32.351 7.666 15.722 11.98 33.371 11.98 52.046 0 65.622-53.201 118.824-118.828 118.824-65.619 0-118.82-53.202-118.82-118.824 0-61.422 46.6-111.946 106.357-118.173v30.793s-.084 1.836 1.828 2.999c1.906 1.163 3.818 0 3.818 0l98.576-58.083s2.211-1.162 2.211-3.436c0-1.873-2.211-3.205-2.211-3.205l-98.248-57.754s-2.24-1.605-4.23-.826c-1.988.773-1.744 3.481-1.744 3.481v32.993c-88.998 6.392-159.23 80.563-159.23 171.21 0 94.824 76.873 171.696 171.693 171.696 94.828 0 171.707-76.872 171.707-171.696.001-28.298-6.852-54.98-18.972-78.505z" />
        </svg>
      </button>
    </div>
    <div
      class="border border-t-0 rounded-b-md p-4 text-sm font-mono leading-6 overflow-x-auto whitespace-pre"
      :class="{'completed': completed}"
    >
      <div class="flex relative">
        <button
          v-if="!started"
          class="mx-auto text-sm font-sans border rounded-md shadow-md shadow-indigo-300/20 px-4 py-2 bg-white hover:border-slate-300"
          @click="play"
        >Run example</button>

        <div ref="demo"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TypeIt from 'typeit'

const completed = ref(false)
const started = ref(false)
let typeItInstance = null

const demo = ref(null)

const play = () => {
  started.value = true
  typeItInstance = new TypeIt(demo.value, {
    speed: 100,
    waitUntilVisible: true,
    afterComplete: () => {
      completed.value = true
    },
  })
    .type('<span class="inline-block w-4 mr-6 text-right text-slate-300">$</span>', { instant: true })
    .pause(1000)
    .type('maizzle make:tailwind')
    .pause(1000)
    .break()

    .type('<span class="text-emerald-500 ml-2 mr-4">?</span> File name (tailwind.config.js) ', { instant: true })
    .pause(2000)
    .delete(21, {instant: true})
    .type('<span class="text-indigo-500">tailwind.config.js</span>', {instant: true})
    .break()

    .type('<span class="text-emerald-500 ml-2 mr-4">?</span> Directory to place it in (./) ', { instant: true })
    .pause(2000)
    .delete(5, {instant: true})
    .type('<span class="text-indigo-500">./</span>', {instant: true})
    .break()

    .type('<span class="text-emerald-500 ml-2 mr-4">✓</span> Created new Tailwind CSS config in ~/Users/cosmin/maizzle/tailwind.config.js', { instant: true })
    .go()
}

const replay = () => {
  completed.value = false
  typeItInstance.reset()
  play()
}
</script>
