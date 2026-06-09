<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Moon, Monitor, Sun } from 'lucide-vue-next'
import type { DecorationItem } from 'shiki'
import { ScrollArea } from '@/components/ui/scroll-area'

const welcomeVue = `<template>
  <Layout class="bg-gray-50 dark:bg-gray-950">
    <Container class="max-w-xl p-0 py-10 sm:p-6">
      <Section class="rounded-t-lg bg-gray-900 px-6 pt-6 pb-11">
        <Row>
          <Column class="w-1/2">
            <Link href="https://maizzle.com">
              <Img src="/logo.png" width="60" alt="Maizzle" />
            </Link>
          </Column>
          <Column class="w-1/2 text-right">
            <Link
              href="https://maizzle.com"
              class="text-sm font-medium text-gray-400"
            >
              My Account
            </Link>
          </Column>
        </Row>

        <Spacer class="h-36" />

        <Heading class="mb-4 text-[32px]/10 font-bold text-white">
          Welcome to [Brand Name]
        </Heading>

        <Text class="m-0 text-lg text-gray-300">
          Your account is almost ready.
        </Text>
      </Section>

      <Section class="rounded-b-lg bg-white px-6 py-16 dark:bg-gray-800">
        <Heading level="2" class="mb-6 text-2xl font-bold text-gray-950 dark:text-white">
          Confirm your email
        </Heading>

        <Text class="mb-6 text-base text-gray-600 dark:text-gray-300">
          Thanks for signing up for [Brand Name]. Please confirm your email address to activate your account and start using all features.
        </Text>

        <Button
          href="https://maizzle.com"
          class="rounded-lg bg-gray-900 px-7 py-3 text-sm font-bold text-white dark:bg-white dark:text-gray-900"
        >
          Activate my account
        </Button>

        <Text class="mt-6 text-sm text-gray-600 dark:text-gray-400">
          <Text as="span" class="text-sm font-semibold">This link will expire in 24 hours.</Text>
          <br>
          If you did not create an account, you can safely ignore this email.
        </Text>
      </Section>

      <Section class="px-6 py-11">
        <Img src="/logo-footer.png" dark-src="/logo-footer-dark.png" width="106" alt="Maizzle" />

        <Spacer class="h-9" />

        <Text class="m-0 text-xs/4.5 text-gray-400">
          &copy; {{ new Date().getFullYear() }} [Brand Name]. All rights reserved.
        </Text>
      </Section>
    </Container>
  </Layout>
</template>`

const viteConfig = `import { defineConfig } from 'vite'
import { maizzle } from '@maizzle/framework'

export default defineConfig({
  plugins: [
    maizzle({
      root: 'src/emails',
      content: ['**/*.vue'],
      output: {
        path: 'build/emails',
      },
    }),
  ],
})`

const maizzleConfig = `import { defineConfig } from '@maizzle/framework'

export default defineConfig({
  content: ['emails/**/*.vue'],
  output: {
    path: 'dist',
  },
  css: {
    inline: true,
    purge: true,
  },
})`

const apiTs = `import { render } from '@maizzle/framework'
import { writeFile } from 'node:fs/promises'

const { html, plaintext } = await render('emails/welcome.vue', {
  plaintext: true,
})

await writeFile('dist/welcome.html', html)`

const files = [
  { name: 'welcome.vue', path: 'emails/welcome.vue', lang: 'vue', code: welcomeVue },
  { name: 'vite.config.ts', path: 'vite.config.ts', lang: 'typescript', code: viteConfig },
  { name: 'maizzle.config.ts', path: 'maizzle.config.ts', lang: 'typescript', code: maizzleConfig },
  { name: 'api.ts', path: 'api.ts', lang: 'typescript', code: apiTs },
]

const activeFile = ref('welcome.vue')
const current = computed(() => files.find(f => f.name === activeFile.value) ?? files[0])

/**
 * The edits the typing animation performs — rebranding the generic welcome.vue
 * into the SneakerHead template. Each maps a token to its replacement; the same
 * cumulative diff is baked into the matching /preview/sneaker-s*.html so each
 * save reflects 1:1. STEP_GROUPS bundles edits that share a line into one save,
 * so multi-spot lines (logo, button, footer image) type and reflect as a unit.
 */
