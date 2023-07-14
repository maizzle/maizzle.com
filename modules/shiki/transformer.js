import { visit } from 'unist-util-visit'
import { defineTransformer } from '@nuxt/content/transformers'
import { useShikiHighlighter } from './highlighter'

export default defineTransformer({
  name: 'shiki-transformer',
  extensions: ['.md'],
  transform: async (content, options = {}) => {
    const shikiHighlighter = useShikiHighlighter(options)

    await Promise.all([
      highlight(content.body),
      highlight(content.excerpt)
    ])

    return content

    /**
     * Highlight document with code nodes
     * @param document tree
     */
     async function highlight (document) {
      if (!document) {
        return
      }

      const styleMap = {}
      const codeBlocks = []
      const inlineCodes = []

      visit(
        document,
        (node) => (node?.tag === 'code' && node?.props.code) || (node?.tag === 'code-inline' && (node.props?.lang || node.props?.language)),
        (node) => {
          if (node?.tag === 'code') {
            codeBlocks.push(node)
          } else if (node?.tag === 'code-inline') {
            inlineCodes.push(node)
          }
        }
      )

      await Promise.all(codeBlocks.map((node) => highlightBlock(node, styleMap)))
      await Promise.all(inlineCodes.map((node) => highlightInline(node, styleMap)))

      // Inject token colors at the end of the document
      if (Object.values(styleMap).length) {
        document?.children.push({
          type: 'element',
          tag: 'style',
          children: [{ type: 'text', value: shikiHighlighter.generateStyles(styleMap) }]
        })
      }
    }

    /**
     * Highlight inline code
     */
    async function highlightInline (node, styleMap) {
      const code = node.children[0].value

      // Fetch highlighted tokens
      const lines = await shikiHighlighter.getHighlightedAST(code, node.props?.lang || node.props?.language, options.theme, { styleMap })

      // Generate highlighted children
      node.children = lines[0].children
      node.props = Object.assign(node.props || {}, { class: 'colored' })

      return node
    }

    /**
     * Highlight a code block
     */
    async function highlightBlock (node, styleMap) {
      const { code, language: lang, highlights = [], meta = '' } = node.props

      const innerCodeNode = node.children[0].children[0]

      innerCodeNode.children = await shikiHighlighter.getHighlightedAST(code, lang, options.theme, { styleMap, highlights, meta })

      return node
    }
  },
})
