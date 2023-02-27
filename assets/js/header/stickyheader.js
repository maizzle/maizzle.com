// Copyright © UnlimitDesign 2019
// Plugin: Sticky Header
// Version: 1.0.0
// URL: @UnlimitDesign
// Author: UnlimitDesign, Christian Lundgren, Shu Miyao
// Description: Detect when elements enter and/or leave viewport
// License: MIT

// Import utilities
import classList from './chaining.js'

const tmStickyHeader = (function () {

  'use strict'

  if (typeof document == 'undefined' || typeof window == 'undefined') return false

  // Set the plugin defaults
  const defaults = {
    stickyClass: 'sticky',
    backgroundClass: 'header-background',
    compactClass: 'header-compact',
    headerInClass: 'header-in',
    headerOutClass: 'header-out',
    initialPosClass: 'header-positioned',
    initialized: function () { },              // Callback - header initialized
    sticky: function () { },                   // Callback - header sticky
    destroyed: function () { }                  // Callback - header destroyed
  }

  /**
  * Constructor.
  * @param  {element}  element  The selector element(s).
  * @param  {object}   options  The plugin options.
  */
  function StickyHeader(element, options) {

    // Debounce events if window on scroll event is used
    let debounceTimeout

    // Variables for monitoring last and current header position
    let lastPos = 0
    let currentPos

    // Create an empty plugin object
    const plugin = {}

    // Get defaults and merge with user options
    try {
      plugin.this = this
      plugin.elements = element
      plugin.defaults = defaults
      plugin.options = options
      plugin.settings = Object.assign({}, defaults, options)
    } catch (error) {
      console.log(`${error} - format must be: let x = new tmStickyHeader('.selector' or NodeList,{options})`)
    }

    /**
    * Update element state
    */
    const updateHeaderState = () => {

      // If there's a timer, cancel it
      if (debounceTimeout) {
        window.cancelAnimationFrame(debounceTimeout)
      }

      // Setup the new requestAnimationFrame()
      debounceTimeout = window.requestAnimationFrame(function () {
        if (document.querySelector(plugin.elements) === null) return false
        toggleClasses(document.querySelector(plugin.elements))
      })
    }

    /**
    * Update header state on scroll
    */
    const toggleClasses = (header) => {

      // Get data attribute values
      let winH = window.innerHeight
      let headerH = Math.ceil(header.offsetHeight)
      let thresholdBkg = header.dataset.bkgThreshold == 'window-height' ? winH - headerH : header.dataset.bkgThreshold
      let thresholdHeight = header.dataset.compactThreshold == 'window-height' ? winH - headerH : header.dataset.compactThreshold
      let thresholdSticky = header.dataset.stickyThreshold == 'window-height' ? winH - headerH : header.dataset.stickyThreshold
      let thresholdHeadIn = header.dataset.helperInThreshold
      let thresholdHeadOut = header.dataset.helperOutThreshold
      let thresholdStickyScrollUp = header.hasAttribute('data-sticky-scroll-up')
      let callbackFlag = header.classList.contains('sticky') ? true : false

      // Update current position
      currentPos = window.pageYOffset
      if (currentPos < 0) return false

      // Sticky
      if (thresholdSticky && window.pageYOffset >= thresholdSticky || thresholdSticky == 0) {
        classList(header).addClass(plugin.settings.stickyClass)
        if (thresholdHeadIn && thresholdHeadOut) classList(header).addClass(plugin.settings.initialPosClass)

        // Callback
        if (!callbackFlag) plugin.settings.sticky()

      } else {
        if (!thresholdStickyScrollUp) classList(header).removeClass(plugin.settings.stickyClass)
        if (thresholdHeadIn && thresholdHeadOut) classList(header).removeClass(plugin.settings.initialPosClass)
      }

      // Background
      if (thresholdBkg && window.pageYOffset >= thresholdBkg) {
        classList(header).addClass(plugin.settings.backgroundClass)
      } else {
        classList(header).removeClass(plugin.settings.backgroundClass)
      }

      // Compact
      if (thresholdHeight && window.pageYOffset >= thresholdHeight) {
        classList(header).addClass(plugin.settings.compactClass)
      } else {
        classList(header).removeClass(plugin.settings.compactClass)
      }

      // Scrolling down
      if (currentPos > lastPos) {
        if (thresholdHeadIn && window.pageYOffset >= thresholdHeadIn) {
          classList(header).addClass(plugin.settings.headerInClass)
        }
        if (thresholdStickyScrollUp) {
          if (currentPos >= header.offsetHeight) classList(header).addClass(plugin.settings.headerOutClass)
        } else {
          classList(header).removeClass(plugin.settings.headerOutClass)
        }

        // Scrolling up
      } else if (currentPos < lastPos) {
        if (thresholdHeadIn && window.pageYOffset <= thresholdHeadIn) {
          classList(header).removeClass(plugin.settings.headerInClass).removeClass(plugin.settings.headerOutClass)
        }
        if (thresholdHeadIn && window.pageYOffset >= thresholdHeadIn && window.pageYOffset <= thresholdHeadOut) {
          classList(header).addClass(plugin.settings.headerOutClass)
        }
        if (thresholdStickyScrollUp) {
          classList(header).addClass(plugin.settings.stickyClass).addClass(plugin.settings.headerInClass).removeClass(plugin.settings.headerOutClass)
        }
      }

      // Last position is now the same as current position
      lastPos = currentPos
    }

    /**
    * Public variables and methods.
    * @type {object}
    */

    /**
    * Initialize the plugin.
    */
    plugin.initialize = () => {

      if (plugin.elements == null) return false

      // Add scroll and resize event for window
      window.addEventListener('scroll', updateHeaderState, false)
      window.addEventListener('resize', updateHeaderState, false)

      // Callback
      plugin.settings.initialized()
    }

    /**
    * Refresh the plugin.
    */
    plugin.refresh = () => {
      // Destroy the existing initialization
      plugin.destroy()

      // Initialize the plugin
      plugin.settings = Object.assign({}, defaults, options)
      plugin.initialize()
    }

    /**
    * Destroy an existing initialization.
    */
    plugin.destroy = () => {

      if (!plugin.settings) return

      // Remove scroll and resize event for window
      window.removeEventListener('scroll', updateHeaderState, false)
      window.removeEventListener('resize', updateHeaderState, false)

      // Callback
      plugin.settings.destroyed()

      // Reset variables
      plugin.settings = null
    }

    // Return API
    return plugin
  }

  // Return constructor
  return StickyHeader
})()

// Export plugin
export default tmStickyHeader
