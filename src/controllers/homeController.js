
/**
 * Encapsulates a controller.
 */
export class HomeController {
  /**
   * Renders the home page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      const monthNames = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"]
      const currentDate = new Date()
      const day = currentDate.getDate()
      const month = currentDate.getMonth()
      const monthString = monthNames[month]
      const date = `${day} ${monthString}`
      const contentType = 'home'
      res.render('home/index', { type: contentType, date})
    } catch (error) {
      next(error)
    }
  }

  /**
   * Renders the information page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async information (req, res, next) {
    try {
      const logo = '/img/BDTSMedia.png'
      const type = 'home'
      res.render('information/index', { logo, type })
    } catch (error) {
      next(error)
    }
  }
}