const EDITS = [
  { anchor: 'src="/logo.png"', pre: 'src="/', old: 'logo.png', neu: 'logo-sneakerhead.png' },
  { anchor: 'width="60"', pre: 'width="', old: '60', neu: '203' },
  { anchor: 'font-medium text-gray-400', pre: 'font-medium ', old: 'text-gray-400', neu: 'text-gray-400 hover:text-gray-300' },
  { anchor: 'Welcome to [Brand Name]', pre: 'Welcome to ', old: '[Brand Name]', neu: '<span class="font-light text-[#f25dbd]">SneakerHead</span>' },
  { anchor: 'signing up for [Brand Name]', pre: 'signing up for ', old: '[Brand Name]', neu: 'SneakerHead' },
  { anchor: 'rounded-lg bg-gray-900', pre: '', old: 'rounded-lg', neu: 'rounded-full' },
  { anchor: 'rounded-lg bg-gray-900', pre: 'rounded-lg ', old: 'bg-gray-900', neu: 'bg-[#f25dbd] hover:bg-[#e643ad]' },
  { anchor: 'src="/logo-footer.png"', pre: 'src="/', old: 'logo-footer.png', neu: 'logo-footer-sh.png' },
  { anchor: 'width="106"', pre: 'width="', old: '106', neu: '528' },
  { anchor: 'getFullYear() }} [Brand Name]', pre: 'getFullYear() }} ', old: '[Brand Name]', neu: 'SneakerHead' },
  { anchor: 'dark-src="/logo-footer-dark.png"', pre: 'dark-src="/', old: 'logo-footer-dark.png', neu: 'logo-footer-sh-dark.png' },
  { anchor: ' dark:bg-white dark:text-gray-900', pre: '', old: ' dark:bg-white dark:text-gray-900', neu: '' },
]

// Edits sharing one source line, grouped so each line is one save/preview step.
// Button line: drop the dark white override first (a long, invisible deletion),
// then radius and bg — so the save fires right after the visible pink edit, at
// the same cadence as every other group.
// Footer image line: src, dark-src, then width (left to right).
const STEP_GROUPS = [[0, 1], [2], [3], [4], [11, 5, 6], [7, 10, 8], [9]]

const decorations: DecorationItem[] = EDITS.map((e, i) => {
  const start = welcomeVue.indexOf(e.anchor) + e.pre.length
  return { start, end: start + e.old.length, properties: { 'class': 'et', 'data-et': String(i) } }
}).sort((a, b) => a.start - b.start)

// welcomeVue with every edit applied — the end state, used to re-highlight the
// whole editor once typing finishes (so edited tokens get proper Shiki colours
// without the per-token delete-to-reveal dance).
const finalSource = (() => {
  const spans = EDITS.map((e) => {
    const s = welcomeVue.indexOf(e.anchor) + e.pre.length
    return { s, end: s + e.old.length, neu: e.neu }
  }).sort((a, b) => b.s - a.s)
  let out = welcomeVue
  for (const sp of spans) out = out.slice(0, sp.s) + sp.neu + out.slice(sp.end)
  return out
})()

const { highlight } = useShiki()
const decoratedHtml = ref('')

// Edits that insert real markup (the heading's <span>) get pre-highlighted, so
// the finished token shows Shiki colours immediately rather than waiting for the
// end-of-run re-highlight.
const fragments: Record<number, string> = {}
let domParser: DOMParser | null = null
async function highlightFragment(code: string): Promise<string> {
  const html = await highlight(code, 'html')
  domParser ??= new DOMParser()
  return domParser.parseFromString(html, 'text/html').querySelector('.line')?.innerHTML ?? ''
}

/**
 * Cumulative preview snapshots — index 0 is the untouched build, then one
 * baked variant per edit so the right-hand pane updates after every save.
 */
const PREVIEW_FILES = [
  '/preview/welcome.html',
  '/preview/sneaker-s1.html',
  '/preview/sneaker-s2.html',
  '/preview/sneaker-s3.html',
  '/preview/sneaker-s4.html',
  '/preview/sneaker-s5.html',
  '/preview/sneaker-s6.html',
  '/preview/sneaker-s7.html',
]

const srcdoc = ref('')
const previewHtmls = ref<string[]>([])
let previewIndex = 0
const justSaved = ref(false)

