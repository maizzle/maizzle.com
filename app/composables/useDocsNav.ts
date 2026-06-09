export const docsNavOrder = [
  'Getting Started',
  'Migrate to Maizzle',
  'Core Concepts',
  'Development',
  'Components',
  'Transformers',
  'API',
  'Deploy',
  'Events',
  'Framework Guides',
] as const

export function useDocsNav() {
  const { data: docs } = useAsyncData('docs-nav', () => queryCollection('docs').select('path', 'title', 'section', 'order', 'sidebar').all())

  const buildGroups = (predicate: (d: any) => boolean) => {
    if (!docs.value) return []

    const sectionMap: Record<string, any[]> = {}

    for (const doc of docs.value.filter(predicate)) {
      const section = doc.section ?? 'Other'
      sectionMap[section] ??= []
      sectionMap[section].push(doc)
    }

    return docsNavOrder
      .filter(label => sectionMap[label]?.length)
      .map(label => ({
        label,
        items: sectionMap[label].sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
      }))
  }

  const groups = computed(() => buildGroups(d => d.sidebar !== false && d.section !== 'Framework Guides'))

  const flat = computed(() => groups.value.flatMap(g => g.items))

  return { docs, groups, flat }
}
