type Theme = 'light' | 'dark' | 'system'

const theme = ref<Theme>('system')

function apply(t: Theme) {
  if (typeof window === 'undefined') return
  const dark = t === 'dark' || (t === 'system' && matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', dark)
}

export function useTheme() {
  if (import.meta.client && !(useTheme as any)._init) {
    (useTheme as any)._init = true
    const stored = (localStorage.getItem('theme') as Theme | null) ?? 'system'
    theme.value = stored
    const mql = matchMedia('(prefers-color-scheme: dark)')
    mql.addEventListener('change', () => { if (theme.value === 'system') apply('system') })
  }

  function set(t: Theme) {
    theme.value = t
    if (import.meta.client) {
      if (t === 'system') localStorage.removeItem('theme')
      else localStorage.setItem('theme', t)
      apply(t)
    }
  }

  return { theme: readonly(theme), set }
}
