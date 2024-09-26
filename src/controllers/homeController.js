
import { testHabits } from "../../test/habits.js"
import { HabitsModel } from "../models/habitsModel.js"
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
      const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      const currentDate = new Date()
      const day = currentDate.getDate()
      const weekDay = currentDate.getDay()
      const month = currentDate.getMonth()
      const monthString = monthNames[month]
      const date = `${day} ${monthString} ${weekDays[weekDay]}`
      const contentType = 'home'
      
      const userHabits = await HabitsModel.find({ creator: req.session.user.username })
      

      let habits = []
      for (let i = 0; i < userHabits.length; i++) {
        console.log(userHabits[i])
        if (userHabits[i].repeat.includes('daily')) {
          console.log('daily')
          habits.push(userHabits[i])
        } else if (userHabits[i].repeat.includes(weekDays[weekDay])) {
          habits.push(userHabits[i])
        } else if (userHabits[i].repeat.includes(day)) {
          habits.push(userHabits[i])
        }
      }

      res.render('home/index', { type: contentType, date, habits})
    } catch (error) {
      next(error)
    }
  }
}