// Dark mode for the iframe preview ONLY — independent of the global site theme.
// The baked emails ship a prefers-color-scheme strategy; we rewrite them to a
// `.dark` class strategy (see toClassDark) and toggle that class on the iframe.
type PreviewTheme = 'light' | 'system' | 'dark'
const PREVIEW_THEMES = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'system', label: 'System', icon: Monitor },
  { value: 'dark', label: 'Dark', icon: Moon },
] as const
const previewTheme = ref<PreviewTheme>('system')
const osDark = ref(false)
const previewDark = computed(() =>
  previewTheme.value === 'dark' || (previewTheme.value === 'system' && osDark.value))
const surfaceBg = computed(() => (previewDark.value ? '#030712' : '#f9fafb'))
const dirty = ref(false)
const dirtyFiles = computed(() => (dirty.value ? ['welcome.vue'] : []))

const rootRef = ref<HTMLElement>()
const editorRef = ref<HTMLElement>()
const iframeRef = ref<HTMLIFrameElement>()
const iframeHeight = ref(1180)

// Viewport-resize handle: an auto-demo runs once the edits finish, then the dot
// stays put as a real handle the user can drag to resize the preview.
const previewPaneRef = ref<HTMLElement>()
const frameRef = ref<HTMLElement>()
const showCursor = ref(false)
const cursorGrab = ref(false)
const cursorX = ref(0)
const frameWidthPx = ref<number | null>(null)
const dragTransition = ref(false)
const handleActive = ref(false)

let observer: IntersectionObserver | null = null
let osMql: MediaQueryList | null = null
let started = false
let previewsLoaded = false
let welcomeTimer: ReturnType<typeof setTimeout> | null = null

const wait = (ms: number) => new Promise(r => setTimeout(r, ms))

// Relative asset paths in the baked HTML resolve against /preview/ once written.
const withBase = (html: string) => html.replace(/<head>/i, '<head><base href="/preview/">')

/**
 * Rewrite the baked email from a prefers-color-scheme dark strategy to a `.dark`
 * class strategy, so the preview's dark mode is driven entirely by a class on
 * the iframe root (toggled by the title-bar buttons) and never by the OS/site.
 *  - unwrap the dark @media block into `.dark`-scoped rules
 *  - swap the footer <picture>'s dark <source> for a class-toggled <img> pair
 */
function toClassDark(html: string): string {
  const marker = '@media (prefers-color-scheme: dark) {'
  const start = html.indexOf(marker)
  if (start !== -1) {
    let depth = 1
    let k = start + marker.length
    while (k < html.length && depth > 0) {
      if (html[k] === '{') depth++
      else if (html[k] === '}') depth--
      k++
    }
    const inner = html.slice(start + marker.length, k - 1)
      .replace(/(\.dark-[\w-]+)(\s*\{)/g, '.dark $1$2')
    html = html.slice(0, start) + inner + html.slice(k)
  }

  html = html.replace(
    /<picture>\s*<source srcset="([^"]+)" media="\(prefers-color-scheme: dark\)">\s*<img ([^>]*?)>\s*<\/picture>/g,
    (_m, darkSrc, attrs) =>
      `<img ${attrs} class="pv-logo-light">`
      + `<img ${attrs.replace(/src="[^"]*"/, `src="${darkSrc}"`)} class="pv-logo-dark">`,
  )

  const swapCss = '<style>.pv-logo-dark{display:none}.dark .pv-logo-light{display:none}.dark .pv-logo-dark{display:inline}</style>'
  return html.replace('</head>', `${swapCss}</head>`)
}

const prepare = (f: string) => fetch(f).then(r => r.text()).then(withBase).then(toClassDark)

async function loadPreviews() {
  if (previewsLoaded) return
  previewsLoaded = true
  previewHtmls.value = await Promise.all(PREVIEW_FILES.map(prepare))
}

/** Paint just the first preview so the pane isn't blank before the demo runs. */
async function loadWelcomePreview() {
  if (previewsLoaded || srcdoc.value) return
  const html = await prepare(PREVIEW_FILES[0]!)
  if (!previewsLoaded && !srcdoc.value) srcdoc.value = html
}

