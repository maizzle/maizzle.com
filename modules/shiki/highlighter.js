import { getHighlighter, toShikiTheme, FontStyle, BUNDLED_LANGUAGES } from 'shiki-es'
import { createSingleton } from '@/assets/shiki/utils'
import vsCodeTheme from '@/assets/shiki/themes/tailwind.json'
import { consola } from 'consola'

// Re-create logger locally as utils cannot be imported from here
const logger = consola.withTag('@nuxt/content')

/**
 * Resolve Shiki compatible lang from string.
 *
 * Used to resolve lang from both languages id's and aliases.
 */
const resolveLang = (lang) => (BUNDLED_LANGUAGES.find(l => l.id === lang || l.aliases?.includes(lang)))

export const useShikiHighlighter = createSingleton(opts => {
  // Grab highlighter config from publicRuntimeConfig
  const { preload } = opts || {}

  const shikiTheme = toShikiTheme(vsCodeTheme)

  let promise

  const getShikiHighlighter = () => {
    if (!promise) {
      // Initialize highlighter with defaults
      promise = getHighlighter({
        // theme: theme?.default || theme || 'dracula',
        theme: shikiTheme,
        langs: [
          ...(preload || []),
          'diff',
          'json',
          'js',
          'ts',
          'css',
          'shell',
          'html',
          'md',
          'yaml',
          'vue',
        ],
      }).then((highlighter) => {
        return highlighter
      })
    }
    return promise
  }

  const splitCodeToLines = (code) => {
    const lines = code.split(/\r\n|\r|\n/)
    return [...lines.map((line) => [{ content: line }])]
  }

  const getHighlightedTokens = async (code, lang, theme) => {
    const highlighter = await getShikiHighlighter()
    // Remove trailing carriage returns
    code = code.replace(/\n+$/, '')
    // Resolve lang & theme (i.e check if shiki supports them)
    lang = (resolveLang(lang || '')?.id || lang)

    // Skip highlight if lang is not supported
    if (!lang) {
      return splitCodeToLines(code)
    }

    // Load supported language on-demand
    if (!highlighter.getLoadedLanguages().includes(lang)) {
      const languageRegistration = resolveLang(lang)

      if (languageRegistration) {
        await highlighter.loadLanguage(languageRegistration)
      } else {
        logger.warn(`Language '${lang}' is not supported by shiki. Skipping highlight.`)
        return splitCodeToLines(code)
      }
    }

    // Load theme
    highlighter.loadTheme(shikiTheme)

    // Highlight code
    const tokens = highlighter.codeToThemedTokens(code, lang, theme, { includeExplanation: false })
      .map(line => line.map(token => ({
        content: token.content,
        style: {
          default: {
            color: token.color,
            fontStyle: token.fontStyle
          }
        }
      })))
    const coloredTokens = [{
      key: 'default',
      // theme: 'github-light',
      tokens
    }]

    const highlightedCode = []
    for (const line in coloredTokens[0].tokens) {
      highlightedCode[line] = coloredTokens.reduce((acc, color) => {
        return mergeLines({
          key: coloredTokens[0].key,
          tokens: acc
        }, {
          key: color.key,
          tokens: color.tokens[line]
        })
      }, coloredTokens[0].tokens[line])
    }

    return highlightedCode
  }

  const getHighlightedAST = async (code, lang, theme, opts) => {
    const lines = await getHighlightedTokens(code, lang, theme)
    const { highlights = [], styleMap = {}, meta = '' } = opts || {}

    const metaOpts = meta.split(' ')

    const isDiff = metaOpts.includes('diff')

    return lines.map((line, lineIndex) => {
      const classes = ['line']

      // Add line break to all lines except last
      if (lineIndex !== lines.length - 1) {
        // Add line break to empty lines
        if (line.length === 0) {
          classes.push('empty')
          line.push({ content: '' })
        }
        line[line.length - 1].content += '\n'
      }

      if (isDiff) {
        if (line[0].content.startsWith('+')) {
          classes.push('ins')
          line[0].content = line[0].content.replace(/^\+/, '')
        }
        if (line[0].content.startsWith('-')) {
          classes.push('del')
          line[0].content = line[0].content.replace(/^-/, '')
        }
        if (line[0].content.startsWith('@@')) {
          classes.push('changed')
          line[0].content = line[0].content.replace(/^@@/, '')
        }
      }

      if (highlights.includes(lineIndex + 1)) {
        classes.push('highlight')
      }

      return {
        type: 'element',
        tag: 'div',
        props: {
          class: classes.join(' ').trim(),
          line: lineIndex + 1,
        },
        children: line.map(tokenSpan)
      }
    })

    function getSpanProps (token) {
      if (!token.style) {
        return {}
      }
      // TODO: generate unique key for style
      // Or simply using `JSON.stringify(token.style)` would be easier to understand,
      // but not sure about the impact on performance
      const key = Object.values(token.style).map(themeStyle => Object.values(themeStyle).join('')).join('')
      if (!styleMap[key]) {
        styleMap[key] = {
          style: token.style,
          // Using the hash value of the style as the className,
          // ensure that the className remains stable over multiple compilations,
          // which facilitates content caching.
          className: 'ct-' + hash(key)
        }
      }
      return {
        class: styleMap[key].className
      }
    }

    function tokenSpan (token) {
      return {
        type: 'element',
        tag: 'span',
        props: getSpanProps(token),
        children: [{ type: 'text', value: token.content }]
      }
    }
  }

  const getHighlightedCode = async (code, lang, theme, opts) => {
    const styleMap = opts?.styleMap || {}
    const highlights = opts?.highlights || []
    const ast = await getHighlightedAST(code, lang, theme, { styleMap, highlights })

    function renderNode (node) {
      if (node.type === 'text') {
        return node.value.replace(/</g, '&lt;').replace(/>/g, '&gt;')
      }
      const children = node.children.map(renderNode).join('')
      return `<div><${node.tag} class="${node.props.class}">${children}</${node.tag}></div>`
    }

    return {
      code: ast.map(renderNode).join(''),
      styles: generateStyles(styleMap)
    }
  }

  const generateStyles = (styleMap) => {
    const styles = []
    for (const styleToken of Object.values(styleMap)) {
      const defaultStyle = styleToken.style.default
      const hasColor = !!defaultStyle?.color
      const hasBold = isBold(defaultStyle)
      const hasItalic = isItalic(defaultStyle)
      const hasUnderline = isUnderline(defaultStyle)
      const themeStyles = Object.entries(styleToken.style).map(([variant, style]) => {
        const styleText = [
          // If the default theme has a style, but the current theme does not have one,
          // we need to override to reset style
          ['color', style.color || (hasColor ? 'unset' : '')],
          ['font-weight', isBold(style) ? 'bold' : hasBold ? 'unset' : ''],
          ['font-style', isItalic(style) ? 'italic' : hasItalic ? 'unset' : ''],
          ['text-decoration', isUnderline(style) ? 'bold' : hasUnderline ? 'unset' : '']
        ]
          .filter(kv => kv[1])
          .map(kv => kv.join(':') + ';')
          .join('')
        return { variant, styleText }
      })

      const defaultThemeStyle = themeStyles.find(themeStyle => themeStyle.variant === 'default')
      themeStyles.forEach((themeStyle) => {
        if (themeStyle.variant === 'default') {
          styles.push(`.${styleToken.className}{${themeStyle.styleText}}`)
        } else if (themeStyle.styleText !== defaultThemeStyle?.styleText) {
          // Skip if same as default theme
          styles.push(`.${themeStyle.variant} .${styleToken.className}{${themeStyle.styleText}}`)
        }
      })
    }
    return styles.join('\n')
  }

  return {
    getHighlightedTokens,
    getHighlightedAST,
    getHighlightedCode,
    generateStyles,
  }
})

