import { HabitsModel } from "../models/habitsModel.js"
export class HabitController  {


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
          res.render('habits/addhabit', { type: contentType, date })
        } catch (error) {
          next(error)
        }
      }

      async addHabit (req, res, next) {
        try {
            if (req.body.streak === undefined ) {
                req.body.streak = false
            }

            if (req.body.daysOfMonth !== undefined) {
                req.body.repeat = req.body.daysOfMonth
            } else if (req.body.daysOfWeek !== undefined ) {
                req.body.repeat = req.body.daysOfWeek
            } 

            if (typeof req.body.repeat === 'string') {
                req.body.repeat = [req.body.repeat]
            }

            const habit = new HabitsModel({
                text: req.body.text, 
                creator: req.session.user.username,
                repeat: req.body.repeat,
                xp: req.body.xp,
                streak: req.body.streak,
                doneToday: false
            })
    
            await habit.save()
            req.session.flash = { type: 'success', text: 'The Habit was created successfully' }
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
      }


      async updateHabit(req, res, next) {
        try {
            const { habitId, isChecked } = req.body
            
            const user = req.session.user.username
    
            const updatedHabit = await HabitsModel.findOneAndUpdate(
                { _id: habitId, creator: user },
                { doneToday: isChecked }
            )

    
            res.redirect('/')
        } catch (error) {
            console.error('Error updating habit:', error)
        }
    }
    
}