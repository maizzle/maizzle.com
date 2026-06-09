<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, useTemplateRef, watch } from 'vue'
import { RotateCcw } from 'lucide-vue-next'

type Step = 'path' | 'starter' | 'starter-custom' | 'install' | 'tasks' | 'done'

const root = useTemplateRef<HTMLDivElement>('root')
const pathInput = useTemplateRef<HTMLInputElement>('pathInput')
const focused = ref(false)
const step = ref<Step>('path')

const path = ref('./maizzle')
const starters = [
  { label: 'Default' },
  { label: 'Custom' },
]
const starterIdx = ref(0)
const customStarters = [
  { label: 'Git', hint: 'user/repo' },
  { label: 'API' },
  { label: 'AMP4Email' },
  { label: 'Mailchimp' },
  { label: 'Markdown' },
  { label: 'RSS' },
  { label: 'WordPress API' },
]
const customStarterIdx = ref(0)
const isCustom = computed(() => starters[starterIdx.value].label === 'Custom')
const install = ref(true)

const task1Running = ref(false)
const task1Done = ref(false)
const task2Running = ref(false)
const task2Done = ref(false)

const spinnerFrames = ['◐', '◓', '◑', '◒']
const spinnerIdx = ref(0)
let spinnerTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  spinnerTimer = setInterval(() => {
    spinnerIdx.value = (spinnerIdx.value + 1) % spinnerFrames.length
  }, 120)
})
onUnmounted(() => {
  if (spinnerTimer) clearInterval(spinnerTimer)
})

const spinner = computed(() => spinnerFrames[spinnerIdx.value])

const starterValue = computed(() => starters[starterIdx.value].label)

function wait(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

async function runTasks() {
  task1Running.value = true
  await wait(900)
  task1Running.value = false
  task1Done.value = true
  if (install.value) {
    task2Running.value = true
    await wait(1300)
    task2Running.value = false
    task2Done.value = true
  }
  await wait(300)
  step.value = 'done'
}

function reset() {
  step.value = 'path'
  path.value = './maizzle'
  starterIdx.value = 0
  customStarterIdx.value = 0
  install.value = true
  task1Running.value = false
  task1Done.value = false
  task2Running.value = false
  task2Done.value = false
  nextTick(activate)
}

function handleKey(e: KeyboardEvent) {
  if (step.value === 'path') {
    if (e.key === 'Enter') {
      if (path.value.trim()) step.value = 'starter'
      e.preventDefault()
    }
    else if (e.key === 'Backspace') {
      path.value = path.value.slice(0, -1)
      e.preventDefault()
    }
    else if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
      path.value += e.key
      e.preventDefault()
    }
    return
  }

  if (step.value === 'starter') {
    if (e.key === 'ArrowDown' || e.key === 'j') {
      starterIdx.value = (starterIdx.value + 1) % starters.length
      e.preventDefault()
    }
    else if (e.key === 'ArrowUp' || e.key === 'k') {
      starterIdx.value = (starterIdx.value - 1 + starters.length) % starters.length
      e.preventDefault()
    }
    else if (e.key === 'Enter') {
      step.value = isCustom.value ? 'starter-custom' : 'install'
      e.preventDefault()
    }
    return
  }

  if (step.value === 'starter-custom') {
    if (e.key === 'ArrowDown' || e.key === 'j') {
      customStarterIdx.value = (customStarterIdx.value + 1) % customStarters.length
      e.preventDefault()
    }
    else if (e.key === 'ArrowUp' || e.key === 'k') {
      customStarterIdx.value = (customStarterIdx.value - 1 + customStarters.length) % customStarters.length
      e.preventDefault()
    }
    else if (e.key === 'Enter') {
      step.value = 'install'
      e.preventDefault()
    }
    return
  }

  if (step.value === 'install') {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'h' || e.key === 'l') {
      install.value = !install.value
      e.preventDefault()
    }
    else if (e.key.toLowerCase() === 'y') {
      install.value = true
      e.preventDefault()
    }
    else if (e.key.toLowerCase() === 'n') {
      install.value = false
      e.preventDefault()
    }
    else if (e.key === 'Enter') {
      step.value = 'tasks'
      e.preventDefault()
      runTasks()
    }
    return
  }

  if (step.value === 'done' && e.key === 'Enter') {
    reset()
    e.preventDefault()
  }
}

