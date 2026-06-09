import type { DecorationItem, Highlighter } from 'shiki'

let highlighterPromise: Promise<Highlighter> | null = null

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = import('shiki').then(({ createHighlighter }) =>
      createHighlighter({
        themes: ['laserwave'],
        langs: ['vue', 'typescript', 'html'],
      }),
    )
  }
  return highlighterPromise
}

/**
 * Runtime Shiki highlighter, matching the docs prose code theme (laserwave).
 * Lazy-loaded so shiki stays out of the main bundle until a snippet renders.
 */
export function useShiki() {
  async function highlight(code: string, lang: string, decorations?: DecorationItem[]) {
    const hl = await getHighlighter()
    return hl.codeToHtml(code, { lang, theme: 'laserwave', decorations })
  }
  return { highlight }
}
