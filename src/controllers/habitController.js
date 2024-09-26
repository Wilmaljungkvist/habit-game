import { HabitsModel } from "../models/habitsModel.js"
export class HabitController  {


    async index (req, res, next) {
        try {
          const monthNames = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"]
          const currentDate = new Date()
          const day = currentDate.getDate()
          const month = currentDate.getMonth()
          const monthString = monthNames[month]
          const date = `${day} ${monthString}`
          const contentType = 'home'
          res.render('habits/addhabit', { type: contentType, date })
        } catch (error) {
          next(error)
        }
      }

      async addHabit (req, res, next) {
        try {
            const habit = new HabitsModel({
                text: req.body.text, 
                creator: req.session.user.username,
                repeat: req.body.repeat,
                xp: req.body.xp,
                streak: req.body.streak
            })
    
            await habit.save()
            req.session.flash = { type: 'success', text: 'The Habit was created successfully' }
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
      }
}