/** Collapse the iframe to its rendered content height so there's no dead space. */
function fitIframe() {
  const doc = iframeRef.value?.contentDocument
  const html = doc?.documentElement
  const body = doc?.body
  if (!html || !body) return
  // The email's <html>/<body> carry inline height:100%, so they stretch to fill
  // the iframe and scrollHeight just echoes the iframe height. Force auto first
  // so scrollHeight reflects the real content.
  html.style.height = 'auto'
  html.style.overflow = 'hidden'
  body.style.height = 'auto'
  body.style.overflow = 'hidden'
  iframeHeight.value = body.scrollHeight
}

/**
 * Mirror the framework dev server: write straight into the iframe document
 * instead of swapping `src`, so the outer ScrollArea's scroll position is
 * preserved natively and the preview doesn't reload/jump on each save.
 */
function writePreview(i: number) {
  previewIndex = i
  const doc = iframeRef.value?.contentDocument
  const html = previewHtmls.value[i]
  if (!doc || !html) return
  doc.open()
  doc.write(html)
  doc.close()
  applyPreviewTheme()
  fitIframe()
}

/** Toggle the `.dark` class on the iframe root to match the preview theme. */
function applyPreviewTheme() {
  iframeRef.value?.contentDocument?.documentElement.classList.toggle('dark', previewDark.value)
}

function onIframeLoad() {
  applyPreviewTheme()
  fitIframe()
}

/** Scroll only the editor's own ScrollArea viewport — never the page. */
function scrollToEdit(el: HTMLElement) {
  const viewport = editorRef.value?.closest<HTMLElement>('[data-slot="scroll-area-viewport"]')
  if (viewport) {
    const vpRect = viewport.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    const top = viewport.scrollTop + (elRect.top - vpRect.top) - viewport.clientHeight / 2 + elRect.height / 2
    viewport.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }
  return wait(700)
}

/** Simulate Cmd/Ctrl+S → mark clean and re-render the right-hand preview. */
async function reflectSave(stepIndex: number) {
  await wait(520)
  dirty.value = false
  writePreview(stepIndex)
  justSaved.value = true
  await wait(300)
  justSaved.value = false
}

async function runAnimation() {
  if (started || !editorRef.value) return
  started = true

  for (let s = 0; s < STEP_GROUPS.length; s++) {
    const group = STEP_GROUPS[s]!
    const multi = group.length > 1

    dirty.value = true
    for (let j = 0; j < group.length; j++) {
      const el = editorRef.value.querySelector<HTMLElement>(`[data-et="${group[j]}"]`)
      if (!el) continue
      // Scroll once per line; the second spot on a line is already in view.
      if (j === 0) {
        await wait(150)
        await scrollToEdit(el)
      }
      else {
        await wait(120)
      }
      await typeEdit(el, EDITS[group[j]!]!.old, EDITS[group[j]!]!.neu, multi, fragments[group[j]!])
    }
    await wait(multi ? 220 : 380)
    await reflectSave(s + 1)
    await wait(160)
  }

  // Snap the whole editor to proper syntax highlighting now that typing is done.
  decoratedHtml.value = await highlight(finalSource, 'vue')

  await wait(700)
  await resizeDemo()
}

/**
 * Drag the email's edge in to a 393px mobile viewport and back. The frame rests
 * at the full pane width (so the start/end never cross the 600px breakpoint and
 * never jump); the cursor is driven onto the card's *live* edge every frame, so
 * it stays glued to the layout even as it reflows mid-drag.
 */
const MOBILE_W = 393
const CARD_MAX = 576 // max-w-xl
const BP = 600 // the email's mobile media-query breakpoint
const DRAG_MS = 1500

// Visible card width for a given viewport width (Container caps at max-w-xl and
// gains 24px side padding below the breakpoint).
function cardWidth(w: number) {
  const container = Math.min(w, CARD_MAX)
  const pad = w <= BP ? 48 : 0
  return Math.max(0, container - pad)
}