function onPathKey(e: KeyboardEvent) {
  e.stopPropagation()
  if (e.key === 'Enter') {
    e.preventDefault()
    if (path.value.trim()) {
      step.value = 'starter'
      nextTick(() => root.value?.focus())
    }
  }
}

function selectStarter(i: number) {
  starterIdx.value = i
  step.value = starters[i].label === 'Custom' ? 'starter-custom' : 'install'
}

function selectCustomStarter(i: number) {
  customStarterIdx.value = i
  step.value = 'install'
}

function selectInstall(value: boolean) {
  install.value = value
  step.value = 'tasks'
  runTasks()
}

function activate() {
  if (step.value === 'path') pathInput.value?.focus()
  else root.value?.focus()
}

async function scrollToBottom() {
  await nextTick()
  if (root.value) {
    root.value.scrollTo({ top: root.value.scrollHeight, behavior: 'smooth' })
  }
}

watch([step, task1Done, task2Done, path, starterIdx, customStarterIdx, install], scrollToBottom)

const banner = [
  ' ███╗   ███╗  █████╗  ██╗ ███████╗ ███████╗ ██╗      ███████╗',
  ' ████╗ ████║ ██╔══██╗ ██║ ╚══███╔╝ ╚══███╔╝ ██║      ██╔════╝',
  ' ██╔████╔██║ ███████║ ██║   ███╔╝    ███╔╝  ██║      █████╗  ',
  ' ██║╚██╔╝██║ ██╔══██║ ██║  ███╔╝    ███╔╝   ██║      ██╔══╝  ',
  ' ██║ ╚═╝ ██║ ██║  ██║ ██║ ███████╗ ███████╗ ███████╗ ███████╗',
  ' ╚═╝     ╚═╝ ╚═╝  ╚═╝ ╚═╝ ╚══════╝ ╚══════╝ ╚══════╝ ╚══════╝',
]
const bannerColors = ['#ff00ff', '#d700ff', '#af00ff', '#8700ff', '#5f00ff', '#0000ff']
</script>

<style scoped>
.terminal::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.terminal::-webkit-scrollbar-track {
  background: transparent;
}
.terminal::-webkit-scrollbar-thumb {
  background: #414868;
  border-radius: 4px;
}
.terminal::-webkit-scrollbar-thumb:hover {
  background: #565f89;
}
.terminal {
  scrollbar-width: thin;
  scrollbar-color: #414868 transparent;
}
.tree .row {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 3ch;
  min-height: 1.4em;
  overflow: hidden;
}
.tree .row::before {
  content: '';
  position: absolute;
  left: 0.5ch;
  top: 0;
  bottom: 0;
  width: 1px;
  background: #565f89;
  z-index: 0;
}
.tree .row.first::before {
  top: 50%;
}
.tree .row.last::before {
  bottom: auto;
  height: 50%;
}
.tree .row.first::after,
.tree .row.last::after {
  content: '';
  position: absolute;
  left: 0.5ch;
  width: 1ch;
  height: 1px;
  background: #565f89;
}
.tree .row.first::after {
  top: 50%;
}
.tree .row.last::after {
  bottom: 50%;
}
.tree .row.no-trunk::before {
  display: none;
}
.tree .row.active {
  padding-top: 0.4em;
  padding-bottom: 0.4em;
}
.tree .glyph {
  position: absolute;
  left: 0.5px;
  top: 50%;
  transform: translate(0, calc(-50% + 0.1em));
  width: 1ch;
  height: 1em;
  line-height: 1em;
  text-align: center;
  z-index: 1;
}
.tree .glyph::before {
  content: '';
  position: absolute;
  inset: -200% 0;
  background: #1a1b26;
  z-index: -1;
}
.tree .note {
  position: relative;
}
.tree .note::before {
  content: '';
  position: absolute;
  pointer-events: none;
  top: 0.7em;
  left: 16ch;
  width: 22ch;
  bottom: 0;
  border-top: 1px solid #565f89;
  border-right: 1px solid #565f89;
  border-bottom: 1px solid #565f89;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  z-index: 1;
}
.tree .note::after {
  content: '';
  position: absolute;
  pointer-events: none;
  bottom: 0;
  left: 0.5ch;
  width: calc(16ch - 0.5ch);
  height: 1px;
  background: #565f89;
  z-index: 1;
}
</style>

