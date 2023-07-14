import loadMedia from '~/assets/js/lazyload/loadmedia'

export default () => {
  /**
   * Preloads media
   */
  const loadmedia = new loadMedia('[data-src]', {
    onLoaded: function (loadedItem) {
      loadedItem.closest('.lazyload').classList.add('loaded')
      loadedItem.closest('.lazyload:not(.video)').classList.remove('print:hidden')
    },
  })

  loadmedia.initialize()
}