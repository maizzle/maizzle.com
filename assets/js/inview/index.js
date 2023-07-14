import inView from '~/assets/js/utilities/inview'

export default () => {
  /**
   * Detect when in view
   */
  const inview = new inView('.observe', {
    inView: function (element) { 
      console.log(element)
    }
  })

  inview.initialize()
}