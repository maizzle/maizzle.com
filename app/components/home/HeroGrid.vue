<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useHeroSound } from '@/composables/useHeroSound'

const { heroSoundMode } = useHeroSound()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let cleanupFn: (() => void) | null = null

const VERTEX_SRC = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAGMENT_SRC = `
#extension GL_OES_standard_derivatives : enable
precision highp float;
varying vec2 v_uv;
uniform vec2 u_res;
uniform float u_time;
uniform float u_scroll;        // grid scroll offset — frozen under reduced-motion
uniform float u_scroll_speed;  // scroll rate, for the y-line motion blur (0 = static)
uniform vec3 u_color;
uniform vec2 u_mouse;
uniform float u_mouse_strength;
uniform float u_depth_fade;
uniform float u_intensity;
uniform vec2 u_clicks[12];
uniform float u_click_times[12];
uniform float u_click_strength[12];
uniform vec2 u_hold;
uniform float u_hold_mass;

void main() {
  vec2 ndc = v_uv * 2.0 - 1.0;

  float pitch = 0.45;
  float h = 1.0;

  float aspect = u_res.x / u_res.y;
  vec3 rc = normalize(vec3(ndc.x * aspect * 0.6, ndc.y * 0.6, -1.0));
  float cp = cos(pitch);
  float sp = sin(pitch);
  vec3 ray = vec3(
    rc.x,
    rc.y * cp + rc.z * sp,
    -rc.y * sp + rc.z * cp
  );

  if (ray.y >= -0.0001) {
    gl_FragColor = vec4(0.0);
    return;
  }

  float t = -h / ray.y;
  vec3 hit = vec3(0.0, h, 0.0) + t * ray;

  vec2 fp = hit.xz;

  fp.y += u_scroll;

  // Mouse distortion — ripple / concentric sine waves from cursor floor position
  float mouse_d = 9999.0;
  if (u_mouse_strength > 0.001) {
    vec2 mouse_ndc = u_mouse * 2.0 - 1.0;
    vec3 mrc = normalize(vec3(mouse_ndc.x * aspect * 0.6, mouse_ndc.y * 0.6, -1.0));
    vec3 mray = vec3(
      mrc.x,
      mrc.y * cp + mrc.z * sp,
      -mrc.y * sp + mrc.z * cp
    );
    if (mray.y < -0.0001) {
      float mt = -h / mray.y;
      vec2 mfp = (vec3(0.0, h, 0.0) + mt * mray).xz;
      mfp.y += u_scroll;
      vec2 diff = fp - mfp;
      float d = length(diff);
      mouse_d = d;
      // Sine rings that decay with distance
      float envelope = exp(-d * 1.2) * u_mouse_strength;
      float wave = sin(d * 12.0 - u_time * 3.0) * 0.08;
      fp += (diff / (d + 0.0001)) * wave * envelope;
    }
  }

  // Click ripples — concentric rings expanding from each click (stone in a lake)
  float click_glow = 0.0;
  for (int i = 0; i < 12; i++) {
    float elapsed = u_time - u_click_times[i];
    if (elapsed > 0.0 && elapsed < 4.0) {
      float s = u_click_strength[i];
      // Sub-1 strengths (drag wake) scale the whole ripple down; clicks (s>=1)
      // are unaffected, so a swept trail stays soft while taps stay punchy.
      float amp = clamp(s, 0.0, 1.0);
      vec2 cl_ndc = u_clicks[i] * 2.0 - 1.0;
      vec3 clrc = normalize(vec3(cl_ndc.x * aspect * 0.6, cl_ndc.y * 0.6, -1.0));
      vec3 clray = vec3(clrc.x, clrc.y * cp + clrc.z * sp, -clrc.y * sp + clrc.z * cp);
      if (clray.y < -0.0001) {
        float clt = -h / clray.y;
        vec2 clfp = (vec3(0.0, h, 0.0) + clt * clray).xz;
        clfp.y += u_scroll;
        vec2 cdiff = fp - clfp;
        float cd = length(cdiff);
        float radius = elapsed * (1.6 + s * 0.4);                 // stronger clicks travel further
        float q = (cd - radius) / 0.5;
        float packet = exp(-q * q);
        float decay = exp(-elapsed * (1.4 / (0.7 + s * 0.28)));   // stronger clicks live longer
        float wave = sin((cd - radius) * 15.0) * 0.14 * (0.85 + s * 0.1) * packet * decay * amp;
        fp += (cdiff / (cd + 0.0001)) * wave;
        click_glow += packet * decay * amp;
        // Lingering core: the struck point keeps glowing after the leading
        // ring departs, settling slowly like the churned centre of a splash
        // instead of snapping dark the instant the ring passes.
        float core = exp(-cd * cd * 3.5) * exp(-elapsed * 0.9);
        click_glow += core * (0.45 + s * 0.1) * amp;
      }
    }
  }

  // Gravitational lensing: a held mass excises a disc (the void) and pulls the
  // surrounding grid inward toward its rim — g(r)=sqrt(r^2-R^2) maps outside
  // coords toward the edge, so lines bend AROUND the hole instead of crossing
  // it (true spacetime-distortion style). Inside R the grid is masked out.
  float holeMask = 1.0;
  float holeRim = 0.0;
  if (u_hold_mass > 0.001) {
    vec2 hn = u_hold * 2.0 - 1.0;
    vec3 hrc = normalize(vec3(hn.x * aspect * 0.6, hn.y * 0.6, -1.0));
    vec3 hray = vec3(hrc.x, hrc.y * cp + hrc.z * sp, -hrc.y * sp + hrc.z * cp);
    vec2 holdC = (vec3(0.0, h, 0.0) + (-h / hray.y) * hray).xz + vec2(0.0, u_scroll);
    vec2 d = fp - holdC;
    float r = length(d);
    float R = u_hold_mass * 0.42;                // void radius grows with mass
    holeMask = smoothstep(R - 0.02, R + 0.02, r);
    holeRim = exp(-(r - R) * (r - R) * 220.0) * 0.8; // bright ring at the event horizon
    float g = sqrt(max(r * r - R * R, 0.0));
    fp = holdC + (d / max(r, 1e-4)) * g;
  }

  float cells_per_unit = 2.5;
  vec2 fps = fp * cells_per_unit;
  vec2 g = abs(fract(fps - 0.5) - 0.5);
  // Distance to the nearest line measured in pixels (g normalized by its
  // screen-space derivative). A flat solid core plus a soft edge keeps pixels
  // inside the core fully lit through sub-pixel scroll, so lines stop
  // toggling on/off (the periodic mid-height shimmer).
  vec2 fw = fwidth(fps);
  vec2 dPx = g / max(fw, vec2(1e-5));

  // Horizontal lines scroll along y. In the mid-depth band perspective makes
  // them sweep across the screen faster than one frame samples, so they
  // strobe. Smear the y-line's soft edge by its per-frame screen travel
  // (motion blur), keeping swept pixels lit instead of blinking.
  float scrollPxPerFrame = (u_scroll_speed * cells_per_unit / 60.0) / max(fw.y, 1e-5);
  float yBlur = min(scrollPxPerFrame, 2.0);

  float coreHalf = 0.5;
  float edgeAA   = 0.75;
  float lineX = 1.0 - smoothstep(coreHalf, coreHalf + edgeAA, dPx.x);
  float lineY = 1.0 - smoothstep(coreHalf, coreHalf + edgeAA + yBlur, dPx.y);
  float intensity = max(lineX, lineY);

  float depth_fade = exp(-t * u_depth_fade);
  intensity *= depth_fade;
  intensity *= u_intensity;
  intensity *= holeMask;                 // blank out the void interior
  intensity = max(intensity, holeRim * depth_fade); // glowing event-horizon ring
  intensity *= 1.0 - smoothstep(9.0, 15.0, u_hold_mass); // final collapse swallows the last sliver
  intensity = clamp(intensity, 0.0, 1.0);

  // Fade in from top (0–18% of canvas height)
  float dist_from_top = 1.0 - v_uv.y;
  intensity *= smoothstep(0.0, 0.18, dist_from_top);

  // Indigo highlight fading out from distortion centre
  vec3 indigo = vec3(0.388, 0.400, 0.945);
  float color_fade = exp(-mouse_d * 0.75) * u_mouse_strength + click_glow * 0.9 + holeRim;
  vec3 final_color = mix(u_color, indigo, clamp(color_fade, 0.0, 1.0));

  gl_FragColor = vec4(final_color, intensity);
}
`