<template>
  <div
    ref="root"
    tabindex="0"
    class="terminal relative not-prose my-6 rounded-lg border border-foreground/10 bg-[#1a1b26] text-[#a9b1d6] font-mono text-[12.5px] leading-tight p-5 outline-none focus:ring-2 focus:ring-indigo-500/40 overflow-y-auto h-72"
    :class="focused ? 'cursor-text' : 'cursor-pointer'"
    @focus="focused = true"
    @blur="focused = false"
    @keydown="handleKey"
    @click="activate"
  >
    <pre class="text-[8px] sm:text-[10px] leading-[1.2] mb-3 select-none"><span v-for="(line, i) in banner" :key="i" :style="{ color: bannerColors[i] }">{{ line }}<br></span></pre>

    <div class="text-[#a9b1d6] mb-3">Quickly build HTML emails with Tailwind CSS.</div>
    <div>Docs:&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#c0caf5]">https://maizzle.com</span></div>
    <div class="mb-4">GitHub:&nbsp;&nbsp;<span class="text-[#c0caf5]">https://github.com/maizzle</span></div>

    <div class="tree">
      <div class="row first">
        <span class="bg-[#414868] text-[#c0caf5] py-0.5">&nbsp;<span class="relative top-px">maizzle new</span>&nbsp;</span>
      </div>
      <div class="row" />

      <!-- Path step -->
      <template v-if="step === 'path'">
        <div class="row active">
          <span class="glyph text-[#7dcfff]">◆</span>
          <span class="text-[#c0caf5]">Where should we create your project?</span>
        </div>
        <div class="row">
          <input
            ref="pathInput"
            v-model="path"
            type="text"
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
            spellcheck="false"
            aria-label="Where should we create your project?"
            class="w-full bg-transparent border-0 p-0 m-0 text-[16px] origin-left scale-[0.781] text-[#c0caf5] caret-[#c0caf5] outline-none"
            @keydown="onPathKey"
            @focus="focused = true"
            @blur="focused = false"
          >
        </div>
      </template>
      <template v-else>
        <div class="row">
          <span class="glyph text-[#565f89]">◇</span>
          <span>Where should we create your project?</span>
        </div>
        <div class="row text-[#565f89]">{{ path }}</div>
        <div class="row" />
      </template>

      <!-- Starter step -->
      <template v-if="step === 'starter'">
        <div class="row active">
          <span class="glyph text-[#7dcfff]">◆</span>
          <span class="text-[#c0caf5]">Select a Starter</span>
        </div>
        <div
          v-for="(s, i) in starters"
          :key="s.label"
          class="row cursor-pointer"
          :class="i === starterIdx ? 'text-[#c0caf5]' : 'text-[#565f89]'"
          @click.stop="selectStarter(i)"
        >
          <span :class="i === starterIdx ? 'text-[#7dcfff]' : 'text-[#565f89]'">{{ i === starterIdx ? '●' : '○' }}</span>
          <span>&nbsp;{{ s.label }}</span>
        </div>
      </template>
      <template v-else-if="step === 'starter-custom' || step === 'install' || step === 'tasks' || step === 'done'">
        <div class="row">
          <span class="glyph text-[#565f89]">◇</span>
          <span>Select a Starter</span>
        </div>
        <div class="row text-[#565f89]">{{ starterValue }}</div>
        <div class="row" />
      </template>

      <!-- Custom starter sub-step -->
      <template v-if="isCustom && step === 'starter-custom'">
        <div class="row active">
          <span class="glyph text-[#7dcfff]">◆</span>
          <span class="text-[#c0caf5]">Select a custom Starter</span>
        </div>
        <div
          v-for="(s, i) in customStarters"
          :key="s.label"
          class="row cursor-pointer"
          :class="i === customStarterIdx ? 'text-[#c0caf5]' : 'text-[#565f89]'"
          @click.stop="selectCustomStarter(i)"
        >
          <span :class="i === customStarterIdx ? 'text-[#7dcfff]' : 'text-[#565f89]'">{{ i === customStarterIdx ? '●' : '○' }}</span>
          <span>&nbsp;{{ s.label }}<span v-if="s.hint" class="text-[#414868]">&nbsp;({{ s.hint }})</span></span>
        </div>
      </template>
      <template v-else-if="isCustom && (step === 'install' || step === 'tasks' || step === 'done')">
        <div class="row">
          <span class="glyph text-[#565f89]">◇</span>
          <span>Select a custom Starter</span>
        </div>
        <div class="row text-[#565f89]">{{ customStarters[customStarterIdx].label }}</div>
        <div class="row" />
      </template>

      <!-- Install step -->
      <template v-if="step === 'install'">
        <div class="row active">
          <span class="glyph text-[#7dcfff]">◆</span>
          <span class="text-[#c0caf5]">Install dependencies?</span>
        </div>
        <div class="row">
          <span class="cursor-pointer" @click.stop="selectInstall(true)">
            <span :class="install ? 'text-[#7dcfff]' : 'text-[#565f89]'">{{ install ? '●' : '○' }}</span>
            <span :class="install ? 'text-[#c0caf5]' : 'text-[#565f89]'">&nbsp;Yes</span>
          </span>
          <span class="text-[#414868]">&nbsp;/&nbsp;</span>
          <span class="cursor-pointer" @click.stop="selectInstall(false)">
            <span :class="!install ? 'text-[#7dcfff]' : 'text-[#565f89]'">{{ !install ? '●' : '○' }}</span>
            <span :class="!install ? 'text-[#c0caf5]' : 'text-[#565f89]'">&nbsp;No</span>
          </span>
        </div>
      </template>
      <template v-else-if="step === 'tasks' || step === 'done'">
        <div class="row">
          <span class="glyph text-[#565f89]">◇</span>
          <span>Install dependencies?</span>
        </div>
        <div class="row text-[#565f89]">{{ install ? 'Yes' : 'No' }}</div>
        <div class="row" />
      </template>

      <!-- Tasks -->
      <template v-if="step === 'tasks' || step === 'done'">
        <div class="row">
          <span class="glyph" :class="task1Done ? 'text-[#565f89]' : 'text-[#7dcfff]'">{{ task1Done ? '◇' : spinner }}</span>
          <span :class="task1Done ? 'text-[#565f89]' : 'text-[#c0caf5]'">{{ task1Done ? `Created project in ${path}` : 'Creating project' }}</span>
        </div>
        <div class="row" />
        <template v-if="install">
          <div v-if="task1Done" class="row">
            <span class="glyph" :class="task2Done ? 'text-[#565f89]' : 'text-[#7dcfff]'">{{ task2Done ? '◇' : spinner }}</span>
            <span :class="task2Done ? 'text-[#565f89]' : 'text-[#c0caf5]'">{{ task2Done ? 'Installed dependencies' : 'Installing dependencies' }}</span>
          </div>
          <div v-if="task1Done" class="row" />
        </template>
      </template>

      <!-- Next steps + outro -->
      <template v-if="step === 'done'">
        <div class="note">
          <div class="row">
            <span class="glyph text-[#565f89]">◇</span>
            <span>Next steps:</span>
          </div>
          <div class="row text-[#c0caf5]">cd {{ path }}</div>
          <div class="row" />
          <template v-if="!install">
            <div class="row text-[#c0caf5]">npm install</div>
            <div class="row" />
          </template>
          <div class="row text-[#c0caf5]">npm run dev</div>
          <div class="row" />
        </div>
        <div class="row" />
        <div class="row last">
          <span class="text-[#a9b1d6]">Documentation: https://maizzle.com/docs</span>
        </div>
        <div class="row no-trunk text-[#a9b1d6]">Components:&nbsp;&nbsp;&nbsp;&nbsp;https://mailviews.com</div>
      </template>
    </div>

    <button
      v-if="step === 'done'"
      type="button"
      class="mt-4 inline-flex items-center gap-1.5 text-[11px] text-[#a9b1d6] hover:text-[#c0caf5] cursor-pointer"
      @click.stop="reset"
    >
      <RotateCcw class="size-3" :stroke-width="2" />
      Replay
    </button>

    <div v-if="!focused && step !== 'done'" class="absolute right-4 bottom-2 text-[10px] text-[#565f89] select-none">
      Click to use the wizard
    </div>
  </div>
</template>