async function resizeDemo() {
  const pane = previewPaneRef.value
  const frame = frameRef.value
  if (!pane || !frame) return

  const paneW = pane.clientWidth
  const center = paneW / 2

  // rest at the true full width — equal to 100%, so no breakpoint cross / no jump
  frameWidthPx.value = paneW
  cursorX.value = center + cardWidth(paneW) / 2
  showCursor.value = true
  await nextTick()
  dragTransition.value = true

  // keep the cursor glued to the card's live right edge — and the iframe sized
  // to its content — as the frame animates (mobile reflow makes the email taller)
  let raf = requestAnimationFrame(function tick() {
    cursorX.value = center + cardWidth(frame.getBoundingClientRect().width) / 2
    fitIframe()
    raf = requestAnimationFrame(tick)
  })

  await wait(750)
  cursorGrab.value = true
  await wait(250)
  frameWidthPx.value = MOBILE_W
  await wait(DRAG_MS)
  cursorGrab.value = false

  await wait(2200) // hold at mobile width

  cursorGrab.value = true
  await wait(180)
  frameWidthPx.value = paneW
  await wait(DRAG_MS)
  cursorGrab.value = false

  await wait(450)
  cancelAnimationFrame(raf)
  dragTransition.value = false
  restHandle()
}

/** Park the dot at the full-width card edge as a live, draggable resize handle. */
function restHandle() {
  const pane = previewPaneRef.value
  if (!pane) return
  const paneW = pane.clientWidth
  frameWidthPx.value = paneW
  cursorX.value = paneW / 2 + cardWidth(paneW) / 2
  showCursor.value = true
  handleActive.value = true
}

/**
 * Drag mapping: the handle tracks the pointer 1:1 (clamped to the card-edge
 * range), while the frame width follows — smooth through the email's mobile
 * band, full-width above its breakpoint.
 */
function resizeFromPointer(clientX: number) {
  const pane = previewPaneRef.value
  if (!pane) return
  const rect = pane.getBoundingClientRect()
  const center = rect.width / 2
  const minHalf = cardWidth(MOBILE_W) / 2
  const maxHalf = cardWidth(rect.width) / 2
  const half = Math.min(Math.max(clientX - rect.left - center, minHalf), maxHalf)
  const card = half * 2
  frameWidthPx.value = card <= cardWidth(BP) ? card + 48 : rect.width
  cursorX.value = center + half
  fitIframe()
}

function onHandlePointerMove(e: PointerEvent) {
  resizeFromPointer(e.clientX)
}
function onHandlePointerUp() {
  cursorGrab.value = false
  if (iframeRef.value) iframeRef.value.style.pointerEvents = ''
  document.body.style.userSelect = ''
  window.removeEventListener('pointermove', onHandlePointerMove)
  window.removeEventListener('pointerup', onHandlePointerUp)
}
function onHandlePointerDown(e: PointerEvent) {
  if (!handleActive.value) return
  e.preventDefault()
  cursorGrab.value = true
  // Stop the iframe from swallowing the pointer mid-drag.
  if (iframeRef.value) iframeRef.value.style.pointerEvents = 'none'
  document.body.style.userSelect = 'none'
  window.addEventListener('pointermove', onHandlePointerMove)
  window.addEventListener('pointerup', onHandlePointerUp)
}

/**
 * Edit a token in place: keep the common prefix/suffix, backspace only the part
 * that actually changes, then type the replacement — so an append just appends
 * and a value tweak only touches the differing chars (no delete-and-readd of the
 * whole word). `fast` tightens timing for lines edited in multiple spots.
 */