// Tailwind gray, sRGB normalized to 0–1.
const LINE_RGB_LIGHT: [number, number, number] = [107 / 255, 114 / 255, 128 / 255] // gray-500
const LINE_RGB_DARK:  [number, number, number] = [156 / 255, 163 / 255, 175 / 255] // gray-400

function isLightTheme(): boolean {
  return !document.documentElement.classList.contains('dark')
}

// Diatonic C-major scale across 3 octaves from C4 — do re mi fa sol la si do,
// left → low, right → high.
const SCALE_FREQS: number[] = (() => {
  const root = 261.626 // C4
  const degrees = [0, 2, 4, 5, 7, 9, 11] // do re mi fa sol la si
  const freqs: number[] = []
  for (let octave = 0; octave < 3; octave++) {
    for (const semis of degrees) freqs.push(root * Math.pow(2, (octave * 12 + semis) / 12))
  }
  return freqs
})()

// Synth water-drop "plink" for click ripples. Horizontal position picks the
// musical note; force sets velocity (volume); distance (dist 0 = near, 1 =
// horizon) softens timbre — muffled, quieter, longer tail, as air absorbs
// highs and distance softens the sound.
let audioCtx: AudioContext | null = null
function getCtx(): AudioContext | null {
  if (!audioCtx) {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext
    if (!Ctx) return null
    audioCtx = new Ctx()
  }
  if (audioCtx.state === 'suspended') audioCtx.resume()
  return audioCtx
}

// Shared reverb bus. Every voice sends into the convolver; the wet level is
// near-zero (dry) by default and swells with click density (see onClick), so
// mashing the grid blooms into a reverberant wash, then decays back.
const MAX_WET = 0.8
let convolver: ConvolverNode | null = null
let reverbWet: GainNode | null = null
function getReverb(ctx: AudioContext): { input: ConvolverNode, wet: GainNode } {
  if (!convolver || !reverbWet) {
    const seconds = 2.2
    const len = Math.floor(ctx.sampleRate * seconds)
    const buf = ctx.createBuffer(2, len, ctx.sampleRate)
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch)
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.5)
    }
    convolver = ctx.createConvolver()
    convolver.buffer = buf
    reverbWet = ctx.createGain()
    reverbWet.gain.value = 0.0001
    convolver.connect(reverbWet)
    reverbWet.connect(ctx.destination)
  }
  return { input: convolver, wet: reverbWet }
}

// Send a voice's output to both the dry destination and the reverb bus.
function toOutput(ctx: AudioContext, node: AudioNode) {
  node.connect(ctx.destination)
  node.connect(getReverb(ctx).input)
}

function noteIndexFor(x: number): number {
  const xi = Math.min(Math.max(x, 0), 0.9999)
  return Math.floor(xi * SCALE_FREQS.length)
}
function noteFor(x: number): number {
  return SCALE_FREQS[noteIndexFor(x)]!
}

// The hero's click voice — picked randomly on load (onMounted) and changeable
// via the grid's right-click context menu. State lives in useHeroSound.
function playClickSound(force: number, dist: number, x: number) {
  switch (heroSoundMode.value) {
    case 'electric': return playZap(force, dist, x)
    case 'glass':    return playGlass(force, dist, x)
    case 'scifi':    return playSciFi(force, dist, x)
    case 'granular': return playGranular(force, dist, x)
    case 'piano':    return playPiano(force, dist, x)
    default:         return playPlink(force, dist, x)
  }
}

function playPlink(force: number, dist: number, x: number) {
  const ctx = getCtx()
  if (!ctx) return

  const norm = Math.min(Math.max((force - 1) / 4, 0), 1)
  const d = Math.min(Math.max(dist, 0), 1)
  const freq = noteFor(x)
  const t0 = ctx.currentTime

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const lp = ctx.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.value = 700 + (1 - d) * 1500   // far → muffled

  osc.type = 'sine'
  // Droplet chirp: glide up into the note so the onset reads as a water drop
  // while the sustained tail lands exactly on the musical pitch (stays in tune).
  osc.frequency.setValueAtTime(freq * 0.7, t0)
  osc.frequency.exponentialRampToValueAtTime(freq, t0 + 0.06)

  const peak = (0.05 + norm * 0.05) * (1 - d * 0.55)       // far → quieter
  const decay = 0.28 + d * 0.25                            // far → longer tail
  gain.gain.setValueAtTime(0.0001, t0)
  gain.gain.exponentialRampToValueAtTime(peak, t0 + 0.005)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + decay)

  osc.connect(lp).connect(gain)
  toOutput(ctx, gain)
  osc.start(t0)
  osc.stop(t0 + decay + 0.05)
}

// Shared white-noise buffer for the percussive transients (arc crackle, piano
// hammer). The content is pure random, so build it once and let each voice play
// the slice it needs — no per-click allocation or Math.random fill loop. Voices
// vary it cheaply with a random start offset.
let noiseBuffer: AudioBuffer | null = null
function getNoiseBuffer(ctx: AudioContext): AudioBuffer {
  if (!noiseBuffer) {
    const len = Math.floor(ctx.sampleRate * 2)
    noiseBuffer = ctx.createBuffer(1, len, ctx.sampleRate)
    const d = noiseBuffer.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
  }
  return noiseBuffer
}

