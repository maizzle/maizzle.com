import { ref } from 'vue'

export type SoundMode = 'water' | 'electric' | 'glass' | 'scifi' | 'granular' | 'piano'

export const SOUND_OPTIONS: { value: SoundMode, label: string }[] = [
  { value: 'water', label: 'Water droplet' },
  { value: 'electric', label: 'Synthwave' },
  { value: 'glass', label: 'Glass bell' },
  { value: 'granular', label: 'Granular' },
  { value: 'piano', label: 'Piano' },
  { value: 'scifi', label: 'Echo' },
]

// Shared across the hero grid (audio) and its context menu (selection).
const heroSoundMode = ref<SoundMode>('water')

export function useHeroSound() {
  return { heroSoundMode, SOUND_OPTIONS }
}
