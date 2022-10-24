import stickyHeader from '~/assets/js/header/stickyheader'

export default () => {

  /**
   * Sticky header
   */
  const stickyheader = new stickyHeader('.header-transparent')

  stickyheader.initialize()
}