// Hard tanh clipping curve for the electric arc grit — cached, built once.
let arcCurve: Float32Array | null = null
function getArcCurve(): Float32Array {
  if (arcCurve) return arcCurve
  const n = 1024
  const c = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const xx = (i / (n - 1)) * 2 - 1
    c[i] = Math.tanh(xx * 8)
  }
  arcCurve = c
  return c
}

// Electric "spacetime continuum" zap. Same note/velocity/distance mapping as
// the droplet, but the voice is two detuned sawtooths through a high-resonance
// lowpass that sweeps downward (electric zing), with a slow vibrato LFO warping
// the pitch. Hard waveshaping plus a square-gated noise crackle give it the
// sputtering arc of a train pantograph sparking on the wire.
function playZap(force: number, dist: number, x: number) {
  const ctx = getCtx()
  if (!ctx) return

  const norm = Math.min(Math.max((force - 1) / 4, 0), 1)
  const d = Math.min(Math.max(dist, 0), 1)
  const freq = noteFor(x)
  const t0 = ctx.currentTime

  const o1 = ctx.createOscillator()
  const o2 = ctx.createOscillator()
  o1.type = 'sawtooth'
  o2.type = 'sawtooth'
  o1.frequency.value = freq
  o2.frequency.value = freq
  o2.detune.value = 16   // cents — beating shimmer

  // Vibrato LFO bends both oscillators for the warping continuum feel.
  const lfo = ctx.createOscillator()
  const lfoGain = ctx.createGain()
  lfo.frequency.value = 7
  lfoGain.gain.value = freq * 0.012
  lfo.connect(lfoGain)
  lfoGain.connect(o1.frequency)
  lfoGain.connect(o2.frequency)

  // Resonant lowpass sweeping high → low = the electric "pew". Distance pulls
  // the whole sweep down (muffled).
  const lp = ctx.createBiquadFilter()
  lp.type = 'lowpass'
  lp.Q.value = 9
  const muffle = 1 - d * 0.55
  lp.frequency.setValueAtTime(Math.min(freq * 10, 9000) * muffle, t0)
  lp.frequency.exponentialRampToValueAtTime(Math.max(freq * 1.6, 300) * muffle, t0 + 0.18)

  const gain = ctx.createGain()
  const peak = (0.04 + norm * 0.05) * (1 - d * 0.55)   // far → quieter
  const decay = 0.34 + d * 0.3                         // far → longer tail
  gain.gain.setValueAtTime(0.0001, t0)
  gain.gain.exponentialRampToValueAtTime(peak, t0 + 0.008)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + decay)

  const stopAt = t0 + decay + 0.05

  // Bright noise crackle, gated by a fast square LFO so it sputters — the "bzzz"
  // of an arc. Kept bright (highpass) and parallel to the tonal sweep.
  const noise = ctx.createBufferSource()
  noise.buffer = getNoiseBuffer(ctx)
  const nhp = ctx.createBiquadFilter()
  nhp.type = 'highpass'
  nhp.frequency.value = 1400
  const nEnv = ctx.createGain()
  const nPeak = (0.09 + norm * 0.08) * (1 - d * 0.5)
  nEnv.gain.setValueAtTime(nPeak, t0)
  nEnv.gain.exponentialRampToValueAtTime(0.0001, t0 + decay)

  const buzz = ctx.createOscillator()
  buzz.type = 'square'
  buzz.frequency.value = 82
  const buzzDepth = ctx.createGain()
  buzzDepth.gain.value = 0.4
  const nBuzz = ctx.createGain()
  nBuzz.gain.value = 0.6     // center; the square LFO swings it ~0.2–1.0
  buzz.connect(buzzDepth).connect(nBuzz.gain)

  // Hard waveshaper clips the whole voice — harmonic grit, not a clean tone.
  const shaper = ctx.createWaveShaper()
  shaper.curve = getArcCurve()
  shaper.oversample = '4x'

  o1.connect(lp)
  o2.connect(lp)
  lp.connect(shaper)
  noise.connect(nhp).connect(nEnv).connect(nBuzz).connect(shaper)
  shaper.connect(gain)
  toOutput(ctx, gain)

  o1.start(t0); o1.stop(stopAt)
  o2.start(t0); o2.stop(stopAt)
  lfo.start(t0); lfo.stop(stopAt)
  buzz.start(t0); buzz.stop(stopAt)
  noise.start(t0, Math.random() * 1.2); noise.stop(stopAt)
}

// Glass / crystal bell: a fast-attack stack of inharmonic sine partials with a
// long shimmering decay (higher partials fade first). Distance muffles via a
// shared lowpass, quiets, and lengthens the tail.
function playGlass(force: number, dist: number, x: number) {
  const ctx = getCtx()
  if (!ctx) return

  const norm = Math.min(Math.max((force - 1) / 4, 0), 1)
  const d = Math.min(Math.max(dist, 0), 1)
  const freq = noteFor(x)
  const t0 = ctx.currentTime

  const lp = ctx.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.value = 1500 + (1 - d) * 4500
  toOutput(ctx, lp)

  const ratios = [1, 2.0, 3.01, 4.76]
  const parts  = [1, 0.5, 0.3, 0.18]
  const peak = (0.07 + norm * 0.05) * (1 - d * 0.5)
  const decay = 1.4 + d * 0.8

  ratios.forEach((r, i) => {
    const o = ctx.createOscillator()
    o.type = 'sine'
    o.frequency.value = freq * r
    o.detune.value = i * 4   // tiny shimmer between partials
    const g = ctx.createGain()
    const partDecay = decay * (1 - i * 0.18)
    g.gain.setValueAtTime(0.0001, t0)
    g.gain.exponentialRampToValueAtTime(peak * parts[i]!, t0 + 0.004)
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + partDecay)
    o.connect(g).connect(lp)
    o.start(t0)
    o.stop(t0 + partDecay + 0.05)
  })
}

// Sci-fi "bloop" / sonar: a sine that drops downward onto the note, with a
// feedback-delay echo. Distance lengthens the echo and feeds it back more —
// pings receding into the void.
function playSciFi(force: number, dist: number, x: number) {
  const ctx = getCtx()
  if (!ctx) return

  const norm = Math.min(Math.max((force - 1) / 4, 0), 1)
  const d = Math.min(Math.max(dist, 0), 1)
  const freq = noteFor(x)
  const t0 = ctx.currentTime

  const osc = ctx.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(freq * 2, t0)
  osc.frequency.exponentialRampToValueAtTime(freq, t0 + 0.13)   // downward bloop

  const gain = ctx.createGain()
  const peak = (0.06 + norm * 0.05) * (1 - d * 0.4)
  const decay = 0.26
  gain.gain.setValueAtTime(0.0001, t0)
  gain.gain.exponentialRampToValueAtTime(peak, t0 + 0.006)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + decay)

  const delay = ctx.createDelay(1.0)
  delay.delayTime.value = 0.18 + d * 0.22
  const fb = ctx.createGain()
  fb.gain.value = 0.3 + d * 0.3
  const echoTail = 2.2

  osc.connect(gain)
  toOutput(ctx, gain)             // dry + reverb send
  gain.connect(delay)
  delay.connect(fb)
  fb.connect(delay)
  delay.connect(ctx.destination)  // echoes

  osc.start(t0)
  osc.stop(t0 + decay + 0.05)
  window.setTimeout(() => { delay.disconnect(); fb.disconnect() }, echoTail * 1000)
}