async function typeEdit(el: HTMLElement, oldText: string, neu: string, fast = false, html?: string) {
  const dSpeed = fast ? 38 : 60
  const jit = (ms: number) => ms * (0.8 + Math.random() * 0.4)

  let p = 0
  while (p < oldText.length && p < neu.length && oldText[p] === neu[p]) p++
  let s = 0
  while (s < oldText.length - p && s < neu.length - p
    && oldText[oldText.length - 1 - s] === neu[neu.length - 1 - s]) s++

  const prefix = oldText.slice(0, p)
  const suffix = s ? oldText.slice(oldText.length - s) : ''
  const oldMid = oldText.slice(p, oldText.length - s)
  const newMid = neu.slice(p, neu.length - s)
  // Long inserts (the heading's <span> markup) type quicker so they don't drag.
  const tSpeed = newMid.length > 30 ? 30 : (fast ? 70 : 115)

  // Re-render the token as prefix + middle + block cursor + suffix.
  const render = (mid: string) => {
    el.textContent = ''
    if (prefix + mid) el.appendChild(document.createTextNode(prefix + mid))
    el.appendChild(Object.assign(document.createElement('span'), { className: 'pv-cursor' }))
    if (suffix) el.appendChild(document.createTextNode(suffix))
  }

  // Flattening drops the Shiki colour spans, so pin the token's own colour for
  // the duration of typing — it should look the same as before, just live.
  const colorEl = el.querySelector('span')
  el.style.color = getComputedStyle(colorEl ?? el).color
  render(oldMid)
  await wait(jit(fast ? 260 : 480))
  let mid = oldMid
  while (mid.length) {
    mid = mid.slice(0, -1)
    render(mid)
    await wait(jit(dSpeed))
  }
  if (newMid && oldMid) await wait(jit(fast ? 140 : 240))
  for (let i = 1; i <= newMid.length; i++) {
    render(newMid.slice(0, i))
    await wait(jit(tSpeed))
  }
  if (html) el.innerHTML = html // markup token → Shiki-highlighted immediately
  else el.textContent = neu // settle to plain text, drop the cursor
}

onMounted(async () => {
  decoratedHtml.value = await highlight(welcomeVue, 'vue', decorations)
  for (let i = 0; i < EDITS.length; i++) {
    if (EDITS[i]!.neu.includes('<')) fragments[i] = await highlightFragment(EDITS[i]!.neu)
  }

  // Resolve the preview's "System" option against the OS, with a live listener.
  osMql = window.matchMedia('(prefers-color-scheme: dark)')
  osDark.value = osMql.matches
  osMql.addEventListener('change', onOsChange)
  watch(previewDark, applyPreviewTheme)

  // Defer the preview HTML fetches until the section scrolls into view.
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        observer?.disconnect()
        onVisible()
      }
    }
  }, { threshold: 0.35 })

  if (rootRef.value) observer.observe(rootRef.value)

  // Prefetch the first preview shortly after mount so the pane isn't blank,
  // but late enough not to fight the hero for bandwidth on first paint.
  welcomeTimer = setTimeout(loadWelcomePreview, 500)
})

/**
 * First time the section is visible: fetch the preview snapshots, then run the
 * typing demo — or, under reduced-motion, settle straight to the branded end
 * state with the resize handle parked.
 */
async function onVisible() {
  if (welcomeTimer) clearTimeout(welcomeTimer)
  await loadPreviews()

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    decoratedHtml.value = await highlight(finalSource, 'vue')
    previewIndex = previewHtmls.value.length - 1
    srcdoc.value = previewHtmls.value[previewIndex] ?? ''
    await nextTick()
    restHandle()
    return
  }

  srcdoc.value = previewHtmls.value[0] ?? ''
  await nextTick()
  runAnimation()
}

function onOsChange(e: MediaQueryListEvent) {
  osDark.value = e.matches
}

onBeforeUnmount(() => {
  if (welcomeTimer) clearTimeout(welcomeTimer)
  observer?.disconnect()
  osMql?.removeEventListener('change', onOsChange)
  window.removeEventListener('pointermove', onHandlePointerMove)
  window.removeEventListener('pointerup', onHandlePointerUp)
})
</script>