function mergeLines (line1, line2) {
  const mergedTokens = []

  const right = {
    key: line1.key,
    tokens: line1.tokens.slice()
  }
  const left = {
    key: line2.key,
    tokens: line2.tokens.slice()
  }
  let index = 0
  while (index < right.tokens.length) {
    const rightToken = right.tokens[index]
    const leftToken = left.tokens[index]

    if (rightToken.content === leftToken.content) {
      mergedTokens.push({
        content: rightToken.content,
        style: {
          ...right.tokens[index].style,
          ...left.tokens[index].style
        }
      })
      index += 1
      continue
    }

    if (rightToken.content.startsWith(leftToken.content)) {
      const nextRightToken = {
        ...rightToken,
        content: rightToken.content.slice(leftToken.content.length)
      }
      rightToken.content = leftToken.content
      right.tokens.splice(index + 1, 0, nextRightToken)
      continue
    }

    if (leftToken.content.startsWith(rightToken.content)) {
      const nextLeftToken = {
        ...leftToken,
        content: leftToken.content.slice(rightToken.content.length)
      }
      leftToken.content = rightToken.content
      left.tokens.splice(index + 1, 0, nextLeftToken)
      continue
    }

    throw new Error('Unexpected token')
  }
  return mergedTokens
}

function isBold (style) {
  return style && style.fontStyle === FontStyle.Bold
}

function isItalic (style) {
  return style && style.fontStyle === FontStyle.Italic
}

function isUnderline (style) {
  return style && style.fontStyle === FontStyle.Underline
}

/**
 * An insecure but simple and fast hash method.
 * https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0?permalink_comment_id=4261728#gistcomment-4261728
 */
function hash (str) {
  return Array.from(str)
    .reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0)
    .toString()
    .slice(-6)
}