// Granular / glitch: a scattered burst of tiny enveloped grains around the
// note, jumping octaves — chaotic, "spacetime tearing". Distance muffles,
// quiets, and spreads the grains over a longer window.
function playGranular(force: number, dist: number, x: number) {
  const ctx = getCtx()
  if (!ctx) return

  const norm = Math.min(Math.max((force - 1) / 4, 0), 1)
  const d = Math.min(Math.max(dist, 0), 1)
  const freq = noteFor(x)
  const t0 = ctx.currentTime

  const lp = ctx.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.value = 1200 + (1 - d) * 4000
  toOutput(ctx, lp)

  const count = 6 + Math.floor(norm * 6)
  const spread = 0.22 + d * 0.25
  const octaves = [0.5, 1, 1, 2]
  const peak = (0.05 + norm * 0.04) * (1 - d * 0.45)

  for (let i = 0; i < count; i++) {
    const gt = t0 + (i / count) * spread + Math.random() * 0.012
    const o = ctx.createOscillator()
    o.type = Math.random() < 0.5 ? 'square' : 'sine'
    o.frequency.value = freq * octaves[Math.floor(Math.random() * octaves.length)]!
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, gt)
    g.gain.exponentialRampToValueAtTime(peak, gt + 0.005)
    g.gain.exponentialRampToValueAtTime(0.0001, gt + 0.05)
    o.connect(g).connect(lp)
    o.start(gt)
    o.stop(gt + 0.07)
  }
}