<template>
  <ContainerAlt :bottom-border="false">
    <div class="pt-20 sm:pt-28 pb-10 px-4 sm:px-0 bg-background">
      <div class="max-w-2xl">
        <p class="text-xs font-medium uppercase tracking-wider text-muted-foreground">Workflows</p>
        <h2 class="mt-3 text-3xl sm:text-4xl/[1.15] font-bold text-foreground tracking-tight">
          <span class="font-light">Use in any</span> Vite project,<br><span class="font-light">or as a</span> standalone <span class="font-light">tool.</span>
        </h2>
        <p class="mt-5 text-lg/7 text-muted-foreground text-balance">
          Plug Maizzle into your existing build, run it from the command line, or call it as a library. Same components, same output.
        </p>
      </div>
    </div>

    <div ref="rootRef" class="px-4 sm:px-0 pb-8 bg-background">
      <div class="rounded-lg overflow-hidden border border-white/10 bg-[oklch(0.17_0.031_263)] grid grid-cols-1 lg:grid-cols-2">
        <IdeChrome
          v-model="activeFile"
          :files="files"
          :dirty-files="dirtyFiles"
          height-class="lg:h-[974px]"
          :unified="true"
        >
          <div
            v-show="activeFile === 'welcome.vue'"
            ref="editorRef"
            class="cs-shiki selection:bg-[#F25DBD]/30! selection:text-white!"
          >
            <div v-if="decoratedHtml" v-html="decoratedHtml" />
            <pre v-else class="font-mono text-sm leading-8 text-[#b4afbf] px-4 py-4 m-0 whitespace-pre">{{ welcomeVue }}</pre>
          </div>
          <CodeSnippet
            v-show="activeFile !== 'welcome.vue'"
            :code="activeFile === 'welcome.vue' ? '' : current.code"
            :lang="current.lang"
          />
        </IdeChrome>

        <div
          class="border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col lg:h-[974px] transition-shadow duration-500"
          :class="justSaved ? 'ring-2 ring-inset ring-orange-500/60' : ''"
        >
          <div class="shrink-0 relative flex items-center justify-center h-9 px-3 bg-[oklch(0.13_0.031_263)] border-b border-white/5">
            <span class="text-xs text-[#91889b]">dist/welcome.html</span>
            <div
              role="radiogroup"
              aria-label="Preview theme"
              class="absolute right-2 top-1/2 -translate-y-1/2 inline-flex rounded-full border border-white/10 bg-white/5 p-0.5"
            >
              <button
                v-for="t in PREVIEW_THEMES"
                :key="t.value"
                role="radio"
                :aria-checked="previewTheme === t.value"
                :aria-label="t.label"
                :title="t.label"
                class="inline-flex size-6 items-center justify-center rounded-full text-[#91889b] transition-colors hover:text-white aria-checked:bg-white/10 aria-checked:text-white"
                @click="previewTheme = t.value"
              >
                <component :is="t.icon" class="size-3" />
              </button>
            </div>
          </div>
          <div ref="previewPaneRef" class="relative w-full h-[420px] lg:h-auto lg:flex-1 min-h-0" :style="{ backgroundColor: surfaceBg }">
            <!-- centred device frame; resizing its width keeps the template centred -->
            <div class="absolute inset-0 flex justify-center">
              <div
                ref="frameRef"
                class="h-full ease-in-out"
                :class="dragTransition ? 'transition-[width] duration-[1500ms]' : ''"
                :style="{ width: frameWidthPx !== null ? frameWidthPx + 'px' : '100%' }"
              >
                <ScrollArea type="hover" class="h-full w-full">
                  <iframe
                    ref="iframeRef"
                    :srcdoc="srcdoc"
                    class="w-full block"
                    :style="{ height: iframeHeight + 'px', backgroundColor: surfaceBg }"
                    title="Email preview"
                    scrolling="no"
                    @load="onIframeLoad"
                  />
                </ScrollArea>
              </div>
            </div>

            <!-- resize handle: faux cursor during the demo, then a live drag handle -->
            <div
              v-if="showCursor"
              class="group absolute top-1/2 z-30 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              :class="handleActive ? 'cursor-default touch-none' : 'pointer-events-none'"
              :style="{ left: cursorX + 'px' }"
              @pointerdown="onHandlePointerDown"
            >
              <span
                class="pointer-events-none absolute left-1/2 top-1/2 size-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F25DBD]/25 transition-transform duration-200"
                :class="cursorGrab ? 'scale-100' : (handleActive ? 'scale-0 group-hover:scale-100' : 'scale-0')"
              />
              <span
                class="pointer-events-none block size-4 rounded-full bg-gray-900/70 ring-2 ring-white shadow-lg transition-transform duration-200"
                :class="cursorGrab ? 'scale-90' : ''"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContainerAlt>
</template>

<style scoped>
.cs-shiki :deep(pre.shiki) {
  margin: 0;
  padding-block: 1rem;
  background: transparent !important;
}

.cs-shiki :deep(.pv-cursor) {
  display: inline-block;
  width: 1ch;
  height: 1.15em;
  margin: 0 1px -0.2em;
  background: #f25dbd;
  border-radius: 1px;
  animation: pv-blink 1s step-end infinite;
}

@keyframes pv-blink {
  50% {
    opacity: 0;
  }
}
</style>
