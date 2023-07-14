// Copyright © UnlimitDesign 2019
// Plugin: Load media
// Version: 1.0.6
// URL: @UnlimitDesign
// Author: UnlimitDesign, Christian Lundgren, Shu Miyao
// Description: Detect when elements enter and/or leave viewport
// License: MIT

// Import classList utility
import classList from '../utilities/chaining.js'
import tmInView from '../utilities/inview.js'

const tmLoadMedia = (function () {

  'use strict'

  if (typeof document == 'undefined') return false

  // InView for lazyload instance
  let mediaInView

  // Set the plugin defaults
  const defaults = {
    lazyLoad: true,                   // Whether items should be lazyloaded using inView
    backgroundImage: false,           // Preload background image set in CSS
    beforeLoading: function () { },   // Callback - tabs initialized
    onLoaded: function () { },           // Callback - tabs initialized
    onError: function () { },            // Callback - element in view
  }

  /**
  * Constructor.
  * @param  {element}  element  The selector element(s).
  * @param  {object}   options  The plugin options.
  */
  function LoadMedia(element, options) {

    // Create an empty plugin object
    let plugin = {}

    // Get defaults and merge with user options
    try {
      plugin.this = this
      plugin.elements = element
      plugin.defaults = defaults
      plugin.options = options
      plugin.settings = Object.assign({}, defaults, options)
    } catch (error) {
      console.log(`${error} - format must be: let x = new loadMedia('.selector' or NodeList,{options})`)
    }

    /**
    * Load the media
    * @param  {element}  The reference to the media to be loaded.
    * @param  {string}  The media tag type.
    */
    const processMedia = (media, mediaType) => {

      if (media.classList.contains('loaded')) return false

      switch (mediaType) {

        case 'image':

          let image = media // eslint-disable-line
          let proxyImage = new Image() // eslint-disable-line
          proxyImage.src = image.dataset.src
          proxyImage.width = image.width
          proxyImage.height = image.height
          proxyImage.alt = image.alt
          proxyImage.classList = image.classList

          // Only set srcset if it's not a background image and it has srcset
          if (!plugin.settings.backgroundImage && image.srcset) {
            proxyImage.srcset = image.dataset.srcset
          }

          // Use decode for modern browsers
          if ('decode' in proxyImage) {
            proxyImage.decode().then(() => {
              onSuccess(proxyImage, image)
            }).catch((encodingError) => {
              console.log(encodingError)
              onError(proxyImage, image)
            })

            // Fallback to traditional loading
          } else {
            addEventListeners(proxyImage, image)
          }

          break

        case 'video':

          let source = media // eslint-disable-line
          let video = source.parentNode // eslint-disable-line

          // Swap src with data src value
          video.querySelectorAll('source').forEach(function (source) {
            if (typeof source.tagName === 'string' && source.tagName === 'SOURCE') {
              source.src = source.dataset.src
              video.load()
            }
          })

          // Add events
          addEventListeners(video)

          break

        case 'iframe':

          let iframe = media // eslint-disable-line

          // Swap the source
          iframe.src = iframe.dataset.src

          // Add events
          addEventListeners(iframe)
      }
    }

    /**
    * Add event listeners, serves as fallback for images, loader for video and iframe
    * @param  {element}  The media to receive listeners
    * @param  {element}  For images only, reference to old image for insertion.
    */
    const addEventListeners = (media, refItem) => {

      // Check load event
      let loadEvent = media.tagName == 'VIDEO' ? 'loadeddata' : 'load'

      // Listeners
      media.addEventListener(loadEvent, function mediaLoaded(event) {
        onSuccess(event.target, refItem)
        event.target.removeEventListener(loadEvent, mediaLoaded)
      })
      media.addEventListener('error', function mediaError(event) {
        onError(event, refItem)
        event.target.removeEventListener('error', mediaError)
      })
    }

    /**
    * Called if media loaded
    * @param  {element}  The newly loaded media.
    * @param  {element}  For images only, reference to old image for insertion.
    */
    const onSuccess = (media, refItem) => {
      let element = !plugin.settings.backgroundImage ? media : refItem
      if (plugin.settings.backgroundImage) setBgImage(media, refItem)
      if (media.tagName == 'IMG' && !plugin.settings.backgroundImage) addLoadedMedia(media, refItem)

      classList(element).addClass('loaded')

      // Callback
      plugin.settings.onLoaded(element)
    }

    /**
    * Called if media loaded
    * @param  {element}  The newly loaded media.
    * @param  {element}  For images only, reference to old image for insertion.
    */
    const addLoadedMedia = (media, refItem) => {
      if (refItem.parentNode == null) return false
      refItem.parentNode.insertBefore(media, refItem.nextSibling)
      media.style.cssText = refItem.style.cssText
      refItem.parentNode.removeChild(refItem)
    }

    /**
    * Set background image
    * @param  {element}  The newly loaded media.
    */
    const setBgImage = (media, refItem) => {
      if (refItem.parentNode == null) return false
      refItem.style.cssText = refItem.style.cssText + `background-image:url(${media.src})`
      classList(refItem).addClass('bg-image').addClass('bg-cover').addClass('bg-center')
    }

    /**
    * Called if image failed to load
    * @param  {element}  defaults  The event or image that failed to load.
    */
    const onError = (event, refItem) => {
      let target = event.target != undefined ? event.target : event
      let errorMessage = `The following image: ${target.src} did not load.`
      console.log(errorMessage)

      // Callback
      plugin.settings.onError(target, refItem)
    }

    /**
    * Check media type
    * @param  {element}  defaults  The event or image that failed to load.
    */
    const checkMediaType = (element) => {
      let tagName = element.tagName
      let mediaType = tagName == 'IMG' ? 'image' : tagName == 'DIV' ? 'image' : tagName == 'SPAN' ? 'image' : tagName == 'SOURCE' ? 'video' : 'iframe'
      return mediaType
    }

    /**
    * Public variables and methods.
    */

    /**
    * Initialize the plugin.
    */
    plugin.initialize = () => {

      if (plugin.elements == null) return false

      // HTML element passed used commonly when integrated into other plugins
      if (plugin.elements instanceof Element) {
        processMedia(plugin.elements, checkMediaType(plugin.elements))

      } else {
        if (!plugin.settings.lazyLoad) {
          let images = document.querySelectorAll(plugin.elements)
          images.forEach(function (element) {
            processMedia(element, checkMediaType(element))
          })
        } else {
          mediaInView = new tmInView(plugin.elements, {
            unObserveViewed: true,
            inView: function (visibleMedia) {

              // Callback
              plugin.settings.beforeLoading(visibleMedia)

              visibleMedia = visibleMedia.querySelector('[data-observe-parent]') ? visibleMedia.querySelector(plugin.elements) : visibleMedia
              processMedia(visibleMedia, checkMediaType(visibleMedia))
            }
          })
          mediaInView.initialize()
        }
      }
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

      // Reset variables
      plugin.settings = null
    }

    // Return API
    return plugin
  }

  // Return constructor
  return LoadMedia
})()

// Export plugin
export default tmLoadMedia