// Acoustic-ish piano: an additive stack of slightly-inharmonic partials (higher
// ones decay faster, as on a real string) with a fast hammer-noise transient at
// the onset. A lowpass starts bright with velocity and closes as the note rings.
// Distance muffles, quiets, and lengthens the tail.
function playPiano(force: number, dist: number, x: number) {
  const ctx = getCtx()
  if (!ctx) return

  const norm = Math.min(Math.max((force - 1) / 4, 0), 1)
  const d = Math.min(Math.max(dist, 0), 1)
  const freq = noteFor(x)
  const t0 = ctx.currentTime

  const lp = ctx.createBiquadFilter()
  lp.type = 'lowpass'
  const decay = 1.6 + d * 0.9
  lp.frequency.setValueAtTime((1400 + norm * 4200) * (1 - d * 0.5), t0)
  lp.frequency.exponentialRampToValueAtTime(Math.max(freq * 2, 500) * (1 - d * 0.4), t0 + decay)
  toOutput(ctx, lp)

  const amps = [1, 0.62, 0.42, 0.26, 0.15, 0.09]
  const inharm = 0.0004                                    // string stiffness
  const peak = (0.06 + norm * 0.05) * (1 - d * 0.5)

  amps.forEach((a, i) => {
    const n = i + 1
    const o = ctx.createOscillator()
    o.type = i === 0 ? 'triangle' : 'sine'
    o.frequency.value = freq * n * Math.sqrt(1 + inharm * n * n)
    const g = ctx.createGain()
    const partDecay = decay * (1 - i * 0.13)               // highs die first
    g.gain.setValueAtTime(0.0001, t0)
    g.gain.exponentialRampToValueAtTime(peak * a, t0 + 0.004)
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + partDecay)
    o.connect(g).connect(lp)
    o.start(t0)
    o.stop(t0 + partDecay + 0.05)
  })

  // Hammer thunk — short filtered noise burst at the attack.
  const noise = ctx.createBufferSource()
  noise.buffer = getNoiseBuffer(ctx)
  const nbp = ctx.createBiquadFilter()
  nbp.type = 'bandpass'
  nbp.frequency.value = Math.min(freq * 4, 3500)
  const nEnv = ctx.createGain()
  const nPeak = (0.05 + norm * 0.05) * (1 - d * 0.5)
  nEnv.gain.setValueAtTime(nPeak, t0)
  nEnv.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.05)
  noise.connect(nbp).connect(nEnv).connect(lp)
  noise.start(t0, Math.random() * 1.5)
  noise.stop(t0 + 0.06)
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  // Skip the WebGL grid entirely when it would be expensive or unwanted: users
  // who prefer reduced motion or are saving data, and devices without a real
  // GPU (where the fragment shader runs on the CPU and pins the main thread —
  // the cause of catastrophic mobile/no-GPU TBT). The transparent canvas stays
  // empty and the section background shows through.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const saveData = (navigator as any).connection?.saveData === true
  if (reduceMotion || saveData) return

  const gl = canvas.getContext('webgl', {
    antialias: true,
    alpha: true,
  })
  if (!gl) return

  const dbgInfo = gl.getExtension('WEBGL_debug_renderer_info')
  const renderer = dbgInfo ? String(gl.getParameter(dbgInfo.UNMASKED_RENDERER_WEBGL) || '') : ''
  if (/swiftshader|llvmpipe|software|microsoft basic|mesa offscreen|paravirtual/i.test(renderer)) return

  gl.getExtension('OES_standard_derivatives')

  function compile(type: number, src: string): WebGLShader | null {
    const sh = gl!.createShader(type)
    if (!sh) return null
    gl!.shaderSource(sh, src)
    gl!.compileShader(sh)
    if (!gl!.getShaderParameter(sh, gl!.COMPILE_STATUS)) {
      console.error('shader compile error:', gl!.getShaderInfoLog(sh))
      gl!.deleteShader(sh)
      return null
    }
    return sh
  }

  const vs = compile(gl.VERTEX_SHADER, VERTEX_SRC)
  const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SRC)
  if (!vs || !fs) return

  const prog = gl.createProgram()!
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('program link error:', gl.getProgramInfoLog(prog))
    return
  }
  gl.useProgram(prog)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  )
  const a_pos = gl.getAttribLocation(prog, 'a_pos')
  gl.enableVertexAttribArray(a_pos)
  gl.vertexAttribPointer(a_pos, 2, gl.FLOAT, false, 0, 0)

  const u_res      = gl.getUniformLocation(prog, 'u_res')
  const u_time     = gl.getUniformLocation(prog, 'u_time')
  const u_scroll   = gl.getUniformLocation(prog, 'u_scroll')
  const u_scroll_speed = gl.getUniformLocation(prog, 'u_scroll_speed')
  const u_color    = gl.getUniformLocation(prog, 'u_color')
  const u_mouse    = gl.getUniformLocation(prog, 'u_mouse')
  const u_mouse_strength = gl.getUniformLocation(prog, 'u_mouse_strength')
  const u_clicks   = gl.getUniformLocation(prog, 'u_clicks')
  const u_click_times = gl.getUniformLocation(prog, 'u_click_times')
  const u_click_strength = gl.getUniformLocation(prog, 'u_click_strength')
  const u_hold       = gl.getUniformLocation(prog, 'u_hold')
  const u_hold_mass  = gl.getUniformLocation(prog, 'u_hold_mass')
  const u_depth_fade = gl.getUniformLocation(prog, 'u_depth_fade')
  const u_intensity  = gl.getUniformLocation(prog, 'u_intensity')

  let isLight = isLightTheme()
  let lineColor = isLight ? LINE_RGB_LIGHT : LINE_RGB_DARK

  // Reduced-motion: freeze the ambient grid scroll to a static frame. User-driven
  // ripples, mouse waves and the black hole still animate (they age off u_time).
  const SCROLL_SPEED = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.4

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = canvas!.getBoundingClientRect()
    canvas!.width  = Math.max(1, Math.round(rect.width  * dpr))
    canvas!.height = Math.max(1, Math.round(rect.height * dpr))
    gl!.viewport(0, 0, canvas!.width, canvas!.height)
  }
  resize()

  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  window.addEventListener('resize', resize)

  const themeObserver = new MutationObserver(() => {
    isLight = isLightTheme()
    lineColor = isLight ? LINE_RGB_LIGHT : LINE_RGB_DARK
  })
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })

  // Mouse tracking — listen on window, check against canvas bounds
  let mouseX = 0.5
  let mouseY = 0.5
  let mouseTargetX = 0.5
  let mouseTargetY = 0.5
  let mouseStrength = 0.0
  let mouseTarget = 0.0

  // Drag glissando — hold and sweep over the grid to play each cell like piano
  // keys. Cells are x note-columns × vertical depth bands, so sweeping in any
  // direction retriggers (vertical keeps the pitch, shifts the timbre).
  const DEPTH_BANDS = 8
  // Drag keeps its original dry glissando note; the wake ripple is a separate,
  // gentle visual (sub-1 strength) so the sweep leaves a soft fading trail
  // rather than a string of full-strength splashes.
  const DRAG_FORCE = 1.8
  const DRAG_RIPPLE_STRENGTH = 0.8
  let dragging = false
  let lastDragCell = -1
  let prevUserSelect = ''

  // Click-and-hold black hole: press and stay still to tear a hole in the grid
  // (shader u_hold/u_hold_mass). It widens — accelerating — until it swallows
  // the whole canvas; releasing collapses it shut. Moving past HOLD_CANCEL_PX
  // turns the gesture into a drag instead.
  const HOLD_CANCEL_PX = 8
  const HOLD_DELAY = 0.18  // press must be held this long before the hole opens
  const HOLD_RAMP = 0.9    // base growth rate (accelerates with size)
  const CLOSE_ACCEL = 105  // collapse acceleration on release (slow → hard snap shut)
  let holding = false
  let holdMoving = false
  let holdMass = 0
  let closeVel = 0
  let releaseMass = 0  // hole size captured at release, scales the collapse ripple
  let suppressNextClick = false
  let holdX = 0.5
  let holdDepth = 0.5
  let downClientX = 0
  let downClientY = 0
  let holdStartMs = 0
  let lastFrameT = performance.now()

  // Touch gestures: a single finger held still opens the right-click sound menu
  // (a swept finger still plays the glissando, a tap still ripples); two fingers
  // drive the black hole instead. Track active touch pointers so we can tell the
  // gestures apart.
  const heroSection = canvas.closest('section')
  const touches = new Map<number, { x: number, y: number }>()
  const ONE_FINGER_DELAY = 450   // ms a lone finger must rest before the menu opens
  const ONE_FINGER_MOVE = 10     // px of drift that reclassifies it as a drag/glissando
  let menuFingerId = -1
  let menuStartX = 0
  let menuStartY = 0
  let oneFingerTimer = 0
  let holdTwoFinger = false       // the active well is a two-finger gesture
  let allowNextContextMenu = false

  function openOneFingerMenu() {
    const p = touches.get(menuFingerId)
    if (!heroSection || touches.size !== 1 || !p) return
    // Reka opens its context menu off a native contextmenu event; synthesise one
    // at the finger so the menu anchors there.
    allowNextContextMenu = true
    heroSection.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: p.x, clientY: p.y }))
  }
  function enterTwoFinger() {
    // A second finger means "black hole", not "menu" — drop the pending menu and
    // any single-finger drag, then open the well at the two fingers' midpoint.
    window.clearTimeout(oneFingerTimer)
    holdTwoFinger = true
    holding = true
    dragging = false
    lastDragCell = -1
    closeVel = 0
    suppressNextClick = true
    const pts = [...touches.values()]
    const rect = canvas!.getBoundingClientRect()
    holdX = ((pts[0]!.x + pts[1]!.x) / 2 - rect.left) / rect.width
    holdDepth = 1.0 - ((pts[0]!.y + pts[1]!.y) / 2 - rect.top) / rect.height
    holdStartMs = performance.now()
    getCtx()
  }

  // A single-finger long-press also fires a *native* contextmenu; swallow it
  // inside the hero so the only thing that opens the menu is our positioned
  // synthetic event. Desktop right-click has no active touches → left alone.
  function onContextMenuCapture(e: Event) {
    if (allowNextContextMenu) { allowNextContextMenu = false; return }
    if (touches.size > 0 && heroSection && e.target instanceof Node && heroSection.contains(e.target)) {
      e.preventDefault()
    }
  }
  window.addEventListener('contextmenu', onContextMenuCapture, true)

  // Cinematic "braaam" for the gaping hole — a detuned low brass cluster run
  // through soft saturation so its harmonics carry on small speakers, swelling
  // louder and brighter as the void widens. Driven live by holdMass; reverses
  // and drops out as the hole collapses.
  const HOLD_F0 = 42
  const braaamCurve = (() => {
    const n = 1024
    const c = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      const x = (i / (n - 1)) * 2 - 1
      c[i] = Math.tanh(x * 2.6)
    }
    return c
  })()
  // Brass cluster: felt sub-sine, detuned saw pair at the fundamental for the
  // thick beating, plus octave/12th saws for presence up where laptops radiate.
  const HOLD_VOICES = [
    { type: 'sine',     mul: 0.5, detune: 0,   gain: 0.9 },
    { type: 'sawtooth', mul: 1.0, detune: -8,  gain: 0.5 },
    { type: 'sawtooth', mul: 1.0, detune: 9,   gain: 0.5 },
    { type: 'sawtooth', mul: 2.0, detune: 4,   gain: 0.32 },
    { type: 'sawtooth', mul: 3.0, detune: -6,  gain: 0.16 },
  ] as const
  let holdVoices: { osc: OscillatorNode, mul: number }[] = []
  let holdGain: GainNode | null = null
  let holdFilter: BiquadFilterNode | null = null
  function startHoldDrone() {
    const ctx = getCtx()
    if (!ctx || holdVoices.length) return
    holdGain = ctx.createGain()
    holdGain.gain.value = 0.0001
    holdFilter = ctx.createBiquadFilter()
    holdFilter.type = 'lowpass'
    holdFilter.frequency.value = 200
    holdFilter.Q.value = 0.6
    const shaper = ctx.createWaveShaper()
    shaper.curve = braaamCurve
    shaper.oversample = '2x'
    const mixer = ctx.createGain()
    mixer.gain.value = 0.5
    for (const v of HOLD_VOICES) {
      const osc = ctx.createOscillator()
      osc.type = v.type
      osc.frequency.value = HOLD_F0 * v.mul
      osc.detune.value = v.detune
      const g = ctx.createGain()
      g.gain.value = v.gain
      osc.connect(g)
      g.connect(mixer)
      osc.start()
      holdVoices.push({ osc, mul: v.mul })
    }
    mixer.connect(shaper)
    shaper.connect(holdFilter)
    holdFilter.connect(holdGain)
    toOutput(ctx, holdGain)
  }
  function updateHoldDrone(mass: number) {
    const ctx = getCtx()
    if (!ctx || !holdVoices.length) return
    const now = ctx.currentTime
    const m = Math.min(mass * (10 / 9), 10)  // stretch so the 9-cap maps to the top of the tonal curve
    const tc = 0.1
    const f0 = HOLD_F0 + m * 3
    for (const v of holdVoices) v.osc.frequency.setTargetAtTime(f0 * v.mul, now, tc)
    holdFilter!.frequency.setTargetAtTime(200 + m * 220, now, tc) // opens → more grit as it grows
    holdGain!.gain.setTargetAtTime(Math.min(0.3, 0.06 + m * 0.028), now, tc)
  }
  function stopHoldDrone() {
    const ctx = getCtx()
    if (!ctx || !holdGain) return
    const now = ctx.currentTime
    holdGain.gain.cancelScheduledValues(now)
    holdGain.gain.setValueAtTime(holdGain.gain.value, now)
    holdGain.gain.linearRampToValueAtTime(0.0001, now + 0.4)
    const voices = holdVoices, g = holdGain
    for (const v of voices) v.osc.stop(now + 0.45)
    holdVoices = []
    holdGain = null
    holdFilter = null
    setTimeout(() => { try { for (const v of voices) v.osc.disconnect(); g.disconnect() } catch { /* already torn down */ } }, 600)
  }
  // Ground-shaking thunder for the void snapping shut: a low strike transient up
  // front, a felt sub that drops the floor out, and a long rolling rumble whose
  // amplitude undulates (the "roll") under a lowpass that sweeps shut so it stays
  // dark, never fizzy. Loud and long. Scaled by how wide the hole had grown (1–5).
  function playCollapseThunder(strength: number) {
    const ctx = getCtx()
    if (!ctx) return
    const now = ctx.currentTime
    const n = Math.min(Math.max((strength - 1) / 4, 0), 1)
    const dur = 2.6 + n * 2.8
    const amp = 0.5 + n * 0.7

    const out = ctx.createGain()
    out.gain.value = amp
    // Master lowpass: open enough at the crack for the body, then sweeps down
    // over the roll so the tail is pure low rumble.
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.Q.value = 0.6
    lp.frequency.setValueAtTime(900 + n * 700, now)
    lp.frequency.exponentialRampToValueAtTime(140, now + dur * 0.75)
    lp.connect(out)
    toOutput(ctx, out)

    // The strike: a short, weighty low crack. Fast attack + steep pitch drop.
    const strike = ctx.createOscillator()
    const strikeG = ctx.createGain()
    strike.type = 'triangle'
    strike.frequency.setValueAtTime(220, now)
    strike.frequency.exponentialRampToValueAtTime(48, now + 0.12)
    strikeG.gain.setValueAtTime(0.0001, now)
    strikeG.gain.exponentialRampToValueAtTime(1.0, now + 0.005)
    strikeG.gain.exponentialRampToValueAtTime(0.0001, now + 0.6)
    strike.connect(strikeG).connect(out)
    strike.start(now); strike.stop(now + 0.7)

    // Felt sub: the floor dropping out, sustaining under the roll.
    const sub = ctx.createOscillator()
    const subG = ctx.createGain()
    sub.type = 'sine'
    sub.frequency.setValueAtTime(HOLD_F0 * (1.3 + n * 0.3), now)
    sub.frequency.exponentialRampToValueAtTime(HOLD_F0 * 0.4, now + dur * 0.8)
    subG.gain.setValueAtTime(0.0001, now)
    subG.gain.exponentialRampToValueAtTime(0.9, now + 0.015)
    subG.gain.exponentialRampToValueAtTime(0.0001, now + dur)
    sub.connect(subG).connect(out)
    sub.start(now); sub.stop(now + dur + 0.1)

    // Rolling rumble: lowpassed noise whose gain undulates across the duration —
    // a curve of decaying humps with jitter gives the tumbling thunder roll.
    const noise = ctx.createBufferSource()
    noise.buffer = getNoiseBuffer(ctx)
    noise.loop = true
    const nf = ctx.createBiquadFilter()
    nf.type = 'lowpass'
    nf.Q.value = 0.7
    nf.frequency.setValueAtTime(420, now)
    nf.frequency.exponentialRampToValueAtTime(90, now + dur)
    const ng = ctx.createGain()
    const N = 96
    const curve = new Float32Array(N)
    for (let i = 0; i < N; i++) {
      const x = i / (N - 1)
      const env = Math.pow(1 - x, 1.5)                              // overall decay
      const roll = 0.5 + 0.5 * Math.abs(Math.sin(x * Math.PI * (3 + n * 4)))  // tumbling humps
      const jitter = 0.7 + 0.3 * Math.random()                      // crackle in the roll
      curve[i] = Math.max(0.0001, env * roll * jitter * (0.6 + n * 0.3))
    }
    ng.gain.setValueCurveAtTime(curve, now, dur)
    noise.connect(nf).connect(ng).connect(out)
    noise.start(now); noise.stop(now + dur + 0.1)

    // Rolls out into a big reverb tail.
    const { wet } = getReverb(ctx)
    wet.gain.cancelScheduledValues(now)
    wet.gain.setValueAtTime(Math.max(wet.gain.value, 0.0001), now)
    wet.gain.linearRampToValueAtTime(MAX_WET * (0.5 + n * 0.4), now + 0.06)
    wet.gain.setTargetAtTime(0.0001, now + 0.2, 1.6)
  }

  function releaseHold() {
    holding = false
    holdMoving = false
    releaseMass = holdMass  // snapshot the open hole so the collapse can ripple proportionally
    // The hole now collapses (frame loop) and the roar reverses with it; swallow
    // the click sound that would otherwise fire on this press's release.
    if (holdMass > 0.04) suppressNextClick = true
  }

  function cellAt(x: number, depth: number): number {
    const db = Math.floor(Math.min(Math.max(depth, 0), 0.9999) * DEPTH_BANDS)
    return noteIndexFor(x) * DEPTH_BANDS + db
  }

  function onPointerMove(e: PointerEvent) {
    if (e.pointerType === 'touch' && touches.has(e.pointerId)) {
      touches.set(e.pointerId, { x: e.clientX, y: e.clientY })
      if (e.pointerId === menuFingerId
          && Math.hypot(e.clientX - menuStartX, e.clientY - menuStartY) > ONE_FINGER_MOVE) {
        window.clearTimeout(oneFingerTimer)   // finger swept → glissando, not a menu hold
      }
      if (holdTwoFinger && touches.size >= 2) {
        const pts = [...touches.values()]
        const rect2 = canvas!.getBoundingClientRect()
        holdX = ((pts[0]!.x + pts[1]!.x) / 2 - rect2.left) / rect2.width
        holdDepth = 1.0 - ((pts[0]!.y + pts[1]!.y) / 2 - rect2.top) / rect2.height
      }
    }
    const rect = canvas!.getBoundingClientRect()
    const inside = e.clientX >= rect.left && e.clientX <= rect.right
                && e.clientY >= rect.top  && e.clientY <= rect.bottom
    if (inside) {
      mouseTargetX = (e.clientX - rect.left) / rect.width
      mouseTargetY = 1.0 - (e.clientY - rect.top) / rect.height
      mouseTarget = 1.0
      if (holding && !holdTwoFinger && Math.hypot(e.clientX - downClientX, e.clientY - downClientY) > HOLD_CANCEL_PX) {
        if (holdMass > 0.01) {
          // hole is open — drag it instead of cancelling
          holdMoving = true
        } else {
          // hole not yet open — cancel to glissando drag
          releaseHold()
          lastDragCell = cellAt(mouseTargetX, mouseTargetY)
        }
      }
      if (holdMoving) {
        holdX = mouseTargetX
        holdDepth = mouseTargetY
      }
      if (dragging && !holding) {
        const cell = cellAt(mouseTargetX, mouseTargetY)
        if (cell !== lastDragCell) {
          lastDragCell = cell
          playClickSound(DRAG_FORCE, mouseTargetY, mouseTargetX)
          spawnRipple(mouseTargetX, mouseTargetY, DRAG_RIPPLE_STRENGTH)
        }
      }
    } else {
      mouseTarget = 0.0
    }
  }
  window.addEventListener('pointermove', onPointerMove)

  function onPointerDown(e: PointerEvent) {
    if (e.button !== 0) return   // primary button only — let right-click open the menu
    const rect = canvas!.getBoundingClientRect()
    const inside = e.clientX >= rect.left && e.clientX <= rect.right
                && e.clientY >= rect.top  && e.clientY <= rect.bottom
    if (!inside) return
    const x = (e.clientX - rect.left) / rect.width
    const depth = 1.0 - (e.clientY - rect.top) / rect.height

    if (e.pointerType === 'touch') {
      touches.set(e.pointerId, { x: e.clientX, y: e.clientY })
      if (touches.size >= 2) { enterTwoFinger(); return }
      // One finger never opens the well — it taps, sweeps the glissando, or (held
      // still) opens the menu after a delay. The black hole is a two-finger move.
      dragging = true
      closeVel = 0
      suppressNextClick = false
      lastDragCell = cellAt(x, depth)
      menuFingerId = e.pointerId
      menuStartX = e.clientX
      menuStartY = e.clientY
      window.clearTimeout(oneFingerTimer)
      oneFingerTimer = window.setTimeout(openOneFingerMenu, ONE_FINGER_DELAY)
      getCtx()
      prevUserSelect = document.body.style.userSelect
      document.body.style.userSelect = 'none'
      return
    }

    dragging = true
    holding = true
    closeVel = 0
    suppressNextClick = false
    // Seed the current cell so a plain tap doesn't double with onClick; the
    // first drag note plays once the sweep crosses into a new cell.
    lastDragCell = cellAt(x, depth)
    holdX = x
    holdDepth = depth
    downClientX = e.clientX
    downClientY = e.clientY
    holdStartMs = performance.now()
    getCtx() // resume audio within the user gesture so the hold drone can start
    // Suppress text selection while dragging across the hero.
    prevUserSelect = document.body.style.userSelect
    document.body.style.userSelect = 'none'
  }
  function onPointerUp(e?: PointerEvent) {
    if (e && e.pointerType === 'touch') {
      touches.delete(e.pointerId)
      if (e.pointerId === menuFingerId) window.clearTimeout(oneFingerTimer)
      if (touches.size < 2 && holdTwoFinger) { holdTwoFinger = false; releaseHold() }
    }
    if (holding) releaseHold()
    if (!dragging) return
    dragging = false
    lastDragCell = -1
    document.body.style.userSelect = prevUserSelect
  }
  window.addEventListener('pointerdown', onPointerDown)
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('pointercancel', onPointerUp)

  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

  let rafId = 0
  let canvasVisible = true
  const start = performance.now()

  // Click ripples — small ring buffer so rapid clicks overlap
  const MAX_CLICKS = 12
  const clicksFlat = new Float32Array(MAX_CLICKS * 2)
  const clickTimes = new Float32Array(MAX_CLICKS).fill(-100)
  const clickStrength = new Float32Array(MAX_CLICKS).fill(1)
  let clickIdx = 0
  let force = 0
  let lastClickT = -100

  // Write a ripple into the ring buffer (visual only). Strength scales the
  // ripple in-shader: >=1 for clicks, sub-1 for the softer drag wake.
  function spawnRipple(x: number, depth: number, strength: number) {
    clicksFlat[clickIdx * 2]     = x
    clicksFlat[clickIdx * 2 + 1] = depth
    clickTimes[clickIdx] = (performance.now() - start) / 1000
    clickStrength[clickIdx] = strength
    clickIdx = (clickIdx + 1) % MAX_CLICKS
  }

  // Spawn a ripple + note at a floor position (x, depth both 0–1). Shared by
  // mouse clicks and the number-key shortcuts.
  function triggerRipple(clickX: number, clickDepth: number) {
    const tNow = (performance.now() - start) / 1000
    // Rapid triggers accumulate force; it decays in the gaps between them.
    force = Math.min(Math.max(0, force - (tNow - lastClickT) * 2.0) + 1, 5)
    lastClickT = tNow
    spawnRipple(clickX, clickDepth, force)
    playClickSound(force, clickDepth, clickX)

    // Swell reverb with trigger density: single hits stay dry, mashing builds a
    // wash. force (1–5) maps to wet level; it decays back between hits.
    const ctx = getCtx()
    if (ctx) {
      const { wet } = getReverb(ctx)
      const now = ctx.currentTime
      const target = Math.max(0.0001, ((force - 1) / 4) * MAX_WET)
      wet.gain.cancelScheduledValues(now)
      wet.gain.setValueAtTime(Math.max(wet.gain.value, 0.0001), now)
      wet.gain.linearRampToValueAtTime(target, now + 0.04)
      wet.gain.setTargetAtTime(0.0001, now + 0.05, 0.7)
    }
  }

  function onClick(e: MouseEvent) {
    if (suppressNextClick) { suppressNextClick = false; return }
    const rect = canvas!.getBoundingClientRect()
    const inside = e.clientX >= rect.left && e.clientX <= rect.right
                && e.clientY >= rect.top  && e.clientY <= rect.bottom
    if (!inside) return
    const clickX = (e.clientX - rect.left) / rect.width
    const clickDepth = 1.0 - (e.clientY - rect.top) / rect.height
    triggerRipple(clickX, clickDepth)
  }
  window.addEventListener('click', onClick)

  // Number keys 1–9, 0 play notes left → high across the grid, evenly spaced.
  const KEY_ORDER = '1234567890'
  let lastKeyRippleT = -100
  function onKeyDown(e: KeyboardEvent) {
    if (e.altKey || e.ctrlKey || e.metaKey) return
    const target = e.target as HTMLElement | null
    if (target && (target.isContentEditable
      || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return
    const slot = KEY_ORDER.indexOf(e.key)
    if (slot === -1) return
    const x = (slot + 0.5) / KEY_ORDER.length
    if (e.repeat) {
      // Auto-repeat: keep the rhythmic note (spam is fine) but throttle the
      // visual to a fixed-strength ripple, so held same-spot presses emanate
      // as outward waves instead of piling into a confined, saturated blob.
      playClickSound(2.0, 0.5, x)
      const tNow = (performance.now() - start) / 1000
      if (tNow - lastKeyRippleT > 0.16) {
        lastKeyRippleT = tNow
        spawnRipple(x, 0.5, 1.0)
      }
      return
    }
    lastKeyRippleT = (performance.now() - start) / 1000
    triggerRipple(x, 0.5)
  }
  window.addEventListener('keydown', onKeyDown)

  function frame() {
    const t = (performance.now() - start) / 1000

    // Smooth position and strength lerp
    mouseX += (mouseTargetX - mouseX) * 0.03
    mouseY += (mouseTargetY - mouseY) * 0.03
    mouseStrength += (mouseTarget - mouseStrength) * 0.05

    // Hold well: charge mass while held, spring back on release.
    const nowMs = performance.now()
    const dt = Math.min(0.05, (nowMs - lastFrameT) / 1000)
    lastFrameT = nowMs
    // A press must be held past HOLD_DELAY before charging, so quick clicks
    // never engage the well or drone (which made spam-clicking stagger).
    const held = holding ? (nowMs - holdStartMs) / 1000 : 0
    if (holding) {
      closeVel = 0
      if (!holdMoving && held > HOLD_DELAY) {
        holdMass = Math.min(holdMass + HOLD_RAMP * (1 + holdMass) * dt, 9)  // cap below the global-swallow zone (shader line ~172) so the grid stays visible around the void at max opening
        if (!holdVoices.length && holdMass > 0.04) startHoldDrone()
      }
    }
    else if (holdMass > 0) {
      closeVel += CLOSE_ACCEL * dt                          // collapse, accelerating (slow → snap)
      holdMass = Math.max(0, holdMass - closeVel * dt)
      // The instant the void snaps fully shut, the rebound throws off one big
      // ripple from the implosion point — bigger the hole, bigger the wave.
      if (holdMass === 0 && releaseMass > 0.04) {
        const s = 1 + Math.min(releaseMass, 9) / 9 * 4      // map hole size → ripple strength (1–5)
        spawnRipple(holdX, holdDepth, s)
        playCollapseThunder(s)
      }
    }
    // Drive the braaam from mass: it swells while the hole opens and recedes
    // while it collapses, then cuts once fully closed.
    if (holdVoices.length) {
      if (holdMass > 0.02) updateHoldDrone(holdMass)
      else stopHoldDrone()
    }

    gl!.clearColor(0, 0, 0, 0)
    gl!.clear(gl!.COLOR_BUFFER_BIT)
    gl!.uniform2f(u_res, canvas!.width, canvas!.height)
    gl!.uniform1f(u_time, t)
    gl!.uniform1f(u_scroll, t * SCROLL_SPEED)
    gl!.uniform1f(u_scroll_speed, SCROLL_SPEED)
    gl!.uniform3f(u_color, lineColor[0], lineColor[1], lineColor[2])
    gl!.uniform2f(u_mouse, mouseX, mouseY)
    gl!.uniform1f(u_mouse_strength, mouseStrength)
    gl!.uniform2fv(u_clicks, clicksFlat)
    gl!.uniform1fv(u_click_times, clickTimes)
    gl!.uniform1fv(u_click_strength, clickStrength)
    gl!.uniform2f(u_hold, holdX, holdDepth)
    gl!.uniform1f(u_hold_mass, holdMass)
    // Light mode lines have low contrast on the near-white bg and recede fast,
    // so fade gentler with depth and lift overall intensity. Dark mode unchanged.
    gl!.uniform1f(u_depth_fade, isLight ? 0.08 : 0.10)
    gl!.uniform1f(u_intensity, isLight ? 0.8 : 0.7)
    gl!.drawArrays(gl!.TRIANGLES, 0, 6)
    if (canvasVisible) rafId = requestAnimationFrame(frame)
  }

  const visibilityObserver = new IntersectionObserver(([entry]) => {
    const nowVisible = entry?.isIntersecting ?? true
    if (nowVisible && !canvasVisible) {
      lastFrameT = performance.now()
      rafId = requestAnimationFrame(frame)
    }
    canvasVisible = nowVisible
  }, { threshold: 0 })
  visibilityObserver.observe(canvas)

  frame()

  cleanupFn = () => {
    cancelAnimationFrame(rafId)
    stopHoldDrone()
    ro.disconnect()
    themeObserver.disconnect()
    visibilityObserver.disconnect()
    window.removeEventListener('resize', resize)
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerdown', onPointerDown)
    window.removeEventListener('pointerup', onPointerUp)
    window.removeEventListener('pointercancel', onPointerUp)
    window.removeEventListener('click', onClick)
    window.removeEventListener('keydown', onKeyDown)
    window.removeEventListener('contextmenu', onContextMenuCapture, true)
    window.clearTimeout(oneFingerTimer)
    document.body.style.userSelect = prevUserSelect
    gl!.deleteProgram(prog)
    gl!.deleteShader(vs!)
    gl!.deleteShader(fs!)
    gl!.deleteBuffer(buf)
  }
})

onBeforeUnmount(() => {
  cleanupFn?.()
  cleanupFn = null
})
</script>

<template>
  <div class="hero-grid" aria-hidden="true">
    <canvas ref="canvasRef" class="hero-grid__canvas" />
  </div>
</template>

<style scoped>
.hero-grid {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.hero-grid__canvas {
  display: block;
  width: 100%;
  height: 100%;
  background-color: var(--background);
}
</style>
